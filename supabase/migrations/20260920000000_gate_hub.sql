-- Migration: Create GATE Public Hub tables with public read RLS
-- Description: Standalone tables for GATE official sources, events/milestones, updates, syllabus structure, and curated learning resources.

-- 1. gate_sources
CREATE TABLE IF NOT EXISTS public.gate_sources (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    source_type TEXT NOT NULL DEFAULT 'official', -- 'official' | 'institutional' | 'educational' | 'community'
    is_official BOOLEAN NOT NULL DEFAULT false,
    last_checked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. gate_events (Timeline & Milestones)
CREATE TABLE IF NOT EXISTS public.gate_events (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    event_type TEXT NOT NULL, -- 'registration' | 'correction' | 'admit_card' | 'exam' | 'answer_key' | 'result' | 'scorecard'
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    date_label TEXT NOT NULL, -- Human readable date string (e.g. "September 2026", "February 7, 2027")
    status TEXT NOT NULL DEFAULT 'upcoming', -- 'upcoming' | 'ongoing' | 'completed' | 'tentative'
    source_id TEXT REFERENCES public.gate_sources(id) ON DELETE SET NULL,
    official_url TEXT,
    last_checked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_verified_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    verification_status TEXT NOT NULL DEFAULT 'verified', -- 'verified' | 'pending_recheck' | 'stale' | 'archived'
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. gate_updates (Official Announcement Feed & Change Detection)
CREATE TABLE IF NOT EXISTS public.gate_updates (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    update_type TEXT NOT NULL DEFAULT 'official_announcement', -- 'official_announcement' | 'timeline_change' | 'syllabus_update'
    source_id TEXT REFERENCES public.gate_sources(id) ON DELETE SET NULL,
    official_url TEXT,
    published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    detected_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_verified_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    verification_status TEXT NOT NULL DEFAULT 'verified',
    previous_value TEXT,
    new_value TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. gate_syllabus (Syllabus Structure for Papers, Subjects, Topics)
CREATE TABLE IF NOT EXISTS public.gate_syllabus (
    id TEXT PRIMARY KEY,
    paper_code TEXT NOT NULL DEFAULT 'CSE', -- 'CSE', 'DA', 'ECE', 'EE', 'ME', 'CE'
    paper_name TEXT NOT NULL DEFAULT 'Computer Science & Information Technology',
    subject_id TEXT NOT NULL,
    subject_name TEXT NOT NULL,
    subject_order INT NOT NULL DEFAULT 1,
    topic_id TEXT NOT NULL,
    topic_name TEXT NOT NULL,
    topic_order INT NOT NULL DEFAULT 1,
    subtopics TEXT[] NOT NULL DEFAULT '{}',
    weightage_estimate TEXT, -- e.g. "8-10% of total marks"
    concept_summary TEXT, -- "1. Understand: What does this concept mean?"
    why_it_matters TEXT, -- "2. Why it matters in GATE"
    key_takeaways TEXT[] NOT NULL DEFAULT '{}', -- "3. What you need to know"
    version TEXT NOT NULL DEFAULT '2027',
    source_id TEXT REFERENCES public.gate_sources(id) ON DELETE SET NULL,
    last_verified_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. gate_resources (Contextual Learning Resources & PYQ Links)
CREATE TABLE IF NOT EXISTS public.gate_resources (
    id TEXT PRIMARY KEY,
    topic_id TEXT NOT NULL,
    title TEXT NOT NULL,
    resource_type TEXT NOT NULL, -- 'video' | 'notes' | 'textbook' | 'pyq' | 'practice'
    provider TEXT NOT NULL, -- e.g. "NPTEL", "IIT Madras", "Standard Textbook", "Official GATE PYQ"
    url TEXT NOT NULL,
    description TEXT NOT NULL,
    is_primary BOOLEAN NOT NULL DEFAULT true, -- true = primary (1-3 shown), false = secondary (collapsed in "Explore More")
    source_classification TEXT NOT NULL DEFAULT 'curated_learning', -- 'official_source' | 'curated_learning' | 'external_resource'
    source_id TEXT REFERENCES public.gate_sources(id) ON DELETE SET NULL,
    last_checked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_verified_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    verification_status TEXT NOT NULL DEFAULT 'verified',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE public.gate_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gate_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gate_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gate_syllabus ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gate_resources ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ-ONLY POLICIES
CREATE POLICY "Allow public read access for gate_sources" ON public.gate_sources FOR SELECT USING (true);
CREATE POLICY "Allow public read access for gate_events" ON public.gate_events FOR SELECT USING (true);
CREATE POLICY "Allow public read access for gate_updates" ON public.gate_updates FOR SELECT USING (true);
CREATE POLICY "Allow public read access for gate_syllabus" ON public.gate_syllabus FOR SELECT USING (true);
CREATE POLICY "Allow public read access for gate_resources" ON public.gate_resources FOR SELECT USING (true);
