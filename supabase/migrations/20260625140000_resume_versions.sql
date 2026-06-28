-- =====================================================================
-- Resume Version Management & Document Classification
-- =====================================================================

ALTER TABLE public.resume_analysis
  ADD COLUMN IF NOT EXISTS document_type text DEFAULT 'Resume',
  ADD COLUMN IF NOT EXISTS version_number integer DEFAULT 1,
  ADD COLUMN IF NOT EXISTS file_name text,
  ADD COLUMN IF NOT EXISTS extracted_text text,
  ADD COLUMN IF NOT EXISTS analysis_results jsonb DEFAULT '{}'::jsonb;
