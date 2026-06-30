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
    VALUES ('Arrays Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/arrays-1', 'Fundamentals', 75, 87, 20, 'Arrays', ARRAY['Interview','Algorithm'], 1, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Arrays' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Arrays Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/arrays-2', 'Fundamentals', 23, 72, 30, 'Arrays', ARRAY['Interview','Algorithm'], 2, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Arrays' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Arrays Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/arrays-3', 'Fundamentals', 6, 68, 40, 'Arrays', ARRAY['Interview','Algorithm'], 3, true, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Arrays' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Arrays Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/arrays-4', 'Fundamentals', 98, 44, 50, 'Arrays', ARRAY['Interview','Algorithm'], 4, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Arrays' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Arrays Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/arrays-5', 'Fundamentals', 81, 50, 60, 'Arrays', ARRAY['Interview','Algorithm'], 5, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Strings' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Strings Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/strings-1', 'Fundamentals', 71, 73, 20, 'Strings', ARRAY['Interview','Algorithm'], 11, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Strings' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Strings Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/strings-2', 'Fundamentals', 97, 83, 30, 'Strings', ARRAY['Interview','Algorithm'], 12, true, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Strings' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Strings Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/strings-3', 'Fundamentals', 20, 54, 40, 'Strings', ARRAY['Interview','Algorithm'], 13, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Strings' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Strings Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/strings-4', 'Fundamentals', 84, 68, 50, 'Strings', ARRAY['Interview','Algorithm'], 14, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Strings' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Strings Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/strings-5', 'Fundamentals', 87, 63, 60, 'Strings', ARRAY['Interview','Algorithm'], 15, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Hash Tables' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Hash Tables Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/hash-tables-1', 'Fundamentals', 4, 75, 20, 'Hash Tables', ARRAY['Interview','Algorithm'], 21, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Hash Tables' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Hash Tables Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/hash-tables-2', 'Fundamentals', 8, 45, 30, 'Hash Tables', ARRAY['Interview','Algorithm'], 22, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Hash Tables' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Hash Tables Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/hash-tables-3', 'Fundamentals', 42, 67, 40, 'Hash Tables', ARRAY['Interview','Algorithm'], 23, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Hash Tables' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Hash Tables Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/hash-tables-4', 'Fundamentals', 66, 86, 50, 'Hash Tables', ARRAY['Interview','Algorithm'], 24, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Hash Tables' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Hash Tables Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/hash-tables-5', 'Fundamentals', 44, 66, 60, 'Hash Tables', ARRAY['Interview','Algorithm'], 25, true, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Two Pointers' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Two Pointers Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/two-pointers-1', 'Fundamentals', 95, 75, 20, 'Two Pointers', ARRAY['Interview','Algorithm'], 31, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Two Pointers' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Two Pointers Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/two-pointers-2', 'Fundamentals', 76, 68, 30, 'Two Pointers', ARRAY['Interview','Algorithm'], 32, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Two Pointers' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Two Pointers Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/two-pointers-3', 'Fundamentals', 49, 43, 40, 'Two Pointers', ARRAY['Interview','Algorithm'], 33, true, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Two Pointers' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Two Pointers Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/two-pointers-4', 'Fundamentals', 56, 70, 50, 'Two Pointers', ARRAY['Interview','Algorithm'], 34, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Two Pointers' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Two Pointers Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/two-pointers-5', 'Fundamentals', 54, 89, 60, 'Two Pointers', ARRAY['Interview','Algorithm'], 35, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Sliding Window' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Sliding Window Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/sliding-window-1', 'Fundamentals', 80, 37, 20, 'Sliding Window', ARRAY['Interview','Algorithm'], 41, true, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Sliding Window' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Sliding Window Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/sliding-window-2', 'Fundamentals', 86, 45, 30, 'Sliding Window', ARRAY['Interview','Algorithm'], 42, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Sliding Window' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Sliding Window Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/sliding-window-3', 'Fundamentals', 5, 36, 40, 'Sliding Window', ARRAY['Interview','Algorithm'], 43, true, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Sliding Window' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Sliding Window Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/sliding-window-4', 'Fundamentals', 17, 76, 50, 'Sliding Window', ARRAY['Interview','Algorithm'], 44, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Sliding Window' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Sliding Window Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/sliding-window-5', 'Fundamentals', 76, 71, 60, 'Sliding Window', ARRAY['Interview','Algorithm'], 45, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Prefix Sum' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Prefix Sum Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/prefix-sum-1', 'Fundamentals', 20, 68, 20, 'Prefix Sum', ARRAY['Interview','Algorithm'], 51, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Prefix Sum' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Prefix Sum Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/prefix-sum-2', 'Fundamentals', 46, 46, 30, 'Prefix Sum', ARRAY['Interview','Algorithm'], 52, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Prefix Sum' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Prefix Sum Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/prefix-sum-3', 'Fundamentals', 28, 63, 40, 'Prefix Sum', ARRAY['Interview','Algorithm'], 53, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Prefix Sum' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Prefix Sum Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/prefix-sum-4', 'Fundamentals', 76, 31, 50, 'Prefix Sum', ARRAY['Interview','Algorithm'], 54, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Prefix Sum' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Prefix Sum Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/prefix-sum-5', 'Fundamentals', 8, 36, 60, 'Prefix Sum', ARRAY['Interview','Algorithm'], 55, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Binary Search' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Binary Search Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/binary-search-1', 'Fundamentals', 49, 32, 20, 'Binary Search', ARRAY['Interview','Algorithm'], 61, true, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Binary Search' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Binary Search Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/binary-search-2', 'Fundamentals', 14, 79, 30, 'Binary Search', ARRAY['Interview','Algorithm'], 62, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Binary Search' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Binary Search Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/binary-search-3', 'Fundamentals', 6, 60, 40, 'Binary Search', ARRAY['Interview','Algorithm'], 63, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Binary Search' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Binary Search Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/binary-search-4', 'Fundamentals', 68, 89, 50, 'Binary Search', ARRAY['Interview','Algorithm'], 64, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Binary Search' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Binary Search Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/binary-search-5', 'Fundamentals', 27, 53, 60, 'Binary Search', ARRAY['Interview','Algorithm'], 65, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Sorting' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Sorting Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/sorting-1', 'Fundamentals', 52, 39, 20, 'Sorting', ARRAY['Interview','Algorithm'], 71, true, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Sorting' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Sorting Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/sorting-2', 'Fundamentals', 73, 33, 30, 'Sorting', ARRAY['Interview','Algorithm'], 72, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Sorting' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Sorting Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/sorting-3', 'Fundamentals', 52, 88, 40, 'Sorting', ARRAY['Interview','Algorithm'], 73, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Sorting' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Sorting Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/sorting-4', 'Fundamentals', 94, 35, 50, 'Sorting', ARRAY['Interview','Algorithm'], 74, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Sorting' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Sorting Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/sorting-5', 'Fundamentals', 46, 34, 60, 'Sorting', ARRAY['Interview','Algorithm'], 75, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Recursion' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Recursion Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/recursion-1', 'Fundamentals', 0, 68, 20, 'Recursion', ARRAY['Interview','Algorithm'], 81, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Recursion' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Recursion Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/recursion-2', 'Fundamentals', 96, 78, 30, 'Recursion', ARRAY['Interview','Algorithm'], 82, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Recursion' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Recursion Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/recursion-3', 'Fundamentals', 89, 70, 40, 'Recursion', ARRAY['Interview','Algorithm'], 83, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Recursion' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Recursion Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/recursion-4', 'Fundamentals', 37, 40, 50, 'Recursion', ARRAY['Interview','Algorithm'], 84, true, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Recursion' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Recursion Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/recursion-5', 'Fundamentals', 70, 53, 60, 'Recursion', ARRAY['Interview','Algorithm'], 85, true, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Backtracking' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Backtracking Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/backtracking-1', 'Fundamentals', 60, 83, 20, 'Backtracking', ARRAY['Interview','Algorithm'], 91, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Backtracking' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Backtracking Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/backtracking-2', 'Fundamentals', 52, 65, 30, 'Backtracking', ARRAY['Interview','Algorithm'], 92, true, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Backtracking' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Backtracking Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/backtracking-3', 'Fundamentals', 3, 70, 40, 'Backtracking', ARRAY['Interview','Algorithm'], 93, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Backtracking' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Backtracking Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/backtracking-4', 'Fundamentals', 49, 81, 50, 'Backtracking', ARRAY['Interview','Algorithm'], 94, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Backtracking' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Backtracking Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/backtracking-5', 'Fundamentals', 5, 39, 60, 'Backtracking', ARRAY['Interview','Algorithm'], 95, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Stack' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Stack Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/stack-1', 'Fundamentals', 67, 37, 20, 'Stack', ARRAY['Interview','Algorithm'], 101, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Stack' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Stack Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/stack-2', 'Fundamentals', 52, 59, 30, 'Stack', ARRAY['Interview','Algorithm'], 102, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Stack' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Stack Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/stack-3', 'Fundamentals', 41, 36, 40, 'Stack', ARRAY['Interview','Algorithm'], 103, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Stack' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Stack Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/stack-4', 'Fundamentals', 98, 55, 50, 'Stack', ARRAY['Interview','Algorithm'], 104, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Stack' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Stack Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/stack-5', 'Fundamentals', 56, 44, 60, 'Stack', ARRAY['Interview','Algorithm'], 105, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Queue' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Queue Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/queue-1', 'Fundamentals', 22, 83, 20, 'Queue', ARRAY['Interview','Algorithm'], 111, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Queue' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Queue Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/queue-2', 'Fundamentals', 21, 45, 30, 'Queue', ARRAY['Interview','Algorithm'], 112, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Queue' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Queue Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/queue-3', 'Fundamentals', 46, 87, 40, 'Queue', ARRAY['Interview','Algorithm'], 113, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Queue' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Queue Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/queue-4', 'Fundamentals', 59, 81, 50, 'Queue', ARRAY['Interview','Algorithm'], 114, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Queue' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Queue Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/queue-5', 'Fundamentals', 14, 85, 60, 'Queue', ARRAY['Interview','Algorithm'], 115, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Linked List' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Linked List Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/linked-list-1', 'Fundamentals', 45, 74, 20, 'Linked List', ARRAY['Interview','Algorithm'], 121, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Linked List' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Linked List Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/linked-list-2', 'Fundamentals', 9, 36, 30, 'Linked List', ARRAY['Interview','Algorithm'], 122, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Linked List' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Linked List Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/linked-list-3', 'Fundamentals', 18, 61, 40, 'Linked List', ARRAY['Interview','Algorithm'], 123, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Linked List' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Linked List Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/linked-list-4', 'Fundamentals', 61, 57, 50, 'Linked List', ARRAY['Interview','Algorithm'], 124, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Linked List' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Linked List Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/linked-list-5', 'Fundamentals', 0, 39, 60, 'Linked List', ARRAY['Interview','Algorithm'], 125, true, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Fast & Slow Pointer' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Fast & Slow Pointer Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/fast-&-slow-pointer-1', 'Fundamentals', 75, 39, 20, 'Fast & Slow Pointer', ARRAY['Interview','Algorithm'], 131, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Fast & Slow Pointer' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Fast & Slow Pointer Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/fast-&-slow-pointer-2', 'Fundamentals', 90, 61, 30, 'Fast & Slow Pointer', ARRAY['Interview','Algorithm'], 132, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Fast & Slow Pointer' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Fast & Slow Pointer Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/fast-&-slow-pointer-3', 'Fundamentals', 25, 83, 40, 'Fast & Slow Pointer', ARRAY['Interview','Algorithm'], 133, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Fast & Slow Pointer' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Fast & Slow Pointer Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/fast-&-slow-pointer-4', 'Fundamentals', 31, 86, 50, 'Fast & Slow Pointer', ARRAY['Interview','Algorithm'], 134, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Fast & Slow Pointer' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Fast & Slow Pointer Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/fast-&-slow-pointer-5', 'Fundamentals', 9, 41, 60, 'Fast & Slow Pointer', ARRAY['Interview','Algorithm'], 135, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Monotonic Stack' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Monotonic Stack Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/monotonic-stack-1', 'Fundamentals', 7, 31, 20, 'Monotonic Stack', ARRAY['Interview','Algorithm'], 141, true, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Monotonic Stack' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Monotonic Stack Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/monotonic-stack-2', 'Fundamentals', 76, 65, 30, 'Monotonic Stack', ARRAY['Interview','Algorithm'], 142, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Monotonic Stack' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Monotonic Stack Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/monotonic-stack-3', 'Fundamentals', 22, 89, 40, 'Monotonic Stack', ARRAY['Interview','Algorithm'], 143, true, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Monotonic Stack' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Monotonic Stack Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/monotonic-stack-4', 'Fundamentals', 89, 88, 50, 'Monotonic Stack', ARRAY['Interview','Algorithm'], 144, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Monotonic Stack' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Monotonic Stack Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/monotonic-stack-5', 'Fundamentals', 41, 43, 60, 'Monotonic Stack', ARRAY['Interview','Algorithm'], 145, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Heap / Priority Queue' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Heap / Priority Queue Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/heap-/-priority-queue-1', 'Fundamentals', 3, 77, 20, 'Heap / Priority Queue', ARRAY['Interview','Algorithm'], 151, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Heap / Priority Queue' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Heap / Priority Queue Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/heap-/-priority-queue-2', 'Fundamentals', 3, 52, 30, 'Heap / Priority Queue', ARRAY['Interview','Algorithm'], 152, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Heap / Priority Queue' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Heap / Priority Queue Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/heap-/-priority-queue-3', 'Fundamentals', 23, 65, 40, 'Heap / Priority Queue', ARRAY['Interview','Algorithm'], 153, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Heap / Priority Queue' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Heap / Priority Queue Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/heap-/-priority-queue-4', 'Fundamentals', 0, 52, 50, 'Heap / Priority Queue', ARRAY['Interview','Algorithm'], 154, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Heap / Priority Queue' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Heap / Priority Queue Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/heap-/-priority-queue-5', 'Fundamentals', 11, 79, 60, 'Heap / Priority Queue', ARRAY['Interview','Algorithm'], 155, true, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Binary Tree' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Binary Tree Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/binary-tree-1', 'Fundamentals', 51, 89, 20, 'Binary Tree', ARRAY['Interview','Algorithm'], 161, true, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Binary Tree' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Binary Tree Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/binary-tree-2', 'Fundamentals', 94, 59, 30, 'Binary Tree', ARRAY['Interview','Algorithm'], 162, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Binary Tree' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Binary Tree Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/binary-tree-3', 'Fundamentals', 0, 76, 40, 'Binary Tree', ARRAY['Interview','Algorithm'], 163, true, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Binary Tree' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Binary Tree Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/binary-tree-4', 'Fundamentals', 11, 45, 50, 'Binary Tree', ARRAY['Interview','Algorithm'], 164, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Binary Tree' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Binary Tree Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/binary-tree-5', 'Fundamentals', 33, 39, 60, 'Binary Tree', ARRAY['Interview','Algorithm'], 165, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Binary Search Tree' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Binary Search Tree Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/binary-search-tree-1', 'Fundamentals', 27, 42, 20, 'Binary Search Tree', ARRAY['Interview','Algorithm'], 171, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Binary Search Tree' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Binary Search Tree Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/binary-search-tree-2', 'Fundamentals', 60, 79, 30, 'Binary Search Tree', ARRAY['Interview','Algorithm'], 172, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Binary Search Tree' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Binary Search Tree Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/binary-search-tree-3', 'Fundamentals', 73, 67, 40, 'Binary Search Tree', ARRAY['Interview','Algorithm'], 173, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Binary Search Tree' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Binary Search Tree Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/binary-search-tree-4', 'Fundamentals', 56, 43, 50, 'Binary Search Tree', ARRAY['Interview','Algorithm'], 174, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Binary Search Tree' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Binary Search Tree Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/binary-search-tree-5', 'Fundamentals', 43, 53, 60, 'Binary Search Tree', ARRAY['Interview','Algorithm'], 175, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Trie' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Trie Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/trie-1', 'Fundamentals', 13, 51, 20, 'Trie', ARRAY['Interview','Algorithm'], 181, true, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Trie' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Trie Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/trie-2', 'Fundamentals', 57, 74, 30, 'Trie', ARRAY['Interview','Algorithm'], 182, true, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Trie' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Trie Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/trie-3', 'Fundamentals', 3, 51, 40, 'Trie', ARRAY['Interview','Algorithm'], 183, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Trie' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Trie Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/trie-4', 'Fundamentals', 94, 89, 50, 'Trie', ARRAY['Interview','Algorithm'], 184, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Trie' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Trie Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/trie-5', 'Fundamentals', 24, 78, 60, 'Trie', ARRAY['Interview','Algorithm'], 185, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Graphs' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Graphs Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/graphs-1', 'Fundamentals', 71, 40, 20, 'Graphs', ARRAY['Interview','Algorithm'], 191, true, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Graphs' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Graphs Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/graphs-2', 'Fundamentals', 15, 32, 30, 'Graphs', ARRAY['Interview','Algorithm'], 192, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Graphs' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Graphs Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/graphs-3', 'Fundamentals', 26, 61, 40, 'Graphs', ARRAY['Interview','Algorithm'], 193, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Graphs' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Graphs Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/graphs-4', 'Fundamentals', 65, 65, 50, 'Graphs', ARRAY['Interview','Algorithm'], 194, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Graphs' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Graphs Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/graphs-5', 'Fundamentals', 91, 85, 60, 'Graphs', ARRAY['Interview','Algorithm'], 195, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'DFS' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('DFS Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/dfs-1', 'Fundamentals', 95, 37, 20, 'DFS', ARRAY['Interview','Algorithm'], 201, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'DFS' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('DFS Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/dfs-2', 'Fundamentals', 19, 60, 30, 'DFS', ARRAY['Interview','Algorithm'], 202, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'DFS' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('DFS Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/dfs-3', 'Fundamentals', 92, 32, 40, 'DFS', ARRAY['Interview','Algorithm'], 203, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'DFS' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('DFS Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/dfs-4', 'Fundamentals', 58, 87, 50, 'DFS', ARRAY['Interview','Algorithm'], 204, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'DFS' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('DFS Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/dfs-5', 'Fundamentals', 3, 64, 60, 'DFS', ARRAY['Interview','Algorithm'], 205, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'BFS' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('BFS Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/bfs-1', 'Fundamentals', 37, 73, 20, 'BFS', ARRAY['Interview','Algorithm'], 211, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'BFS' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('BFS Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/bfs-2', 'Fundamentals', 55, 45, 30, 'BFS', ARRAY['Interview','Algorithm'], 212, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'BFS' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('BFS Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/bfs-3', 'Fundamentals', 40, 73, 40, 'BFS', ARRAY['Interview','Algorithm'], 213, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'BFS' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('BFS Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/bfs-4', 'Fundamentals', 63, 63, 50, 'BFS', ARRAY['Interview','Algorithm'], 214, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'BFS' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('BFS Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/bfs-5', 'Fundamentals', 19, 47, 60, 'BFS', ARRAY['Interview','Algorithm'], 215, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Topological Sort' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Topological Sort Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/topological-sort-1', 'Fundamentals', 73, 79, 20, 'Topological Sort', ARRAY['Interview','Algorithm'], 221, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Topological Sort' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Topological Sort Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/topological-sort-2', 'Fundamentals', 16, 81, 30, 'Topological Sort', ARRAY['Interview','Algorithm'], 222, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Topological Sort' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Topological Sort Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/topological-sort-3', 'Fundamentals', 49, 80, 40, 'Topological Sort', ARRAY['Interview','Algorithm'], 223, true, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Topological Sort' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Topological Sort Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/topological-sort-4', 'Fundamentals', 11, 47, 50, 'Topological Sort', ARRAY['Interview','Algorithm'], 224, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Topological Sort' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Topological Sort Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/topological-sort-5', 'Fundamentals', 47, 36, 60, 'Topological Sort', ARRAY['Interview','Algorithm'], 225, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Shortest Path' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Shortest Path Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/shortest-path-1', 'Fundamentals', 12, 85, 20, 'Shortest Path', ARRAY['Interview','Algorithm'], 231, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Shortest Path' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Shortest Path Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/shortest-path-2', 'Fundamentals', 53, 33, 30, 'Shortest Path', ARRAY['Interview','Algorithm'], 232, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Shortest Path' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Shortest Path Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/shortest-path-3', 'Fundamentals', 38, 45, 40, 'Shortest Path', ARRAY['Interview','Algorithm'], 233, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Shortest Path' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Shortest Path Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/shortest-path-4', 'Fundamentals', 31, 71, 50, 'Shortest Path', ARRAY['Interview','Algorithm'], 234, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Shortest Path' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Shortest Path Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/shortest-path-5', 'Fundamentals', 60, 73, 60, 'Shortest Path', ARRAY['Interview','Algorithm'], 235, true, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Union Find (DSU)' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Union Find (DSU) Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/union-find-(dsu)-1', 'Fundamentals', 74, 76, 20, 'Union Find (DSU)', ARRAY['Interview','Algorithm'], 241, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Union Find (DSU)' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Union Find (DSU) Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/union-find-(dsu)-2', 'Fundamentals', 12, 88, 30, 'Union Find (DSU)', ARRAY['Interview','Algorithm'], 242, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Union Find (DSU)' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Union Find (DSU) Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/union-find-(dsu)-3', 'Fundamentals', 32, 81, 40, 'Union Find (DSU)', ARRAY['Interview','Algorithm'], 243, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Union Find (DSU)' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Union Find (DSU) Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/union-find-(dsu)-4', 'Fundamentals', 90, 70, 50, 'Union Find (DSU)', ARRAY['Interview','Algorithm'], 244, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Union Find (DSU)' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Union Find (DSU) Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/union-find-(dsu)-5', 'Fundamentals', 83, 78, 60, 'Union Find (DSU)', ARRAY['Interview','Algorithm'], 245, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = '1D DP' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('1D DP Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/1d-dp-1', 'Fundamentals', 7, 48, 20, '1D DP', ARRAY['Interview','Algorithm'], 251, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = '1D DP' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('1D DP Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/1d-dp-2', 'Fundamentals', 16, 74, 30, '1D DP', ARRAY['Interview','Algorithm'], 252, true, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = '1D DP' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('1D DP Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/1d-dp-3', 'Fundamentals', 74, 64, 40, '1D DP', ARRAY['Interview','Algorithm'], 253, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = '1D DP' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('1D DP Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/1d-dp-4', 'Fundamentals', 99, 76, 50, '1D DP', ARRAY['Interview','Algorithm'], 254, true, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = '1D DP' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('1D DP Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/1d-dp-5', 'Fundamentals', 61, 61, 60, '1D DP', ARRAY['Interview','Algorithm'], 255, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = '2D DP' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('2D DP Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/2d-dp-1', 'Fundamentals', 27, 36, 20, '2D DP', ARRAY['Interview','Algorithm'], 261, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = '2D DP' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('2D DP Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/2d-dp-2', 'Fundamentals', 58, 88, 30, '2D DP', ARRAY['Interview','Algorithm'], 262, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = '2D DP' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('2D DP Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/2d-dp-3', 'Fundamentals', 60, 78, 40, '2D DP', ARRAY['Interview','Algorithm'], 263, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = '2D DP' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('2D DP Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/2d-dp-4', 'Fundamentals', 28, 36, 50, '2D DP', ARRAY['Interview','Algorithm'], 264, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = '2D DP' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('2D DP Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/2d-dp-5', 'Fundamentals', 54, 40, 60, '2D DP', ARRAY['Interview','Algorithm'], 265, true, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Bit Manipulation' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Bit Manipulation Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/bit-manipulation-1', 'Fundamentals', 77, 53, 20, 'Bit Manipulation', ARRAY['Interview','Algorithm'], 271, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Bit Manipulation' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Bit Manipulation Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/bit-manipulation-2', 'Fundamentals', 10, 41, 30, 'Bit Manipulation', ARRAY['Interview','Algorithm'], 272, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Bit Manipulation' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Bit Manipulation Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/bit-manipulation-3', 'Fundamentals', 35, 68, 40, 'Bit Manipulation', ARRAY['Interview','Algorithm'], 273, false, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Bit Manipulation' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Bit Manipulation Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/bit-manipulation-4', 'Fundamentals', 83, 61, 50, 'Bit Manipulation', ARRAY['Interview','Algorithm'], 274, true, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Bit Manipulation' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Bit Manipulation Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/bit-manipulation-5', 'Fundamentals', 64, 32, 60, 'Bit Manipulation', ARRAY['Interview','Algorithm'], 275, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Math / Geometry' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Math / Geometry Mastery Problem 1', 'easy', tid, 'https://leetcode.com/problems/math-/-geometry-1', 'Fundamentals', 79, 31, 20, 'Math / Geometry', ARRAY['Interview','Algorithm'], 281, true, true)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Math / Geometry' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Math / Geometry Mastery Problem 2', 'easy', tid, 'https://leetcode.com/problems/math-/-geometry-2', 'Fundamentals', 60, 85, 30, 'Math / Geometry', ARRAY['Interview','Algorithm'], 282, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Math / Geometry' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Math / Geometry Mastery Problem 3', 'medium', tid, 'https://leetcode.com/problems/math-/-geometry-3', 'Fundamentals', 62, 62, 40, 'Math / Geometry', ARRAY['Interview','Algorithm'], 283, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Math / Geometry' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Math / Geometry Mastery Problem 4', 'medium', tid, 'https://leetcode.com/problems/math-/-geometry-4', 'Fundamentals', 96, 78, 50, 'Math / Geometry', ARRAY['Interview','Algorithm'], 284, true, false)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT id INTO tid FROM public.dsa_topics WHERE name = 'Math / Geometry' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('Math / Geometry Mastery Problem 5', 'hard', tid, 'https://leetcode.com/problems/math-/-geometry-5', 'Fundamentals', 66, 36, 60, 'Math / Geometry', ARRAY['Interview','Algorithm'], 285, false, false)
    ON CONFLICT DO NOTHING;
  END IF;

END $$;
