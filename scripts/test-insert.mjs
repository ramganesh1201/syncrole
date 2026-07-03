import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ltsaqitiuruqcxywmzom.supabase.co';
const supabaseKey = 'sb_publishable_dd26-2TEhsBh81phR3USoA_2_U90ws-';
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const fakeUUID = crypto.randomUUID();
  console.log('Testing with problem_id:', fakeUUID);
  const { data, error } = await supabase.from('dsa_problems').insert({
    id: fakeUUID,
    title: 'Test Problem ' + fakeUUID,
    difficulty: 'Easy',
    topic_id: '15d3fa96-d250-4820-9118-2e061ff39414', // We need a real topic_id, let's just fetch one first
    xp_reward: 10
  });
  console.log('Result:', JSON.stringify(error, null, 2));
}

test();
