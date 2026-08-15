-- ================================================================
-- DSA Practice Engine Migration
-- Adds: dsa_test_cases, dsa_practice_sessions, dsa_submissions, dsa_code_drafts
-- Extends: dsa_problems, user_problem_progress
-- RLS: all tables locked to auth.uid()
-- ================================================================

-- ---------------------------------------------------------------
-- 1. Extend dsa_problems with internal-engine columns
-- ---------------------------------------------------------------
ALTER TABLE public.dsa_problems
  ADD COLUMN IF NOT EXISTS slug text,
  ADD COLUMN IF NOT EXISTS description_md text,
  ADD COLUMN IF NOT EXISTS constraints_md text,
  ADD COLUMN IF NOT EXISTS examples_json jsonb,
  ADD COLUMN IF NOT EXISTS starter_code_js text,
  ADD COLUMN IF NOT EXISTS supported_languages text[] DEFAULT ARRAY['javascript']::text[],
  ADD COLUMN IF NOT EXISTS time_limit_ms integer DEFAULT 2000,
  ADD COLUMN IF NOT EXISTS memory_limit_mb integer DEFAULT 128,
  ADD COLUMN IF NOT EXISTS has_internal_engine boolean DEFAULT false;

-- Unique slug index (only where slug is not null)
CREATE UNIQUE INDEX IF NOT EXISTS dsa_problems_slug_unique
  ON public.dsa_problems (slug) WHERE slug IS NOT NULL;

-- ---------------------------------------------------------------
-- 2. Extend user_problem_progress with engine-tracking columns
-- ---------------------------------------------------------------
ALTER TABLE public.user_problem_progress
  ADD COLUMN IF NOT EXISTS first_started_at timestamptz,
  ADD COLUMN IF NOT EXISTS first_solved_at timestamptz,
  ADD COLUMN IF NOT EXISTS total_active_seconds integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS best_execution_time_ms integer,
  ADD COLUMN IF NOT EXISTS best_memory_kb integer,
  ADD COLUMN IF NOT EXISTS run_count integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS submission_count integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS confidence integer CHECK (confidence >= 1 AND confidence <= 5),
  ADD COLUMN IF NOT EXISTS notes text;

-- ---------------------------------------------------------------
-- 3. dsa_test_cases
-- Hidden tests are protected by RLS - users can only read sample tests
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.dsa_test_cases (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  problem_id  uuid NOT NULL REFERENCES public.dsa_problems(id) ON DELETE CASCADE,
  input       text NOT NULL,
  expected_output text NOT NULL,
  is_sample   boolean NOT NULL DEFAULT false,
  is_hidden   boolean NOT NULL DEFAULT true,
  ordering    integer NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS dsa_test_cases_problem_id_idx ON public.dsa_test_cases(problem_id);
CREATE INDEX IF NOT EXISTS dsa_test_cases_sample_idx ON public.dsa_test_cases(problem_id, is_sample);

ALTER TABLE public.dsa_test_cases ENABLE ROW LEVEL SECURITY;

-- Users may only read sample (non-hidden) test cases
DROP POLICY IF EXISTS dsa_test_cases_select ON public.dsa_test_cases;
CREATE POLICY dsa_test_cases_select ON public.dsa_test_cases
  FOR SELECT
  USING (is_hidden = false);

-- Admins can manage all test cases (insert/update/delete)
DROP POLICY IF EXISTS dsa_test_cases_admin ON public.dsa_test_cases;
CREATE POLICY dsa_test_cases_admin ON public.dsa_test_cases
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- ---------------------------------------------------------------
-- 4. dsa_practice_sessions
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.dsa_practice_sessions (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  problem_id        uuid NOT NULL REFERENCES public.dsa_problems(id) ON DELETE CASCADE,
  started_at        timestamptz NOT NULL DEFAULT now(),
  last_heartbeat_at timestamptz NOT NULL DEFAULT now(),
  ended_at          timestamptz,
  active_seconds    integer NOT NULL DEFAULT 0 CHECK (active_seconds >= 0),
  wall_seconds      integer NOT NULL DEFAULT 0 CHECK (wall_seconds >= 0),
  run_count         integer NOT NULL DEFAULT 0 CHECK (run_count >= 0),
  submission_count  integer NOT NULL DEFAULT 0 CHECK (submission_count >= 0),
  -- Limit active_seconds to a reasonable max (24h = 86400s)
  CONSTRAINT active_seconds_reasonable CHECK (active_seconds <= 86400),
  final_status      text NOT NULL DEFAULT 'in_progress'
    CHECK (final_status IN ('in_progress', 'attempted', 'solved', 'abandoned')),
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS dsa_practice_sessions_user_id_idx ON public.dsa_practice_sessions(user_id);
CREATE INDEX IF NOT EXISTS dsa_practice_sessions_user_problem_idx ON public.dsa_practice_sessions(user_id, problem_id);
CREATE INDEX IF NOT EXISTS dsa_practice_sessions_created_at_idx ON public.dsa_practice_sessions(created_at);
CREATE INDEX IF NOT EXISTS dsa_practice_sessions_status_idx ON public.dsa_practice_sessions(user_id, final_status);

ALTER TABLE public.dsa_practice_sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS dsa_practice_sessions_user ON public.dsa_practice_sessions;
CREATE POLICY dsa_practice_sessions_user ON public.dsa_practice_sessions
  FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- ---------------------------------------------------------------
-- 5. dsa_submissions
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.dsa_submissions (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id               uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  problem_id            uuid NOT NULL REFERENCES public.dsa_problems(id) ON DELETE CASCADE,
  practice_session_id   uuid REFERENCES public.dsa_practice_sessions(id) ON DELETE SET NULL,
  language              text NOT NULL DEFAULT 'javascript'
    CHECK (language IN ('javascript', 'typescript')),
  source_code           text NOT NULL,
  -- Source code size limit enforced at application layer (64 KB)
  status                text NOT NULL DEFAULT 'queued'
    CHECK (status IN (
      'queued', 'running', 'accepted', 'wrong_answer',
      'compile_error', 'runtime_error', 'time_limit',
      'memory_limit', 'system_error'
    )),
  passed_tests          integer NOT NULL DEFAULT 0 CHECK (passed_tests >= 0),
  total_tests           integer NOT NULL DEFAULT 0 CHECK (total_tests >= 0),
  execution_time_ms     integer CHECK (execution_time_ms >= 0),
  memory_kb             integer CHECK (memory_kb >= 0),
  error_type            text,
  error_message         text,
  attempt_number        integer NOT NULL DEFAULT 1 CHECK (attempt_number >= 1),
  -- true = Run Code (public tests only), false = Submit (all tests)
  is_run_only           boolean NOT NULL DEFAULT false,
  created_at            timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS dsa_submissions_user_id_idx ON public.dsa_submissions(user_id);
CREATE INDEX IF NOT EXISTS dsa_submissions_problem_id_idx ON public.dsa_submissions(problem_id);
CREATE INDEX IF NOT EXISTS dsa_submissions_user_problem_idx ON public.dsa_submissions(user_id, problem_id);
CREATE INDEX IF NOT EXISTS dsa_submissions_session_id_idx ON public.dsa_submissions(practice_session_id);
CREATE INDEX IF NOT EXISTS dsa_submissions_status_idx ON public.dsa_submissions(user_id, status);
CREATE INDEX IF NOT EXISTS dsa_submissions_created_at_idx ON public.dsa_submissions(created_at);

ALTER TABLE public.dsa_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS dsa_submissions_user ON public.dsa_submissions;
CREATE POLICY dsa_submissions_user ON public.dsa_submissions
  FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- ---------------------------------------------------------------
-- 6. dsa_code_drafts
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.dsa_code_drafts (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  problem_id  uuid NOT NULL REFERENCES public.dsa_problems(id) ON DELETE CASCADE,
  language    text NOT NULL DEFAULT 'javascript',
  code        text NOT NULL DEFAULT '',
  updated_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, problem_id, language)
);

CREATE INDEX IF NOT EXISTS dsa_code_drafts_user_problem_idx ON public.dsa_code_drafts(user_id, problem_id);

ALTER TABLE public.dsa_code_drafts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS dsa_code_drafts_user ON public.dsa_code_drafts;
CREATE POLICY dsa_code_drafts_user ON public.dsa_code_drafts
  FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- ---------------------------------------------------------------
-- 7. Atomic verified-solve RPC
-- Called from the execution edge function (service role) only.
-- Ensures idempotent XP/achievement/mission/placement update.
-- ---------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.verify_dsa_solve(
  _user       uuid,
  _problem_id uuid,
  _submission_id uuid,
  _execution_time_ms integer DEFAULT NULL,
  _memory_kb  integer DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_problem        record;
  v_progress       record;
  v_already_solved boolean := false;
  v_xp             integer;
  v_total_solved   integer;
  v_result         jsonb := '{}'::jsonb;
BEGIN
  -- Lock the problem row for the duration of this transaction
  SELECT id, title, difficulty, xp_reward, topic_id
    INTO v_problem
    FROM dsa_problems
   WHERE id = _problem_id
     FOR SHARE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('error', 'problem_not_found');
  END IF;

  -- Check and lock current progress row
  SELECT *
    INTO v_progress
    FROM user_problem_progress
   WHERE user_id = _user AND problem_id = _problem_id
     FOR UPDATE;

  IF FOUND THEN
    v_already_solved := v_progress.solved;
  END IF;

  -- Upsert user_problem_progress
  INSERT INTO user_problem_progress (
    user_id, problem_id, solved, status,
    last_attempted, last_solved_at, first_started_at, first_solved_at,
    attempt_count, submission_count, best_execution_time_ms, best_memory_kb
  ) VALUES (
    _user, _problem_id, true, 'solved',
    now(), now(),
    COALESCE(v_progress.first_started_at, now()),
    CASE WHEN v_already_solved THEN v_progress.first_solved_at ELSE now() END,
    COALESCE(v_progress.attempt_count, 0) + 1,
    COALESCE(v_progress.submission_count, 0) + 1,
    CASE
      WHEN _execution_time_ms IS NOT NULL AND (v_progress.best_execution_time_ms IS NULL OR _execution_time_ms < v_progress.best_execution_time_ms)
        THEN _execution_time_ms
      ELSE v_progress.best_execution_time_ms
    END,
    CASE
      WHEN _memory_kb IS NOT NULL AND (v_progress.best_memory_kb IS NULL OR _memory_kb < v_progress.best_memory_kb)
        THEN _memory_kb
      ELSE v_progress.best_memory_kb
    END
  )
  ON CONFLICT (user_id, problem_id) DO UPDATE SET
    solved             = true,
    status             = 'solved',
    last_attempted     = now(),
    last_solved_at     = now(),
    first_solved_at    = CASE WHEN user_problem_progress.first_solved_at IS NULL THEN now() ELSE user_problem_progress.first_solved_at END,
    attempt_count      = user_problem_progress.attempt_count + 1,
    submission_count   = user_problem_progress.submission_count + 1,
    best_execution_time_ms = CASE
      WHEN EXCLUDED.best_execution_time_ms IS NOT NULL AND (user_problem_progress.best_execution_time_ms IS NULL OR EXCLUDED.best_execution_time_ms < user_problem_progress.best_execution_time_ms)
        THEN EXCLUDED.best_execution_time_ms
      ELSE user_problem_progress.best_execution_time_ms
    END,
    best_memory_kb     = CASE
      WHEN EXCLUDED.best_memory_kb IS NOT NULL AND (user_problem_progress.best_memory_kb IS NULL OR EXCLUDED.best_memory_kb < user_problem_progress.best_memory_kb)
        THEN EXCLUDED.best_memory_kb
      ELSE user_problem_progress.best_memory_kb
    END,
    updated_at         = now();

  -- Update topic progress
  PERFORM update_topic_progress_for_user(_user, v_problem.topic_id);

  -- Only award XP/achievements on FIRST solve (idempotency)
  IF NOT v_already_solved THEN
    v_xp := COALESCE(v_problem.xp_reward, 10);

    -- Award XP via existing RPC
    PERFORM award_xp(
      _user  => _user,
      _type  => 'dsa_solved',
      _xp    => v_xp,
      _meta  => jsonb_build_object(
        'problem_id',   v_problem.id,
        'title',        v_problem.title,
        'difficulty',   v_problem.difficulty,
        'verified',     true,
        'submission_id', _submission_id
      )
    );

    -- Count total verified solves
    SELECT COUNT(*) INTO v_total_solved
      FROM user_problem_progress
     WHERE user_id = _user AND solved = true;

    -- DSA achievements
    IF v_total_solved = 1 THEN
      INSERT INTO achievements (user_id, code)
      VALUES (_user, 'dsa_first')
      ON CONFLICT DO NOTHING;
    END IF;
    IF v_total_solved >= 10 THEN
      INSERT INTO achievements (user_id, code)
      VALUES (_user, 'dsa_10')
      ON CONFLICT DO NOTHING;
    END IF;
    IF v_total_solved >= 50 THEN
      INSERT INTO achievements (user_id, code)
      VALUES (_user, 'dsa_50')
      ON CONFLICT DO NOTHING;
    END IF;
    IF v_total_solved >= 100 THEN
      INSERT INTO achievements (user_id, code)
      VALUES (_user, 'dsa_100')
      ON CONFLICT DO NOTHING;
    END IF;
    IF v_total_solved >= 250 THEN
      INSERT INTO achievements (user_id, code)
      VALUES (_user, 'dsa_250')
      ON CONFLICT DO NOTHING;
    END IF;

    -- Mission progress: advance dsa missions
    UPDATE daily_missions
       SET progress = LEAST(progress + 1, target),
           completed = (progress + 1 >= target),
           completed_at = CASE WHEN (progress + 1 >= target) AND completed_at IS NULL THEN now() ELSE completed_at END
     WHERE user_id = _user
       AND mission_date = CURRENT_DATE::text
       AND code LIKE 'dsa%'
       AND NOT completed;

    -- Notification
    INSERT INTO notifications (user_id, title, body, type)
    VALUES (
      _user,
      'Problem Solved! 🧠',
      '+' || v_xp || ' XP — ' || v_problem.title || ' (' || v_problem.difficulty || ')',
      'dsa'
    );

    -- Recompute placement
    PERFORM recompute_placement(_user => _user);

    v_result := jsonb_build_object(
      'first_solve', true,
      'xp_awarded', v_xp,
      'total_solved', v_total_solved
    );
  ELSE
    v_result := jsonb_build_object(
      'first_solve', false,
      'xp_awarded', 0,
      'total_solved', NULL
    );
  END IF;

  RETURN v_result;
END;
$$;

-- Helper: update topic progress (extracted for reuse)
CREATE OR REPLACE FUNCTION public.update_topic_progress_for_user(_user uuid, _topic_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_total  integer;
  v_solved integer;
  v_pct    integer;
BEGIN
  SELECT COUNT(*) INTO v_total FROM dsa_problems WHERE topic_id = _topic_id;

  SELECT COUNT(*) INTO v_solved
    FROM user_problem_progress upp
    JOIN dsa_problems dp ON dp.id = upp.problem_id
   WHERE upp.user_id = _user AND upp.solved = true AND dp.topic_id = _topic_id;

  v_pct := CASE WHEN v_total > 0 THEN ROUND((v_solved::numeric / v_total) * 100) ELSE 0 END;

  INSERT INTO user_topic_progress (user_id, topic_id, completed_percent, mastery_score, last_activity)
  VALUES (_user, _topic_id, v_pct, v_pct, now())
  ON CONFLICT (user_id, topic_id) DO UPDATE SET
    completed_percent = EXCLUDED.completed_percent,
    mastery_score     = EXCLUDED.mastery_score,
    last_activity     = EXCLUDED.last_activity,
    updated_at        = now();
END;
$$;

-- ---------------------------------------------------------------
-- 8. RPC: record non-solve submission attempt (updates counts)
-- Called from edge function for wrong_answer / error results
-- ---------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.record_dsa_attempt(
  _user        uuid,
  _problem_id  uuid,
  _is_run_only boolean DEFAULT false
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF _is_run_only THEN
    -- Only increment run_count
    INSERT INTO user_problem_progress (user_id, problem_id, run_count, last_attempted, status)
    VALUES (_user, _problem_id, 1, now(), 'in_progress')
    ON CONFLICT (user_id, problem_id) DO UPDATE SET
      run_count     = user_problem_progress.run_count + 1,
      last_attempted = now(),
      first_started_at = COALESCE(user_problem_progress.first_started_at, now()),
      updated_at    = now();
  ELSE
    -- Increment attempt_count and submission_count; move to 'attempted' if not solved
    INSERT INTO user_problem_progress (
      user_id, problem_id, attempt_count, submission_count,
      last_attempted, status, first_started_at
    )
    VALUES (_user, _problem_id, 1, 1, now(), 'attempted', now())
    ON CONFLICT (user_id, problem_id) DO UPDATE SET
      attempt_count   = user_problem_progress.attempt_count + 1,
      submission_count = user_problem_progress.submission_count + 1,
      last_attempted  = now(),
      first_started_at = COALESCE(user_problem_progress.first_started_at, now()),
      status          = CASE WHEN user_problem_progress.solved THEN 'solved' ELSE 'attempted' END,
      updated_at      = now();
  END IF;
END;
$$;

-- ---------------------------------------------------------------
-- 9. Grant execute on new RPCs to authenticated users
--    (they are SECURITY DEFINER, so only executes server-side logic)
-- ---------------------------------------------------------------
-- verify_dsa_solve is called by the edge function using service role, not by users directly.
-- We do NOT grant it to 'authenticated' - it must only be called server-side.
REVOKE ALL ON FUNCTION public.verify_dsa_solve FROM PUBLIC;
REVOKE ALL ON FUNCTION public.verify_dsa_solve FROM authenticated;
GRANT EXECUTE ON FUNCTION public.verify_dsa_solve TO service_role;

-- record_dsa_attempt is also called by edge function (service role)
REVOKE ALL ON FUNCTION public.record_dsa_attempt FROM PUBLIC;
REVOKE ALL ON FUNCTION public.record_dsa_attempt FROM authenticated;
GRANT EXECUTE ON FUNCTION public.record_dsa_attempt TO service_role;

-- update_topic_progress_for_user is internal, called from verify_dsa_solve
REVOKE ALL ON FUNCTION public.update_topic_progress_for_user FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.update_topic_progress_for_user TO service_role;
