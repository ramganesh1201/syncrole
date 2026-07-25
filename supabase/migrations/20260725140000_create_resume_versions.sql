-- =====================================================================
-- Resume Versions & RLS Policies
-- =====================================================================

CREATE TABLE IF NOT EXISTS public.resume_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  file_path text,
  file_name text,
  document_type text DEFAULT 'Resume',
  version_number integer DEFAULT 1,
  extracted_text text,
  analysis_results jsonb DEFAULT '{}'::jsonb,
  ats_score integer DEFAULT 0,
  keyword_match integer DEFAULT 0,
  formatting_score integer DEFAULT 0,
  project_score integer DEFAULT 0,
  total_score integer DEFAULT 0,
  suggestions text[] DEFAULT '{}',
  missing_skills text[] DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.resume_versions ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'resume_versions' AND policyname = 'Users can manage own resume versions'
  ) THEN
    CREATE POLICY "Users can manage own resume versions"
      ON public.resume_versions FOR ALL
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;
