import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ltsaqitiuruqcxywmzom.supabase.co';
const supabaseKey = 'sb_publishable_dd26-2TEhsBh81phR3USoA_2_U90ws-';
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const fakeUUID = crypto.randomUUID();
  console.log('Testing with problem_id:', fakeUUID);
  const { data, error } = await supabase.from('user_problem_progress').insert({
    user_id: fakeUUID,
    problem_id: fakeUUID,
    status: 'solved',
    solved: true
  });
  console.log('Result:', JSON.stringify(error, null, 2));
}

test();
