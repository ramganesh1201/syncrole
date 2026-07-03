import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ltsaqitiuruqcxywmzom.supabase.co';
const supabaseKey = 'sb_publishable_dd26-2TEhsBh81phR3USoA_2_U90ws-';
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const email = 'test_user_' + Date.now() + '@example.com';
  console.log('Signing up:', email);
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password: 'password123',
    options: { data: { full_name: 'Test User' } }
  });
  
  if (authError) {
    console.log('Signup error:', authError.message);
    return;
  }
  
  const uid = authData.user.id;
  const fakeUUID = crypto.randomUUID();
  console.log('Testing with problem_id:', fakeUUID);
  const { data, error } = await supabase.from('user_problem_progress').insert({
    user_id: uid,
    problem_id: fakeUUID,
    status: 'solved',
    solved: true
  });
  console.log('Insert Result:', JSON.stringify(error || data, null, 2));
}

test();
