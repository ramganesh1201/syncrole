-- Additive migration to add company_preference to profiles
-- This stores the user's preference (MNC, Startup, Freelance) 
-- instead of misusing the career_goal enum.

ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS company_preference TEXT;

NOTIFY pgrst, 'reload schema';
