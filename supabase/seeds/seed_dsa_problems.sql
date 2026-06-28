-- Seed DSA topics and problems for Phase 3
-- Run in the Supabase SQL editor or with `supabase db query < supabase/seeds/seed_dsa_problems.sql`

INSERT INTO public.dsa_topics (name, description, difficulty, display_order)
VALUES
  ('Arrays', 'Master array manipulation, searching, and sorting', 'easy', 1),
  ('Strings', 'String processing, pattern matching, and manipulation', 'easy', 2),
  ('Hashing', 'Hash tables, dictionaries, and key-value operations', 'easy', 3),
  ('Linked List', 'Linked list operations, reversal, and manipulation', 'medium', 4),
  ('Stack', 'Stack-based problems and monotonic stacks', 'medium', 5),
  ('Graphs', 'Graph traversal, shortest path, and connectivity', 'hard', 6),
  ('Dynamic Programming', 'DP optimization and state management', 'hard', 7)
ON CONFLICT (name) DO NOTHING;

INSERT INTO public.dsa_problems (title, description, difficulty, topic_id, leetcode_url, companies, xp_reward)
VALUES
  ('Two Sum', 'Find two numbers that add up to a target.', 'easy', (SELECT id FROM public.dsa_topics WHERE name = 'Arrays'), 'https://leetcode.com/problems/two-sum', ARRAY['Amazon', 'Microsoft'], 10),
  ('Reverse Linked List', 'Reverse a singly linked list in-place.', 'easy', (SELECT id FROM public.dsa_topics WHERE name = 'Linked List'), 'https://leetcode.com/problems/reverse-linked-list', ARRAY['Google', 'Amazon'], 10),
  ('Valid Parentheses', 'Check whether parentheses are balanced.', 'easy', (SELECT id FROM public.dsa_topics WHERE name = 'Strings'), 'https://leetcode.com/problems/valid-parentheses', ARRAY['Facebook', 'Microsoft'], 10),
  ('Merge Intervals', 'Merge overlapping intervals into a minimum set.', 'medium', (SELECT id FROM public.dsa_topics WHERE name = 'Arrays'), 'https://leetcode.com/problems/merge-intervals', ARRAY['Google', 'Netflix'], 15),
  ('Top K Frequent Elements', 'Return the k most frequent elements in an array.', 'medium', (SELECT id FROM public.dsa_topics WHERE name = 'Hashing'), 'https://leetcode.com/problems/top-k-frequent-elements', ARRAY['Amazon', 'Adobe'], 15),
  ('Binary Tree Inorder Traversal', 'Perform an inorder traversal of a binary tree.', 'medium', (SELECT id FROM public.dsa_topics WHERE name = 'Linked List'), 'https://leetcode.com/problems/binary-tree-inorder-traversal', ARRAY['Google', 'Microsoft'], 15),
  ('Word Ladder', 'Find the shortest transformation from start to end word.', 'hard', (SELECT id FROM public.dsa_topics WHERE name = 'Graphs'), 'https://leetcode.com/problems/word-ladder', ARRAY['Amazon', 'Microsoft'], 25),
  ('Longest Increasing Subsequence', 'Find the length of the longest increasing subsequence.', 'hard', (SELECT id FROM public.dsa_topics WHERE name = 'Dynamic Programming'), 'https://leetcode.com/problems/longest-increasing-subsequence', ARRAY['Google', 'Netflix'], 25),
  ('LRU Cache', 'Design a data structure that supports get and put in O(1).', 'hard', (SELECT id FROM public.dsa_topics WHERE name = 'Hashing'), 'https://leetcode.com/problems/lru-cache', ARRAY['Google', 'Flipkart'], 30)
ON CONFLICT (title) DO NOTHING;

-- Note: This seed file matches the current dsa_problems schema with topic_id UUID references and leetcode_url columns.
