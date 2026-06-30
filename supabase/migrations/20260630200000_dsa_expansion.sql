-- Database Schema Extensions for DSA Expansion

-- 1. Modify dsa_topics
ALTER TABLE public.dsa_topics
ADD COLUMN IF NOT EXISTS estimated_hours integer DEFAULT 5,
ADD COLUMN IF NOT EXISTS prerequisite_topics text[] DEFAULT '{}'::text[],
ADD COLUMN IF NOT EXISTS interview_frequency text DEFAULT 'medium',
ADD COLUMN IF NOT EXISTS importance_score integer DEFAULT 5,
ADD COLUMN IF NOT EXISTS theory_summary text,
ADD COLUMN IF NOT EXISTS key_formulas text,
ADD COLUMN IF NOT EXISTS important_observations text,
ADD COLUMN IF NOT EXISTS common_interview_tricks text,
ADD COLUMN IF NOT EXISTS pattern_recognition text,
ADD COLUMN IF NOT EXISTS typical_mistakes text,
ADD COLUMN IF NOT EXISTS cheat_sheet text,
ADD COLUMN IF NOT EXISTS memory_tips text,
ADD COLUMN IF NOT EXISTS visualization_notes text;

-- 2. Modify dsa_problems
ALTER TABLE public.dsa_problems
ADD COLUMN IF NOT EXISTS subtopic text,
ADD COLUMN IF NOT EXISTS frequency numeric DEFAULT 0.0,
ADD COLUMN IF NOT EXISTS acceptance_rate numeric DEFAULT 50.0,
ADD COLUMN IF NOT EXISTS estimated_solving_time integer DEFAULT 30,
ADD COLUMN IF NOT EXISTS problem_pattern text,
ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}'::text[],
ADD COLUMN IF NOT EXISTS is_premium boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS recommended_order integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS importance integer DEFAULT 5,
ADD COLUMN IF NOT EXISTS blind75 boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS neetcode150 boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS top150 boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS grind75 boolean DEFAULT false;

-- 3. Modify user_problem_progress
ALTER TABLE public.user_problem_progress
ADD COLUMN IF NOT EXISTS is_bookmarked boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS is_favorite boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS revision_priority integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS needs_revision boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS last_solved_at timestamp with time zone;

-- 4. Modify company_question_sets
ALTER TABLE public.company_question_sets
ADD COLUMN IF NOT EXISTS interview_difficulty text DEFAULT 'medium',
ADD COLUMN IF NOT EXISTS oa_difficulty text DEFAULT 'medium',
ADD COLUMN IF NOT EXISTS top_topics text[] DEFAULT '{}'::text[],
ADD COLUMN IF NOT EXISTS hiring_frequency text DEFAULT 'medium',
ADD COLUMN IF NOT EXISTS recommended_preparation_order integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS question_count integer DEFAULT 0;
