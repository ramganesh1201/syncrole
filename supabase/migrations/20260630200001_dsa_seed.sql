-- Seed data for DSA expansion

DO $$
DECLARE
  tid uuid;
  cid uuid;
BEGIN

  INSERT INTO public.dsa_topics (name, difficulty, display_order, estimated_hours, prerequisite_topics, interview_frequency, importance_score, theory_summary, common_interview_tricks)
  VALUES ('Arrays', 'easy', 10, 10, ARRAY[], 'high', 10, 'Arrays are contiguous blocks of memory...', 'Watch out for OOB.')
  ON CONFLICT DO NOTHING;

  INSERT INTO public.dsa_topics (name, difficulty, display_order, estimated_hours, prerequisite_topics, interview_frequency, importance_score, theory_summary, common_interview_tricks)
  VALUES ('Strings', 'easy', 20, 8, ARRAY['Arrays'], 'high', 9, 'Strings are character arrays...', 'Understand character encodings.')
  ON CONFLICT DO NOTHING;

  INSERT INTO public.dsa_topics (name, difficulty, display_order, estimated_hours, prerequisite_topics, interview_frequency, importance_score, theory_summary, common_interview_tricks)
  VALUES ('Hash Tables', 'easy', 30, 8, ARRAY['Arrays'], 'high', 10, 'O(1) lookups via hashing.', 'Collision resolution.')
  ON CONFLICT DO NOTHING;

  INSERT INTO public.dsa_topics (name, difficulty, display_order, estimated_hours, prerequisite_topics, interview_frequency, importance_score, theory_summary, common_interview_tricks)
  VALUES ('Two Pointers', 'medium', 40, 12, ARRAY['Arrays'], 'high', 9, 'Iterating with two pointers.', 'Sorting usually helps.')
  ON CONFLICT DO NOTHING;

  INSERT INTO public.dsa_topics (name, difficulty, display_order, estimated_hours, prerequisite_topics, interview_frequency, importance_score, theory_summary, common_interview_tricks)
  VALUES ('Sliding Window', 'medium', 50, 15, ARRAY['Arrays','Two Pointers'], 'high', 9, 'Dynamic or fixed size window.', 'Identify the shrinking condition.')
  ON CONFLICT DO NOTHING;

  INSERT INTO public.dsa_topics (name, difficulty, display_order, estimated_hours, prerequisite_topics, interview_frequency, importance_score, theory_summary, common_interview_tricks)
  VALUES ('Prefix Sum', 'medium', 60, 8, ARRAY['Arrays'], 'medium', 7, 'Precomputing sums.', 'Handle the base case index 0.')
  ON CONFLICT DO NOTHING;

  INSERT INTO public.dsa_topics (name, difficulty, display_order, estimated_hours, prerequisite_topics, interview_frequency, importance_score, theory_summary, common_interview_tricks)
  VALUES ('Binary Search', 'medium', 70, 12, ARRAY['Arrays'], 'high', 10, 'O(log N) search on sorted data.', 'Be careful with low <= high bounds.')
  ON CONFLICT DO NOTHING;

  INSERT INTO public.dsa_topics (name, difficulty, display_order, estimated_hours, prerequisite_topics, interview_frequency, importance_score, theory_summary, common_interview_tricks)
  VALUES ('Sorting', 'medium', 80, 10, ARRAY['Arrays'], 'medium', 6, 'Merge, Quick, Heap, Bubble.', 'Know the time complexities.')
  ON CONFLICT DO NOTHING;

  INSERT INTO public.dsa_topics (name, difficulty, display_order, estimated_hours, prerequisite_topics, interview_frequency, importance_score, theory_summary, common_interview_tricks)
  VALUES ('Recursion', 'medium', 90, 10, ARRAY[], 'high', 9, 'Function calling itself.', 'Always have a base case.')
  ON CONFLICT DO NOTHING;

  INSERT INTO public.dsa_topics (name, difficulty, display_order, estimated_hours, prerequisite_topics, interview_frequency, importance_score, theory_summary, common_interview_tricks)
  VALUES ('Backtracking', 'medium', 100, 15, ARRAY['Recursion'], 'high', 9, 'Explore all paths, prune invalid ones.', 'Undo state after recursive call.')
  ON CONFLICT DO NOTHING;

  INSERT INTO public.dsa_topics (name, difficulty, display_order, estimated_hours, prerequisite_topics, interview_frequency, importance_score, theory_summary, common_interview_tricks)
  VALUES ('Stack', 'easy', 110, 8, ARRAY[], 'medium', 8, 'LIFO data structure.', 'Useful for parsing.')
  ON CONFLICT DO NOTHING;

  INSERT INTO public.dsa_topics (name, difficulty, display_order, estimated_hours, prerequisite_topics, interview_frequency, importance_score, theory_summary, common_interview_tricks)
  VALUES ('Queue', 'easy', 120, 6, ARRAY[], 'medium', 7, 'FIFO data structure.', 'Useful for BFS.')
  ON CONFLICT DO NOTHING;

  INSERT INTO public.dsa_topics (name, difficulty, display_order, estimated_hours, prerequisite_topics, interview_frequency, importance_score, theory_summary, common_interview_tricks)
  VALUES ('Linked List', 'easy', 130, 10, ARRAY[], 'high', 8, 'Nodes pointing to next.', 'Use dummy heads.')
  ON CONFLICT DO NOTHING;

  INSERT INTO public.dsa_topics (name, difficulty, display_order, estimated_hours, prerequisite_topics, interview_frequency, importance_score, theory_summary, common_interview_tricks)
  VALUES ('Fast & Slow Pointer', 'medium', 140, 8, ARRAY['Linked List'], 'high', 8, 'Cycle detection.', 'Floyd''s algorithm.')
  ON CONFLICT DO NOTHING;

  INSERT INTO public.dsa_topics (name, difficulty, display_order, estimated_hours, prerequisite_topics, interview_frequency, importance_score, theory_summary, common_interview_tricks)
  VALUES ('Monotonic Stack', 'hard', 150, 10, ARRAY['Stack'], 'medium', 7, 'Stack that maintains ordering.', 'Next Greater Element.')
  ON CONFLICT DO NOTHING;

  INSERT INTO public.dsa_topics (name, difficulty, display_order, estimated_hours, prerequisite_topics, interview_frequency, importance_score, theory_summary, common_interview_tricks)
  VALUES ('Heap / Priority Queue', 'medium', 160, 12, ARRAY['Trees'], 'high', 9, 'Min-Heap and Max-Heap.', 'Top K problems.')
  ON CONFLICT DO NOTHING;

  INSERT INTO public.dsa_topics (name, difficulty, display_order, estimated_hours, prerequisite_topics, interview_frequency, importance_score, theory_summary, common_interview_tricks)
  VALUES ('Binary Tree', 'easy', 170, 12, ARRAY['Recursion'], 'high', 10, 'Tree with at most 2 children.', 'Traversal techniques.')
  ON CONFLICT DO NOTHING;

  INSERT INTO public.dsa_topics (name, difficulty, display_order, estimated_hours, prerequisite_topics, interview_frequency, importance_score, theory_summary, common_interview_tricks)
  VALUES ('Binary Search Tree', 'medium', 180, 10, ARRAY['Binary Tree'], 'high', 8, 'Left < Node < Right.', 'Inorder traversal gives sorted data.')
  ON CONFLICT DO NOTHING;

  INSERT INTO public.dsa_topics (name, difficulty, display_order, estimated_hours, prerequisite_topics, interview_frequency, importance_score, theory_summary, common_interview_tricks)
  VALUES ('Trie', 'hard', 190, 12, ARRAY['Trees','Strings'], 'medium', 7, 'Prefix tree.', 'Store end of word marker.')
  ON CONFLICT DO NOTHING;

  INSERT INTO public.dsa_topics (name, difficulty, display_order, estimated_hours, prerequisite_topics, interview_frequency, importance_score, theory_summary, common_interview_tricks)
  VALUES ('Graphs', 'medium', 200, 15, ARRAY['Trees','Hash Tables'], 'high', 10, 'Nodes and edges.', 'Adjacency list representation.')
  ON CONFLICT DO NOTHING;

  INSERT INTO public.dsa_topics (name, difficulty, display_order, estimated_hours, prerequisite_topics, interview_frequency, importance_score, theory_summary, common_interview_tricks)
  VALUES ('DFS', 'medium', 210, 10, ARRAY['Graphs','Recursion'], 'high', 10, 'Depth First Search.', 'Mark visited nodes.')
  ON CONFLICT DO NOTHING;

  INSERT INTO public.dsa_topics (name, difficulty, display_order, estimated_hours, prerequisite_topics, interview_frequency, importance_score, theory_summary, common_interview_tricks)
  VALUES ('BFS', 'medium', 220, 10, ARRAY['Graphs','Queue'], 'high', 10, 'Breadth First Search.', 'Shortest path in unweighted graphs.')
  ON CONFLICT DO NOTHING;

  INSERT INTO public.dsa_topics (name, difficulty, display_order, estimated_hours, prerequisite_topics, interview_frequency, importance_score, theory_summary, common_interview_tricks)
  VALUES ('Topological Sort', 'medium', 230, 8, ARRAY['Graphs','DFS','BFS'], 'medium', 7, 'Ordering of directed acyclic graph.', 'In-degree array (Kahn''s algorithm).')
  ON CONFLICT DO NOTHING;

  INSERT INTO public.dsa_topics (name, difficulty, display_order, estimated_hours, prerequisite_topics, interview_frequency, importance_score, theory_summary, common_interview_tricks)
  VALUES ('Shortest Path', 'hard', 240, 12, ARRAY['Graphs','Heap / Priority Queue'], 'medium', 8, 'Dijkstra, Bellman-Ford.', 'Dijkstra for non-negative weights.')
  ON CONFLICT DO NOTHING;

  INSERT INTO public.dsa_topics (name, difficulty, display_order, estimated_hours, prerequisite_topics, interview_frequency, importance_score, theory_summary, common_interview_tricks)
  VALUES ('Union Find (DSU)', 'medium', 250, 10, ARRAY['Graphs'], 'high', 8, 'Disjoint Set Union.', 'Path compression and union by rank.')
  ON CONFLICT DO NOTHING;

  INSERT INTO public.dsa_topics (name, difficulty, display_order, estimated_hours, prerequisite_topics, interview_frequency, importance_score, theory_summary, common_interview_tricks)
  VALUES ('1D DP', 'medium', 260, 15, ARRAY['Recursion','Memoization'], 'high', 10, 'Dynamic Programming on 1D arrays.', 'Identify state and transition.')
  ON CONFLICT DO NOTHING;

  INSERT INTO public.dsa_topics (name, difficulty, display_order, estimated_hours, prerequisite_topics, interview_frequency, importance_score, theory_summary, common_interview_tricks)
  VALUES ('2D DP', 'hard', 270, 20, ARRAY['1D DP'], 'high', 9, 'Dynamic Programming on grids/matrices.', 'Knapsack, LCS.')
  ON CONFLICT DO NOTHING;

  INSERT INTO public.dsa_topics (name, difficulty, display_order, estimated_hours, prerequisite_topics, interview_frequency, importance_score, theory_summary, common_interview_tricks)
  VALUES ('Bit Manipulation', 'easy', 280, 8, ARRAY[], 'medium', 6, 'AND, OR, XOR, Shifts.', 'XOR of same number is 0.')
  ON CONFLICT DO NOTHING;

  INSERT INTO public.dsa_topics (name, difficulty, display_order, estimated_hours, prerequisite_topics, interview_frequency, importance_score, theory_summary, common_interview_tricks)
  VALUES ('Math / Geometry', 'medium', 290, 10, ARRAY[], 'low', 5, 'Prime numbers, GCD, combinations.', 'Modular arithmetic.')
  ON CONFLICT DO NOTHING;

  INSERT INTO public.company_question_sets (company_name, interview_difficulty, oa_difficulty, hiring_frequency, recommended_preparation_order, question_count)
  VALUES ('Google', 'hard', 'hard', 'high', 10, 300)
  ON CONFLICT DO NOTHING;

  INSERT INTO public.company_question_sets (company_name, interview_difficulty, oa_difficulty, hiring_frequency, recommended_preparation_order, question_count)
  VALUES ('Amazon', 'medium', 'medium', 'high', 20, 400)
  ON CONFLICT DO NOTHING;

  INSERT INTO public.company_question_sets (company_name, interview_difficulty, oa_difficulty, hiring_frequency, recommended_preparation_order, question_count)
  VALUES ('Meta', 'medium', 'medium', 'high', 30, 250)
  ON CONFLICT DO NOTHING;

  INSERT INTO public.company_question_sets (company_name, interview_difficulty, oa_difficulty, hiring_frequency, recommended_preparation_order, question_count)
  VALUES ('Microsoft', 'medium', 'medium', 'high', 40, 350)
  ON CONFLICT DO NOTHING;

  INSERT INTO public.company_question_sets (company_name, interview_difficulty, oa_difficulty, hiring_frequency, recommended_preparation_order, question_count)
  VALUES ('Apple', 'medium', 'medium', 'medium', 50, 200)
  ON CONFLICT DO NOTHING;

  INSERT INTO public.company_question_sets (company_name, interview_difficulty, oa_difficulty, hiring_frequency, recommended_preparation_order, question_count)
  VALUES ('Netflix', 'hard', 'hard', 'low', 60, 100)
  ON CONFLICT DO NOTHING;

  INSERT INTO public.company_question_sets (company_name, interview_difficulty, oa_difficulty, hiring_frequency, recommended_preparation_order, question_count)
  VALUES ('Uber', 'hard', 'hard', 'medium', 70, 150)
  ON CONFLICT DO NOTHING;

  INSERT INTO public.company_question_sets (company_name, interview_difficulty, oa_difficulty, hiring_frequency, recommended_preparation_order, question_count)
  VALUES ('Airbnb', 'hard', 'hard', 'low', 80, 120)
  ON CONFLICT DO NOTHING;

  INSERT INTO public.company_question_sets (company_name, interview_difficulty, oa_difficulty, hiring_frequency, recommended_preparation_order, question_count)
  VALUES ('Stripe', 'hard', 'hard', 'medium', 90, 150)
  ON CONFLICT DO NOTHING;

  INSERT INTO public.company_question_sets (company_name, interview_difficulty, oa_difficulty, hiring_frequency, recommended_preparation_order, question_count)
  VALUES ('LinkedIn', 'medium', 'medium', 'medium', 100, 180)
  ON CONFLICT DO NOTHING;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Arrays' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Arrays Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/arrays-1', 'Fundamentals', 67, 83, 20, 'Arrays', ARRAY['Interview','Algorithm'], 1, true, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Arrays' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Arrays Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/arrays-2', 'Fundamentals', 68, 56, 30, 'Arrays', ARRAY['Interview','Algorithm'], 2, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Arrays' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Arrays Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/arrays-3', 'Fundamentals', 20, 62, 40, 'Arrays', ARRAY['Interview','Algorithm'], 3, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Arrays' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Arrays Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/arrays-4', 'Fundamentals', 30, 84, 50, 'Arrays', ARRAY['Interview','Algorithm'], 4, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Arrays' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Arrays Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/arrays-5', 'Fundamentals', 75, 54, 60, 'Arrays', ARRAY['Interview','Algorithm'], 5, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Strings' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Strings Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/strings-1', 'Fundamentals', 25, 66, 20, 'Strings', ARRAY['Interview','Algorithm'], 11, true, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Strings' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Strings Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/strings-2', 'Fundamentals', 63, 39, 30, 'Strings', ARRAY['Interview','Algorithm'], 12, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Strings' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Strings Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/strings-3', 'Fundamentals', 3, 49, 40, 'Strings', ARRAY['Interview','Algorithm'], 13, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Strings' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Strings Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/strings-4', 'Fundamentals', 47, 60, 50, 'Strings', ARRAY['Interview','Algorithm'], 14, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Strings' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Strings Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/strings-5', 'Fundamentals', 61, 63, 60, 'Strings', ARRAY['Interview','Algorithm'], 15, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Hash Tables' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Hash Tables Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/hash-tables-1', 'Fundamentals', 85, 77, 20, 'Hash Tables', ARRAY['Interview','Algorithm'], 21, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Hash Tables' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Hash Tables Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/hash-tables-2', 'Fundamentals', 55, 55, 30, 'Hash Tables', ARRAY['Interview','Algorithm'], 22, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Hash Tables' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Hash Tables Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/hash-tables-3', 'Fundamentals', 11, 45, 40, 'Hash Tables', ARRAY['Interview','Algorithm'], 23, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Hash Tables' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Hash Tables Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/hash-tables-4', 'Fundamentals', 60, 74, 50, 'Hash Tables', ARRAY['Interview','Algorithm'], 24, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Hash Tables' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Hash Tables Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/hash-tables-5', 'Fundamentals', 76, 69, 60, 'Hash Tables', ARRAY['Interview','Algorithm'], 25, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Two Pointers' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Two Pointers Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/two-pointers-1', 'Fundamentals', 90, 55, 20, 'Two Pointers', ARRAY['Interview','Algorithm'], 31, true, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Two Pointers' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Two Pointers Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/two-pointers-2', 'Fundamentals', 54, 57, 30, 'Two Pointers', ARRAY['Interview','Algorithm'], 32, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Two Pointers' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Two Pointers Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/two-pointers-3', 'Fundamentals', 60, 57, 40, 'Two Pointers', ARRAY['Interview','Algorithm'], 33, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Two Pointers' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Two Pointers Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/two-pointers-4', 'Fundamentals', 64, 76, 50, 'Two Pointers', ARRAY['Interview','Algorithm'], 34, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Two Pointers' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Two Pointers Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/two-pointers-5', 'Fundamentals', 2, 60, 60, 'Two Pointers', ARRAY['Interview','Algorithm'], 35, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Sliding Window' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Sliding Window Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/sliding-window-1', 'Fundamentals', 1, 87, 20, 'Sliding Window', ARRAY['Interview','Algorithm'], 41, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Sliding Window' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Sliding Window Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/sliding-window-2', 'Fundamentals', 83, 60, 30, 'Sliding Window', ARRAY['Interview','Algorithm'], 42, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Sliding Window' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Sliding Window Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/sliding-window-3', 'Fundamentals', 13, 50, 40, 'Sliding Window', ARRAY['Interview','Algorithm'], 43, true, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Sliding Window' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Sliding Window Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/sliding-window-4', 'Fundamentals', 36, 66, 50, 'Sliding Window', ARRAY['Interview','Algorithm'], 44, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Sliding Window' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Sliding Window Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/sliding-window-5', 'Fundamentals', 96, 39, 60, 'Sliding Window', ARRAY['Interview','Algorithm'], 45, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Prefix Sum' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Prefix Sum Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/prefix-sum-1', 'Fundamentals', 14, 71, 20, 'Prefix Sum', ARRAY['Interview','Algorithm'], 51, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Prefix Sum' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Prefix Sum Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/prefix-sum-2', 'Fundamentals', 54, 54, 30, 'Prefix Sum', ARRAY['Interview','Algorithm'], 52, true, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Prefix Sum' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Prefix Sum Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/prefix-sum-3', 'Fundamentals', 6, 37, 40, 'Prefix Sum', ARRAY['Interview','Algorithm'], 53, true, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Prefix Sum' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Prefix Sum Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/prefix-sum-4', 'Fundamentals', 87, 31, 50, 'Prefix Sum', ARRAY['Interview','Algorithm'], 54, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Prefix Sum' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Prefix Sum Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/prefix-sum-5', 'Fundamentals', 80, 69, 60, 'Prefix Sum', ARRAY['Interview','Algorithm'], 55, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Binary Search' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Binary Search Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/binary-search-1', 'Fundamentals', 98, 56, 20, 'Binary Search', ARRAY['Interview','Algorithm'], 61, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Binary Search' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Binary Search Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/binary-search-2', 'Fundamentals', 73, 87, 30, 'Binary Search', ARRAY['Interview','Algorithm'], 62, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Binary Search' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Binary Search Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/binary-search-3', 'Fundamentals', 27, 60, 40, 'Binary Search', ARRAY['Interview','Algorithm'], 63, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Binary Search' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Binary Search Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/binary-search-4', 'Fundamentals', 97, 70, 50, 'Binary Search', ARRAY['Interview','Algorithm'], 64, true, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Binary Search' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Binary Search Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/binary-search-5', 'Fundamentals', 50, 57, 60, 'Binary Search', ARRAY['Interview','Algorithm'], 65, true, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Sorting' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Sorting Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/sorting-1', 'Fundamentals', 88, 54, 20, 'Sorting', ARRAY['Interview','Algorithm'], 71, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Sorting' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Sorting Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/sorting-2', 'Fundamentals', 17, 67, 30, 'Sorting', ARRAY['Interview','Algorithm'], 72, true, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Sorting' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Sorting Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/sorting-3', 'Fundamentals', 60, 69, 40, 'Sorting', ARRAY['Interview','Algorithm'], 73, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Sorting' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Sorting Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/sorting-4', 'Fundamentals', 28, 44, 50, 'Sorting', ARRAY['Interview','Algorithm'], 74, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Sorting' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Sorting Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/sorting-5', 'Fundamentals', 28, 76, 60, 'Sorting', ARRAY['Interview','Algorithm'], 75, true, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Recursion' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Recursion Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/recursion-1', 'Fundamentals', 91, 89, 20, 'Recursion', ARRAY['Interview','Algorithm'], 81, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Recursion' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Recursion Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/recursion-2', 'Fundamentals', 8, 64, 30, 'Recursion', ARRAY['Interview','Algorithm'], 82, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Recursion' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Recursion Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/recursion-3', 'Fundamentals', 90, 58, 40, 'Recursion', ARRAY['Interview','Algorithm'], 83, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Recursion' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Recursion Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/recursion-4', 'Fundamentals', 63, 67, 50, 'Recursion', ARRAY['Interview','Algorithm'], 84, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Recursion' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Recursion Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/recursion-5', 'Fundamentals', 67, 54, 60, 'Recursion', ARRAY['Interview','Algorithm'], 85, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Backtracking' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Backtracking Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/backtracking-1', 'Fundamentals', 44, 71, 20, 'Backtracking', ARRAY['Interview','Algorithm'], 91, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Backtracking' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Backtracking Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/backtracking-2', 'Fundamentals', 36, 39, 30, 'Backtracking', ARRAY['Interview','Algorithm'], 92, true, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Backtracking' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Backtracking Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/backtracking-3', 'Fundamentals', 82, 49, 40, 'Backtracking', ARRAY['Interview','Algorithm'], 93, true, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Backtracking' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Backtracking Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/backtracking-4', 'Fundamentals', 86, 69, 50, 'Backtracking', ARRAY['Interview','Algorithm'], 94, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Backtracking' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Backtracking Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/backtracking-5', 'Fundamentals', 19, 42, 60, 'Backtracking', ARRAY['Interview','Algorithm'], 95, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Stack' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Stack Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/stack-1', 'Fundamentals', 95, 87, 20, 'Stack', ARRAY['Interview','Algorithm'], 101, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Stack' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Stack Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/stack-2', 'Fundamentals', 15, 36, 30, 'Stack', ARRAY['Interview','Algorithm'], 102, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Stack' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Stack Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/stack-3', 'Fundamentals', 41, 54, 40, 'Stack', ARRAY['Interview','Algorithm'], 103, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Stack' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Stack Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/stack-4', 'Fundamentals', 81, 83, 50, 'Stack', ARRAY['Interview','Algorithm'], 104, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Stack' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Stack Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/stack-5', 'Fundamentals', 33, 67, 60, 'Stack', ARRAY['Interview','Algorithm'], 105, true, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Queue' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Queue Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/queue-1', 'Fundamentals', 72, 87, 20, 'Queue', ARRAY['Interview','Algorithm'], 111, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Queue' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Queue Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/queue-2', 'Fundamentals', 60, 72, 30, 'Queue', ARRAY['Interview','Algorithm'], 112, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Queue' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Queue Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/queue-3', 'Fundamentals', 36, 38, 40, 'Queue', ARRAY['Interview','Algorithm'], 113, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Queue' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Queue Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/queue-4', 'Fundamentals', 62, 57, 50, 'Queue', ARRAY['Interview','Algorithm'], 114, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Queue' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Queue Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/queue-5', 'Fundamentals', 29, 75, 60, 'Queue', ARRAY['Interview','Algorithm'], 115, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Linked List' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Linked List Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/linked-list-1', 'Fundamentals', 45, 30, 20, 'Linked List', ARRAY['Interview','Algorithm'], 121, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Linked List' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Linked List Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/linked-list-2', 'Fundamentals', 99, 31, 30, 'Linked List', ARRAY['Interview','Algorithm'], 122, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Linked List' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Linked List Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/linked-list-3', 'Fundamentals', 31, 88, 40, 'Linked List', ARRAY['Interview','Algorithm'], 123, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Linked List' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Linked List Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/linked-list-4', 'Fundamentals', 24, 85, 50, 'Linked List', ARRAY['Interview','Algorithm'], 124, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Linked List' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Linked List Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/linked-list-5', 'Fundamentals', 47, 77, 60, 'Linked List', ARRAY['Interview','Algorithm'], 125, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Fast & Slow Pointer' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Fast & Slow Pointer Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/fast-&-slow-pointer-1', 'Fundamentals', 86, 89, 20, 'Fast & Slow Pointer', ARRAY['Interview','Algorithm'], 131, true, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Fast & Slow Pointer' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Fast & Slow Pointer Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/fast-&-slow-pointer-2', 'Fundamentals', 87, 76, 30, 'Fast & Slow Pointer', ARRAY['Interview','Algorithm'], 132, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Fast & Slow Pointer' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Fast & Slow Pointer Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/fast-&-slow-pointer-3', 'Fundamentals', 49, 65, 40, 'Fast & Slow Pointer', ARRAY['Interview','Algorithm'], 133, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Fast & Slow Pointer' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Fast & Slow Pointer Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/fast-&-slow-pointer-4', 'Fundamentals', 18, 39, 50, 'Fast & Slow Pointer', ARRAY['Interview','Algorithm'], 134, true, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Fast & Slow Pointer' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Fast & Slow Pointer Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/fast-&-slow-pointer-5', 'Fundamentals', 19, 53, 60, 'Fast & Slow Pointer', ARRAY['Interview','Algorithm'], 135, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Monotonic Stack' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Monotonic Stack Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/monotonic-stack-1', 'Fundamentals', 36, 48, 20, 'Monotonic Stack', ARRAY['Interview','Algorithm'], 141, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Monotonic Stack' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Monotonic Stack Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/monotonic-stack-2', 'Fundamentals', 45, 43, 30, 'Monotonic Stack', ARRAY['Interview','Algorithm'], 142, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Monotonic Stack' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Monotonic Stack Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/monotonic-stack-3', 'Fundamentals', 13, 51, 40, 'Monotonic Stack', ARRAY['Interview','Algorithm'], 143, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Monotonic Stack' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Monotonic Stack Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/monotonic-stack-4', 'Fundamentals', 56, 43, 50, 'Monotonic Stack', ARRAY['Interview','Algorithm'], 144, true, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Monotonic Stack' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Monotonic Stack Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/monotonic-stack-5', 'Fundamentals', 42, 41, 60, 'Monotonic Stack', ARRAY['Interview','Algorithm'], 145, true, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Heap / Priority Queue' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Heap / Priority Queue Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/heap-/-priority-queue-1', 'Fundamentals', 14, 63, 20, 'Heap / Priority Queue', ARRAY['Interview','Algorithm'], 151, true, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Heap / Priority Queue' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Heap / Priority Queue Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/heap-/-priority-queue-2', 'Fundamentals', 99, 35, 30, 'Heap / Priority Queue', ARRAY['Interview','Algorithm'], 152, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Heap / Priority Queue' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Heap / Priority Queue Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/heap-/-priority-queue-3', 'Fundamentals', 86, 72, 40, 'Heap / Priority Queue', ARRAY['Interview','Algorithm'], 153, true, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Heap / Priority Queue' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Heap / Priority Queue Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/heap-/-priority-queue-4', 'Fundamentals', 2, 55, 50, 'Heap / Priority Queue', ARRAY['Interview','Algorithm'], 154, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Heap / Priority Queue' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Heap / Priority Queue Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/heap-/-priority-queue-5', 'Fundamentals', 96, 32, 60, 'Heap / Priority Queue', ARRAY['Interview','Algorithm'], 155, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Binary Tree' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Binary Tree Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/binary-tree-1', 'Fundamentals', 11, 60, 20, 'Binary Tree', ARRAY['Interview','Algorithm'], 161, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Binary Tree' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Binary Tree Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/binary-tree-2', 'Fundamentals', 97, 73, 30, 'Binary Tree', ARRAY['Interview','Algorithm'], 162, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Binary Tree' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Binary Tree Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/binary-tree-3', 'Fundamentals', 47, 68, 40, 'Binary Tree', ARRAY['Interview','Algorithm'], 163, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Binary Tree' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Binary Tree Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/binary-tree-4', 'Fundamentals', 62, 59, 50, 'Binary Tree', ARRAY['Interview','Algorithm'], 164, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Binary Tree' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Binary Tree Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/binary-tree-5', 'Fundamentals', 58, 68, 60, 'Binary Tree', ARRAY['Interview','Algorithm'], 165, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Binary Search Tree' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Binary Search Tree Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/binary-search-tree-1', 'Fundamentals', 77, 39, 20, 'Binary Search Tree', ARRAY['Interview','Algorithm'], 171, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Binary Search Tree' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Binary Search Tree Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/binary-search-tree-2', 'Fundamentals', 45, 53, 30, 'Binary Search Tree', ARRAY['Interview','Algorithm'], 172, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Binary Search Tree' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Binary Search Tree Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/binary-search-tree-3', 'Fundamentals', 17, 55, 40, 'Binary Search Tree', ARRAY['Interview','Algorithm'], 173, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Binary Search Tree' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Binary Search Tree Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/binary-search-tree-4', 'Fundamentals', 60, 33, 50, 'Binary Search Tree', ARRAY['Interview','Algorithm'], 174, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Binary Search Tree' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Binary Search Tree Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/binary-search-tree-5', 'Fundamentals', 85, 59, 60, 'Binary Search Tree', ARRAY['Interview','Algorithm'], 175, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Trie' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Trie Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/trie-1', 'Fundamentals', 78, 48, 20, 'Trie', ARRAY['Interview','Algorithm'], 181, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Trie' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Trie Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/trie-2', 'Fundamentals', 15, 77, 30, 'Trie', ARRAY['Interview','Algorithm'], 182, true, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Trie' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Trie Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/trie-3', 'Fundamentals', 2, 88, 40, 'Trie', ARRAY['Interview','Algorithm'], 183, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Trie' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Trie Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/trie-4', 'Fundamentals', 95, 76, 50, 'Trie', ARRAY['Interview','Algorithm'], 184, true, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Trie' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Trie Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/trie-5', 'Fundamentals', 50, 45, 60, 'Trie', ARRAY['Interview','Algorithm'], 185, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Graphs' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Graphs Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/graphs-1', 'Fundamentals', 93, 46, 20, 'Graphs', ARRAY['Interview','Algorithm'], 191, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Graphs' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Graphs Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/graphs-2', 'Fundamentals', 70, 83, 30, 'Graphs', ARRAY['Interview','Algorithm'], 192, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Graphs' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Graphs Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/graphs-3', 'Fundamentals', 44, 73, 40, 'Graphs', ARRAY['Interview','Algorithm'], 193, true, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Graphs' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Graphs Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/graphs-4', 'Fundamentals', 12, 57, 50, 'Graphs', ARRAY['Interview','Algorithm'], 194, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Graphs' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Graphs Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/graphs-5', 'Fundamentals', 29, 89, 60, 'Graphs', ARRAY['Interview','Algorithm'], 195, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'DFS' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('DFS Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/dfs-1', 'Fundamentals', 91, 31, 20, 'DFS', ARRAY['Interview','Algorithm'], 201, true, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'DFS' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('DFS Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/dfs-2', 'Fundamentals', 81, 68, 30, 'DFS', ARRAY['Interview','Algorithm'], 202, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'DFS' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('DFS Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/dfs-3', 'Fundamentals', 44, 60, 40, 'DFS', ARRAY['Interview','Algorithm'], 203, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'DFS' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('DFS Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/dfs-4', 'Fundamentals', 86, 37, 50, 'DFS', ARRAY['Interview','Algorithm'], 204, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'DFS' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('DFS Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/dfs-5', 'Fundamentals', 10, 38, 60, 'DFS', ARRAY['Interview','Algorithm'], 205, true, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'BFS' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('BFS Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/bfs-1', 'Fundamentals', 88, 43, 20, 'BFS', ARRAY['Interview','Algorithm'], 211, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'BFS' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('BFS Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/bfs-2', 'Fundamentals', 76, 88, 30, 'BFS', ARRAY['Interview','Algorithm'], 212, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'BFS' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('BFS Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/bfs-3', 'Fundamentals', 75, 74, 40, 'BFS', ARRAY['Interview','Algorithm'], 213, true, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'BFS' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('BFS Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/bfs-4', 'Fundamentals', 19, 48, 50, 'BFS', ARRAY['Interview','Algorithm'], 214, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'BFS' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('BFS Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/bfs-5', 'Fundamentals', 64, 39, 60, 'BFS', ARRAY['Interview','Algorithm'], 215, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Topological Sort' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Topological Sort Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/topological-sort-1', 'Fundamentals', 14, 47, 20, 'Topological Sort', ARRAY['Interview','Algorithm'], 221, true, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Topological Sort' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Topological Sort Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/topological-sort-2', 'Fundamentals', 56, 75, 30, 'Topological Sort', ARRAY['Interview','Algorithm'], 222, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Topological Sort' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Topological Sort Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/topological-sort-3', 'Fundamentals', 16, 35, 40, 'Topological Sort', ARRAY['Interview','Algorithm'], 223, true, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Topological Sort' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Topological Sort Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/topological-sort-4', 'Fundamentals', 96, 80, 50, 'Topological Sort', ARRAY['Interview','Algorithm'], 224, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Topological Sort' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Topological Sort Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/topological-sort-5', 'Fundamentals', 62, 43, 60, 'Topological Sort', ARRAY['Interview','Algorithm'], 225, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Shortest Path' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Shortest Path Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/shortest-path-1', 'Fundamentals', 17, 72, 20, 'Shortest Path', ARRAY['Interview','Algorithm'], 231, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Shortest Path' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Shortest Path Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/shortest-path-2', 'Fundamentals', 59, 56, 30, 'Shortest Path', ARRAY['Interview','Algorithm'], 232, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Shortest Path' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Shortest Path Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/shortest-path-3', 'Fundamentals', 95, 54, 40, 'Shortest Path', ARRAY['Interview','Algorithm'], 233, true, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Shortest Path' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Shortest Path Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/shortest-path-4', 'Fundamentals', 91, 79, 50, 'Shortest Path', ARRAY['Interview','Algorithm'], 234, true, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Shortest Path' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Shortest Path Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/shortest-path-5', 'Fundamentals', 16, 53, 60, 'Shortest Path', ARRAY['Interview','Algorithm'], 235, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Union Find (DSU)' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Union Find (DSU) Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/union-find-(dsu)-1', 'Fundamentals', 54, 69, 20, 'Union Find (DSU)', ARRAY['Interview','Algorithm'], 241, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Union Find (DSU)' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Union Find (DSU) Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/union-find-(dsu)-2', 'Fundamentals', 51, 61, 30, 'Union Find (DSU)', ARRAY['Interview','Algorithm'], 242, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Union Find (DSU)' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Union Find (DSU) Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/union-find-(dsu)-3', 'Fundamentals', 57, 30, 40, 'Union Find (DSU)', ARRAY['Interview','Algorithm'], 243, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Union Find (DSU)' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Union Find (DSU) Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/union-find-(dsu)-4', 'Fundamentals', 19, 82, 50, 'Union Find (DSU)', ARRAY['Interview','Algorithm'], 244, true, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Union Find (DSU)' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Union Find (DSU) Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/union-find-(dsu)-5', 'Fundamentals', 80, 59, 60, 'Union Find (DSU)', ARRAY['Interview','Algorithm'], 245, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = '1D DP' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('1D DP Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/1d-dp-1', 'Fundamentals', 31, 83, 20, '1D DP', ARRAY['Interview','Algorithm'], 251, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = '1D DP' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('1D DP Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/1d-dp-2', 'Fundamentals', 58, 89, 30, '1D DP', ARRAY['Interview','Algorithm'], 252, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = '1D DP' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('1D DP Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/1d-dp-3', 'Fundamentals', 30, 61, 40, '1D DP', ARRAY['Interview','Algorithm'], 253, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = '1D DP' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('1D DP Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/1d-dp-4', 'Fundamentals', 51, 37, 50, '1D DP', ARRAY['Interview','Algorithm'], 254, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = '1D DP' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('1D DP Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/1d-dp-5', 'Fundamentals', 9, 83, 60, '1D DP', ARRAY['Interview','Algorithm'], 255, true, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = '2D DP' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('2D DP Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/2d-dp-1', 'Fundamentals', 7, 43, 20, '2D DP', ARRAY['Interview','Algorithm'], 261, true, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = '2D DP' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('2D DP Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/2d-dp-2', 'Fundamentals', 78, 67, 30, '2D DP', ARRAY['Interview','Algorithm'], 262, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = '2D DP' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('2D DP Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/2d-dp-3', 'Fundamentals', 81, 32, 40, '2D DP', ARRAY['Interview','Algorithm'], 263, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = '2D DP' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('2D DP Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/2d-dp-4', 'Fundamentals', 99, 75, 50, '2D DP', ARRAY['Interview','Algorithm'], 264, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = '2D DP' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('2D DP Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/2d-dp-5', 'Fundamentals', 27, 67, 60, '2D DP', ARRAY['Interview','Algorithm'], 265, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Bit Manipulation' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Bit Manipulation Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/bit-manipulation-1', 'Fundamentals', 35, 48, 20, 'Bit Manipulation', ARRAY['Interview','Algorithm'], 271, true, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Bit Manipulation' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Bit Manipulation Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/bit-manipulation-2', 'Fundamentals', 46, 35, 30, 'Bit Manipulation', ARRAY['Interview','Algorithm'], 272, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Bit Manipulation' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Bit Manipulation Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/bit-manipulation-3', 'Fundamentals', 20, 55, 40, 'Bit Manipulation', ARRAY['Interview','Algorithm'], 273, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Bit Manipulation' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Bit Manipulation Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/bit-manipulation-4', 'Fundamentals', 63, 44, 50, 'Bit Manipulation', ARRAY['Interview','Algorithm'], 274, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Bit Manipulation' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Bit Manipulation Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/bit-manipulation-5', 'Fundamentals', 37, 35, 60, 'Bit Manipulation', ARRAY['Interview','Algorithm'], 275, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Math / Geometry' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Math / Geometry Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/math-/-geometry-1', 'Fundamentals', 22, 30, 20, 'Math / Geometry', ARRAY['Interview','Algorithm'], 281, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Math / Geometry' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Math / Geometry Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/math-/-geometry-2', 'Fundamentals', 3, 83, 30, 'Math / Geometry', ARRAY['Interview','Algorithm'], 282, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Math / Geometry' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Math / Geometry Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/math-/-geometry-3', 'Fundamentals', 15, 83, 40, 'Math / Geometry', ARRAY['Interview','Algorithm'], 283, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Math / Geometry' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Math / Geometry Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/math-/-geometry-4', 'Fundamentals', 89, 67, 50, 'Math / Geometry', ARRAY['Interview','Algorithm'], 284, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Math / Geometry' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Math / Geometry Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/math-/-geometry-5', 'Fundamentals', 97, 42, 60, 'Math / Geometry', ARRAY['Interview','Algorithm'], 285, true, false)
    ON CONFLICT DO NOTHING;
  END IF;

END $$;
