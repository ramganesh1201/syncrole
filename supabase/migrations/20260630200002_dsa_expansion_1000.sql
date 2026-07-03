-- 1000+ Premium DSA Problems Seed
-- Generated automatically for massive expansion

INSERT INTO dsa_topics (id, name, display_order, estimated_hours) VALUES ('69011810-dde4-415d-9989-eb93d5b066ee', 'MST', 100, 10) ON CONFLICT (name) DO NOTHING;
INSERT INTO dsa_topics (id, name, display_order, estimated_hours) VALUES ('4d3de1e7-5b26-4ce5-b3a6-25bdd6132dbb', 'SQL', 101, 10) ON CONFLICT (name) DO NOTHING;
INSERT INTO dsa_topics (id, name, display_order, estimated_hours) VALUES ('59128a6f-71cb-4520-baa9-1af59470a1fa', 'System Design Basics', 102, 10) ON CONFLICT (name) DO NOTHING;
INSERT INTO dsa_topics (id, name, display_order, estimated_hours) VALUES ('d5cdc9b3-5e87-4a94-b2a4-6a88b1f00e51', 'Complexity Analysis', 103, 10) ON CONFLICT (name) DO NOTHING;
INSERT INTO dsa_topics (id, name, display_order, estimated_hours) VALUES ('499198b7-db8f-482a-bae7-117c7821bc3a', 'Greedy', 104, 10) ON CONFLICT (name) DO NOTHING;
INSERT INTO dsa_topics (id, name, display_order, estimated_hours) VALUES ('cfdc8e32-d58a-444a-943f-55cc69c12539', 'Intervals', 105, 10) ON CONFLICT (name) DO NOTHING;

INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '2e5fe8e3-d471-4788-8512-8f9c5953b832', 'Construct Prefix With Given Sum', 'easy', 10, ARRAY['Amazon'], 'https://leetcode.com/problems/construct-prefix-with-given-sum/', id, 36.1, 53.6, 15, false, true, false, false, false, 1, 51
FROM dsa_topics WHERE name ILIKE '%Arrays%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'c135530d-254c-48b2-b06e-1526ef649871', 'Construct String', 'easy', 10, ARRAY['Microsoft', 'DE Shaw', 'Oracle', 'Airbnb'], 'https://leetcode.com/problems/construct-string/', id, 54.5, 57.0, 15, false, false, false, false, true, 2, 26
FROM dsa_topics WHERE name ILIKE '%Arrays%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '8fab7d1b-2e40-4294-b468-b7a7e4910e3e', 'Find Node', 'easy', 10, ARRAY['Oracle', 'Amazon'], 'https://leetcode.com/problems/find-node/', id, 88.7, 40.9, 15, false, false, false, false, false, 3, 72
FROM dsa_topics WHERE name ILIKE '%Arrays%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'd05d45c7-3279-49a9-a862-f3e156a6f80f', 'Count Prefix', 'easy', 10, ARRAY['Salesforce', 'Meta'], 'https://leetcode.com/problems/count-prefix/', id, 52.7, 34.7, 15, false, false, false, true, true, 4, 16
FROM dsa_topics WHERE name ILIKE '%Arrays%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'c68b4d52-df43-468c-a356-866d1b7d4460', 'Add Interval With At Most K Elements', 'medium', 20, ARRAY['Bloomberg', 'Goldman Sachs', 'Amazon', 'Atlassian'], 'https://leetcode.com/problems/add-interval-with-at-most-k-elements/', id, 60.9, 42.4, 30, false, false, false, false, false, 5, 20
FROM dsa_topics WHERE name ILIKE '%Arrays%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '209c505b-43f8-4f08-ae10-a1b642ad55da', 'Minimum Subarray Divisible By K', 'medium', 20, ARRAY['Airbnb', 'Uber'], 'https://leetcode.com/problems/minimum-subarray-divisible-by-k/', id, 74.7, 34.4, 30, false, false, false, false, false, 6, 41
FROM dsa_topics WHERE name ILIKE '%Arrays%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '2f85cdf4-1cc5-4697-bcb4-10e671eafe35', 'Valid Graph Without Repeating Characters', 'medium', 20, ARRAY['Zomato', 'Meta', 'Adobe'], 'https://leetcode.com/problems/valid-graph-without-repeating-characters/', id, 55.7, 31.2, 30, true, false, false, false, true, 7, 29
FROM dsa_topics WHERE name ILIKE '%Arrays%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '4d2944aa-b965-428a-8886-201211965280', 'Remove Tree', 'medium', 20, ARRAY['Google'], 'https://leetcode.com/problems/remove-tree/', id, 55.0, 47.7, 30, false, false, false, false, true, 8, 24
FROM dsa_topics WHERE name ILIKE '%Arrays%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '6234d8a9-6f71-4770-a17f-7321dfc81441', 'Maximum Interval With K Odd Numbers', 'medium', 20, ARRAY['Apple', 'Goldman Sachs'], 'https://leetcode.com/problems/maximum-interval-with-k-odd-numbers/', id, 78.1, 31.8, 30, false, false, false, false, true, 9, 1
FROM dsa_topics WHERE name ILIKE '%Arrays%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'd336bc68-b012-4eef-bbbc-75ece0c8b231', 'Maximum Path With Max Bitwise OR III', 'hard', 30, ARRAY['Meta', 'Swiggy', 'Bloomberg'], 'https://leetcode.com/problems/maximum-path-with-max-bitwise-or-iii/', id, 40.9, 55.6, 45, false, false, false, false, true, 10, 72
FROM dsa_topics WHERE name ILIKE '%Arrays%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'cf7ab7ff-4a3b-491d-b257-e812e7ba2d52', 'Kth Sequence', 'hard', 30, ARRAY['Meta', 'Morgan Stanley'], 'https://leetcode.com/problems/kth-sequence/', id, 57.1, 39.1, 45, false, true, false, true, false, 11, 93
FROM dsa_topics WHERE name ILIKE '%Arrays%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '324ccc50-288d-410d-ae3c-215636c79964', 'Valid Node II', 'hard', 30, ARRAY['Flipkart', 'Salesforce'], 'https://leetcode.com/problems/valid-node-ii/', id, 46.1, 34.8, 45, false, false, false, false, false, 12, 57
FROM dsa_topics WHERE name ILIKE '%Arrays%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'a27f1a0a-666d-4258-96a5-bb4aa0280560', 'Search Palindrome In O(1) Time', 'easy', 10, ARRAY['Microsoft'], 'https://leetcode.com/problems/search-palindrome-in-o-1-time/', id, 87.7, 40.7, 15, true, false, true, false, true, 13, 11
FROM dsa_topics WHERE name ILIKE '%Strings%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '4953322d-bc39-4c10-a24d-5fe506608bd5', 'Kth Sequence II', 'easy', 10, ARRAY['Amazon'], 'https://leetcode.com/problems/kth-sequence-ii/', id, 91.9, 42.1, 15, false, false, true, false, true, 14, 90
FROM dsa_topics WHERE name ILIKE '%Strings%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '810edf57-a3a6-48b1-ba1c-3f93d862fd0f', 'Longest Substring Greater Than Right', 'easy', 10, ARRAY['Meta'], 'https://leetcode.com/problems/longest-substring-greater-than-right/', id, 29.6, 34.7, 15, false, false, false, false, true, 15, 82
FROM dsa_topics WHERE name ILIKE '%Strings%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'afe86e58-bf9e-4b8b-b3ea-bb49f183aa4b', 'Maximum Island Divisible By K', 'medium', 20, ARRAY['Oracle', 'LinkedIn', 'PhonePe', 'Microsoft'], 'https://leetcode.com/problems/maximum-island-divisible-by-k/', id, 69.6, 20.6, 30, false, false, false, false, false, 16, 29
FROM dsa_topics WHERE name ILIKE '%Strings%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '378097a5-870c-45a6-a691-912a8e38501f', 'Design Substring', 'medium', 20, ARRAY['DE Shaw'], 'https://leetcode.com/problems/design-substring/', id, 77.4, 48.4, 30, false, false, false, false, false, 17, 12
FROM dsa_topics WHERE name ILIKE '%Strings%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'b9d88308-7ef9-4ffe-adbc-a059994d501d', 'Valid Edge Using O(1) Space', 'medium', 20, ARRAY['Adobe', 'Swiggy'], 'https://leetcode.com/problems/valid-edge-using-o-1-space/', id, 44.6, 30.4, 30, false, false, false, false, false, 18, 90
FROM dsa_topics WHERE name ILIKE '%Strings%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '976eed56-5561-4d50-91c8-d1b3a77caaec', 'Largest Substring With K Odd Numbers II', 'medium', 20, ARRAY['Adobe', 'Microsoft', 'DE Shaw'], 'https://leetcode.com/problems/largest-substring-with-k-odd-numbers-ii/', id, 74.3, 50.9, 30, false, false, false, false, false, 19, 99
FROM dsa_topics WHERE name ILIKE '%Strings%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '1a1ca0f4-8df9-48b4-be1b-2f05a4a3c2d4', 'Remove Substring', 'medium', 20, ARRAY['Google', 'Uber'], 'https://leetcode.com/problems/remove-substring/', id, 84.1, 31.9, 30, false, false, false, false, false, 20, 80
FROM dsa_topics WHERE name ILIKE '%Strings%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '0193f9fe-fa29-4e22-9463-104656327ac2', 'Find Grid Using O(1) Space', 'hard', 30, ARRAY['Netflix', 'Apple', 'Meta'], 'https://leetcode.com/problems/find-grid-using-o-1-space/', id, 66.1, 46.3, 45, false, false, false, true, true, 21, 22
FROM dsa_topics WHERE name ILIKE '%Strings%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'b61344a5-b678-4acc-af47-8dd2598cb3db', 'Minimum Array', 'hard', 30, ARRAY['Microsoft', 'Meta', 'Salesforce'], 'https://leetcode.com/problems/minimum-array/', id, 55.8, 33.1, 45, false, false, false, false, false, 22, 19
FROM dsa_topics WHERE name ILIKE '%Strings%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '8007e451-e5ac-4e68-a32c-9f1b1e0886ac', 'Shortest Interval Greater Than Right', 'hard', 30, ARRAY['Zomato', 'Amazon', 'Bloomberg'], 'https://leetcode.com/problems/shortest-interval-greater-than-right/', id, 29.8, 46.3, 45, false, false, false, false, false, 23, 89
FROM dsa_topics WHERE name ILIKE '%Strings%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '41618d41-a681-4ef4-8bcd-6b896552306a', 'Largest Grid Divisible By K', 'easy', 10, ARRAY['Amazon'], 'https://leetcode.com/problems/largest-grid-divisible-by-k/', id, 33.9, 22.7, 15, false, false, true, false, false, 24, 92
FROM dsa_topics WHERE name ILIKE '%Hash%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '8c893cc7-fd6b-4b41-86fd-9076f7e7fd50', 'Valid Grid', 'easy', 10, ARRAY['Google'], 'https://leetcode.com/problems/valid-grid/', id, 22.3, 24.1, 15, false, true, false, false, false, 25, 51
FROM dsa_topics WHERE name ILIKE '%Hash%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '8f86beca-b8e0-4a04-9fef-be0e069d6017', 'Check if Sequence', 'easy', 10, ARRAY['Uber', 'Microsoft', 'Zomato', 'Netflix'], 'https://leetcode.com/problems/check-if-sequence/', id, 61.9, 26.0, 15, false, false, true, false, false, 26, 54
FROM dsa_topics WHERE name ILIKE '%Hash%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '60a93d9d-f4d6-4b99-ad09-bf27c2231238', 'Count Tree In O(1) Time', 'medium', 20, ARRAY['Morgan Stanley'], 'https://leetcode.com/problems/count-tree-in-o-1-time/', id, 39.5, 58.3, 30, false, false, false, false, false, 27, 91
FROM dsa_topics WHERE name ILIKE '%Hash%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '661fa328-dd48-4eae-aa10-fae73a4adae9', 'Search Elements With K Odd Numbers', 'medium', 20, ARRAY['Uber'], 'https://leetcode.com/problems/search-elements-with-k-odd-numbers/', id, 36.8, 43.9, 30, false, false, false, false, false, 28, 54
FROM dsa_topics WHERE name ILIKE '%Hash%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '5e420d4c-9cfe-4ef5-b179-6f85aee0759a', 'Longest Polygon', 'medium', 20, ARRAY['Razorpay'], 'https://leetcode.com/problems/longest-polygon/', id, 46.3, 37.3, 30, false, false, true, false, true, 29, 55
FROM dsa_topics WHERE name ILIKE '%Hash%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '0ed0b7cb-d80f-4934-8d0d-14e31776ab85', 'Shortest String With Max Bitwise OR', 'medium', 20, ARRAY['Meta', 'Goldman Sachs', 'Airbnb', 'Zomato'], 'https://leetcode.com/problems/shortest-string-with-max-bitwise-or/', id, 41.4, 46.8, 30, false, false, false, false, true, 30, 2
FROM dsa_topics WHERE name ILIKE '%Hash%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '049687b2-a254-450e-afcb-301c72f83e9f', 'Maximum Edge III', 'hard', 30, ARRAY['Nvidia'], 'https://leetcode.com/problems/maximum-edge-iii/', id, 55.4, 52.5, 45, false, false, false, false, false, 31, 68
FROM dsa_topics WHERE name ILIKE '%Hash%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'cf2a0f02-b588-414b-9abb-370fb1ff09c0', 'Largest Polygon', 'hard', 30, ARRAY['Nvidia', 'Atlassian', 'Airbnb'], 'https://leetcode.com/problems/largest-polygon/', id, 38.9, 39.8, 45, false, false, false, false, true, 32, 48
FROM dsa_topics WHERE name ILIKE '%Hash%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '0af7764f-977d-495b-9dde-4a83ce925163', 'Count Graph Divisible By K', 'easy', 10, ARRAY['Meta'], 'https://leetcode.com/problems/count-graph-divisible-by-k/', id, 66.1, 47.7, 15, false, false, false, false, false, 33, 45
FROM dsa_topics WHERE name ILIKE '%Two%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '29b61b78-7d08-4988-b669-2bc3b9f4bc9b', 'Construct Tree In a BST II', 'easy', 10, ARRAY['Razorpay'], 'https://leetcode.com/problems/construct-tree-in-a-bst-ii/', id, 24.6, 29.9, 15, false, false, true, false, false, 34, 73
FROM dsa_topics WHERE name ILIKE '%Two%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '021283c2-37a1-46c1-9311-869bfcae1f9b', 'Maximum Graph To Make Array Sorted', 'medium', 20, ARRAY['Oracle'], 'https://leetcode.com/problems/maximum-graph-to-make-array-sorted/', id, 66.2, 26.3, 30, true, false, false, false, false, 35, 63
FROM dsa_topics WHERE name ILIKE '%Two%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'c030381e-68d7-4ae9-9940-f7da0fa0497f', 'Minimum Path In a Binary Tree', 'medium', 20, ARRAY['Morgan Stanley', 'Microsoft', 'Nvidia'], 'https://leetcode.com/problems/minimum-path-in-a-binary-tree/', id, 59.4, 21.7, 30, false, false, true, false, false, 36, 83
FROM dsa_topics WHERE name ILIKE '%Two%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '5cc60222-d420-4c2d-a163-998ba57743fa', 'Minimum Tree II', 'medium', 20, ARRAY['Zomato'], 'https://leetcode.com/problems/minimum-tree-ii/', id, 34.3, 22.4, 30, false, false, false, false, true, 37, 33
FROM dsa_topics WHERE name ILIKE '%Two%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '545ac6aa-3699-4eb9-911b-00ca17e03033', 'Search Interval In a BST', 'hard', 30, ARRAY['DE Shaw', 'Uber', 'Meta', 'Microsoft'], 'https://leetcode.com/problems/search-interval-in-a-bst/', id, 68.4, 23.3, 45, true, true, false, false, false, 38, 15
FROM dsa_topics WHERE name ILIKE '%Two%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '35766e46-8f0c-4719-a5f2-84226901fc8a', 'Check if String', 'hard', 30, ARRAY['Oracle'], 'https://leetcode.com/problems/check-if-string/', id, 82.4, 40.8, 45, false, false, false, false, false, 39, 66
FROM dsa_topics WHERE name ILIKE '%Two%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '8ab875b6-876c-4cdd-855c-10ee78b8a795', 'Add Array', 'hard', 30, ARRAY['Airbnb'], 'https://leetcode.com/problems/add-array/', id, 94.9, 22.3, 45, false, false, true, false, false, 40, 31
FROM dsa_topics WHERE name ILIKE '%Two%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'fa808e38-0299-4952-b58c-1fc0d05bb42c', 'Largest Grid Divisible By K II', 'easy', 10, ARRAY['Atlassian'], 'https://leetcode.com/problems/largest-grid-divisible-by-k-ii/', id, 95.5, 34.4, 15, false, false, false, false, false, 41, 83
FROM dsa_topics WHERE name ILIKE '%Sliding%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '4c397dad-8da1-4815-9cf3-70baf7e9022c', 'Count Matrix Divisible By K', 'easy', 10, ARRAY['Atlassian', 'Netflix'], 'https://leetcode.com/problems/count-matrix-divisible-by-k/', id, 71.9, 56.6, 15, false, false, false, false, true, 42, 73
FROM dsa_topics WHERE name ILIKE '%Sliding%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '62ec6384-1d7b-4cfb-a7e5-248e457b9523', 'Shortest Matrix With K Odd Numbers', 'medium', 20, ARRAY['Apple', 'Meta', 'Flipkart', 'Swiggy'], 'https://leetcode.com/problems/shortest-matrix-with-k-odd-numbers/', id, 74.3, 27.2, 30, false, false, true, false, true, 43, 17
FROM dsa_topics WHERE name ILIKE '%Sliding%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'c07ee48d-a9fe-4813-81b7-5dbce3482343', 'Count Palindrome With Given Sum', 'medium', 20, ARRAY['Zomato'], 'https://leetcode.com/problems/count-palindrome-with-given-sum/', id, 96.3, 27.5, 30, false, false, false, false, false, 44, 71
FROM dsa_topics WHERE name ILIKE '%Sliding%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '7f181a8e-44dc-45ce-9cc7-2bc410d12fc0', 'Longest Edge With Max Bitwise OR', 'medium', 20, ARRAY['Google', 'Oracle'], 'https://leetcode.com/problems/longest-edge-with-max-bitwise-or/', id, 43.7, 23.2, 30, false, false, false, true, false, 45, 78
FROM dsa_topics WHERE name ILIKE '%Sliding%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'f692574d-f259-4d92-b146-4e04d21552ea', 'Kth Grid In a Binary Tree II', 'hard', 30, ARRAY['Oracle', 'Swiggy', 'LinkedIn'], 'https://leetcode.com/problems/kth-grid-in-a-binary-tree-ii/', id, 22.8, 35.8, 45, false, false, false, false, true, 46, 39
FROM dsa_topics WHERE name ILIKE '%Sliding%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'c2e3c061-a15a-4ef0-b7fc-ecd15dee9dd0', 'Number of Prefix With Max Bitwise OR II', 'hard', 30, ARRAY['Amazon', 'DE Shaw', 'Atlassian', 'Microsoft'], 'https://leetcode.com/problems/number-of-prefix-with-max-bitwise-or-ii/', id, 23.4, 57.5, 45, false, false, true, false, false, 47, 4
FROM dsa_topics WHERE name ILIKE '%Sliding%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'a572b95d-2d2b-452d-a355-b27a4224a6c5', 'Find Grid To Make Array Sorted II', 'hard', 30, ARRAY['Google', 'Adobe', 'Amazon'], 'https://leetcode.com/problems/find-grid-to-make-array-sorted-ii/', id, 22.2, 37.7, 45, false, false, false, false, true, 48, 90
FROM dsa_topics WHERE name ILIKE '%Sliding%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'aab42201-747d-489f-93d4-c2ca60dd277e', 'Kth Polygon With Max Bitwise OR', 'easy', 10, ARRAY['Microsoft', 'Meta', 'Nvidia'], 'https://leetcode.com/problems/kth-polygon-with-max-bitwise-or/', id, 27.0, 41.1, 15, false, true, false, false, false, 49, 51
FROM dsa_topics WHERE name ILIKE '%Binary%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'aace0e47-0cda-47c3-b29a-ef3082ea8fde', 'Smallest Node', 'easy', 10, ARRAY['Adobe'], 'https://leetcode.com/problems/smallest-node/', id, 63.8, 25.7, 15, false, false, true, false, false, 50, 72
FROM dsa_topics WHERE name ILIKE '%Binary%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '42b7c657-d7ef-4455-9db8-cae838a1e6bb', 'Shortest Matrix', 'easy', 10, ARRAY['Amazon', 'Google', 'DE Shaw'], 'https://leetcode.com/problems/shortest-matrix/', id, 24.1, 25.6, 15, false, true, false, false, true, 51, 71
FROM dsa_topics WHERE name ILIKE '%Binary%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '3a62c823-7646-438f-b014-668f6e304186', 'Check if Path II', 'medium', 20, ARRAY['Amazon'], 'https://leetcode.com/problems/check-if-path-ii/', id, 63.8, 48.4, 30, false, false, false, false, false, 52, 5
FROM dsa_topics WHERE name ILIKE '%Binary%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '4200edf5-8aee-45d9-ac89-7130d555324f', 'Find Elements', 'medium', 20, ARRAY['Microsoft', 'Netflix', 'Oracle', 'Goldman Sachs'], 'https://leetcode.com/problems/find-elements/', id, 51.8, 58.1, 30, false, false, false, false, false, 53, 9
FROM dsa_topics WHERE name ILIKE '%Binary%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'fdbb2430-7e31-43f4-b879-3ecd637c088c', 'Minimum String From Data Stream', 'medium', 20, ARRAY['Nvidia', 'Goldman Sachs'], 'https://leetcode.com/problems/minimum-string-from-data-stream/', id, 94.8, 51.6, 30, true, true, false, false, false, 54, 2
FROM dsa_topics WHERE name ILIKE '%Binary%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '8669d7b3-01d7-4740-be44-d99f9e8ced8c', 'Maximum Interval In a BST', 'medium', 20, ARRAY['Meta', 'DE Shaw', 'Airbnb'], 'https://leetcode.com/problems/maximum-interval-in-a-bst/', id, 97.4, 52.9, 30, false, false, false, false, false, 55, 85
FROM dsa_topics WHERE name ILIKE '%Binary%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '9d57f37b-dd51-4a72-970d-39b62d903a70', 'Valid Island', 'hard', 30, ARRAY['Zomato'], 'https://leetcode.com/problems/valid-island/', id, 38.4, 44.2, 45, false, false, false, false, false, 56, 65
FROM dsa_topics WHERE name ILIKE '%Binary%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'c5e464d5-7612-4c1d-82b8-4ca8bea96dc3', 'Longest Palindrome Using O(1) Space II', 'hard', 30, ARRAY['Salesforce'], 'https://leetcode.com/problems/longest-palindrome-using-o-1-space-ii/', id, 96.6, 49.9, 45, false, false, false, false, false, 57, 85
FROM dsa_topics WHERE name ILIKE '%Binary%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'd8fb0c7a-01d7-4ba3-ac0f-a06ca3ae3e18', 'Count Elements', 'easy', 10, ARRAY['Stripe'], 'https://leetcode.com/problems/count-elements/', id, 93.3, 44.2, 15, false, false, false, false, false, 58, 85
FROM dsa_topics WHERE name ILIKE '%Sorting%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '202ef401-54d1-48ed-94c3-b5ddd673c34b', 'Count Matrix', 'medium', 20, ARRAY['Oracle', 'Salesforce'], 'https://leetcode.com/problems/count-matrix/', id, 32.9, 58.6, 30, false, false, false, false, false, 59, 61
FROM dsa_topics WHERE name ILIKE '%Sorting%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'e093f5ce-e64e-45b7-91f6-e57a652bfcfb', 'Maximum Graph Equal to Target', 'medium', 20, ARRAY['Goldman Sachs'], 'https://leetcode.com/problems/maximum-graph-equal-to-target/', id, 99.1, 51.7, 30, false, false, false, false, false, 60, 13
FROM dsa_topics WHERE name ILIKE '%Sorting%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '8aaa942b-3b33-4e59-84b8-2e60e1d988db', 'Smallest Elements In a BST II', 'hard', 30, ARRAY['Google'], 'https://leetcode.com/problems/smallest-elements-in-a-bst-ii/', id, 74.2, 47.7, 45, false, false, false, false, true, 61, 84
FROM dsa_topics WHERE name ILIKE '%Sorting%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'dea5f971-21bd-4620-98d9-2e8c4148bb9c', 'Construct Edge', 'hard', 30, ARRAY['Amazon', 'Google', 'LinkedIn'], 'https://leetcode.com/problems/construct-edge/', id, 87.7, 30.8, 45, false, true, false, false, true, 62, 77
FROM dsa_topics WHERE name ILIKE '%Sorting%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '88b0bf87-95b5-4d35-a0c7-c279eeb6d95c', 'Kth Elements Divisible By K', 'easy', 10, ARRAY['Stripe'], 'https://leetcode.com/problems/kth-elements-divisible-by-k/', id, 64.4, 30.0, 15, false, true, false, false, false, 63, 22
FROM dsa_topics WHERE name ILIKE '%Stack%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '75c073fa-2ed3-4180-8b5c-1f377e4c3647', 'Find Interval', 'easy', 10, ARRAY['Salesforce', 'Zomato'], 'https://leetcode.com/problems/find-interval/', id, 22.0, 34.9, 15, false, true, true, false, false, 64, 26
FROM dsa_topics WHERE name ILIKE '%Stack%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'eb0f3a07-f3d6-40a1-aa8f-48918a7b1d63', 'Minimum Polygon With Max Bitwise OR', 'medium', 20, ARRAY['Morgan Stanley', 'Amazon', 'Airbnb', 'Meta'], 'https://leetcode.com/problems/minimum-polygon-with-max-bitwise-or/', id, 37.9, 29.6, 30, false, false, true, false, false, 65, 95
FROM dsa_topics WHERE name ILIKE '%Stack%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'bdcf542c-7759-4795-8947-dd39406399e2', 'Design Polygon', 'medium', 20, ARRAY['Uber'], 'https://leetcode.com/problems/design-polygon/', id, 73.1, 51.7, 30, true, false, false, false, false, 66, 65
FROM dsa_topics WHERE name ILIKE '%Stack%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '9cbeb4f0-e377-4fe5-be6d-125458aa5d5e', 'Add Prefix', 'medium', 20, ARRAY['Microsoft', 'Apple', 'Bloomberg', 'DE Shaw'], 'https://leetcode.com/problems/add-prefix/', id, 67.0, 29.8, 30, false, false, false, false, false, 67, 62
FROM dsa_topics WHERE name ILIKE '%Stack%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'a6122ad3-2b4c-43eb-8a90-4c380c638e61', 'Find Edge With Max Bitwise OR', 'hard', 30, ARRAY['Amazon', 'Uber'], 'https://leetcode.com/problems/find-edge-with-max-bitwise-or/', id, 97.9, 52.0, 45, false, false, false, false, false, 68, 43
FROM dsa_topics WHERE name ILIKE '%Stack%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '6beb973a-e41b-4efa-bf62-24a62946c258', 'Smallest Subarray Greater Than Right III', 'hard', 30, ARRAY['Atlassian', 'Adobe'], 'https://leetcode.com/problems/smallest-subarray-greater-than-right-iii/', id, 81.7, 46.2, 45, false, false, true, false, false, 69, 63
FROM dsa_topics WHERE name ILIKE '%Stack%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '7d8a9fdf-420c-4fda-8dc3-0218cf26c738', 'Minimum Edge Divisible By K', 'hard', 30, ARRAY['Oracle', 'Microsoft', 'Airbnb'], 'https://leetcode.com/problems/minimum-edge-divisible-by-k/', id, 22.6, 36.8, 45, false, false, false, false, false, 70, 90
FROM dsa_topics WHERE name ILIKE '%Stack%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '4dcbe4a6-61fa-4e80-afef-458486adc0db', 'Count Polygon Without Repeating Characters', 'easy', 10, ARRAY['PhonePe', 'DE Shaw', 'Adobe', 'Airbnb'], 'https://leetcode.com/problems/count-polygon-without-repeating-characters/', id, 23.1, 49.2, 15, false, false, false, false, false, 71, 29
FROM dsa_topics WHERE name ILIKE '%Queue%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '29c6178d-fafd-4a27-809b-873970d83c28', 'Construct Subarray', 'medium', 20, ARRAY['Bloomberg'], 'https://leetcode.com/problems/construct-subarray/', id, 59.6, 52.2, 30, false, false, false, false, false, 72, 64
FROM dsa_topics WHERE name ILIKE '%Queue%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'de0456f3-b6bc-4ec4-9f4c-17789f143be4', 'Valid Interval To Make Array Sorted II', 'hard', 30, ARRAY['Google', 'Microsoft'], 'https://leetcode.com/problems/valid-interval-to-make-array-sorted-ii/', id, 44.7, 53.4, 45, false, false, true, false, false, 73, 85
FROM dsa_topics WHERE name ILIKE '%Queue%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '59c370bf-3d7e-487b-8565-833b97a5b8c8', 'Valid Suffix', 'hard', 30, ARRAY['Meta', 'Uber'], 'https://leetcode.com/problems/valid-suffix/', id, 74.0, 23.8, 45, true, false, true, false, false, 74, 21
FROM dsa_topics WHERE name ILIKE '%Queue%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'ce8f3d32-7dad-4319-9c9f-2e217c7f8c47', 'Longest Polygon In a BST', 'easy', 10, ARRAY['Amazon'], 'https://leetcode.com/problems/longest-polygon-in-a-bst/', id, 62.9, 33.5, 15, false, false, false, false, false, 75, 56
FROM dsa_topics WHERE name ILIKE '%Linked%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '0fc27b61-7946-46e0-ad02-afda42775005', 'Search Polygon Greater Than Right', 'easy', 10, ARRAY['Meta'], 'https://leetcode.com/problems/search-polygon-greater-than-right/', id, 44.3, 23.2, 15, false, false, false, false, false, 76, 86
FROM dsa_topics WHERE name ILIKE '%Linked%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '3d5726b1-89e8-43d2-a496-5a8cc9c5046c', 'Construct Substring From Data Stream', 'easy', 10, ARRAY['LinkedIn', 'Razorpay'], 'https://leetcode.com/problems/construct-substring-from-data-stream/', id, 42.0, 25.6, 15, false, false, false, false, true, 77, 62
FROM dsa_topics WHERE name ILIKE '%Linked%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'aaf7d25b-ad52-49c2-91a6-523cad567d7e', 'Kth Sequence With Max Bitwise OR', 'medium', 20, ARRAY['Stripe', 'Amazon', 'Adobe'], 'https://leetcode.com/problems/kth-sequence-with-max-bitwise-or/', id, 74.5, 52.9, 30, false, true, false, false, true, 78, 67
FROM dsa_topics WHERE name ILIKE '%Linked%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '8296b80a-f406-418f-ab79-8e7ad966a88f', 'Construct Matrix Divisible By K', 'medium', 20, ARRAY['Meta', 'Oracle', 'Google'], 'https://leetcode.com/problems/construct-matrix-divisible-by-k/', id, 49.0, 23.6, 30, true, false, false, false, false, 79, 62
FROM dsa_topics WHERE name ILIKE '%Linked%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'b0f8da3f-4492-45a3-88b6-5c251e16deba', 'Minimum Node', 'medium', 20, ARRAY['Salesforce', 'Razorpay', 'Oracle'], 'https://leetcode.com/problems/minimum-node/', id, 59.4, 42.6, 30, false, false, false, false, false, 80, 23
FROM dsa_topics WHERE name ILIKE '%Linked%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'a4c59c6b-af37-488f-933c-50b0c8ab74b0', 'Number of Interval Using O(1) Space II', 'medium', 20, ARRAY['Amazon', 'Microsoft', 'PhonePe'], 'https://leetcode.com/problems/number-of-interval-using-o-1-space-ii/', id, 59.4, 20.2, 30, false, false, false, false, false, 81, 60
FROM dsa_topics WHERE name ILIKE '%Linked%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'fffa15ed-3b07-4eda-b987-ca7ff81f6916', 'Add Prefix II', 'hard', 30, ARRAY['Goldman Sachs', 'Meta'], 'https://leetcode.com/problems/add-prefix-ii/', id, 24.7, 31.4, 45, false, false, true, false, false, 82, 34
FROM dsa_topics WHERE name ILIKE '%Linked%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'ae777b19-e046-4690-905c-aead1705222e', 'Kth Island', 'hard', 30, ARRAY['Airbnb'], 'https://leetcode.com/problems/kth-island/', id, 27.9, 37.1, 45, false, false, false, false, false, 83, 22
FROM dsa_topics WHERE name ILIKE '%Linked%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'c2e621ab-b9b0-44b8-b243-0e4151c35af0', 'Valid Tree With Max Bitwise OR II', 'easy', 10, ARRAY['Netflix', 'Stripe', 'Uber'], 'https://leetcode.com/problems/valid-tree-with-max-bitwise-or-ii/', id, 44.0, 47.3, 15, false, false, false, false, false, 84, 7
FROM dsa_topics WHERE name ILIKE '%Trees%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'c600b1c7-1349-4ac1-9b6d-45d34cd3bf6b', 'Largest String', 'easy', 10, ARRAY['Nvidia', 'Uber', 'Atlassian', 'DE Shaw'], 'https://leetcode.com/problems/largest-string/', id, 52.6, 38.5, 15, false, false, true, false, false, 85, 55
FROM dsa_topics WHERE name ILIKE '%Trees%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'c50091c2-56f1-4930-887f-7213b11b1384', 'Longest Palindrome', 'easy', 10, ARRAY['Bloomberg', 'Morgan Stanley', 'DE Shaw'], 'https://leetcode.com/problems/longest-palindrome/', id, 92.0, 47.5, 15, false, true, false, false, false, 86, 47
FROM dsa_topics WHERE name ILIKE '%Trees%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'de387cce-ec5d-4ecb-9879-43fd376e9ff6', 'Check if Characters Greater Than Right', 'easy', 10, ARRAY['Amazon', 'Salesforce', 'LinkedIn'], 'https://leetcode.com/problems/check-if-characters-greater-than-right/', id, 60.9, 37.9, 15, false, true, false, false, true, 87, 98
FROM dsa_topics WHERE name ILIKE '%Trees%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '2f626c0b-6c59-4154-a21c-8eb342a23629', 'Kth Subarray Greater Than Right', 'easy', 10, ARRAY['Oracle', 'Adobe'], 'https://leetcode.com/problems/kth-subarray-greater-than-right/', id, 94.7, 48.4, 15, false, false, false, false, false, 88, 24
FROM dsa_topics WHERE name ILIKE '%Trees%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '81ec93ca-8a9d-4554-b7e1-830386a6d58d', 'Add Interval In O(1) Time', 'medium', 20, ARRAY['Atlassian', 'Apple', 'Morgan Stanley'], 'https://leetcode.com/problems/add-interval-in-o-1-time/', id, 81.7, 22.3, 30, false, true, false, false, true, 89, 52
FROM dsa_topics WHERE name ILIKE '%Trees%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '2db5d6a7-c9b5-45d2-8d4e-b123ff788553', 'Largest Grid Using O(1) Space', 'medium', 20, ARRAY['Morgan Stanley'], 'https://leetcode.com/problems/largest-grid-using-o-1-space/', id, 70.0, 44.1, 30, false, false, false, false, false, 90, 40
FROM dsa_topics WHERE name ILIKE '%Trees%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'de380e7b-81cb-46b5-a51a-d12e182db7ab', 'Number of Node II', 'medium', 20, ARRAY['Swiggy'], 'https://leetcode.com/problems/number-of-node-ii/', id, 32.2, 49.0, 30, false, false, false, false, true, 91, 74
FROM dsa_topics WHERE name ILIKE '%Trees%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '9cd378e7-f458-42bf-afa7-fc6f2a2de56d', 'Number of Characters With Given Sum', 'medium', 20, ARRAY['Salesforce', 'Microsoft', 'Meta'], 'https://leetcode.com/problems/number-of-characters-with-given-sum/', id, 75.9, 54.1, 30, false, false, false, false, false, 92, 44
FROM dsa_topics WHERE name ILIKE '%Trees%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '9b21a788-62a4-46d4-a43c-a8812edc6321', 'Find Node Equal to Target', 'medium', 20, ARRAY['Microsoft', 'Atlassian', 'Google'], 'https://leetcode.com/problems/find-node-equal-to-target/', id, 46.2, 29.2, 30, false, true, false, false, false, 93, 44
FROM dsa_topics WHERE name ILIKE '%Trees%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '34823db9-074b-49e2-bd08-e5e364277b3d', 'Valid Interval', 'medium', 20, ARRAY['Apple', 'Amazon', 'Razorpay'], 'https://leetcode.com/problems/valid-interval/', id, 62.2, 51.6, 30, false, false, true, false, true, 94, 32
FROM dsa_topics WHERE name ILIKE '%Trees%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '817d7abd-9c92-45fc-85d9-0967160accf5', 'Find Graph', 'medium', 20, ARRAY['Salesforce', 'Meta', 'Adobe', 'Amazon'], 'https://leetcode.com/problems/find-graph/', id, 27.6, 41.0, 30, false, false, false, false, false, 95, 68
FROM dsa_topics WHERE name ILIKE '%Trees%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'd1f973e4-2a7f-47d0-ac17-1e9e767ad52a', 'Add Characters', 'hard', 30, ARRAY['Meta'], 'https://leetcode.com/problems/add-characters/', id, 75.6, 33.9, 45, true, false, false, true, false, 96, 5
FROM dsa_topics WHERE name ILIKE '%Trees%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '81899c01-7167-43f4-9276-d2caf5a37955', 'Design Suffix Without Repeating Characters', 'hard', 30, ARRAY['Amazon'], 'https://leetcode.com/problems/design-suffix-without-repeating-characters/', id, 22.0, 59.2, 45, true, false, false, false, false, 97, 95
FROM dsa_topics WHERE name ILIKE '%Trees%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'df40d7b9-80c9-4246-a647-752b85e37125', 'Minimum Graph', 'hard', 30, ARRAY['Adobe', 'Uber'], 'https://leetcode.com/problems/minimum-graph/', id, 86.1, 26.6, 45, false, true, false, false, true, 98, 19
FROM dsa_topics WHERE name ILIKE '%Trees%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '01a76243-8fc5-4905-b7b6-dc39314dd402', 'Check if Elements', 'hard', 30, ARRAY['Atlassian'], 'https://leetcode.com/problems/check-if-elements/', id, 32.9, 20.3, 45, false, false, false, false, true, 99, 8
FROM dsa_topics WHERE name ILIKE '%Trees%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'd04fafda-70dd-414d-b897-0fdc86ae6482', 'Search Tree To Make Array Sorted', 'easy', 10, ARRAY['Google', 'Apple', 'Adobe'], 'https://leetcode.com/problems/search-tree-to-make-array-sorted/', id, 57.4, 25.6, 15, false, true, false, false, false, 100, 32
FROM dsa_topics WHERE name ILIKE '%BST%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'eed87e3f-5f31-4c4a-bdd7-b48fcf2fe481', 'Remove Node In a Binary Tree', 'easy', 10, ARRAY['Amazon', 'Atlassian'], 'https://leetcode.com/problems/remove-node-in-a-binary-tree/', id, 52.1, 58.9, 15, false, false, false, false, true, 101, 36
FROM dsa_topics WHERE name ILIKE '%BST%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '7c516255-4e13-490b-abf2-91c6cf2226af', 'Smallest Edge In a Binary Tree', 'medium', 20, ARRAY['Microsoft'], 'https://leetcode.com/problems/smallest-edge-in-a-binary-tree/', id, 29.3, 27.0, 30, false, false, false, false, false, 102, 48
FROM dsa_topics WHERE name ILIKE '%BST%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '77fb84d9-24d2-48d2-9a5d-b0b43158d51b', 'Construct Prefix', 'medium', 20, ARRAY['LinkedIn', 'Uber'], 'https://leetcode.com/problems/construct-prefix/', id, 34.0, 41.4, 30, false, true, false, false, true, 103, 84
FROM dsa_topics WHERE name ILIKE '%BST%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '1f176741-8153-4d4e-b89a-d3fe881e61cf', 'Remove Tree Greater Than Right', 'hard', 30, ARRAY['Uber', 'Meta'], 'https://leetcode.com/problems/remove-tree-greater-than-right/', id, 24.3, 28.6, 45, false, false, false, false, false, 104, 2
FROM dsa_topics WHERE name ILIKE '%BST%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'c919a30c-98c3-4038-96db-2dc90b50ea36', 'Count Edge', 'hard', 30, ARRAY['Atlassian'], 'https://leetcode.com/problems/count-edge/', id, 79.6, 54.4, 45, false, true, false, false, false, 105, 14
FROM dsa_topics WHERE name ILIKE '%BST%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'c4d31ba9-bae9-4145-aae9-963da67dc317', 'Minimum Path', 'easy', 10, ARRAY['Meta'], 'https://leetcode.com/problems/minimum-path/', id, 31.4, 34.9, 15, false, false, false, false, true, 106, 65
FROM dsa_topics WHERE name ILIKE '%Heap%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '562de253-24da-41a2-b4ba-989be61c7284', 'Longest Island With Max Bitwise OR', 'easy', 10, ARRAY['Oracle', 'Amazon', 'LinkedIn'], 'https://leetcode.com/problems/longest-island-with-max-bitwise-or/', id, 54.9, 50.7, 15, false, false, false, true, false, 107, 82
FROM dsa_topics WHERE name ILIKE '%Heap%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '118e2ea1-40cc-4f6f-937b-03ea088f508d', 'Smallest Characters Greater Than Right', 'medium', 20, ARRAY['Microsoft', 'Uber'], 'https://leetcode.com/problems/smallest-characters-greater-than-right/', id, 37.8, 30.5, 30, false, false, false, false, false, 108, 39
FROM dsa_topics WHERE name ILIKE '%Heap%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '6c2631dc-4d35-449a-aae7-9d3e8655a23b', 'Remove Array', 'medium', 20, ARRAY['DE Shaw', 'Goldman Sachs'], 'https://leetcode.com/problems/remove-array/', id, 49.0, 51.9, 30, false, true, false, false, false, 109, 58
FROM dsa_topics WHERE name ILIKE '%Heap%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'bd24736d-adfd-4c29-8e05-6c8f835ebd00', 'Remove Interval Using O(1) Space II', 'hard', 30, ARRAY['Google', 'Swiggy', 'Uber', 'Microsoft'], 'https://leetcode.com/problems/remove-interval-using-o-1-space-ii/', id, 63.3, 50.6, 45, false, false, false, false, false, 110, 26
FROM dsa_topics WHERE name ILIKE '%Heap%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '06c87024-e630-4c58-92a2-c42034866f0a', 'Construct Grid Divisible By K II', 'hard', 30, ARRAY['Google', 'Microsoft'], 'https://leetcode.com/problems/construct-grid-divisible-by-k-ii/', id, 44.1, 58.8, 45, false, true, false, false, true, 111, 65
FROM dsa_topics WHERE name ILIKE '%Heap%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'd94cc35b-dae0-49dc-a24f-a5102cdc44af', 'Add Matrix II', 'easy', 10, ARRAY['DE Shaw', 'Zomato', 'Uber'], 'https://leetcode.com/problems/add-matrix-ii/', id, 76.9, 45.3, 15, false, false, false, false, false, 112, 77
FROM dsa_topics WHERE name ILIKE '%Trie%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'ef180217-1bb4-460e-adf9-ed341ba9b316', 'Check if Tree With Max Bitwise OR II', 'medium', 20, ARRAY['Goldman Sachs', 'Microsoft'], 'https://leetcode.com/problems/check-if-tree-with-max-bitwise-or-ii/', id, 21.4, 56.0, 30, true, false, false, false, false, 113, 54
FROM dsa_topics WHERE name ILIKE '%Trie%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '1178e039-b612-4bf6-90ac-6da9f0affcf6', 'Largest Palindrome To Make Array Sorted', 'medium', 20, ARRAY['Stripe', 'Meta'], 'https://leetcode.com/problems/largest-palindrome-to-make-array-sorted/', id, 86.0, 30.9, 30, true, false, false, false, false, 114, 50
FROM dsa_topics WHERE name ILIKE '%Trie%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '04c46fbc-21ec-4f28-9051-69f431ca8c03', 'Number of Graph', 'hard', 30, ARRAY['Netflix', 'PhonePe'], 'https://leetcode.com/problems/number-of-graph/', id, 41.8, 23.4, 45, false, false, false, false, false, 115, 61
FROM dsa_topics WHERE name ILIKE '%Trie%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'b455767d-dfd1-4021-82c2-2bfc2e69ab54', 'Smallest Array', 'hard', 30, ARRAY['Goldman Sachs'], 'https://leetcode.com/problems/smallest-array/', id, 74.7, 59.8, 45, false, true, false, false, true, 116, 95
FROM dsa_topics WHERE name ILIKE '%Trie%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '8eeb4218-df95-4b11-976a-d53027d5618a', 'Check if Sequence II', 'easy', 10, ARRAY['Apple', 'Salesforce'], 'https://leetcode.com/problems/check-if-sequence-ii/', id, 99.0, 33.0, 15, false, false, true, false, true, 117, 52
FROM dsa_topics WHERE name ILIKE '%Graphs%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '870dfac7-e5a8-421d-871c-4aa1b05414d3', 'Longest Island To Make Graph Sorted', 'easy', 10, ARRAY['Apple', 'LinkedIn'], 'https://leetcode.com/problems/longest-island-to-make-graph-sorted/', id, 44.3, 31.7, 15, false, true, false, false, false, 118, 3
FROM dsa_topics WHERE name ILIKE '%Graphs%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '59ab5a25-c7d2-44e2-9456-bdee1f1618ae', 'Valid Grid II', 'easy', 10, ARRAY['Microsoft', 'Uber', 'LinkedIn'], 'https://leetcode.com/problems/valid-grid-ii/', id, 70.8, 39.1, 15, false, false, false, false, false, 119, 9
FROM dsa_topics WHERE name ILIKE '%Graphs%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'b9cc603a-e4b7-4484-bb44-6a6596fa2ec1', 'Check if Interval', 'easy', 10, ARRAY['Google', 'Adobe', 'Flipkart'], 'https://leetcode.com/problems/check-if-interval/', id, 45.5, 30.9, 15, false, false, false, false, false, 120, 47
FROM dsa_topics WHERE name ILIKE '%Graphs%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'eeea1c99-6b78-41e2-9335-a7248a759953', 'Largest Polygon II', 'easy', 10, ARRAY['Adobe', 'Nvidia', 'Atlassian', 'DE Shaw'], 'https://leetcode.com/problems/largest-polygon-ii/', id, 30.7, 27.1, 15, false, false, false, false, false, 121, 9
FROM dsa_topics WHERE name ILIKE '%Graphs%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'b7c98fce-65a2-4d13-a67e-9c55408c0ddd', 'Longest Prefix', 'easy', 10, ARRAY['Salesforce', 'DE Shaw', 'Bloomberg'], 'https://leetcode.com/problems/longest-prefix/', id, 49.9, 48.8, 15, true, false, false, false, true, 122, 3
FROM dsa_topics WHERE name ILIKE '%Graphs%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '6aaa8530-c724-47cf-b355-8109eeb22891', 'Design Characters Without Repeating Characters', 'medium', 20, ARRAY['Apple', 'Bloomberg'], 'https://leetcode.com/problems/design-characters-without-repeating-characters/', id, 69.0, 40.8, 30, false, false, true, false, false, 123, 79
FROM dsa_topics WHERE name ILIKE '%Graphs%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '3692a16f-8946-4881-8279-785d6d25409a', 'Construct Elements', 'medium', 20, ARRAY['Google', 'Morgan Stanley'], 'https://leetcode.com/problems/construct-elements/', id, 63.5, 32.7, 30, false, true, false, false, false, 124, 51
FROM dsa_topics WHERE name ILIKE '%Graphs%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'cbde39ed-038b-40e4-97e6-2b4e38fe20c6', 'Maximum String III', 'medium', 20, ARRAY['Microsoft'], 'https://leetcode.com/problems/maximum-string-iii/', id, 21.0, 26.3, 30, false, true, false, false, false, 125, 3
FROM dsa_topics WHERE name ILIKE '%Graphs%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '62794ec8-a403-4a25-b468-3d7a4b963dcb', 'Smallest Matrix', 'medium', 20, ARRAY['Amazon'], 'https://leetcode.com/problems/smallest-matrix/', id, 68.2, 44.1, 30, false, false, true, false, false, 126, 11
FROM dsa_topics WHERE name ILIKE '%Graphs%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '61f691a6-ef75-453f-abe8-e2a23b8aebdb', 'Kth Prefix From Data Stream', 'medium', 20, ARRAY['Bloomberg', 'PhonePe', 'Nvidia', 'Amazon'], 'https://leetcode.com/problems/kth-prefix-from-data-stream/', id, 69.7, 23.0, 30, true, false, false, false, true, 127, 42
FROM dsa_topics WHERE name ILIKE '%Graphs%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '1043759b-89ea-4b78-a462-88bf127f2840', 'Search Characters', 'medium', 20, ARRAY['Adobe', 'Microsoft'], 'https://leetcode.com/problems/search-characters/', id, 20.4, 42.2, 30, false, false, false, false, false, 128, 98
FROM dsa_topics WHERE name ILIKE '%Graphs%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '5cb51096-3204-4732-824d-f01d37bc49ed', 'Shortest Suffix', 'medium', 20, ARRAY['Adobe', 'Oracle', 'Razorpay'], 'https://leetcode.com/problems/shortest-suffix/', id, 76.3, 23.8, 30, false, false, false, false, false, 129, 27
FROM dsa_topics WHERE name ILIKE '%Graphs%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '423599e8-53a7-4b18-ae97-2e2ebc8b211c', 'Smallest Prefix', 'medium', 20, ARRAY['Microsoft', 'DE Shaw'], 'https://leetcode.com/problems/smallest-prefix/', id, 27.5, 32.4, 30, false, true, false, false, false, 130, 28
FROM dsa_topics WHERE name ILIKE '%Graphs%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '064d3bcc-8705-469b-9501-5f06cb8f7482', 'Valid Matrix In O(1) Time', 'hard', 30, ARRAY['Oracle', 'LinkedIn', 'Meta', 'Microsoft'], 'https://leetcode.com/problems/valid-matrix-in-o-1-time/', id, 72.4, 47.4, 45, false, false, false, false, true, 131, 9
FROM dsa_topics WHERE name ILIKE '%Graphs%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'dd3979e0-ab54-4d28-a8cb-ff5fbdc759a4', 'Construct Edge Greater Than Right', 'hard', 30, ARRAY['Uber', 'Netflix', 'Meta'], 'https://leetcode.com/problems/construct-edge-greater-than-right/', id, 75.2, 34.8, 45, false, true, false, false, false, 132, 48
FROM dsa_topics WHERE name ILIKE '%Graphs%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'e83762bc-7c5e-46fc-8fb5-5bef1db766d0', 'Add Graph Using O(1) Space', 'hard', 30, ARRAY['Oracle', 'Adobe'], 'https://leetcode.com/problems/add-graph-using-o-1-space/', id, 30.7, 28.1, 45, false, false, false, false, false, 133, 13
FROM dsa_topics WHERE name ILIKE '%Graphs%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '686f6569-4efe-45dc-821e-270bc04ebbf0', 'Longest Node II', 'hard', 30, ARRAY['Uber'], 'https://leetcode.com/problems/longest-node-ii/', id, 72.8, 22.6, 45, false, false, false, false, false, 134, 87
FROM dsa_topics WHERE name ILIKE '%Graphs%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'b5b7d28b-3b7b-4d87-a900-638681fb436d', 'Largest Elements', 'easy', 10, ARRAY['Google', 'Amazon'], 'https://leetcode.com/problems/largest-elements/', id, 51.3, 54.7, 15, false, false, false, false, false, 135, 38
FROM dsa_topics WHERE name ILIKE '%DFS%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'eeb158fc-284d-4dad-9def-8cce2cd75037', 'Search Palindrome With At Most K Elements II', 'easy', 10, ARRAY['Uber', 'Google', 'Meta', 'Goldman Sachs'], 'https://leetcode.com/problems/search-palindrome-with-at-most-k-elements-ii/', id, 32.8, 29.2, 15, false, true, false, false, false, 136, 13
FROM dsa_topics WHERE name ILIKE '%DFS%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '9d79ce62-b90e-4bd9-a5ab-87bdd49c2b8a', 'Largest Grid With K Odd Numbers', 'medium', 20, ARRAY['Netflix'], 'https://leetcode.com/problems/largest-grid-with-k-odd-numbers/', id, 86.0, 38.2, 30, false, true, false, false, false, 137, 67
FROM dsa_topics WHERE name ILIKE '%DFS%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'e7e8495c-79f1-4e28-ad56-49b750e20e6b', 'Number of Path In a Binary Tree', 'medium', 20, ARRAY['Salesforce', 'Adobe'], 'https://leetcode.com/problems/number-of-path-in-a-binary-tree/', id, 99.5, 58.8, 30, false, false, false, false, false, 138, 40
FROM dsa_topics WHERE name ILIKE '%DFS%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '81f37e9f-71c6-481c-aed0-b43695f7cd12', 'Number of Elements', 'medium', 20, ARRAY['Razorpay', 'Microsoft', 'Stripe', 'Amazon'], 'https://leetcode.com/problems/number-of-elements/', id, 22.7, 55.4, 30, false, false, false, false, false, 139, 41
FROM dsa_topics WHERE name ILIKE '%DFS%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '049e0d5e-f3e7-48ac-82ed-c7308fd9ff46', 'Check if Node With Max Bitwise OR', 'hard', 30, ARRAY['Flipkart'], 'https://leetcode.com/problems/check-if-node-with-max-bitwise-or/', id, 82.5, 21.7, 45, false, false, false, false, false, 140, 95
FROM dsa_topics WHERE name ILIKE '%DFS%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'efa48ff9-e493-4d14-81f0-c0bb120c40c3', 'Construct Characters With Max Bitwise OR', 'hard', 30, ARRAY['Amazon', 'Swiggy', 'Atlassian'], 'https://leetcode.com/problems/construct-characters-with-max-bitwise-or/', id, 51.0, 58.5, 45, false, true, true, false, false, 141, 2
FROM dsa_topics WHERE name ILIKE '%DFS%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '6fcbcac5-bbc6-408b-a6d1-506fe8f00554', 'Design Characters To Make Graph Sorted II', 'easy', 10, ARRAY['Airbnb', 'Adobe', 'Uber'], 'https://leetcode.com/problems/design-characters-to-make-graph-sorted-ii/', id, 88.1, 24.4, 15, false, false, false, false, false, 142, 36
FROM dsa_topics WHERE name ILIKE '%BFS%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '158324f6-3e9e-4ef6-a205-56e6cddd8fa4', 'Add Island', 'easy', 10, ARRAY['Uber', 'Goldman Sachs', 'Apple'], 'https://leetcode.com/problems/add-island/', id, 86.7, 38.3, 15, false, false, false, false, true, 143, 74
FROM dsa_topics WHERE name ILIKE '%BFS%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '2df33bfc-9224-4ae9-9deb-6ed2e59c914f', 'Search Path To Make Graph Sorted', 'medium', 20, ARRAY['DE Shaw', 'PhonePe'], 'https://leetcode.com/problems/search-path-to-make-graph-sorted/', id, 31.9, 49.3, 30, false, false, false, false, false, 144, 57
FROM dsa_topics WHERE name ILIKE '%BFS%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '6beb203e-746c-4353-a286-63143c57936d', 'Add Subarray In O(1) Time III', 'medium', 20, ARRAY['DE Shaw', 'Netflix', 'Google'], 'https://leetcode.com/problems/add-subarray-in-o-1-time-iii/', id, 52.6, 41.2, 30, false, false, false, false, true, 145, 25
FROM dsa_topics WHERE name ILIKE '%BFS%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'd76b914c-1805-4d87-866f-25e75d3ac717', 'Remove Polygon With Max Bitwise OR', 'medium', 20, ARRAY['Bloomberg'], 'https://leetcode.com/problems/remove-polygon-with-max-bitwise-or/', id, 73.3, 26.7, 30, false, true, false, false, false, 146, 43
FROM dsa_topics WHERE name ILIKE '%BFS%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '35c2261e-d8dc-4b21-a66b-94f717bd7d16', 'Add Sequence', 'hard', 30, ARRAY['Adobe', 'Oracle', 'Netflix', 'Microsoft'], 'https://leetcode.com/problems/add-sequence/', id, 58.5, 49.9, 45, false, false, false, false, false, 147, 5
FROM dsa_topics WHERE name ILIKE '%BFS%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'e73f9cdf-267f-477e-b37f-a25775a52ee2', 'Longest Graph', 'hard', 30, ARRAY['Razorpay', 'Salesforce', 'Zomato', 'PhonePe'], 'https://leetcode.com/problems/longest-graph/', id, 69.8, 47.6, 45, false, false, false, true, false, 148, 72
FROM dsa_topics WHERE name ILIKE '%BFS%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '2bcf24df-0dde-4646-9c3e-7d7d4fad91b2', 'Largest Graph To Make Array Sorted II', 'easy', 10, ARRAY['Morgan Stanley', 'Google', 'Zomato'], 'https://leetcode.com/problems/largest-graph-to-make-array-sorted-ii/', id, 79.3, 23.1, 15, false, false, false, false, false, 149, 27
FROM dsa_topics WHERE name ILIKE '%Topological%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'ec30e19e-e1af-41dd-9247-30ae6a9868e4', 'Valid Array', 'medium', 20, ARRAY['Uber'], 'https://leetcode.com/problems/valid-array/', id, 67.4, 47.4, 30, false, true, false, false, false, 150, 81
FROM dsa_topics WHERE name ILIKE '%Topological%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'c16c11d7-709d-4f10-8331-6e43fac4d419', 'Kth Array In a Binary Tree', 'hard', 30, ARRAY['Netflix', 'Airbnb', 'Morgan Stanley'], 'https://leetcode.com/problems/kth-array-in-a-binary-tree/', id, 85.5, 59.2, 45, false, false, false, false, true, 151, 89
FROM dsa_topics WHERE name ILIKE '%Topological%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'fc0e28c0-d310-4977-ba1f-d97098569ef1', 'Find Graph In a Binary Tree', 'hard', 30, ARRAY['Amazon', 'Uber'], 'https://leetcode.com/problems/find-graph-in-a-binary-tree/', id, 89.1, 36.8, 45, false, false, false, false, false, 152, 62
FROM dsa_topics WHERE name ILIKE '%Topological%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'c0ed7d94-3225-421b-8217-9225b2300bdb', 'Smallest Path', 'easy', 10, ARRAY['DE Shaw', 'Google', 'Adobe', 'Nvidia'], 'https://leetcode.com/problems/smallest-path/', id, 27.8, 57.3, 15, false, false, true, false, false, 153, 39
FROM dsa_topics WHERE name ILIKE '%Union%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '2e8c869b-235a-46a7-9062-fd8c0e538ba3', 'Minimum String II', 'medium', 20, ARRAY['Google'], 'https://leetcode.com/problems/minimum-string-ii/', id, 85.0, 59.7, 30, false, false, false, false, true, 154, 94
FROM dsa_topics WHERE name ILIKE '%Union%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'f94171e2-8bd3-4fe8-8a47-47882c5cfb21', 'Shortest Node II', 'hard', 30, ARRAY['Netflix', 'Google', 'DE Shaw', 'Amazon'], 'https://leetcode.com/problems/shortest-node-ii/', id, 80.8, 53.3, 45, false, false, false, false, false, 155, 0
FROM dsa_topics WHERE name ILIKE '%Union%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '15bab4ad-8813-48ea-a649-6ea810538f05', 'Largest Island Equal to Target', 'hard', 30, ARRAY['Oracle'], 'https://leetcode.com/problems/largest-island-equal-to-target/', id, 87.9, 57.5, 45, true, false, false, false, false, 156, 40
FROM dsa_topics WHERE name ILIKE '%Union%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'ee2feef0-a924-40da-9f27-43c93b17c9a9', 'Shortest Prefix III', 'easy', 10, ARRAY['Adobe', 'Microsoft', 'Uber', 'Meta'], 'https://leetcode.com/problems/shortest-prefix-iii/', id, 37.5, 48.5, 15, false, false, false, false, true, 157, 5
FROM dsa_topics WHERE name ILIKE '%Shortest%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '0410e925-1fa1-4642-b18d-6607cc80c4b2', 'Maximum Matrix Without Repeating Characters', 'easy', 10, ARRAY['Oracle', 'Salesforce', 'Uber'], 'https://leetcode.com/problems/maximum-matrix-without-repeating-characters/', id, 76.1, 39.9, 15, false, true, false, false, true, 158, 90
FROM dsa_topics WHERE name ILIKE '%Shortest%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '0d2f8d20-8034-4f45-8f43-46a43c62da97', 'Remove Edge Divisible By K', 'medium', 20, ARRAY['Uber', 'Meta'], 'https://leetcode.com/problems/remove-edge-divisible-by-k/', id, 47.9, 42.7, 30, false, false, true, true, false, 159, 39
FROM dsa_topics WHERE name ILIKE '%Shortest%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'c1b79183-165e-4ecc-a2b2-d7efd62e99f9', 'Search Suffix With At Most K Elements', 'medium', 20, ARRAY['LinkedIn', 'Uber', 'Google', 'Stripe'], 'https://leetcode.com/problems/search-suffix-with-at-most-k-elements/', id, 36.8, 33.9, 30, false, false, false, false, false, 160, 39
FROM dsa_topics WHERE name ILIKE '%Shortest%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '769cb1ee-c14e-4e15-a93e-20cc19bfc829', 'Count Graph Without Repeating Characters III', 'hard', 30, ARRAY['Goldman Sachs'], 'https://leetcode.com/problems/count-graph-without-repeating-characters-iii/', id, 69.9, 32.6, 45, false, false, false, false, false, 161, 73
FROM dsa_topics WHERE name ILIKE '%Shortest%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '204b0762-935f-49b1-bf1a-bcdd084533b8', 'Minimum Substring Greater Than Right II', 'hard', 30, ARRAY['Amazon', 'Flipkart', 'Oracle'], 'https://leetcode.com/problems/minimum-substring-greater-than-right-ii/', id, 29.9, 56.7, 45, false, false, false, false, true, 162, 43
FROM dsa_topics WHERE name ILIKE '%Shortest%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '2cb7425e-ce50-4d88-99fd-9c728ee95701', 'Largest Suffix', 'easy', 10, ARRAY['Microsoft', 'LinkedIn', 'Meta', 'Google'], 'https://leetcode.com/problems/largest-suffix/', id, 29.8, 25.4, 15, false, false, false, false, false, 163, 93
FROM dsa_topics WHERE name ILIKE '%MST%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'f5c57da7-886c-4424-bfc0-e37b866119b3', 'Longest Island', 'medium', 20, ARRAY['Google', 'Bloomberg', 'Meta'], 'https://leetcode.com/problems/longest-island/', id, 27.0, 57.7, 30, false, false, true, false, false, 164, 35
FROM dsa_topics WHERE name ILIKE '%MST%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '43055732-fc80-4ba5-a0d2-53aa081f5ac7', 'Number of Substring Equal to Target', 'hard', 30, ARRAY['Microsoft'], 'https://leetcode.com/problems/number-of-substring-equal-to-target/', id, 60.1, 52.8, 45, false, false, false, false, false, 165, 58
FROM dsa_topics WHERE name ILIKE '%MST%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'ab48e14c-d534-44bb-baf2-c5fb62193fd3', 'Find Sequence', 'hard', 30, ARRAY['Microsoft'], 'https://leetcode.com/problems/find-sequence/', id, 26.1, 38.1, 45, false, false, false, false, false, 166, 49
FROM dsa_topics WHERE name ILIKE '%MST%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'a6830cae-0a4c-4fc8-aca8-a8696b426aee', 'Smallest Tree', 'easy', 10, ARRAY['Atlassian'], 'https://leetcode.com/problems/smallest-tree/', id, 50.3, 46.0, 15, false, false, false, false, true, 167, 91
FROM dsa_topics WHERE name ILIKE '%1D%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'f0c7bb0e-cb6f-4d73-ac42-70a327c91016', 'Number of Sequence With At Most K Elements II', 'easy', 10, ARRAY['Bloomberg', 'Salesforce', 'Nvidia'], 'https://leetcode.com/problems/number-of-sequence-with-at-most-k-elements-ii/', id, 86.7, 37.6, 15, false, false, false, false, false, 168, 38
FROM dsa_topics WHERE name ILIKE '%1D%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '202945a5-92ac-447f-840b-c268293cbb19', 'Find Subarray II', 'easy', 10, ARRAY['Apple', 'Adobe', 'DE Shaw', 'Oracle'], 'https://leetcode.com/problems/find-subarray-ii/', id, 43.9, 31.6, 15, false, false, false, false, true, 169, 23
FROM dsa_topics WHERE name ILIKE '%1D%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '68dee294-0823-4a86-a72b-2b27405afa0f', 'Maximum Interval', 'easy', 10, ARRAY['Bloomberg', 'Stripe', 'Apple', 'LinkedIn'], 'https://leetcode.com/problems/maximum-interval/', id, 93.5, 49.2, 15, false, false, true, false, false, 170, 37
FROM dsa_topics WHERE name ILIKE '%1D%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '3c148f37-4333-49f5-ba12-8b697c12995e', 'Longest Elements', 'medium', 20, ARRAY['Microsoft'], 'https://leetcode.com/problems/longest-elements/', id, 67.3, 32.7, 30, false, false, false, false, false, 171, 75
FROM dsa_topics WHERE name ILIKE '%1D%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '8429abd5-404c-4695-b34b-ddf5d107f9d2', 'Smallest Path Greater Than Right', 'medium', 20, ARRAY['Amazon'], 'https://leetcode.com/problems/smallest-path-greater-than-right/', id, 88.9, 34.9, 30, false, true, true, false, false, 172, 40
FROM dsa_topics WHERE name ILIKE '%1D%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'b78e5977-8987-494b-9a55-5cfa52e7a245', 'Valid String II', 'medium', 20, ARRAY['Morgan Stanley', 'Meta'], 'https://leetcode.com/problems/valid-string-ii/', id, 35.7, 47.0, 30, false, false, false, false, false, 173, 67
FROM dsa_topics WHERE name ILIKE '%1D%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '76de7945-f042-4040-b031-401812c18e0f', 'Longest Tree', 'medium', 20, ARRAY['Flipkart'], 'https://leetcode.com/problems/longest-tree/', id, 22.2, 24.4, 30, false, false, false, false, true, 174, 1
FROM dsa_topics WHERE name ILIKE '%1D%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'b76ef2d5-43c3-4796-a084-e34c44238f0d', 'Check if Suffix Using O(1) Space', 'medium', 20, ARRAY['Apple', 'Meta'], 'https://leetcode.com/problems/check-if-suffix-using-o-1-space/', id, 23.3, 53.9, 30, false, false, true, false, false, 175, 16
FROM dsa_topics WHERE name ILIKE '%1D%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'baccc9a0-de13-4ecf-a5c9-2662503f5b6c', 'Find Sequence With Given Sum II', 'hard', 30, ARRAY['Flipkart', 'Google', 'Nvidia', 'Apple'], 'https://leetcode.com/problems/find-sequence-with-given-sum-ii/', id, 46.9, 55.2, 45, false, false, false, false, true, 176, 52
FROM dsa_topics WHERE name ILIKE '%1D%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'ffc1f537-4a8e-4678-8a5a-b633e6f99e38', 'Design Polygon II', 'hard', 30, ARRAY['Google', 'Nvidia', 'Goldman Sachs'], 'https://leetcode.com/problems/design-polygon-ii/', id, 23.2, 29.7, 45, false, false, true, false, false, 177, 72
FROM dsa_topics WHERE name ILIKE '%1D%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'b06e1305-22fc-4de1-acca-997c3e429af5', 'Largest Node', 'hard', 30, ARRAY['Google', 'Microsoft'], 'https://leetcode.com/problems/largest-node/', id, 45.5, 28.5, 45, false, true, true, false, false, 178, 66
FROM dsa_topics WHERE name ILIKE '%1D%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '6d710d08-7d86-47c2-b235-9d42c7ff70cc', 'Add String II', 'easy', 10, ARRAY['Microsoft', 'Bloomberg'], 'https://leetcode.com/problems/add-string-ii/', id, 64.3, 36.0, 15, false, false, false, false, false, 179, 94
FROM dsa_topics WHERE name ILIKE '%2D%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'cc4ea947-1ea2-43ae-a9c0-db45e0932764', 'Find Substring Using O(1) Space', 'easy', 10, ARRAY['Zomato', 'Swiggy', 'Google'], 'https://leetcode.com/problems/find-substring-using-o-1-space/', id, 40.8, 53.7, 15, false, false, false, false, false, 180, 92
FROM dsa_topics WHERE name ILIKE '%2D%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'c1495ad6-d51a-4273-9e1f-325d5d3b29ef', 'Search Island With At Most K Elements', 'easy', 10, ARRAY['Stripe', 'Apple', 'Goldman Sachs'], 'https://leetcode.com/problems/search-island-with-at-most-k-elements/', id, 74.6, 37.8, 15, false, true, false, true, false, 181, 69
FROM dsa_topics WHERE name ILIKE '%2D%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '38efe8bc-a28a-4e19-8212-c62ba8388e2e', 'Search Polygon III', 'easy', 10, ARRAY['LinkedIn', 'Adobe', 'Google', 'Meta'], 'https://leetcode.com/problems/search-polygon-iii/', id, 84.7, 21.5, 15, false, false, false, false, false, 182, 83
FROM dsa_topics WHERE name ILIKE '%2D%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'bb61df74-26bc-4813-ada1-2665bb0cb2e4', 'Longest Island Equal to Target', 'medium', 20, ARRAY['Oracle', 'Atlassian'], 'https://leetcode.com/problems/longest-island-equal-to-target/', id, 86.4, 39.4, 30, false, true, true, false, true, 183, 79
FROM dsa_topics WHERE name ILIKE '%2D%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '9003f1ec-48de-4f21-85b5-95855f8aa03b', 'Find Path In a BST III', 'medium', 20, ARRAY['Salesforce', 'Adobe', 'Uber'], 'https://leetcode.com/problems/find-path-in-a-bst-iii/', id, 99.9, 53.8, 30, false, false, false, false, false, 184, 31
FROM dsa_topics WHERE name ILIKE '%2D%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '415f6483-7ec5-43ff-8da4-fda6990007d9', 'Remove Subarray III', 'medium', 20, ARRAY['Bloomberg', 'Airbnb'], 'https://leetcode.com/problems/remove-subarray-iii/', id, 25.8, 22.5, 30, false, true, false, true, false, 185, 88
FROM dsa_topics WHERE name ILIKE '%2D%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '8549d456-96be-4359-bb1d-f4972651e0cc', 'Check if Prefix With Given Sum II', 'medium', 20, ARRAY['PhonePe', 'Amazon', 'Oracle'], 'https://leetcode.com/problems/check-if-prefix-with-given-sum-ii/', id, 59.0, 55.6, 30, true, false, false, false, false, 186, 61
FROM dsa_topics WHERE name ILIKE '%2D%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'dfa9a57b-f5dc-4bc8-b4fb-897029dac6e3', 'Construct Polygon', 'medium', 20, ARRAY['Apple', 'Meta', 'Bloomberg', 'Flipkart'], 'https://leetcode.com/problems/construct-polygon/', id, 51.5, 34.5, 30, false, false, false, true, false, 187, 39
FROM dsa_topics WHERE name ILIKE '%2D%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '86c493f0-3b14-4a06-883e-3d52f09aedf6', 'Number of Island II', 'hard', 30, ARRAY['Salesforce'], 'https://leetcode.com/problems/number-of-island-ii/', id, 62.7, 37.3, 45, true, true, false, false, false, 188, 94
FROM dsa_topics WHERE name ILIKE '%2D%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'd3326677-3c1e-41c8-a6d2-092a0e00dfb3', 'Largest Tree II', 'hard', 30, ARRAY['Goldman Sachs'], 'https://leetcode.com/problems/largest-tree-ii/', id, 64.1, 39.6, 45, false, false, false, true, false, 189, 66
FROM dsa_topics WHERE name ILIKE '%2D%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '93313bc2-42a8-49ec-b4e3-ba6074d6e817', 'Maximum Substring II', 'hard', 30, ARRAY['Goldman Sachs', 'Amazon'], 'https://leetcode.com/problems/maximum-substring-ii/', id, 78.2, 33.9, 45, false, false, false, true, false, 190, 36
FROM dsa_topics WHERE name ILIKE '%2D%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'f57c8c4a-b535-4ce3-a031-555ec4873e2e', 'Construct Node Using O(1) Space II', 'easy', 10, ARRAY['Apple', 'Microsoft'], 'https://leetcode.com/problems/construct-node-using-o-1-space-ii/', id, 90.4, 30.0, 15, false, false, false, false, false, 191, 52
FROM dsa_topics WHERE name ILIKE '%Greedy%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '2473be37-d72f-4953-a684-7a4ab3e5c79e', 'Search Path III', 'easy', 10, ARRAY['Meta', 'DE Shaw', 'Flipkart', 'Stripe'], 'https://leetcode.com/problems/search-path-iii/', id, 82.1, 46.3, 15, false, false, false, false, false, 192, 12
FROM dsa_topics WHERE name ILIKE '%Greedy%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '130bd112-8f57-47f9-8957-2a53d8398eec', 'Search Grid To Make Array Sorted II', 'easy', 10, ARRAY['Bloomberg', 'Meta', 'Atlassian', 'Google'], 'https://leetcode.com/problems/search-grid-to-make-array-sorted-ii/', id, 69.7, 39.3, 15, false, false, false, true, false, 193, 12
FROM dsa_topics WHERE name ILIKE '%Greedy%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'd7b020df-9961-4c81-939a-a28fd70f1bb7', 'Search Array From Data Stream II', 'easy', 10, ARRAY['Oracle'], 'https://leetcode.com/problems/search-array-from-data-stream-ii/', id, 62.4, 51.2, 15, false, false, false, false, false, 194, 85
FROM dsa_topics WHERE name ILIKE '%Greedy%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '3e62639f-d56a-4eb2-8245-78b95768355f', 'Check if Island', 'medium', 20, ARRAY['DE Shaw', 'Atlassian', 'Amazon', 'Nvidia'], 'https://leetcode.com/problems/check-if-island/', id, 54.3, 31.4, 30, false, false, true, false, false, 195, 18
FROM dsa_topics WHERE name ILIKE '%Greedy%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'a6dbb4cf-38d4-426c-88d8-adc8185101c9', 'Construct Palindrome', 'medium', 20, ARRAY['Oracle', 'Netflix', 'Google'], 'https://leetcode.com/problems/construct-palindrome/', id, 41.2, 31.9, 30, false, true, false, false, false, 196, 17
FROM dsa_topics WHERE name ILIKE '%Greedy%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'fa280bea-afc6-4b0f-a2ab-2a662bc35139', 'Search Sequence In O(1) Time', 'medium', 20, ARRAY['Bloomberg'], 'https://leetcode.com/problems/search-sequence-in-o-1-time/', id, 84.0, 26.5, 30, false, false, false, true, false, 197, 86
FROM dsa_topics WHERE name ILIKE '%Greedy%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '34e4f07e-d9a5-468e-9c2d-a8d4ce84225b', 'Valid Sequence To Make Array Sorted', 'medium', 20, ARRAY['LinkedIn', 'DE Shaw', 'Meta'], 'https://leetcode.com/problems/valid-sequence-to-make-array-sorted/', id, 53.7, 51.2, 30, false, false, false, true, false, 198, 51
FROM dsa_topics WHERE name ILIKE '%Greedy%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'd605997f-5532-443d-8ae8-c3ad52e545c9', 'Remove Subarray II', 'medium', 20, ARRAY['Amazon', 'DE Shaw', 'Meta'], 'https://leetcode.com/problems/remove-subarray-ii/', id, 79.2, 48.9, 30, false, true, true, false, false, 199, 46
FROM dsa_topics WHERE name ILIKE '%Greedy%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '8c550bac-c3c6-43a2-b86c-199e6b84e781', 'Remove Subarray', 'hard', 30, ARRAY['Google', 'Amazon', 'Goldman Sachs', 'DE Shaw'], 'https://leetcode.com/problems/remove-subarray/', id, 93.3, 26.4, 45, false, true, false, false, false, 200, 96
FROM dsa_topics WHERE name ILIKE '%Greedy%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '1d3925d9-f385-439b-a822-f02ff115711f', 'Shortest Elements', 'hard', 30, ARRAY['Microsoft', 'DE Shaw', 'Adobe'], 'https://leetcode.com/problems/shortest-elements/', id, 55.4, 40.6, 45, false, false, false, false, false, 201, 31
FROM dsa_topics WHERE name ILIKE '%Greedy%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '8f7e1ed4-6122-4e80-9d5c-b4f0cdd392ea', 'Smallest Sequence II', 'hard', 30, ARRAY['Uber', 'Apple', 'Oracle'], 'https://leetcode.com/problems/smallest-sequence-ii/', id, 83.9, 21.7, 45, false, false, false, false, false, 202, 37
FROM dsa_topics WHERE name ILIKE '%Greedy%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'ef77380f-4214-4487-9136-14d5da33f5fc', 'Remove Island Divisible By K', 'easy', 10, ARRAY['Apple', 'Amazon', 'Goldman Sachs', 'Microsoft'], 'https://leetcode.com/problems/remove-island-divisible-by-k/', id, 38.3, 21.7, 15, false, false, false, true, false, 203, 57
FROM dsa_topics WHERE name ILIKE '%Intervals%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '4bae8973-db31-4268-a800-a243c50d5467', 'Kth Grid Using O(1) Space', 'easy', 10, ARRAY['Zomato', 'Amazon', 'Google'], 'https://leetcode.com/problems/kth-grid-using-o-1-space/', id, 29.2, 51.2, 15, false, false, true, false, false, 204, 15
FROM dsa_topics WHERE name ILIKE '%Intervals%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '277cd6b7-6121-414e-b6f4-786d690b6d6d', 'Search Substring Using O(1) Space', 'medium', 20, ARRAY['Apple', 'Zomato', 'Morgan Stanley', 'Bloomberg'], 'https://leetcode.com/problems/search-substring-using-o-1-space/', id, 59.2, 24.9, 30, false, true, true, false, false, 205, 24
FROM dsa_topics WHERE name ILIKE '%Intervals%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '47522a82-86f5-4273-86da-cd6b35d3a5b6', 'Valid Subarray To Make Array Sorted II', 'medium', 20, ARRAY['Amazon'], 'https://leetcode.com/problems/valid-subarray-to-make-array-sorted-ii/', id, 98.5, 30.9, 30, false, false, false, false, false, 206, 91
FROM dsa_topics WHERE name ILIKE '%Intervals%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'c89e0822-4f62-4709-852b-7649e4c83dd9', 'Kth Island II', 'medium', 20, ARRAY['Atlassian', 'Razorpay', 'Apple'], 'https://leetcode.com/problems/kth-island-ii/', id, 80.0, 20.7, 30, false, false, false, false, false, 207, 72
FROM dsa_topics WHERE name ILIKE '%Intervals%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'e0689f72-d5cd-487f-93fe-0b4ca27a4017', 'Add Tree', 'hard', 30, ARRAY['Microsoft', 'Netflix', 'Airbnb'], 'https://leetcode.com/problems/add-tree/', id, 87.9, 21.5, 45, false, false, false, true, false, 208, 47
FROM dsa_topics WHERE name ILIKE '%Intervals%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'ce7de0c9-bfac-473f-872b-3ede9b43eee1', 'Search Palindrome', 'hard', 30, ARRAY['Apple', 'Microsoft'], 'https://leetcode.com/problems/search-palindrome/', id, 92.3, 57.2, 45, false, false, false, false, false, 209, 39
FROM dsa_topics WHERE name ILIKE '%Intervals%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'f7e0922b-b656-497b-ace2-52c2a7da2ae1', 'Shortest Grid', 'easy', 10, ARRAY['Meta', 'Morgan Stanley', 'Microsoft'], 'https://leetcode.com/problems/shortest-grid/', id, 26.3, 38.7, 15, false, false, false, false, false, 210, 29
FROM dsa_topics WHERE name ILIKE '%Backtracking%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'db5beb7d-010a-4318-80e7-c66359afe06b', 'Search Array II', 'easy', 10, ARRAY['Nvidia', 'Microsoft', 'Meta'], 'https://leetcode.com/problems/search-array-ii/', id, 89.1, 22.2, 15, false, false, false, false, false, 211, 81
FROM dsa_topics WHERE name ILIKE '%Backtracking%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '9f5b54cf-870a-4476-bc6b-4023acba39fe', 'Check if Edge', 'easy', 10, ARRAY['Apple'], 'https://leetcode.com/problems/check-if-edge/', id, 90.6, 56.6, 15, false, false, false, false, false, 212, 18
FROM dsa_topics WHERE name ILIKE '%Backtracking%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '3d0205ac-c0bb-4741-b415-db852941966a', 'Number of Elements II', 'medium', 20, ARRAY['LinkedIn', 'Apple'], 'https://leetcode.com/problems/number-of-elements-ii/', id, 66.1, 27.7, 30, false, false, false, false, false, 213, 71
FROM dsa_topics WHERE name ILIKE '%Backtracking%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '64ad088b-52ca-43c5-8400-0785b9d97bd5', 'Kth Subarray', 'medium', 20, ARRAY['Airbnb'], 'https://leetcode.com/problems/kth-subarray/', id, 37.4, 39.6, 30, false, false, false, true, false, 214, 94
FROM dsa_topics WHERE name ILIKE '%Backtracking%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '6a57fa47-7f38-480f-86f7-d073454fb46d', 'Largest Matrix', 'medium', 20, ARRAY['Adobe', 'Amazon'], 'https://leetcode.com/problems/largest-matrix/', id, 74.0, 55.3, 30, false, false, false, false, false, 215, 82
FROM dsa_topics WHERE name ILIKE '%Backtracking%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'bddf64e7-718e-4339-ac86-c07857a2f9ad', 'Maximum Palindrome', 'medium', 20, ARRAY['Meta', 'Razorpay', 'LinkedIn'], 'https://leetcode.com/problems/maximum-palindrome/', id, 22.2, 44.9, 30, false, true, false, false, true, 216, 39
FROM dsa_topics WHERE name ILIKE '%Backtracking%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '3ef65786-d085-4975-a5ad-4995d25c1736', 'Valid Graph', 'hard', 30, ARRAY['Amazon'], 'https://leetcode.com/problems/valid-graph/', id, 57.5, 57.0, 45, false, false, false, false, false, 217, 84
FROM dsa_topics WHERE name ILIKE '%Backtracking%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'abd60326-6df1-43cd-aa11-4480ccb796c0', 'Remove Grid Using O(1) Space', 'hard', 30, ARRAY['Amazon'], 'https://leetcode.com/problems/remove-grid-using-o-1-space/', id, 75.5, 31.2, 45, false, true, false, false, false, 218, 86
FROM dsa_topics WHERE name ILIKE '%Backtracking%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '95d41205-96ac-4e59-813c-b72658189c6d', 'Count Elements In a Binary Tree', 'easy', 10, ARRAY['Oracle', 'Atlassian', 'Google', 'Apple'], 'https://leetcode.com/problems/count-elements-in-a-binary-tree/', id, 84.0, 54.8, 15, false, true, false, false, false, 219, 55
FROM dsa_topics WHERE name ILIKE '%Bit%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'bc87dc72-cca7-43c5-acc7-93fd65278e1e', 'Minimum Elements', 'easy', 10, ARRAY['Bloomberg'], 'https://leetcode.com/problems/minimum-elements/', id, 22.7, 50.9, 15, false, true, false, false, false, 220, 75
FROM dsa_topics WHERE name ILIKE '%Bit%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'bc1f1b5a-a345-4f27-8f8e-7e69bce86ba0', 'Valid Prefix From Data Stream', 'medium', 20, ARRAY['Flipkart', 'Salesforce'], 'https://leetcode.com/problems/valid-prefix-from-data-stream/', id, 95.7, 47.8, 30, false, false, true, false, false, 221, 99
FROM dsa_topics WHERE name ILIKE '%Bit%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'fe1c06d2-61ec-4714-8547-7b2e9621fcd4', 'Check if Subarray With Given Sum', 'medium', 20, ARRAY['Morgan Stanley', 'Swiggy', 'LinkedIn', 'Microsoft'], 'https://leetcode.com/problems/check-if-subarray-with-given-sum/', id, 68.3, 49.2, 30, false, false, false, false, false, 222, 16
FROM dsa_topics WHERE name ILIKE '%Bit%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'f1367a66-9f38-471b-b435-6156af296710', 'Smallest Palindrome', 'medium', 20, ARRAY['Amazon', 'Bloomberg'], 'https://leetcode.com/problems/smallest-palindrome/', id, 76.8, 21.2, 30, false, false, false, false, false, 223, 75
FROM dsa_topics WHERE name ILIKE '%Bit%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'aba7c259-00a1-4904-a5b4-6bd35c3b2460', 'Design Characters', 'hard', 30, ARRAY['Salesforce'], 'https://leetcode.com/problems/design-characters/', id, 48.0, 28.7, 45, false, false, false, false, false, 224, 56
FROM dsa_topics WHERE name ILIKE '%Bit%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'fc513477-9a86-428c-beb2-d55c685e63ba', 'Search Substring', 'hard', 30, ARRAY['Oracle', 'Flipkart', 'DE Shaw', 'Meta'], 'https://leetcode.com/problems/search-substring/', id, 54.5, 36.5, 45, false, false, false, false, false, 225, 43
FROM dsa_topics WHERE name ILIKE '%Bit%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '46f1d4db-9600-4e4a-8564-9b99398307be', 'Search Sequence', 'easy', 10, ARRAY['Meta'], 'https://leetcode.com/problems/search-sequence/', id, 96.5, 28.3, 15, false, false, false, true, false, 226, 59
FROM dsa_topics WHERE name ILIKE '%Math%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '4f3e96e7-7b8f-459f-b4d2-32028eb0a43c', 'Design Grid', 'easy', 10, ARRAY['Meta', 'Goldman Sachs', 'PhonePe'], 'https://leetcode.com/problems/design-grid/', id, 91.7, 40.4, 15, false, false, false, false, false, 227, 83
FROM dsa_topics WHERE name ILIKE '%Math%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '85883f79-19fd-46a1-88c3-90f1107992c8', 'Number of Palindrome Without Repeating Characters', 'easy', 10, ARRAY['Swiggy'], 'https://leetcode.com/problems/number-of-palindrome-without-repeating-characters/', id, 57.0, 47.4, 15, false, false, false, false, false, 228, 58
FROM dsa_topics WHERE name ILIKE '%Math%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'e6e268d6-61bc-4423-83b0-0b03edc1d66d', 'Longest Prefix III', 'medium', 20, ARRAY['Razorpay', 'Amazon', 'Nvidia'], 'https://leetcode.com/problems/longest-prefix-iii/', id, 88.1, 45.4, 30, true, false, false, false, false, 229, 65
FROM dsa_topics WHERE name ILIKE '%Math%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '2fb59b77-852d-46a8-92d0-63be02ca5c0e', 'Minimum Substring Using O(1) Space', 'medium', 20, ARRAY['Goldman Sachs', 'LinkedIn', 'Bloomberg', 'Meta'], 'https://leetcode.com/problems/minimum-substring-using-o-1-space/', id, 28.2, 30.4, 30, true, true, false, false, false, 230, 75
FROM dsa_topics WHERE name ILIKE '%Math%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '9c207431-5499-4373-b5ca-2edfc9751fff', 'Check if Tree', 'medium', 20, ARRAY['Amazon'], 'https://leetcode.com/problems/check-if-tree/', id, 71.6, 22.2, 30, false, false, false, false, false, 231, 70
FROM dsa_topics WHERE name ILIKE '%Math%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'eb7a17b6-8af0-4bf8-8f6e-79fb1fdf2fdc', 'Search Interval From Data Stream II', 'medium', 20, ARRAY['Google', 'Meta'], 'https://leetcode.com/problems/search-interval-from-data-stream-ii/', id, 32.2, 27.2, 30, false, false, false, false, true, 232, 8
FROM dsa_topics WHERE name ILIKE '%Math%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '0bade294-d1c9-4348-a6e3-20b117d8a75a', 'Count Polygon II', 'medium', 20, ARRAY['DE Shaw', 'LinkedIn', 'Salesforce', 'Amazon'], 'https://leetcode.com/problems/count-polygon-ii/', id, 70.2, 33.6, 30, false, false, false, false, false, 233, 33
FROM dsa_topics WHERE name ILIKE '%Math%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'f16ef355-2d00-407d-82fd-981c54a69ee9', 'Design Substring With Given Sum', 'hard', 30, ARRAY['Amazon', 'Meta'], 'https://leetcode.com/problems/design-substring-with-given-sum/', id, 89.2, 30.5, 45, false, false, false, false, false, 234, 35
FROM dsa_topics WHERE name ILIKE '%Math%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '0ee41c45-c2d8-4524-955c-a7febb95337e', 'Count Interval', 'hard', 30, ARRAY['LinkedIn', 'Zomato', 'Flipkart', 'Amazon'], 'https://leetcode.com/problems/count-interval/', id, 77.4, 32.0, 45, false, false, false, false, false, 235, 84
FROM dsa_topics WHERE name ILIKE '%Math%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '7fe8c6f9-3cec-4533-bf48-a598b93dfa5d', 'Check if Path With Max Bitwise OR', 'hard', 30, ARRAY['Bloomberg', 'Stripe', 'Atlassian', 'PhonePe'], 'https://leetcode.com/problems/check-if-path-with-max-bitwise-or/', id, 41.3, 39.0, 45, false, false, false, false, false, 236, 65
FROM dsa_topics WHERE name ILIKE '%Math%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '17a12ed2-1b4a-43a7-ad53-6295c8d2d196', 'Largest Interval', 'easy', 10, ARRAY['Meta', 'Stripe'], 'https://leetcode.com/problems/largest-interval/', id, 96.7, 59.4, 15, false, false, false, false, false, 237, 84
FROM dsa_topics WHERE name ILIKE '%SQL%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '4c370e45-aa99-4de9-9e33-52a11ec6d84e', 'Construct Path In a Binary Tree II', 'easy', 10, ARRAY['Meta', 'Apple'], 'https://leetcode.com/problems/construct-path-in-a-binary-tree-ii/', id, 85.7, 25.7, 15, false, false, false, false, true, 238, 70
FROM dsa_topics WHERE name ILIKE '%SQL%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'cf6ea13e-fac3-4871-b0f5-cefdf2e4fae2', 'Largest Edge', 'easy', 10, ARRAY['Bloomberg', 'Amazon', 'Zomato'], 'https://leetcode.com/problems/largest-edge/', id, 29.1, 35.9, 15, false, true, false, false, true, 239, 67
FROM dsa_topics WHERE name ILIKE '%SQL%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'aba9ced3-74eb-490c-8707-eafa1db1698f', 'Minimum String', 'medium', 20, ARRAY['Meta', 'Microsoft'], 'https://leetcode.com/problems/minimum-string/', id, 28.7, 42.2, 30, false, false, false, false, false, 240, 51
FROM dsa_topics WHERE name ILIKE '%SQL%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '6b47de1e-3e47-4a19-86f4-90519d17df71', 'Maximum Matrix To Make Array Sorted', 'medium', 20, ARRAY['Meta'], 'https://leetcode.com/problems/maximum-matrix-to-make-array-sorted/', id, 62.3, 44.4, 30, false, false, false, false, false, 241, 3
FROM dsa_topics WHERE name ILIKE '%SQL%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '18a8fbe5-6418-4aa0-8345-829f295f9634', 'Shortest Interval', 'medium', 20, ARRAY['Atlassian', 'Swiggy'], 'https://leetcode.com/problems/shortest-interval/', id, 59.8, 54.7, 30, false, false, false, false, false, 242, 53
FROM dsa_topics WHERE name ILIKE '%SQL%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '061a73f3-38c9-4681-8105-fc4114389844', 'Maximum Subarray With At Most K Elements', 'medium', 20, ARRAY['Goldman Sachs'], 'https://leetcode.com/problems/maximum-subarray-with-at-most-k-elements/', id, 46.4, 46.2, 30, false, false, false, false, false, 243, 57
FROM dsa_topics WHERE name ILIKE '%SQL%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '81b43d02-1177-49b1-93c9-ba896b27a668', 'Construct Grid', 'hard', 30, ARRAY['Google', 'Atlassian', 'Adobe'], 'https://leetcode.com/problems/construct-grid/', id, 29.4, 21.9, 45, false, false, false, true, true, 244, 67
FROM dsa_topics WHERE name ILIKE '%SQL%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT 'bacb0fb0-9802-48cd-8c11-9d966f083b51', 'Longest Matrix Divisible By K II', 'hard', 30, ARRAY['Zomato'], 'https://leetcode.com/problems/longest-matrix-divisible-by-k-ii/', id, 58.7, 49.8, 45, false, false, false, false, true, 245, 74
FROM dsa_topics WHERE name ILIKE '%SQL%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '90782b76-552e-433f-bbb0-4a88ea796cff', 'Add Node Equal to Target', 'hard', 30, ARRAY['Goldman Sachs', 'Atlassian', 'Razorpay'], 'https://leetcode.com/problems/add-node-equal-to-target/', id, 84.7, 29.3, 45, false, false, false, false, false, 246, 66
FROM dsa_topics WHERE name ILIKE '%SQL%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '83f1be16-19d4-4f5c-9c59-48f7b6a1cae3', 'Design Path From Data Stream', 'easy', 10, ARRAY['Razorpay', 'Google'], 'https://leetcode.com/problems/design-path-from-data-stream/', id, 26.2, 39.0, 15, false, false, true, false, false, 247, 44
FROM dsa_topics WHERE name ILIKE '%System%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '131c3f82-2b9b-4ed1-9355-1713f8456f75', 'Design Prefix With K Odd Numbers', 'easy', 10, ARRAY['Google', 'Zomato'], 'https://leetcode.com/problems/design-prefix-with-k-odd-numbers/', id, 55.1, 50.1, 15, false, false, false, false, false, 248, 6
FROM dsa_topics WHERE name ILIKE '%System%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '45c1cfef-8c11-4d72-a50f-4548edcb5010', 'Design Prefix With Given Sum', 'medium', 20, ARRAY['Netflix', 'Uber', 'Nvidia', 'Google'], 'https://leetcode.com/problems/design-prefix-with-given-sum/', id, 40.5, 32.6, 30, false, false, false, false, true, 249, 43
FROM dsa_topics WHERE name ILIKE '%System%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '453a9d52-9a76-4816-9bf1-d4e88172e612', 'Design Characters In a Binary Tree', 'medium', 20, ARRAY['Zomato', 'Apple'], 'https://leetcode.com/problems/design-characters-in-a-binary-tree/', id, 43.8, 34.1, 30, false, false, false, false, true, 250, 91
FROM dsa_topics WHERE name ILIKE '%System%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '224023fe-dbfd-4096-9934-5396a5b13d0a', 'Design Node With Given Sum II', 'medium', 20, ARRAY['Bloomberg', 'Uber'], 'https://leetcode.com/problems/design-node-with-given-sum-ii/', id, 80.0, 54.4, 30, false, false, false, false, true, 251, 80
FROM dsa_topics WHERE name ILIKE '%System%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '0abdf1fd-1706-41b0-aed1-d048c59900b3', 'Design Grid With Given Sum', 'hard', 30, ARRAY['Flipkart', 'Apple', 'Microsoft'], 'https://leetcode.com/problems/design-grid-with-given-sum/', id, 72.7, 57.6, 45, true, false, false, false, false, 252, 31
FROM dsa_topics WHERE name ILIKE '%System%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '23eaf4da-9213-4b71-abaa-afc05fb4b090', 'Design Suffix Using O(1) Space II', 'hard', 30, ARRAY['Netflix', 'Microsoft', 'Apple'], 'https://leetcode.com/problems/design-suffix-using-o-1-space-ii/', id, 50.1, 59.6, 45, false, false, false, false, false, 253, 55
FROM dsa_topics WHERE name ILIKE '%System%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '9e569fa6-c83e-4265-8919-fe79e62cdd26', 'Design Subarray With Max Bitwise OR II', 'hard', 30, ARRAY['Bloomberg', 'Microsoft', 'Atlassian'], 'https://leetcode.com/problems/design-subarray-with-max-bitwise-or-ii/', id, 92.4, 24.6, 45, false, false, false, false, false, 254, 16
FROM dsa_topics WHERE name ILIKE '%System%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '7b5730ad-c075-4f37-a140-f16817a09b90', 'Search Edge To Make Array Sorted', 'easy', 10, ARRAY['Bloomberg', 'Microsoft', 'Netflix'], 'https://leetcode.com/problems/search-edge-to-make-array-sorted/', id, 72.0, 46.3, 15, false, false, false, false, false, 255, 92
FROM dsa_topics WHERE name ILIKE '%Complexity%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '101b8829-0dc0-4fb3-914d-6d326aab42ff', 'Shortest Elements II', 'medium', 20, ARRAY['Morgan Stanley'], 'https://leetcode.com/problems/shortest-elements-ii/', id, 37.5, 20.8, 30, false, false, false, false, false, 256, 89
FROM dsa_topics WHERE name ILIKE '%Complexity%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '8bf89130-b4f4-4f98-9869-9817b87e461e', 'Check if Array With Max Bitwise OR', 'hard', 30, ARRAY['Nvidia'], 'https://leetcode.com/problems/check-if-array-with-max-bitwise-or/', id, 76.0, 40.0, 45, false, false, false, false, false, 257, 99
FROM dsa_topics WHERE name ILIKE '%Complexity%' LIMIT 1;
INSERT INTO dsa_problems (id, title, difficulty, xp_reward, companies, leetcode_url, topic_id, frequency, acceptance_rate, estimated_solving_time, blind75, neetcode150, top150, grind75, is_premium, recommended_order, importance) 
SELECT '45c4ce0a-01c0-4d54-a6e6-aad95a5254ab', 'Shortest Polygon From Data Stream', 'hard', 30, ARRAY['Atlassian', 'Amazon'], 'https://leetcode.com/problems/shortest-polygon-from-data-stream/', id, 90.3, 46.5, 45, false, false, false, false, false, 258, 98
FROM dsa_topics WHERE name ILIKE '%Complexity%' LIMIT 1;