import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ltsaqitiuruqcxywmzom.supabase.co';
const supabaseKey = 'sb_publishable_dd26-2TEhsBh81phR3USoA_2_U90ws-';
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const email = 'nonexistent_' + Date.now() + '@example.com';
  
  const { error } = await supabase.auth.signInWithOtp({ email });
  console.log('SignInWithOtp nonexistent:', error?.message || 'success');
}

test();
