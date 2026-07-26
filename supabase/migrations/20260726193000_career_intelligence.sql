-- =====================================================================
-- Phase 2: Career Intelligence Data Layer Extensions
-- Strictly additive, non-breaking schema
-- =====================================================================

-- 1. Companies Intelligence
CREATE TABLE IF NOT EXISTS public.companies (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    industry text,
    company_type text,
    product_service text,
    tech_stack text[] DEFAULT '{}',
    hiring_pattern text,
    interview_rounds integer,
    difficulty text,
    salary_range text,
    benefits text[] DEFAULT '{}',
    hiring_frequency text,
    locations text[] DEFAULT '{}',
    career_growth text,
    careers_link text,
    
    -- Future Live Data Support
    source text,
    last_updated timestamptz DEFAULT now(),
    confidence_score integer,
    verification_status text,
    
    created_at timestamptz NOT NULL DEFAULT now()
);

-- 2. Role Intelligence
CREATE TABLE IF NOT EXISTS public.role_information (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    overview text,
    responsibilities text[] DEFAULT '{}',
    daily_work text,
    required_skills text[] DEFAULT '{}',
    preferred_skills text[] DEFAULT '{}',
    languages text[] DEFAULT '{}',
    frameworks text[] DEFAULT '{}',
    cloud text[] DEFAULT '{}',
    tools text[] DEFAULT '{}',
    expected_experience text,
    promotion_path text,
    salary_progression jsonb DEFAULT '{}'::jsonb,
    future_demand text,
    automation_risk text,
    learning_resources jsonb DEFAULT '[]'::jsonb,
    companies_hiring text[] DEFAULT '{}',

    -- Future Live Data Support
    source text,
    last_updated timestamptz DEFAULT now(),
    confidence_score integer,
    verification_status text,
    
    created_at timestamptz NOT NULL DEFAULT now()
);

-- 3. Skill Intelligence (Master & Relationships)
CREATE TABLE IF NOT EXISTS public.skills_master (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    description text,
    difficulty text,
    learning_time text,
    projects jsonb DEFAULT '[]'::jsonb,
    companies_using text[] DEFAULT '{}',
    interview_questions jsonb DEFAULT '[]'::jsonb,
    related_roles text[] DEFAULT '{}',

    -- Future Live Data Support
    source text,
    last_updated timestamptz DEFAULT now(),
    confidence_score integer,
    verification_status text,

    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.skill_relationships (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    skill_id uuid REFERENCES public.skills_master(id) ON DELETE CASCADE,
    prerequisite_skill_id uuid REFERENCES public.skills_master(id) ON DELETE CASCADE,
    relationship_type text,

    -- Future Live Data Support
    source text,
    last_updated timestamptz DEFAULT now(),
    confidence_score integer,
    verification_status text,

    created_at timestamptz NOT NULL DEFAULT now()
);

-- 4. Career Planning & Experience Bridge
CREATE TABLE IF NOT EXISTS public.career_paths (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    start_role text NOT NULL,
    target_role text NOT NULL,
    steps jsonb DEFAULT '[]'::jsonb,
    
    -- Future Live Data Support
    source text,
    last_updated timestamptz DEFAULT now(),
    confidence_score integer,
    verification_status text,

    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.experience_paths (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    target_company text NOT NULL,
    target_role text NOT NULL,
    starter_companies text[] DEFAULT '{}',
    experience_duration text,
    promotion_path jsonb DEFAULT '[]'::jsonb,
    intermediate_companies text[] DEFAULT '{}',
    
    -- Future Live Data Support
    source text,
    last_updated timestamptz DEFAULT now(),
    confidence_score integer,
    verification_status text,

    created_at timestamptz NOT NULL DEFAULT now()
);

-- 5. Safe Extension of Profiles
-- Add a nullable JSONb column to profiles to store "Career DNA" components 
-- like current_strengths, current_weaknesses, learning_progress etc without breaking anything.
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS career_dna jsonb DEFAULT '{}'::jsonb;

-- 6. Row Level Security
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_information ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills_master ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience_paths ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read for companies" ON public.companies FOR SELECT USING (true);
CREATE POLICY "Allow public read for role_information" ON public.role_information FOR SELECT USING (true);
CREATE POLICY "Allow public read for skills_master" ON public.skills_master FOR SELECT USING (true);
CREATE POLICY "Allow public read for skill_relationships" ON public.skill_relationships FOR SELECT USING (true);
CREATE POLICY "Allow public read for career_paths" ON public.career_paths FOR SELECT USING (true);
CREATE POLICY "Allow public read for experience_paths" ON public.experience_paths FOR SELECT USING (true);
