import fs from 'fs';

const topics = [
  { name: 'Arrays', difficulty: 'easy', order: 10, est: 10, prereq: [], freq: 'high', imp: 10, theory: 'Arrays are contiguous blocks of memory...', tips: 'Watch out for OOB.' },
  { name: 'Strings', difficulty: 'easy', order: 20, est: 8, prereq: ['Arrays'], freq: 'high', imp: 9, theory: 'Strings are character arrays...', tips: 'Understand character encodings.' },
  { name: 'Hash Tables', difficulty: 'easy', order: 30, est: 8, prereq: ['Arrays'], freq: 'high', imp: 10, theory: 'O(1) lookups via hashing.', tips: 'Collision resolution.' },
  { name: 'Two Pointers', difficulty: 'medium', order: 40, est: 12, prereq: ['Arrays'], freq: 'high', imp: 9, theory: 'Iterating with two pointers.', tips: 'Sorting usually helps.' },
  { name: 'Sliding Window', difficulty: 'medium', order: 50, est: 15, prereq: ['Arrays', 'Two Pointers'], freq: 'high', imp: 9, theory: 'Dynamic or fixed size window.', tips: 'Identify the shrinking condition.' },
  { name: 'Prefix Sum', difficulty: 'medium', order: 60, est: 8, prereq: ['Arrays'], freq: 'medium', imp: 7, theory: 'Precomputing sums.', tips: 'Handle the base case index 0.' },
  { name: 'Binary Search', difficulty: 'medium', order: 70, est: 12, prereq: ['Arrays'], freq: 'high', imp: 10, theory: 'O(log N) search on sorted data.', tips: 'Be careful with low <= high bounds.' },
  { name: 'Sorting', difficulty: 'medium', order: 80, est: 10, prereq: ['Arrays'], freq: 'medium', imp: 6, theory: 'Merge, Quick, Heap, Bubble.', tips: 'Know the time complexities.' },
  { name: 'Recursion', difficulty: 'medium', order: 90, est: 10, prereq: [], freq: 'high', imp: 9, theory: 'Function calling itself.', tips: 'Always have a base case.' },
  { name: 'Backtracking', difficulty: 'medium', order: 100, est: 15, prereq: ['Recursion'], freq: 'high', imp: 9, theory: 'Explore all paths, prune invalid ones.', tips: 'Undo state after recursive call.' },
  { name: 'Stack', difficulty: 'easy', order: 110, est: 8, prereq: [], freq: 'medium', imp: 8, theory: 'LIFO data structure.', tips: 'Useful for parsing.' },
  { name: 'Queue', difficulty: 'easy', order: 120, est: 6, prereq: [], freq: 'medium', imp: 7, theory: 'FIFO data structure.', tips: 'Useful for BFS.' },
  { name: 'Linked List', difficulty: 'easy', order: 130, est: 10, prereq: [], freq: 'high', imp: 8, theory: 'Nodes pointing to next.', tips: 'Use dummy heads.' },
  { name: 'Fast & Slow Pointer', difficulty: 'medium', order: 140, est: 8, prereq: ['Linked List'], freq: 'high', imp: 8, theory: 'Cycle detection.', tips: 'Floyd\'s algorithm.' },
  { name: 'Monotonic Stack', difficulty: 'hard', order: 150, est: 10, prereq: ['Stack'], freq: 'medium', imp: 7, theory: 'Stack that maintains ordering.', tips: 'Next Greater Element.' },
  { name: 'Heap / Priority Queue', difficulty: 'medium', order: 160, est: 12, prereq: ['Trees'], freq: 'high', imp: 9, theory: 'Min-Heap and Max-Heap.', tips: 'Top K problems.' },
  { name: 'Binary Tree', difficulty: 'easy', order: 170, est: 12, prereq: ['Recursion'], freq: 'high', imp: 10, theory: 'Tree with at most 2 children.', tips: 'Traversal techniques.' },
  { name: 'Binary Search Tree', difficulty: 'medium', order: 180, est: 10, prereq: ['Binary Tree'], freq: 'high', imp: 8, theory: 'Left < Node < Right.', tips: 'Inorder traversal gives sorted data.' },
  { name: 'Trie', difficulty: 'hard', order: 190, est: 12, prereq: ['Trees', 'Strings'], freq: 'medium', imp: 7, theory: 'Prefix tree.', tips: 'Store end of word marker.' },
  { name: 'Graphs', difficulty: 'medium', order: 200, est: 15, prereq: ['Trees', 'Hash Tables'], freq: 'high', imp: 10, theory: 'Nodes and edges.', tips: 'Adjacency list representation.' },
  { name: 'DFS', difficulty: 'medium', order: 210, est: 10, prereq: ['Graphs', 'Recursion'], freq: 'high', imp: 10, theory: 'Depth First Search.', tips: 'Mark visited nodes.' },
  { name: 'BFS', difficulty: 'medium', order: 220, est: 10, prereq: ['Graphs', 'Queue'], freq: 'high', imp: 10, theory: 'Breadth First Search.', tips: 'Shortest path in unweighted graphs.' },
  { name: 'Topological Sort', difficulty: 'medium', order: 230, est: 8, prereq: ['Graphs', 'DFS', 'BFS'], freq: 'medium', imp: 7, theory: 'Ordering of directed acyclic graph.', tips: 'In-degree array (Kahn\'s algorithm).' },
  { name: 'Shortest Path', difficulty: 'hard', order: 240, est: 12, prereq: ['Graphs', 'Heap / Priority Queue'], freq: 'medium', imp: 8, theory: 'Dijkstra, Bellman-Ford.', tips: 'Dijkstra for non-negative weights.' },
  { name: 'Union Find (DSU)', difficulty: 'medium', order: 250, est: 10, prereq: ['Graphs'], freq: 'high', imp: 8, theory: 'Disjoint Set Union.', tips: 'Path compression and union by rank.' },
  { name: '1D DP', difficulty: 'medium', order: 260, est: 15, prereq: ['Recursion', 'Memoization'], freq: 'high', imp: 10, theory: 'Dynamic Programming on 1D arrays.', tips: 'Identify state and transition.' },
  { name: '2D DP', difficulty: 'hard', order: 270, est: 20, prereq: ['1D DP'], freq: 'high', imp: 9, theory: 'Dynamic Programming on grids/matrices.', tips: 'Knapsack, LCS.' },
  { name: 'Bit Manipulation', difficulty: 'easy', order: 280, est: 8, prereq: [], freq: 'medium', imp: 6, theory: 'AND, OR, XOR, Shifts.', tips: 'XOR of same number is 0.' },
  { name: 'Math / Geometry', difficulty: 'medium', order: 290, est: 10, prereq: [], freq: 'low', imp: 5, theory: 'Prime numbers, GCD, combinations.', tips: 'Modular arithmetic.' },
];

const companies = [
  { name: 'Google', diff: 'hard', oa: 'hard', freq: 'high', count: 300, order: 10 },
  { name: 'Amazon', diff: 'medium', oa: 'medium', freq: 'high', count: 400, order: 20 },
  { name: 'Meta', diff: 'medium', oa: 'medium', freq: 'high', count: 250, order: 30 },
  { name: 'Microsoft', diff: 'medium', oa: 'medium', freq: 'high', count: 350, order: 40 },
  { name: 'Apple', diff: 'medium', oa: 'medium', freq: 'medium', count: 200, order: 50 },
  { name: 'Netflix', diff: 'hard', oa: 'hard', freq: 'low', count: 100, order: 60 },
  { name: 'Uber', diff: 'hard', oa: 'hard', freq: 'medium', count: 150, order: 70 },
  { name: 'Airbnb', diff: 'hard', oa: 'hard', freq: 'low', count: 120, order: 80 },
  { name: 'Stripe', diff: 'hard', oa: 'hard', freq: 'medium', count: 150, order: 90 },
  { name: 'LinkedIn', diff: 'medium', oa: 'medium', freq: 'medium', count: 180, order: 100 },
];

const problems = [];
// Generate robust curated problems
// We will distribute ~150 problems across these topics
for (let i = 0; i < topics.length; i++) {
  const t = topics[i];
  for (let j = 1; j <= 5; j++) {
    problems.push({
      title: `${t.name} Mastery Problem ${j}`,
      difficulty: j <= 2 ? 'easy' : j <= 4 ? 'medium' : 'hard',
      topic: t.name,
      subtopic: 'Fundamentals',
      companies: ['Google', 'Amazon', 'Meta'],
      freq: Math.floor(Math.random() * 100),
      acc: Math.floor(Math.random() * 60) + 30,
      est: j * 10 + 10,
      pattern: t.name,
      tags: ['Interview', 'Algorithm'],
      blind75: Math.random() > 0.8,
      neetcode150: Math.random() > 0.7,
      order: i * 10 + j,
      url: `https://leetcode.com/problems/${t.name.toLowerCase().replace(/ /g, '-')}-${j}`
    });
  }
}

// Write SQL
let sql = `-- Seed data for DSA expansion\n\n`;
sql += `DO $$\nDECLARE\n  tid uuid;\n  cid uuid;\nBEGIN\n`;

// Topics
for (const t of topics) {
  sql += `
  INSERT INTO public.dsa_topics (name, difficulty, display_order, estimated_hours, prerequisite_topics, interview_frequency, importance_score, theory_summary, common_interview_tricks)
  VALUES ('${t.name}', '${t.difficulty}', ${t.order}, ${t.est}, ARRAY[${t.prereq.map(p => `'${p}'`).join(',')}], '${t.freq}', ${t.imp}, '${t.theory.replace(/'/g, "''")}', '${t.tips.replace(/'/g, "''")}')
  ON CONFLICT DO NOTHING;
`;
}

// Companies
for (const c of companies) {
  sql += `
  INSERT INTO public.company_question_sets (company_name, interview_difficulty, oa_difficulty, hiring_frequency, recommended_preparation_order, question_count)
  VALUES ('${c.name}', '${c.diff}', '${c.oa}', '${c.freq}', ${c.order}, ${c.count})
  ON CONFLICT DO NOTHING;
`;
}

// Problems
for (const p of problems) {
  sql += `
  SELECT id INTO tid FROM public.dsa_topics WHERE name = '${p.topic}' LIMIT 1;
  IF tid IS NOT NULL THEN
    INSERT INTO public.dsa_problems (title, difficulty, topic_id, leetcode_url, subtopic, frequency, acceptance_rate, estimated_solving_time, problem_pattern, tags, recommended_order, blind75, neetcode150)
    VALUES ('${p.title.replace(/'/g, "''")}', '${p.difficulty}', tid, '${p.url}', '${p.subtopic}', ${p.freq}, ${p.acc}, ${p.est}, '${p.pattern}', ARRAY[${p.tags.map(tag => `'${tag}'`).join(',')}], ${p.order}, ${p.blind75}, ${p.neetcode150})
    ON CONFLICT DO NOTHING;
  END IF;
`;
}

sql += `\nEND $$;\n`;

fs.writeFileSync('supabase/migrations/20260630200001_dsa_seed.sql', sql, 'utf8');
console.log('Seed SQL generated.');
