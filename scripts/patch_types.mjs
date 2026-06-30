import fs from 'fs';

let content = fs.readFileSync('src/integrations/supabase/types.ts', 'utf8');

function inject(tableName, section, properties) {
  const regex = new RegExp(`(${tableName}: \\{[\\s\\S]*?${section}: \\{)([\\s\\S]*?)(\\n\\s+\\})`);
  content = content.replace(regex, (match, p1, p2, p3) => {
    // p2 contains the existing properties, we split them by line, add new ones, sort them, and put them back
    const lines = p2.split('\n').filter(l => l.trim() !== '');
    const newLines = properties.map(p => {
      // determine indentation based on first line
      const indent = lines.length > 0 ? lines[0].match(/^\s*/)[0] : '          ';
      return indent + p;
    });
    
    const combined = [...lines];
    
    // add only if not exists
    for (const nl of newLines) {
      const key = nl.trim().split(':')[0].trim();
      if (!lines.some(l => l.trim().startsWith(key + ':') || l.trim().startsWith(key + '?:'))) {
        combined.push(nl);
      }
    }
    
    combined.sort((a, b) => {
      const keyA = a.trim().split(':')[0].replace('?', '').trim();
      const keyB = b.trim().split(':')[0].replace('?', '').trim();
      return keyA.localeCompare(keyB);
    });
    
    return p1 + '\n' + combined.join('\n') + p3;
  });
}

// 1. dsa_topics
const topicProps = [
  'estimated_hours: number | null',
  'prerequisite_topics: string[] | null',
  'interview_frequency: string | null',
  'importance_score: number | null',
  'theory_summary: string | null',
  'key_formulas: string | null',
  'important_observations: string | null',
  'common_interview_tricks: string | null',
  'pattern_recognition: string | null',
  'typical_mistakes: string | null',
  'cheat_sheet: string | null',
  'memory_tips: string | null',
  'visualization_notes: string | null'
];
const topicInsertProps = topicProps.map(p => p.replace(':', '?:'));

inject('dsa_topics', 'Row', topicProps);
inject('dsa_topics', 'Insert', topicInsertProps);
inject('dsa_topics', 'Update', topicInsertProps);

// 2. dsa_problems
const problemProps = [
  'subtopic: string | null',
  'frequency: number | null',
  'acceptance_rate: number | null',
  'estimated_solving_time: number | null',
  'problem_pattern: string | null',
  'tags: string[] | null',
  'is_premium: boolean | null',
  'recommended_order: number | null',
  'importance: number | null',
  'blind75: boolean | null',
  'neetcode150: boolean | null',
  'top150: boolean | null',
  'grind75: boolean | null'
];
const problemInsertProps = problemProps.map(p => p.replace(':', '?:'));
inject('dsa_problems', 'Row', problemProps);
inject('dsa_problems', 'Insert', problemInsertProps);
inject('dsa_problems', 'Update', problemInsertProps);

// 3. user_problem_progress
const uppProps = [
  'is_bookmarked: boolean | null',
  'is_favorite: boolean | null',
  'revision_priority: number | null',
  'needs_revision: boolean | null',
  'last_solved_at: string | null'
];
const uppInsertProps = uppProps.map(p => p.replace(':', '?:'));
inject('user_problem_progress', 'Row', uppProps);
inject('user_problem_progress', 'Insert', uppInsertProps);
inject('user_problem_progress', 'Update', uppInsertProps);

// 4. company_question_sets
const companyProps = [
  'interview_difficulty: string | null',
  'oa_difficulty: string | null',
  'top_topics: string[] | null',
  'hiring_frequency: string | null',
  'recommended_preparation_order: number | null',
  'question_count: number | null'
];
const companyInsertProps = companyProps.map(p => p.replace(':', '?:'));
inject('company_question_sets', 'Row', companyProps);
inject('company_question_sets', 'Insert', companyInsertProps);
inject('company_question_sets', 'Update', companyInsertProps);

fs.writeFileSync('src/integrations/supabase/types.ts', content, 'utf8');
console.log('Successfully updated types.ts');
