import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ltsaqitiuruqcxywmzom.supabase.co';
const supabaseKey = 'sb_publishable_dd26-2TEhsBh81phR3USoA_2_U90ws-';
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const email = 'test_user_' + Date.now() + '@example.com';
  console.log('Signing up:', email);
  const { data, error } = await supabase.auth.signUp({
    email,
    password: 'password123',
    options: { data: { full_name: 'Test User' } }
  });
  console.log('Signup error:', error?.message);
  
  if (!error) {
    // try to query it without auth
    const anonSupabase = createClient(supabaseUrl, supabaseKey);
    const { data: profileData, error: profileError } = await anonSupabase.from('profiles').select('email').eq('email', email).maybeSingle();
    console.log('Anon Profile query:', profileError?.message || profileData);
  }
}

test();
