-- =====================================================================
-- Resume Intelligence Tables
-- =====================================================================

-- JD Match History
CREATE TABLE IF NOT EXISTS public.resume_jd_matches (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  jd_text             text NOT NULL,
  match_score         integer DEFAULT 0 CHECK (match_score >= 0 AND match_score <= 100),
  matched_keywords    text[] DEFAULT '{}',
  missing_keywords    text[] DEFAULT '{}',
  missing_skills      text[] DEFAULT '{}',
  improvements        jsonb DEFAULT '[]'::jsonb,
  created_at          timestamptz NOT NULL DEFAULT now()
);

-- Company Fit Analysis
CREATE TABLE IF NOT EXISTS public.resume_company_fit (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name        text NOT NULL,
  fit_score           integer DEFAULT 0 CHECK (fit_score >= 0 AND fit_score <= 100),
  strengths           text[] DEFAULT '{}',
  weaknesses          text[] DEFAULT '{}',
  missing_requirements text[] DEFAULT '{}',
  created_at          timestamptz NOT NULL DEFAULT now()
);

-- RLS Policies
ALTER TABLE public.resume_jd_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_company_fit ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own jd matches"
  ON public.resume_jd_matches FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage own company fit"
  ON public.resume_company_fit FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS resume_jd_matches_user_idx ON public.resume_jd_matches(user_id);
CREATE INDEX IF NOT EXISTS resume_company_fit_user_idx ON public.resume_company_fit(user_id);
