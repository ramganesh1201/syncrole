UPDATE public.dsa_test_cases
   SET expected_output = '[2,4]|[4,2]'
 WHERE input = 'JSON:{"nums":[1,5,8,3,2],"target":10}';

UPDATE public.dsa_test_cases
   SET expected_output = '[2,4]|[4,2]'
 WHERE input = 'JSON:{"nums":[-1,-2,-3,-4,-5],"target":-8}';
