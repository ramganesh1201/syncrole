-- Add repositories column to github_analysis to persist repository data without creating a new table
ALTER TABLE public.github_analysis ADD COLUMN IF NOT EXISTS repositories JSONB;
