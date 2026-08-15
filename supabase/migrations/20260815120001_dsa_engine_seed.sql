-- ================================================================
-- DSA Engine: Initial Internal Problem Set (10 problems)
-- Each problem has: description, constraints, examples,
-- starter code, sample test cases, hidden test cases
-- has_internal_engine = true
-- ================================================================

-- ---------------------------------------------------------------
-- Helper: upsert a problem and get its id
-- We match on title to be idempotent against existing seed data.
-- ---------------------------------------------------------------

-- Two Sum
WITH p AS (
  UPDATE public.dsa_problems SET
    slug = 'two-sum',
    has_internal_engine = true,
    description_md = E'Given an array of integers `nums` and an integer `target`, return **indices of the two numbers** such that they add up to `target`.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the same element twice.\n\nYou can return the answer in any order.',
    constraints_md = E'- `2 <= nums.length <= 10^4`\n- `-10^9 <= nums[i] <= 10^9`\n- `-10^9 <= target <= 10^9`\n- **Only one valid answer exists.**',
    examples_json = '[
      {"input": "nums = [2,7,11,15], target = 9", "output": "[0,1]", "explanation": "Because nums[0] + nums[1] == 9, we return [0, 1]."},
      {"input": "nums = [3,2,4], target = 6", "output": "[1,2]"},
      {"input": "nums = [3,3], target = 6", "output": "[0,1]"}
    ]'::jsonb,
    starter_code_js = E'/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nfunction twoSum(nums, target) {\n  // Your code here\n}',
    supported_languages = ARRAY['javascript']::text[],
    time_limit_ms = 2000,
    memory_limit_mb = 128
  WHERE title = 'Two Sum'
  RETURNING id
)
INSERT INTO public.dsa_test_cases (problem_id, input, expected_output, is_sample, is_hidden, ordering)
SELECT p.id, tc.input, tc.expected_output, tc.is_sample, tc.is_hidden, tc.ordering
FROM p
CROSS JOIN (VALUES
  -- sample tests (visible in UI)
  ('JSON:{"nums":[2,7,11,15],"target":9}',  '[0,1]',  true,  false, 1),
  ('JSON:{"nums":[3,2,4],"target":6}',       '[1,2]',  true,  false, 2),
  ('JSON:{"nums":[3,3],"target":6}',         '[0,1]',  true,  false, 3),
  -- hidden tests
  ('JSON:{"nums":[1,5,8,3,2],"target":10}',  '[1,3]',  false, true,  4),
  ('JSON:{"nums":[-1,-2,-3,-4,-5],"target":-8}', '[-4,-5]|[3,4]', false, true, 5),
  ('JSON:{"nums":[0,4,3,0],"target":0}',     '[0,3]',  false, true,  6),
  ('JSON:{"nums":[1,2,3,4,5,6,7,8,9,10],"target":19}', '[8,9]', false, true, 7),
  ('JSON:{"nums":[100,200,300,400],"target":700}', '[2,3]', false, true, 8)
) AS tc(input, expected_output, is_sample, is_hidden, ordering)
ON CONFLICT DO NOTHING;

-- Valid Parentheses
WITH p AS (
  UPDATE public.dsa_problems SET
    slug = 'valid-parentheses',
    has_internal_engine = true,
    description_md = E'Given a string `s` containing just the characters `''(''`, `'')''`, `''{''`, `''}''`, `''[''` and `'']''`, determine if the input string is valid.\n\nAn input string is valid if:\n\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.',
    constraints_md = E'- `1 <= s.length <= 10^4`\n- `s` consists of parentheses only `''()[]{}''`',
    examples_json = '[
      {"input": "s = \"()\"", "output": "true"},
      {"input": "s = \"()[]{}\"", "output": "true"},
      {"input": "s = \"(]\"", "output": "false"}
    ]'::jsonb,
    starter_code_js = E'/**\n * @param {string} s\n * @return {boolean}\n */\nfunction isValid(s) {\n  // Your code here\n}',
    supported_languages = ARRAY['javascript']::text[],
    time_limit_ms = 2000,
    memory_limit_mb = 128
  WHERE title = 'Valid Parentheses'
  RETURNING id
)
INSERT INTO public.dsa_test_cases (problem_id, input, expected_output, is_sample, is_hidden, ordering)
SELECT p.id, tc.input, tc.expected_output, tc.is_sample, tc.is_hidden, tc.ordering
FROM p
CROSS JOIN (VALUES
  ('JSON:{"s":"()"}',        'true',  true,  false, 1),
  ('JSON:{"s":"()[]{}"}',    'true',  true,  false, 2),
  ('JSON:{"s":"(]"}',        'false', true,  false, 3),
  ('JSON:{"s":"([)]"}',      'false', false, true,  4),
  ('JSON:{"s":"{[]}"}',      'true',  false, true,  5),
  ('JSON:{"s":""}',          'true',  false, true,  6),
  ('JSON:{"s":"["}',         'false', false, true,  7),
  ('JSON:{"s":"({[]})"}',    'true',  false, true,  8),
  ('JSON:{"s":"((()))"}',    'true',  false, true,  9),
  ('JSON:{"s":"((()"}',      'false', false, true,  10)
) AS tc(input, expected_output, is_sample, is_hidden, ordering)
ON CONFLICT DO NOTHING;

-- Reverse String
WITH p AS (
  UPDATE public.dsa_problems SET
    slug = 'reverse-string',
    has_internal_engine = true,
    description_md = E'Write a function that reverses a string. The input string is given as an array of characters `s`.\n\nYou must do this by modifying the input array **in-place** with `O(1)` extra memory.\n\n**Note:** For this problem, we represent the array as a simple string input and expect a string output (the reversed string).',
    constraints_md = E'- `1 <= s.length <= 10^5`\n- `s[i]` is a printable ASCII character.',
    examples_json = '[
      {"input": "s = \"hello\"", "output": "\"olleh\""},
      {"input": "s = \"Hannah\"", "output": "\"hannaH\""}
    ]'::jsonb,
    starter_code_js = E'/**\n * @param {string} s\n * @return {string}\n */\nfunction reverseString(s) {\n  // Your code here\n}',
    supported_languages = ARRAY['javascript']::text[],
    time_limit_ms = 2000,
    memory_limit_mb = 128
  WHERE title = 'Reverse String'
  RETURNING id
)
INSERT INTO public.dsa_test_cases (problem_id, input, expected_output, is_sample, is_hidden, ordering)
SELECT p.id, tc.input, tc.expected_output, tc.is_sample, tc.is_hidden, tc.ordering
FROM p
CROSS JOIN (VALUES
  ('JSON:{"s":"hello"}',      '"olleh"', true,  false, 1),
  ('JSON:{"s":"Hannah"}',     '"hannaH"',true,  false, 2),
  ('JSON:{"s":"a"}',          '"a"',     false, true,  3),
  ('JSON:{"s":"ab"}',         '"ba"',    false, true,  4),
  ('JSON:{"s":"racecar"}',    '"racecar"',false,true,  5),
  ('JSON:{"s":"abcde"}',      '"edcba"', false, true,  6),
  ('JSON:{"s":"12345"}',      '"54321"', false, true,  7)
) AS tc(input, expected_output, is_sample, is_hidden, ordering)
ON CONFLICT DO NOTHING;

-- Palindrome Number
WITH p AS (
  UPDATE public.dsa_problems SET
    slug = 'palindrome-number',
    has_internal_engine = true,
    description_md = E'Given an integer `x`, return `true` if `x` is a **palindrome**, and `false` otherwise.\n\nAn integer is a palindrome when it reads the same forward and backward.\n\nFor example, `121` is a palindrome while `123` is not.',
    constraints_md = E'- `-2^31 <= x <= 2^31 - 1`\n\n**Follow up:** Could you solve it without converting the integer to a string?',
    examples_json = '[
      {"input": "x = 121", "output": "true", "explanation": "121 reads as 121 from left to right and from right to left."},
      {"input": "x = -121", "output": "false", "explanation": "From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome."},
      {"input": "x = 10", "output": "false", "explanation": "Reads 01 from right to left. Therefore it is not a palindrome."}
    ]'::jsonb,
    starter_code_js = E'/**\n * @param {number} x\n * @return {boolean}\n */\nfunction isPalindrome(x) {\n  // Your code here\n}',
    supported_languages = ARRAY['javascript']::text[],
    time_limit_ms = 2000,
    memory_limit_mb = 128
  WHERE title = 'Palindrome Number'
  RETURNING id
)
INSERT INTO public.dsa_test_cases (problem_id, input, expected_output, is_sample, is_hidden, ordering)
SELECT p.id, tc.input, tc.expected_output, tc.is_sample, tc.is_hidden, tc.ordering
FROM p
CROSS JOIN (VALUES
  ('JSON:{"x":121}',    'true',  true,  false, 1),
  ('JSON:{"x":-121}',   'false', true,  false, 2),
  ('JSON:{"x":10}',     'false', true,  false, 3),
  ('JSON:{"x":0}',      'true',  false, true,  4),
  ('JSON:{"x":1221}',   'true',  false, true,  5),
  ('JSON:{"x":12321}',  'true',  false, true,  6),
  ('JSON:{"x":-1}',     'false', false, true,  7),
  ('JSON:{"x":1000021}','false', false, true,  8)
) AS tc(input, expected_output, is_sample, is_hidden, ordering)
ON CONFLICT DO NOTHING;

-- Maximum Subarray (Kadane's Algorithm)
WITH p AS (
  UPDATE public.dsa_problems SET
    slug = 'maximum-subarray',
    has_internal_engine = true,
    description_md = E'Given an integer array `nums`, find the **subarray** with the largest sum, and return its sum.',
    constraints_md = E'- `1 <= nums.length <= 10^5`\n- `-10^4 <= nums[i] <= 10^4`\n\n**Follow up:** If you have figured out the `O(n)` solution, try coding another solution using the **divide and conquer** approach, which is more subtle.',
    examples_json = '[
      {"input": "nums = [-2,1,-3,4,-1,2,1,-5,4]", "output": "6", "explanation": "The subarray [4,-1,2,1] has the largest sum 6."},
      {"input": "nums = [1]", "output": "1"},
      {"input": "nums = [5,4,-1,7,8]", "output": "23"}
    ]'::jsonb,
    starter_code_js = E'/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction maxSubArray(nums) {\n  // Your code here\n}',
    supported_languages = ARRAY['javascript']::text[],
    time_limit_ms = 2000,
    memory_limit_mb = 128
  WHERE title = 'Maximum Subarray'
  RETURNING id
)
INSERT INTO public.dsa_test_cases (problem_id, input, expected_output, is_sample, is_hidden, ordering)
SELECT p.id, tc.input, tc.expected_output, tc.is_sample, tc.is_hidden, tc.ordering
FROM p
CROSS JOIN (VALUES
  ('JSON:{"nums":[-2,1,-3,4,-1,2,1,-5,4]}', '6',   true,  false, 1),
  ('JSON:{"nums":[1]}',                       '1',   true,  false, 2),
  ('JSON:{"nums":[5,4,-1,7,8]}',              '23',  true,  false, 3),
  ('JSON:{"nums":[-1]}',                      '-1',  false, true,  4),
  ('JSON:{"nums":[-2,-1]}',                   '-1',  false, true,  5),
  ('JSON:{"nums":[0,0,0]}',                   '0',   false, true,  6),
  ('JSON:{"nums":[1,2,3,4,5]}',               '15',  false, true,  7),
  ('JSON:{"nums":[-1,0,-2]}',                 '0',   false, true,  8)
) AS tc(input, expected_output, is_sample, is_hidden, ordering)
ON CONFLICT DO NOTHING;

-- Climbing Stairs
WITH p AS (
  UPDATE public.dsa_problems SET
    slug = 'climbing-stairs',
    has_internal_engine = true,
    description_md = E'You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?',
    constraints_md = E'- `1 <= n <= 45`',
    examples_json = '[
      {"input": "n = 2", "output": "2", "explanation": "There are two ways to climb to the top. 1. 1 step + 1 step. 2. 2 steps."},
      {"input": "n = 3", "output": "3", "explanation": "There are three ways to climb to the top. 1. 1 step + 1 step + 1 step. 2. 1 step + 2 steps. 3. 2 steps + 1 step."}
    ]'::jsonb,
    starter_code_js = E'/**\n * @param {number} n\n * @return {number}\n */\nfunction climbStairs(n) {\n  // Your code here\n}',
    supported_languages = ARRAY['javascript']::text[],
    time_limit_ms = 2000,
    memory_limit_mb = 128
  WHERE title = 'Climbing Stairs'
  RETURNING id
)
INSERT INTO public.dsa_test_cases (problem_id, input, expected_output, is_sample, is_hidden, ordering)
SELECT p.id, tc.input, tc.expected_output, tc.is_sample, tc.is_hidden, tc.ordering
FROM p
CROSS JOIN (VALUES
  ('JSON:{"n":2}',  '2',   true,  false, 1),
  ('JSON:{"n":3}',  '3',   true,  false, 2),
  ('JSON:{"n":1}',  '1',   false, true,  3),
  ('JSON:{"n":4}',  '5',   false, true,  4),
  ('JSON:{"n":5}',  '8',   false, true,  5),
  ('JSON:{"n":10}', '89',  false, true,  6),
  ('JSON:{"n":45}', '1836311903', false, true, 7)
) AS tc(input, expected_output, is_sample, is_hidden, ordering)
ON CONFLICT DO NOTHING;

-- Binary Search
WITH p AS (
  UPDATE public.dsa_problems SET
    slug = 'binary-search',
    has_internal_engine = true,
    description_md = E'Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, return its index. Otherwise, return `-1`.\n\nYou must write an algorithm with `O(log n)` runtime complexity.',
    constraints_md = E'- `1 <= nums.length <= 10^4`\n- `-10^4 < nums[i], target < 10^4`\n- All the integers in `nums` are **unique**.\n- `nums` is sorted in ascending order.',
    examples_json = '[
      {"input": "nums = [-1,0,3,5,9,12], target = 9", "output": "4", "explanation": "9 exists in nums and its index is 4"},
      {"input": "nums = [-1,0,3,5,9,12], target = 2", "output": "-1", "explanation": "2 does not exist in nums so return -1"}
    ]'::jsonb,
    starter_code_js = E'/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nfunction search(nums, target) {\n  // Your code here\n}',
    supported_languages = ARRAY['javascript']::text[],
    time_limit_ms = 2000,
    memory_limit_mb = 128
  WHERE title = 'Binary Search'
  RETURNING id
)
INSERT INTO public.dsa_test_cases (problem_id, input, expected_output, is_sample, is_hidden, ordering)
SELECT p.id, tc.input, tc.expected_output, tc.is_sample, tc.is_hidden, tc.ordering
FROM p
CROSS JOIN (VALUES
  ('JSON:{"nums":[-1,0,3,5,9,12],"target":9}',  '4',  true,  false, 1),
  ('JSON:{"nums":[-1,0,3,5,9,12],"target":2}',  '-1', true,  false, 2),
  ('JSON:{"nums":[5],"target":5}',               '0',  false, true,  3),
  ('JSON:{"nums":[5],"target":-5}',              '-1', false, true,  4),
  ('JSON:{"nums":[1,2,3,4,5,6,7,8,9,10],"target":7}', '6', false, true, 5),
  ('JSON:{"nums":[2,4,6,8,10],"target":1}',      '-1', false, true,  6),
  ('JSON:{"nums":[2,4,6,8,10],"target":10}',     '4',  false, true,  7)
) AS tc(input, expected_output, is_sample, is_hidden, ordering)
ON CONFLICT DO NOTHING;

-- Valid Anagram
WITH p AS (
  UPDATE public.dsa_problems SET
    slug = 'valid-anagram',
    has_internal_engine = true,
    description_md = E'Given two strings `s` and `t`, return `true` if `t` is an **anagram** of `s`, and `false` otherwise.\n\nAn **anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.',
    constraints_md = E'- `1 <= s.length, t.length <= 5 * 10^4`\n- `s` and `t` consist of lowercase English letters.\n\n**Follow up:** What if the inputs contain Unicode characters? How would you adapt your solution to such a case?',
    examples_json = '[
      {"input": "s = \"anagram\", t = \"nagaram\"", "output": "true"},
      {"input": "s = \"rat\", t = \"car\"", "output": "false"}
    ]'::jsonb,
    starter_code_js = E'/**\n * @param {string} s\n * @param {string} t\n * @return {boolean}\n */\nfunction isAnagram(s, t) {\n  // Your code here\n}',
    supported_languages = ARRAY['javascript']::text[],
    time_limit_ms = 2000,
    memory_limit_mb = 128
  WHERE title = 'Valid Anagram'
  RETURNING id
)
INSERT INTO public.dsa_test_cases (problem_id, input, expected_output, is_sample, is_hidden, ordering)
SELECT p.id, tc.input, tc.expected_output, tc.is_sample, tc.is_hidden, tc.ordering
FROM p
CROSS JOIN (VALUES
  ('JSON:{"s":"anagram","t":"nagaram"}', 'true',  true,  false, 1),
  ('JSON:{"s":"rat","t":"car"}',         'false', true,  false, 2),
  ('JSON:{"s":"a","t":"a"}',             'true',  false, true,  3),
  ('JSON:{"s":"ab","t":"a"}',            'false', false, true,  4),
  ('JSON:{"s":"listen","t":"silent"}',   'true',  false, true,  5),
  ('JSON:{"s":"hello","t":"world"}',     'false', false, true,  6),
  ('JSON:{"s":"aabbcc","t":"abcabc"}',   'true',  false, true,  7)
) AS tc(input, expected_output, is_sample, is_hidden, ordering)
ON CONFLICT DO NOTHING;

-- Merge Sorted Array
WITH p AS (
  UPDATE public.dsa_problems SET
    slug = 'merge-sorted-array',
    has_internal_engine = true,
    description_md = E'You are given two integer arrays `nums1` and `nums2`, sorted in **non-decreasing** order, and two integers `m` and `n`, representing the number of elements in `nums1` and `nums2` respectively.\n\n**Merge** `nums1` and `nums2` into a single array sorted in **non-decreasing** order.\n\nThe final sorted array should not be returned by the function, but instead be stored inside the array `nums1`. To accommodate this, `nums1` has a length of `m + n`, where the first `m` elements denote the elements that should be merged, and the last `n` elements are set to `0` and should be ignored. `nums2` has a length of `n`.\n\nFor this problem, return the sorted merged array as output.',
    constraints_md = E'- `nums1.length == m + n`\n- `nums2.length == n`\n- `0 <= m, n <= 200`\n- `1 <= m + n <= 200`\n- `-10^9 <= nums1[i], nums2[j] <= 10^9`',
    examples_json = '[
      {"input": "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3", "output": "[1,2,2,3,5,6]"},
      {"input": "nums1 = [1], m = 1, nums2 = [], n = 0", "output": "[1]"},
      {"input": "nums1 = [0], m = 0, nums2 = [1], n = 1", "output": "[1]"}
    ]'::jsonb,
    starter_code_js = E'/**\n * @param {number[]} nums1\n * @param {number} m\n * @param {number[]} nums2\n * @param {number} n\n * @return {number[]}\n */\nfunction merge(nums1, m, nums2, n) {\n  // Your code here\n  // Return the merged sorted array\n}',
    supported_languages = ARRAY['javascript']::text[],
    time_limit_ms = 2000,
    memory_limit_mb = 128
  WHERE title = 'Merge Sorted Array'
  RETURNING id
)
INSERT INTO public.dsa_test_cases (problem_id, input, expected_output, is_sample, is_hidden, ordering)
SELECT p.id, tc.input, tc.expected_output, tc.is_sample, tc.is_hidden, tc.ordering
FROM p
CROSS JOIN (VALUES
  ('JSON:{"nums1":[1,2,3,0,0,0],"m":3,"nums2":[2,5,6],"n":3}', '[1,2,2,3,5,6]', true,  false, 1),
  ('JSON:{"nums1":[1],"m":1,"nums2":[],"n":0}',                 '[1]',           true,  false, 2),
  ('JSON:{"nums1":[0],"m":0,"nums2":[1],"n":1}',                '[1]',           true,  false, 3),
  ('JSON:{"nums1":[2,0],"m":1,"nums2":[1],"n":1}',              '[1,2]',         false, true,  4),
  ('JSON:{"nums1":[1,3,5,0,0,0],"m":3,"nums2":[2,4,6],"n":3}', '[1,2,3,4,5,6]', false, true, 5),
  ('JSON:{"nums1":[0,0,0],"m":0,"nums2":[1,2,3],"n":3}',        '[1,2,3]',       false, true,  6)
) AS tc(input, expected_output, is_sample, is_hidden, ordering)
ON CONFLICT DO NOTHING;

-- FizzBuzz (if it exists in the DB; many seeds include it)
-- We try to update it; if not found, we insert.
DO $$
DECLARE
  v_id uuid;
BEGIN
  -- Try to find by slug first, then by title
  SELECT id INTO v_id FROM dsa_problems WHERE title ILIKE '%FizzBuzz%' LIMIT 1;

  IF v_id IS NOT NULL THEN
    UPDATE public.dsa_problems SET
      slug = 'fizz-buzz',
      has_internal_engine = true,
      description_md = E'Given an integer `n`, return a **string array** `answer` (**1-indexed**) where:\n\n- `answer[i] == "FizzBuzz"` if `i` is divisible by `3` and `5`.\n- `answer[i] == "Fizz"` if `i` is divisible by `3`.\n- `answer[i] == "Buzz"` if `i` is divisible by `5`.\n- `answer[i] == i` (as a string) if none of the above conditions are true.\n\nReturn the answer joined as a comma-separated string.',
      constraints_md = E'- `1 <= n <= 10^4`',
      examples_json = '[
        {"input": "n = 3", "output": "\"1,Fizz,3\""},
        {"input": "n = 5", "output": "\"1,Fizz,3,Buzz,5\""},
        {"input": "n = 15", "output": "\"1,Fizz,3,Buzz,Fizz,7,8,Fizz,Buzz,11,Fizz,13,14,FizzBuzz\""}
      ]'::jsonb,
      starter_code_js = E'/**\n * @param {number} n\n * @return {string} - comma-separated FizzBuzz output\n */\nfunction fizzBuzz(n) {\n  // Your code here\n  // Return the results joined as a comma-separated string\n}',
      supported_languages = ARRAY[''javascript'']::text[],
      time_limit_ms = 2000,
      memory_limit_mb = 128
    WHERE id = v_id;

    INSERT INTO public.dsa_test_cases (problem_id, input, expected_output, is_sample, is_hidden, ordering)
    VALUES
      (v_id, 'JSON:{"n":3}',  '"1,Fizz,3"',           true,  false, 1),
      (v_id, 'JSON:{"n":5}',  '"1,Fizz,3,Buzz,5"',    true,  false, 2),
      (v_id, 'JSON:{"n":15}', '"1,Fizz,3,Buzz,Fizz,7,8,Fizz,Buzz,11,Fizz,13,14,FizzBuzz"', true, false, 3),
      (v_id, 'JSON:{"n":1}',  '"1"',                   false, true,  4),
      (v_id, 'JSON:{"n":10}', '"1,Fizz,3,Buzz,Fizz,7,8,Fizz,Buzz,Buzz"', false, true, 5)
    ON CONFLICT DO NOTHING;
  END IF;
END;
$$;

-- ---------------------------------------------------------------
-- Ensure unique constraint on user_problem_progress (user_id, problem_id)
-- Required for ON CONFLICT in verify_dsa_solve
-- ---------------------------------------------------------------
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'user_problem_progress_user_id_problem_id_key'
      AND conrelid = 'public.user_problem_progress'::regclass
  ) THEN
    ALTER TABLE public.user_problem_progress
      ADD CONSTRAINT user_problem_progress_user_id_problem_id_key
      UNIQUE (user_id, problem_id);
  END IF;
END;
$$;
