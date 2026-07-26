INSERT INTO public.role_information (
    title, overview, responsibilities, daily_work, required_skills, preferred_skills, 
    languages, frameworks, cloud, tools, expected_experience, promotion_path, 
    salary_progression, future_demand, automation_risk, learning_resources, 
    companies_hiring, source, last_updated, confidence_score, verification_status, created_at
)
SELECT 
    'Android Developer',
    'Specializes in designing and building applications for the Android operating system. Responsible for performance, quality, and responsiveness of applications.',
    ARRAY['Design and build advanced applications for the Android platform', 'Collaborate with cross-functional teams to define and ship new features', 'Work with outside data sources and APIs', 'Unit-test code for robustness, including edge cases, usability, and general reliability', 'Work on bug fixing and improving application performance'],
    'Writing Kotlin/Java code, debugging in Android Studio, profiling app performance, collaborating with backend teams for API integration, and reviewing pull requests.',
    ARRAY['Android SDK', 'Kotlin', 'Java', 'REST APIs', 'Git', 'Clean Architecture', 'MVVM'],
    ARRAY['Jetpack Compose', 'Coroutines', 'Dagger/Hilt', 'RxJava', 'CI/CD'],
    ARRAY['Kotlin', 'Java'],
    ARRAY['Android SDK', 'Jetpack Compose'],
    ARRAY['Firebase', 'AWS', 'GCP'],
    ARRAY['Android Studio', 'Git', 'Jira', 'Figma', 'Postman'],
    '0-8 years',
    'Junior Android Developer -> Senior Android Developer -> Lead Mobile Engineer -> Engineering Manager',
    '{"fresher":"₹5-10 LPA","mid":"₹10-22 LPA","senior":"₹22-40 LPA","lead":"₹40-65 LPA"}'::jsonb,
    'High',
    'Low',
    '["Official Android Developer Documentation", "Udacity - Developing Android Apps", "Coursera", "Medium - ProAndroidDev"]'::jsonb,
    ARRAY['Google', 'Uber', 'Swiggy', 'Zomato', 'PhonePe', 'Paytm', 'Microsoft'],
    'System Generated',
    CURRENT_TIMESTAMP,
    0.95,
    'verified',
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM public.role_information WHERE LOWER(title)=LOWER('Android Developer'));

INSERT INTO public.role_information (
    title, overview, responsibilities, daily_work, required_skills, preferred_skills, 
    languages, frameworks, cloud, tools, expected_experience, promotion_path, 
    salary_progression, future_demand, automation_risk, learning_resources, 
    companies_hiring, source, last_updated, confidence_score, verification_status, created_at
)
SELECT 
    'iOS Developer',
    'Designs and builds applications for Apple devices on the iOS operating system. Ensures app performance, quality, and responsiveness.',
    ARRAY['Design and build applications for the iOS platform', 'Ensure the performance, quality, and responsiveness of applications', 'Collaborate with a team to define, design, and ship new features', 'Identify and correct bottlenecks and fix bugs', 'Help maintain code quality, organization, and automatization'],
    'Writing Swift/Objective-C code, designing UI with SwiftUI or UIKit, using Instruments to profile app performance, and managing App Store deployments.',
    ARRAY['iOS SDK', 'Swift', 'UIKit', 'Core Data', 'Git', 'RESTful APIs'],
    ARRAY['SwiftUI', 'Objective-C', 'Combine', 'RxSwift', 'CI/CD Fastlane'],
    ARRAY['Swift', 'Objective-C'],
    ARRAY['UIKit', 'SwiftUI', 'CoreData', 'CoreAnimation'],
    ARRAY['Firebase', 'AWS'],
    ARRAY['Xcode', 'Instruments', 'Git', 'Figma', 'Postman'],
    '0-8 years',
    'Junior iOS Developer -> Senior iOS Developer -> Lead Mobile Engineer -> Engineering Manager',
    '{"fresher":"₹6-12 LPA","mid":"₹12-25 LPA","senior":"₹25-45 LPA","lead":"₹45-70 LPA"}'::jsonb,
    'High',
    'Low',
    '["Apple Developer Documentation", "100 Days of Swift", "Ray Wenderlich", "Coursera"]'::jsonb,
    ARRAY['Apple', 'Uber', 'Cred', 'Flipkart', 'Swiggy', 'Airbnb', 'Microsoft'],
    'System Generated',
    CURRENT_TIMESTAMP,
    0.95,
    'verified',
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM public.role_information WHERE LOWER(title)=LOWER('iOS Developer'));

INSERT INTO public.role_information (
    title, overview, responsibilities, daily_work, required_skills, preferred_skills, 
    languages, frameworks, cloud, tools, expected_experience, promotion_path, 
    salary_progression, future_demand, automation_risk, learning_resources, 
    companies_hiring, source, last_updated, confidence_score, verification_status, created_at
)
SELECT 
    'Flutter Developer',
    'Develops cross-platform mobile applications for iOS and Android using Google''s Flutter framework and Dart programming language.',
    ARRAY['Design and build multi-platform applications using Flutter', 'Write readable and clear Dart code', 'Ensure application performance across different platforms', 'Integrate backend APIs and third-party services', 'Fix bugs and optimize application speed'],
    'Building responsive UI components, managing state using Provider/Riverpod/BLoC, debugging cross-platform issues, and deploying apps to both Google Play and App Store.',
    ARRAY['Flutter', 'Dart', 'State Management (BLoC/Provider)', 'REST APIs', 'Git'],
    ARRAY['Native iOS/Android experience', 'Firebase', 'CI/CD', 'Web/Desktop Flutter'],
    ARRAY['Dart', 'Java', 'Swift'],
    ARRAY['Flutter'],
    ARRAY['Firebase', 'GCP', 'AWS'],
    ARRAY['VS Code', 'Android Studio', 'Xcode', 'Git', 'Postman'],
    '0-6 years',
    'Junior Flutter Developer -> Senior Flutter Developer -> Lead Mobile Engineer -> Software Architect',
    '{"fresher":"₹5-10 LPA","mid":"₹10-20 LPA","senior":"₹20-35 LPA","lead":"₹35-55 LPA"}'::jsonb,
    'High',
    'Medium',
    '["Flutter Official Documentation", "Udemy - Flutter Development Bootcamp", "ResoCoder", "Fireship"]'::jsonb,
    ARRAY['Google', 'Zerodha', 'Dream11', 'CRED', 'Tencent', 'Alibaba', 'BMW'],
    'System Generated',
    CURRENT_TIMESTAMP,
    0.94,
    'verified',
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM public.role_information WHERE LOWER(title)=LOWER('Flutter Developer'));

INSERT INTO public.role_information (
    title, overview, responsibilities, daily_work, required_skills, preferred_skills, 
    languages, frameworks, cloud, tools, expected_experience, promotion_path, 
    salary_progression, future_demand, automation_risk, learning_resources, 
    companies_hiring, source, last_updated, confidence_score, verification_status, created_at
)
SELECT 
    'React Native Developer',
    'Specializes in building native applications for iOS and Android using the React Native framework and JavaScript/TypeScript.',
    ARRAY['Build pixel-perfect, buttery smooth UIs across both mobile platforms', 'Leverage native APIs for deep integrations with both platforms', 'Diagnose and fix bugs and performance bottlenecks', 'Maintain code and write automated tests', 'Transition existing React web apps to React Native'],
    'Writing React components in TypeScript, debugging using React Native Debugger, profiling rendering performance, and writing bridge code for native modules.',
    ARRAY['React Native', 'JavaScript', 'TypeScript', 'Redux/Context API', 'Git'],
    ARRAY['Native iOS (Swift) or Android (Kotlin)', 'GraphQL', 'CI/CD', 'Jest/Detox'],
    ARRAY['JavaScript', 'TypeScript', 'Java', 'Objective-C'],
    ARRAY['React Native', 'React'],
    ARRAY['AWS', 'Firebase'],
    ARRAY['VS Code', 'Flipper', 'Xcode', 'Android Studio', 'Git'],
    '0-7 years',
    'Junior RN Developer -> Senior RN Developer -> Lead Mobile Engineer -> Engineering Manager',
    '{"fresher":"₹5-11 LPA","mid":"₹11-22 LPA","senior":"₹22-40 LPA","lead":"₹40-60 LPA"}'::jsonb,
    'High',
    'Medium',
    '["React Native Official Documentation", "Frontend Masters", "Udemy", "Egghead.io"]'::jsonb,
    ARRAY['Meta', 'Microsoft', 'Uber', 'Discord', 'Shopify', 'Pinterest', 'Tesla'],
    'System Generated',
    CURRENT_TIMESTAMP,
    0.93,
    'verified',
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM public.role_information WHERE LOWER(title)=LOWER('React Native Developer'));

INSERT INTO public.role_information (
    title, overview, responsibilities, daily_work, required_skills, preferred_skills, 
    languages, frameworks, cloud, tools, expected_experience, promotion_path, 
    salary_progression, future_demand, automation_risk, learning_resources, 
    companies_hiring, source, last_updated, confidence_score, verification_status, created_at
)
SELECT 
    'Java Developer',
    'Designs, develops, and manages Java-based applications, typically focusing on enterprise-level backend systems and microservices architecture.',
    ARRAY['Design, implement and maintain java application phases', 'Take part in software and architectural development activities', 'Conduct software analysis, programming, testing and debugging', 'Identify production and non-production application issues', 'Transform requirements into stipulations'],
    'Writing Java code for backend services, designing SQL/NoSQL database schemas, managing Spring Boot microservices, writing unit/integration tests, and deploying to cloud platforms.',
    ARRAY['Java', 'Spring Boot', 'REST APIs', 'SQL/Relational Databases', 'Git', 'Maven/Gradle'],
    ARRAY['Microservices Architecture', 'Docker/Kubernetes', 'Kafka/RabbitMQ', 'NoSQL Database', 'CI/CD'],
    ARRAY['Java', 'SQL'],
    ARRAY['Spring Boot', 'Hibernate', 'Spring Security'],
    ARRAY['AWS', 'Azure', 'GCP'],
    ARRAY['IntelliJ IDEA', 'Git', 'Jenkins', 'Docker', 'Postman'],
    '0-10+ years',
    'Junior Java Developer -> Senior Java Developer -> Technical Lead -> Software Architect',
    '{"fresher":"₹4-9 LPA","mid":"₹9-20 LPA","senior":"₹20-38 LPA","lead":"₹38-65 LPA"}'::jsonb,
    'Very High',
    'Low',
    '["Oracle Java Documentation", "Baeldung", "Spring Framework Documentation", "Udemy", "Coursera"]'::jsonb,
    ARRAY['Amazon', 'JPMorgan Chase', 'Goldman Sachs', 'TCS', 'Infosys', 'Wipro', 'Uber'],
    'System Generated',
    CURRENT_TIMESTAMP,
    0.96,
    'verified',
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM public.role_information WHERE LOWER(title)=LOWER('Java Developer'));

INSERT INTO public.role_information (
    title, overview, responsibilities, daily_work, required_skills, preferred_skills, 
    languages, frameworks, cloud, tools, expected_experience, promotion_path, 
    salary_progression, future_demand, automation_risk, learning_resources, 
    companies_hiring, source, last_updated, confidence_score, verification_status, created_at
)
SELECT 
    'Python Developer',
    'Writes server-side web application logic, develops backend components, connects applications with other web services, and supports frontend developers.',
    ARRAY['Write effective, scalable code', 'Develop backend components to improve responsiveness and overall performance', 'Integrate user-facing elements into applications', 'Test and debug programs', 'Improve functionality of existing systems'],
    'Writing Python backend code, creating APIs with Django or FastAPI, writing data processing scripts, orchestrating tasks, and integrating with databases and message queues.',
    ARRAY['Python', 'Django/Flask/FastAPI', 'REST APIs', 'SQL', 'Git'],
    ARRAY['Docker', 'PostgreSQL', 'Redis', 'Celery', 'AWS/GCP services'],
    ARRAY['Python', 'SQL', 'JavaScript'],
    ARRAY['Django', 'Flask', 'FastAPI'],
    ARRAY['AWS', 'GCP', 'Azure'],
    ARRAY['PyCharm', 'VS Code', 'Git', 'Docker', 'Postman'],
    '0-10 years',
    'Junior Python Developer -> Senior Python Developer -> Lead Engineer -> Solutions Architect',
    '{"fresher":"₹5-10 LPA","mid":"₹10-22 LPA","senior":"₹22-42 LPA","lead":"₹42-68 LPA"}'::jsonb,
    'Very High',
    'Low',
    '["Python Official Documentation", "Real Python", "Corey Schafer (YouTube)", "Coursera"]'::jsonb,
    ARRAY['Google', 'Meta', 'Netflix', 'Spotify', 'Reddit', 'Dropbox', 'Stripe'],
    'System Generated',
    CURRENT_TIMESTAMP,
    0.96,
    'verified',
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM public.role_information WHERE LOWER(title)=LOWER('Python Developer'));

INSERT INTO public.role_information (
    title, overview, responsibilities, daily_work, required_skills, preferred_skills, 
    languages, frameworks, cloud, tools, expected_experience, promotion_path, 
    salary_progression, future_demand, automation_risk, learning_resources, 
    companies_hiring, source, last_updated, confidence_score, verification_status, created_at
)
SELECT 
    '.NET Developer',
    'Designs, tailors, and develops software applications using Microsoft''s .NET framework. Typically works on enterprise web applications, desktop apps, or cloud services.',
    ARRAY['Produce code using .NET languages (C#, VB .NET)', 'Upgrade, configure and debug existing systems', 'Provide technical support for web, desktop or mobile applications', 'Participate in requirements analysis', 'Collaborate with internal teams to produce software design and architecture'],
    'Writing C# code for ASP.NET Core APIs, designing Entity Framework models, debugging in Visual Studio, and managing Azure cloud deployments.',
    ARRAY['C#', '.NET Core / .NET 5+', 'ASP.NET', 'SQL Server', 'REST APIs', 'Git'],
    ARRAY['Azure Cloud', 'Entity Framework', 'Microservices', 'Docker', 'React/Angular for fullstack'],
    ARRAY['C#', 'SQL', 'JavaScript'],
    ARRAY['.NET Core', 'ASP.NET', 'Entity Framework'],
    ARRAY['Azure', 'AWS'],
    ARRAY['Visual Studio', 'Git', 'SQL Server Management Studio', 'Azure DevOps', 'Postman'],
    '0-10+ years',
    'Junior .NET Developer -> Senior .NET Developer -> Tech Lead -> Solutions Architect',
    '{"fresher":"₹4-8 LPA","mid":"₹8-18 LPA","senior":"₹18-35 LPA","lead":"₹35-60 LPA"}'::jsonb,
    'High',
    'Low',
    '["Microsoft Learn", "Pluralsight", "Tim Corey (YouTube)", "Udemy"]'::jsonb,
    ARRAY['Microsoft', 'Accenture', 'TCS', 'Cognizant', 'Capgemini', 'Dell', 'EPAM'],
    'System Generated',
    CURRENT_TIMESTAMP,
    0.94,
    'verified',
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM public.role_information WHERE LOWER(title)=LOWER('.NET Developer'));

INSERT INTO public.role_information (
    title, overview, responsibilities, daily_work, required_skills, preferred_skills, 
    languages, frameworks, cloud, tools, expected_experience, promotion_path, 
    salary_progression, future_demand, automation_risk, learning_resources, 
    companies_hiring, source, last_updated, confidence_score, verification_status, created_at
)
SELECT 
    'C++ Developer',
    'Designs and develops high-performance applications, operating systems, game engines, or high-frequency trading platforms using C++.',
    ARRAY['Design, build, and maintain efficient, reusable, and reliable C++ code', 'Implement performance and quality modules', 'Identify bottlenecks and bugs, and devise solutions to these problems', 'Help maintain code quality, organization, and automatization'],
    'Writing highly optimized C++ code, profiling memory and CPU usage, debugging complex concurrency issues, and collaborating on systems-level architecture.',
    ARRAY['C++', 'Object-Oriented Programming', 'Data Structures & Algorithms', 'Memory Management', 'STL'],
    ARRAY['Boost Libraries', 'Multithreading', 'Linux/Unix APIs', 'CMake', 'Python for scripting'],
    ARRAY['C++', 'C', 'Python'],
    ARRAY['STL', 'Boost', 'Qt'],
    ARRAY['AWS', 'Azure'],
    ARRAY['Visual Studio / CLion', 'GDB/Valgrind', 'Git', 'CMake', 'Jenkins'],
    '0-10+ years',
    'Junior C++ Developer -> Senior C++ Developer -> Principal Engineer -> Systems Architect',
    '{"fresher":"₹6-12 LPA","mid":"₹12-28 LPA","senior":"₹28-50 LPA","lead":"₹50-80+ LPA"}'::jsonb,
    'Medium',
    'Low',
    '["cppreference.com", "LearnCpp.com", "Cherno (YouTube)", "Pluralsight"]'::jsonb,
    ARRAY['NVIDIA', 'AMD', 'Morgan Stanley', 'Tower Research', 'Bloomberg', 'EA', 'Sony'],
    'System Generated',
    CURRENT_TIMESTAMP,
    0.92,
    'verified',
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM public.role_information WHERE LOWER(title)=LOWER('C++ Developer'));

INSERT INTO public.role_information (
    title, overview, responsibilities, daily_work, required_skills, preferred_skills, 
    languages, frameworks, cloud, tools, expected_experience, promotion_path, 
    salary_progression, future_demand, automation_risk, learning_resources, 
    companies_hiring, source, last_updated, confidence_score, verification_status, created_at
)
SELECT 
    'QA Engineer',
    'Ensures software quality through manual and automated testing, identifies defects, and verifies that software meets established standards.',
    ARRAY['Review requirements, specifications and technical design documents to provide timely and meaningful feedback', 'Create detailed, comprehensive and well-structured test plans and test cases', 'Estimate, prioritize, plan and coordinate testing activities', 'Identify, record, document thoroughly and track bugs', 'Perform thorough regression testing when bugs are resolved'],
    'Writing test cases, manually executing test plans, logging defects in Jira, communicating with developers to resolve issues, and writing basic automated scripts.',
    ARRAY['Manual Testing', 'Test Planning', 'Defect Tracking', 'Agile/Scrum', 'Basic SQL'],
    ARRAY['Test Automation Basics', 'API Testing (Postman)', 'Performance Testing basics'],
    ARRAY['SQL', 'JavaScript/Python (Basic)'],
    ARRAY['TestNG', 'JUnit (Basic)'],
    ARRAY['AWS (Basic)'],
    ARRAY['Jira', 'Postman', 'TestRail', 'Zephyr', 'Git'],
    '0-6 years',
    'Junior QA -> Senior QA -> QA Lead -> QA Manager',
    '{"fresher":"₹3-6 LPA","mid":"₹6-12 LPA","senior":"₹12-20 LPA","lead":"₹20-30 LPA"}'::jsonb,
    'Medium',
    'High',
    '["ISTQB Syllabus", "Guru99", "Udemy - Software Testing", "Coursera"]'::jsonb,
    ARRAY['TCS', 'Infosys', 'Cognizant', 'Capgemini', 'Wipro', 'Accenture', 'IBM'],
    'System Generated',
    CURRENT_TIMESTAMP,
    0.85,
    'verified',
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM public.role_information WHERE LOWER(title)=LOWER('QA Engineer'));

INSERT INTO public.role_information (
    title, overview, responsibilities, daily_work, required_skills, preferred_skills, 
    languages, frameworks, cloud, tools, expected_experience, promotion_path, 
    salary_progression, future_demand, automation_risk, learning_resources, 
    companies_hiring, source, last_updated, confidence_score, verification_status, created_at
)
SELECT 
    'SDET',
    'Software Development Engineer in Test (SDET) bridges the gap between software development and testing, writing code to test code and building automation frameworks.',
    ARRAY['Design and build scalable automated test frameworks and test suites', 'Write code to test code (unit, integration, and UI automation)', 'Integrate automated tests into CI/CD pipelines', 'Conduct performance and security testing', 'Work closely with developers to improve testability'],
    'Writing automation scripts in Java/Python, maintaining Selenium/Cypress frameworks, configuring CI/CD pipelines, and analyzing test failures in production.',
    ARRAY['Automation Testing', 'Java/Python/JS', 'Selenium/Cypress/Playwright', 'API Automation', 'CI/CD'],
    ARRAY['Docker', 'AWS/Cloud Basics', 'Performance Testing (JMeter)', 'Security Testing'],
    ARRAY['Java', 'Python', 'JavaScript'],
    ARRAY['Selenium', 'Cypress', 'Playwright', 'Appium'],
    ARRAY['AWS', 'Azure'],
    ARRAY['Git', 'Jenkins', 'Jira', 'Postman', 'IntelliJ/VS Code'],
    '0-8 years',
    'SDET -> Senior SDET -> Lead SDET -> QA Automation Architect',
    '{"fresher":"₹6-12 LPA","mid":"₹12-24 LPA","senior":"₹24-40 LPA","lead":"₹40-60 LPA"}'::jsonb,
    'High',
    'Low',
    '["Test Automation University", "Udemy - Selenium Bootcamp", "Playwright Docs", "Roadmap.sh"]'::jsonb,
    ARRAY['Amazon', 'Microsoft', 'Flipkart', 'Swiggy', 'Zomato', 'Atlassian', 'Uber'],
    'System Generated',
    CURRENT_TIMESTAMP,
    0.95,
    'verified',
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM public.role_information WHERE LOWER(title)=LOWER('SDET'));
