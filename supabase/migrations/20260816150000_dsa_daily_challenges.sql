-- =====================================================================
-- Migration: Additive DSA Daily Challenges & User Daily Progress Tables
-- =====================================================================

-- 1. Create dsa_daily_challenges table
CREATE TABLE IF NOT EXISTS public.dsa_daily_challenges (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    challenge_date date NOT NULL UNIQUE,
    problem_id uuid NOT NULL REFERENCES public.dsa_problems(id) ON DELETE CASCADE,
    xp_reward integer DEFAULT 50,
    created_at timestamptz DEFAULT now()
);

-- 2. Create user_daily_challenge_progress table
CREATE TABLE IF NOT EXISTS public.user_daily_challenge_progress (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    challenge_id uuid NOT NULL REFERENCES public.dsa_daily_challenges(id) ON DELETE CASCADE,
    status text DEFAULT 'not_started',
    started_at timestamptz,
    completed boolean DEFAULT false,
    completed_at timestamptz,
    claimed boolean DEFAULT false,
    claimed_at timestamptz,
    xp_earned integer DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    CONSTRAINT user_daily_challenge_progress_user_challenge_key UNIQUE (user_id, challenge_id)
);

-- 3. Row Level Security (RLS)
ALTER TABLE public.dsa_daily_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_daily_challenge_progress ENABLE ROW LEVEL SECURITY;

-- 4. Policies for dsa_daily_challenges
DROP POLICY IF EXISTS "Allow public read for dsa_daily_challenges" ON public.dsa_daily_challenges;
CREATE POLICY "Allow public read for dsa_daily_challenges"
  ON public.dsa_daily_challenges FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow authenticated insert for dsa_daily_challenges" ON public.dsa_daily_challenges;
CREATE POLICY "Allow authenticated insert for dsa_daily_challenges"
  ON public.dsa_daily_challenges FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- 5. Policies for user_daily_challenge_progress (Strict ownership check using auth.uid())
DROP POLICY IF EXISTS "Users can read own daily challenge progress" ON public.user_daily_challenge_progress;
CREATE POLICY "Users can read own daily challenge progress"
  ON public.user_daily_challenge_progress FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own daily challenge progress" ON public.user_daily_challenge_progress;
CREATE POLICY "Users can insert own daily challenge progress"
  ON public.user_daily_challenge_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own daily challenge progress" ON public.user_daily_challenge_progress;
CREATE POLICY "Users can update own daily challenge progress"
  ON public.user_daily_challenge_progress FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

NOTIFY pgrst, 'reload schema';
