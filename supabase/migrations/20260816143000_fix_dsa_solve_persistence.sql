-- ================================================================
-- Fix DSA Verified Solve Persistence & State Synchronization
-- ================================================================

-- 1. Deduplicate user_problem_progress if any duplicate (user_id, problem_id) rows exist
DELETE FROM public.user_problem_progress a
USING public.user_problem_progress b
WHERE a.id < b.id
  AND a.user_id = b.user_id
  AND a.problem_id = b.problem_id;

-- 2. Add Unique Constraint on (user_id, problem_id) if not present
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'user_problem_progress_user_id_problem_id_key'
  ) THEN
    ALTER TABLE public.user_problem_progress
      ADD CONSTRAINT user_problem_progress_user_id_problem_id_key UNIQUE (user_id, problem_id);
  END IF;
END $$;

-- 3. Unique index safeguard
CREATE UNIQUE INDEX IF NOT EXISTS user_problem_progress_user_problem_idx
  ON public.user_problem_progress (user_id, problem_id);

-- 4. Extend / Replace verify_dsa_solve RPC
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
  v_xp             integer := 10;
  v_total_solved   integer := 0;
  v_result         jsonb := '{}'::jsonb;
BEGIN
  -- Lock the problem row
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
    v_already_solved := COALESCE(v_progress.solved, false);
  END IF;

  -- Atomic Upsert user_problem_progress
  INSERT INTO user_problem_progress (
    user_id, problem_id, solved, status,
    last_attempted, last_solved_at, first_started_at, first_solved_at,
    attempt_count, submission_count, run_count, best_execution_time_ms, best_memory_kb,
    updated_at
  ) VALUES (
    _user, _problem_id, true, 'solved',
    now(), now(),
    COALESCE(v_progress.first_started_at, now()),
    CASE WHEN v_already_solved AND v_progress.first_solved_at IS NOT NULL THEN v_progress.first_solved_at ELSE now() END,
    COALESCE(v_progress.attempt_count, 0) + 1,
    COALESCE(v_progress.submission_count, 0) + 1,
    COALESCE(v_progress.run_count, 0),
    CASE
      WHEN _execution_time_ms IS NOT NULL AND (v_progress.best_execution_time_ms IS NULL OR _execution_time_ms < v_progress.best_execution_time_ms)
        THEN _execution_time_ms
      ELSE v_progress.best_execution_time_ms
    END,
    CASE
      WHEN _memory_kb IS NOT NULL AND (v_progress.best_memory_kb IS NULL OR _memory_kb < v_progress.best_memory_kb)
        THEN _memory_kb
      ELSE v_progress.best_memory_kb
    END,
    now()
  )
  ON CONFLICT (user_id, problem_id) DO UPDATE SET
    solved             = true,
    status             = 'solved',
    last_attempted     = now(),
    last_solved_at     = now(),
    first_solved_at    = CASE WHEN user_problem_progress.first_solved_at IS NULL THEN now() ELSE user_problem_progress.first_solved_at END,
    attempt_count      = COALESCE(user_problem_progress.attempt_count, 0) + 1,
    submission_count   = COALESCE(user_problem_progress.submission_count, 0) + 1,
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

    -- Award XP via existing RPC if available
    BEGIN
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
    EXCEPTION WHEN OTHERS THEN
      -- Ignore award_xp exceptions if helper RPC fails
    END;

    -- Count total verified solves for user
    SELECT COUNT(DISTINCT problem_id) INTO v_total_solved
      FROM user_problem_progress
     WHERE user_id = _user AND (solved = true OR status = 'solved');

    -- DSA achievements
    IF v_total_solved >= 1 THEN
      INSERT INTO achievements (user_id, code) VALUES (_user, 'dsa_first') ON CONFLICT DO NOTHING;
    END IF;
    IF v_total_solved >= 10 THEN
      INSERT INTO achievements (user_id, code) VALUES (_user, 'dsa_10') ON CONFLICT DO NOTHING;
    END IF;
    IF v_total_solved >= 50 THEN
      INSERT INTO achievements (user_id, code) VALUES (_user, 'dsa_50') ON CONFLICT DO NOTHING;
    END IF;
    IF v_total_solved >= 100 THEN
      INSERT INTO achievements (user_id, code) VALUES (_user, 'dsa_100') ON CONFLICT DO NOTHING;
    END IF;
    IF v_total_solved >= 250 THEN
      INSERT INTO achievements (user_id, code) VALUES (_user, 'dsa_250') ON CONFLICT DO NOTHING;
    END IF;

    -- Notification
    BEGIN
      INSERT INTO notifications (user_id, title, body, type)
      VALUES (
        _user,
        'Problem Solved! 🧠',
        '+' || v_xp || ' XP — ' || v_problem.title || ' (' || v_problem.difficulty || ')',
        'dsa'
      );
    EXCEPTION WHEN OTHERS THEN
      -- Ignore notification error if table missing
    END;

    v_result := jsonb_build_object(
      'success', true,
      'solved', true,
      'first_solve', true,
      'xp_awarded', v_xp,
      'total_solved', v_total_solved
    );
  ELSE
    SELECT COUNT(DISTINCT problem_id) INTO v_total_solved
      FROM user_problem_progress
     WHERE user_id = _user AND (solved = true OR status = 'solved');

    v_result := jsonb_build_object(
      'success', true,
      'solved', true,
      'first_solve', false,
      'xp_awarded', 0,
      'total_solved', v_total_solved
    );
  END IF;

  RETURN v_result;
END;
$$;

-- 5. Automatic Safe Backfill & Reconciliation Query for existing verified solves (e.g. Two Sum)
-- If a user has an accepted non-run-only submission in dsa_submissions, create/update user_problem_progress.
DO $$
DECLARE
  rec RECORD;
BEGIN
  FOR rec IN
    SELECT DISTINCT ON (user_id, problem_id)
           user_id,
           problem_id,
           created_at,
           execution_time_ms
      FROM public.dsa_submissions
     WHERE status = 'accepted'
       AND is_run_only = false
     ORDER BY user_id, problem_id, created_at ASC
  LOOP
    INSERT INTO public.user_problem_progress (
      user_id,
      problem_id,
      solved,
      status,
      first_started_at,
      first_solved_at,
      last_solved_at,
      last_attempted,
      submission_count,
      best_execution_time_ms,
      updated_at
    ) VALUES (
      rec.user_id,
      rec.problem_id,
      true,
      'solved',
      rec.created_at,
      rec.created_at,
      rec.created_at,
      rec.created_at,
      1,
      rec.execution_time_ms,
      now()
    )
    ON CONFLICT (user_id, problem_id) DO UPDATE SET
      solved          = true,
      status          = 'solved',
      last_solved_at  = COALESCE(user_problem_progress.last_solved_at, rec.created_at),
      first_solved_at = COALESCE(user_problem_progress.first_solved_at, rec.created_at),
      updated_at      = now();

    -- Also finalize associated practice session if any
    UPDATE public.dsa_practice_sessions
       SET final_status = 'solved',
           ended_at = COALESCE(ended_at, rec.created_at)
     WHERE user_id = rec.user_id
       AND problem_id = rec.problem_id
       AND final_status <> 'solved';
  END LOOP;
END $$;
