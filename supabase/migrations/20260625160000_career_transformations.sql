-- =====================================================================
-- Career Transformations — User Story Submissions
-- =====================================================================

CREATE TABLE IF NOT EXISTS public.career_transformations (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           uuid REFERENCES auth.users(id) ON DELETE SET NULL,

  -- Story answers
  before_syncrole   text NOT NULL,
  biggest_problems  text NOT NULL,
  actions_taken     text NOT NULL,
  current_results   text NOT NULL,
  advice            text NOT NULL,

  -- AI-generated polished story (filled after edge function runs)
  generated_story   text,

  -- Author display info (snapshot at submission time)
  author_name       text,
  author_role       text,   -- e.g. "SDE-1 @ Flipkart"
  author_college    text,

  -- Moderation
  is_published      boolean NOT NULL DEFAULT false,
  is_featured       boolean NOT NULL DEFAULT false,

  -- Verified growth metrics (snapshot at submission time from user data)
  xp_growth         integer NOT NULL DEFAULT 0,
  dsa_growth        integer NOT NULL DEFAULT 0,
  readiness_growth  integer NOT NULL DEFAULT 0,
  resume_growth     integer NOT NULL DEFAULT 0,

  -- Engagement
  likes_count       integer NOT NULL DEFAULT 0,

  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS career_transformations_user_idx
  ON public.career_transformations(user_id);

CREATE INDEX IF NOT EXISTS career_transformations_featured_idx
  ON public.career_transformations(is_featured, is_published, created_at DESC);

-- Row-level security
ALTER TABLE public.career_transformations ENABLE ROW LEVEL SECURITY;

-- Anyone can read published stories
CREATE POLICY "published_stories_public_read"
  ON public.career_transformations
  FOR SELECT
  USING (is_published = true);

-- Authenticated users can read their own stories (even unpublished)
CREATE POLICY "own_stories_read"
  ON public.career_transformations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Authenticated users can insert their own stories
CREATE POLICY "own_stories_insert"
  ON public.career_transformations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own stories (before published)
CREATE POLICY "own_stories_update"
  ON public.career_transformations
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id AND is_published = false);

-- Trigger: update updated_at on row update
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'career_transformations_updated_at'
  ) THEN
    CREATE TRIGGER career_transformations_updated_at
      BEFORE UPDATE ON public.career_transformations
      FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
  END IF;
END;
$$;

-- Insert 3 featured seed stories (shown on homepage before real submissions)
INSERT INTO public.career_transformations (
  user_id, before_syncrole, biggest_problems, actions_taken, current_results,
  advice, author_name, author_role, author_college,
  is_published, is_featured, xp_growth, dsa_growth, readiness_growth, resume_growth
) VALUES
(
  NULL,
  'I was applying to 50+ companies with the same generic resume and getting zero responses.',
  'No feedback loop. No idea which skills mattered. Resume felt like a shot in the dark.',
  'Used SyncRole resume analyzer, built 2 real projects from the GitHub recommendations, completed 60 DSA problems in 45 days.',
  'Landed SWE role at Razorpay — 3x my previous offer. Got 4 interviews in the last 2 weeks alone.',
  'Stop optimizing in a vacuum. Let the data tell you what recruiters actually care about.',
  'Aarav S.',
  'SWE @ Razorpay',
  'BITS Pilani',
  true, true,
  3200, 60, 38, 22
),
(
  NULL,
  'Fresher with a 7.8 CGPA but no internship experience. Was invisible to recruiters.',
  'GitHub was empty. Resume had only coursework. No idea how to stand out.',
  'Connected GitHub, built a full-stack project in 30 days guided by Career Twin, ran 5 mock interviews with SyncPilot.',
  'First internship offer from Atlassian in 45 days. Rejected 6 months ago by the same company.',
  'Your GitHub is your new resume. Ship real projects that solve real problems.',
  'Priya K.',
  'Intern @ Atlassian',
  'VIT Vellore',
  true, true,
  2800, 45, 42, 18
),
(
  NULL,
  'Stuck at service companies. Dream was a product company offer but felt out of reach.',
  'System design was a black box. DSA was inconsistent. Resume was mediocre.',
  'Career Twin identified the exact DSA gap. Solved 100 problems in 90 days. Rebuilt resume from scratch using AI analysis.',
  'SDE-1 offer from Flipkart. Turned down 2 other product company offers.',
  'Consistency beats brilliance. Show up every day. SyncRole keeps you accountable.',
  'Rohit M.',
  'SDE-1 @ Flipkart',
  'NIT Trichy',
  true, true,
  4100, 100, 51, 30
)
ON CONFLICT DO NOTHING;
