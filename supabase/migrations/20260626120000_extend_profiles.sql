-- Extend profiles table for premium Profile page capabilities

ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS linkedin TEXT,
ADD COLUMN IF NOT EXISTS portfolio TEXT,
ADD COLUMN IF NOT EXISTS leetcode TEXT,
ADD COLUMN IF NOT EXISTS codeforces TEXT,
ADD COLUMN IF NOT EXISTS target_role TEXT,
ADD COLUMN IF NOT EXISTS dream_companies TEXT[],
ADD COLUMN IF NOT EXISTS preferred_location TEXT,
ADD COLUMN IF NOT EXISTS expected_salary TEXT;
