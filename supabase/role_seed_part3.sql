INSERT INTO public.role_information (
    title, overview, responsibilities, daily_work, required_skills, preferred_skills, 
    languages, frameworks, cloud, tools, expected_experience, promotion_path, 
    salary_progression, future_demand, automation_risk, learning_resources, 
    companies_hiring, source, last_updated, confidence_score, verification_status, created_at
)
SELECT 
    'Embedded Engineer',
    'Develops and programs software for embedded systems and devices, bridging the gap between hardware and software.',
    ARRAY['Design and develop embedded software systems', 'Test and debug system software', 'Analyze and enhance efficiency, stability, and scalability of system resources', 'Integrate and validate new product designs', 'Provide post-production support'],
    'Writing C/C++ firmware, debugging with oscilloscopes and logic analyzers, optimizing battery consumption, and reading microcontroller datasheets.',
    ARRAY['C/C++', 'Microcontrollers (ARM, AVR)', 'RTOS', 'Hardware debugging', 'Device Drivers'],
    ARRAY['PCB Design', 'IoT Protocols (MQTT, CoAP)', 'Assembly Language', 'Yocto/Buildroot'],
    ARRAY['C', 'C++', 'Python', 'Assembly'],
    ARRAY['FreeRTOS', 'Zephyr'],
    ARRAY['AWS IoT', 'Azure Sphere'],
    ARRAY['Keil', 'Eclipse', 'Oscilloscope', 'JTAG', 'Git'],
    '0-10 years',
    'Junior Embedded Engineer -> Senior Embedded Engineer -> Lead Firmware Engineer -> Systems Architect',
    '{"fresher":"₹4-8 LPA","mid":"₹8-18 LPA","senior":"₹18-35 LPA","lead":"₹35-55 LPA"}'::jsonb,
    'Medium',
    'Low',
    '["Embedded.com", "Coursera - Embedded Systems", "Udemy - ARM Cortex M", "Elecia White''s Making Embedded Systems"]'::jsonb,
    ARRAY['Bosch', 'Intel', 'Qualcomm', 'Texas Instruments', 'Samsung', 'Ather Energy', 'Ola Electric'],
    'System Generated',
    CURRENT_TIMESTAMP,
    0.93,
    'verified',
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM public.role_information WHERE LOWER(title)=LOWER('Embedded Engineer'));

INSERT INTO public.role_information (
    title, overview, responsibilities, daily_work, required_skills, preferred_skills, 
    languages, frameworks, cloud, tools, expected_experience, promotion_path, 
    salary_progression, future_demand, automation_risk, learning_resources, 
    companies_hiring, source, last_updated, confidence_score, verification_status, created_at
)
SELECT 
    'IoT Engineer',
    'Designs and builds internet-connected devices, sensors, and software platforms that manage IoT ecosystems.',
    ARRAY['Design and implement IoT solutions', 'Develop firmware for edge devices', 'Build cloud integrations for data processing', 'Ensure secure communication between devices and cloud', 'Optimize power and bandwidth consumption'],
    'Writing firmware for ESP32/Raspberry Pi, configuring MQTT brokers, setting up AWS IoT Core rules, and building data visualization dashboards.',
    ARRAY['C/C++/Python', 'IoT Protocols (MQTT/HTTP/CoAP)', 'Networking/TCP/IP', 'Cloud IoT Platforms', 'Hardware Basics'],
    ARRAY['Edge Computing', 'Cybersecurity for IoT', 'Data Analytics', 'Bluetooth Low Energy (BLE)'],
    ARRAY['C', 'Python', 'C++'],
    ARRAY['Node.js', 'FreeRTOS'],
    ARRAY['AWS IoT', 'Azure IoT Hub', 'GCP IoT Core'],
    ARRAY['Arduino IDE', 'VS Code', 'Git', 'Postman', 'Wireshark'],
    '1-8 years',
    'Junior IoT Engineer -> Senior IoT Engineer -> IoT Architect -> Head of IoT',
    '{"fresher":"₹5-9 LPA","mid":"₹9-20 LPA","senior":"₹20-40 LPA","lead":"₹40-60 LPA"}'::jsonb,
    'High',
    'Low',
    '["Coursera - IoT Specialization", "AWS IoT Documentation", "Udemy", "Hackster.io"]'::jsonb,
    ARRAY['Amazon', 'Cisco', 'IBM', 'Siemens', 'Bosch', 'Schneider Electric', 'TCS'],
    'System Generated',
    CURRENT_TIMESTAMP,
    0.94,
    'verified',
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM public.role_information WHERE LOWER(title)=LOWER('IoT Engineer'));

INSERT INTO public.role_information (
    title, overview, responsibilities, daily_work, required_skills, preferred_skills, 
    languages, frameworks, cloud, tools, expected_experience, promotion_path, 
    salary_progression, future_demand, automation_risk, learning_resources, 
    companies_hiring, source, last_updated, confidence_score, verification_status, created_at
)
SELECT 
    'Database Administrator',
    'Ensures that databases run efficiently, securely, and are properly backed up. Manages database performance tuning and capacity planning.',
    ARRAY['Maintain database performance, security, and availability', 'Design and implement database backup and recovery strategies', 'Monitor database performance and optimize queries', 'Manage database access and permissions', 'Perform database upgrades and migrations'],
    'Monitoring database metrics, analyzing slow queries using EXPLAIN, performing backups, writing shell scripts for automation, and managing user roles.',
    ARRAY['SQL', 'Database Tuning', 'Backup & Recovery', 'Linux Administration', 'Security Management'],
    ARRAY['Cloud Databases (RDS/Aurora)', 'NoSQL (MongoDB/Cassandra)', 'Data Warehousing', 'Python/Bash Scripting'],
    ARRAY['SQL', 'Bash', 'Python'],
    ARRAY[],
    ARRAY['AWS', 'Azure'],
    ARRAY['pgAdmin', 'MySQL Workbench', 'Oracle Enterprise Manager', 'Git', 'Datadog'],
    '2-10+ years',
    'Junior DBA -> Senior DBA -> Lead DBA -> Database Architect',
    '{"fresher":"₹4-8 LPA","mid":"₹8-18 LPA","senior":"₹18-32 LPA","lead":"₹32-50 LPA"}'::jsonb,
    'Medium',
    'High',
    '["Oracle University", "PostgreSQL Official Docs", "Udemy - SQL Server", "Coursera"]'::jsonb,
    ARRAY['Oracle', 'IBM', 'TCS', 'Infosys', 'Wipro', 'Capgemini', 'Accenture'],
    'System Generated',
    CURRENT_TIMESTAMP,
    0.90,
    'verified',
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM public.role_information WHERE LOWER(title)=LOWER('Database Administrator'));

INSERT INTO public.role_information (
    title, overview, responsibilities, daily_work, required_skills, preferred_skills, 
    languages, frameworks, cloud, tools, expected_experience, promotion_path, 
    salary_progression, future_demand, automation_risk, learning_resources, 
    companies_hiring, source, last_updated, confidence_score, verification_status, created_at
)
SELECT 
    'Data Engineer',
    'Builds and maintains robust data pipelines, transforming raw data into usable formats for data scientists and business analysts.',
    ARRAY['Design, build, and maintain data pipelines', 'Extract, transform, and load (ETL) data from various sources', 'Optimize database performance and data models', 'Ensure data quality and governance', 'Collaborate with Data Scientists on infrastructure'],
    'Writing PySpark jobs, orchestrating pipelines with Apache Airflow, modeling tables in Snowflake, and debugging data quality issues.',
    ARRAY['Python', 'SQL', 'ETL/ELT', 'Data Warehousing', 'Apache Spark'],
    ARRAY['Apache Airflow', 'Kafka', 'Snowflake/BigQuery', 'Cloud Architecture'],
    ARRAY['Python', 'SQL', 'Scala', 'Java'],
    ARRAY['Spark', 'Pandas'],
    ARRAY['AWS', 'GCP', 'Azure'],
    ARRAY['Airflow', 'dbt', 'Git', 'Docker', 'Jupyter'],
    '1-10 years',
    'Junior Data Engineer -> Senior Data Engineer -> Lead Data Engineer -> Data Architect',
    '{"fresher":"₹6-12 LPA","mid":"₹12-25 LPA","senior":"₹25-45 LPA","lead":"₹45-70+ LPA"}'::jsonb,
    'Very High',
    'Low',
    '["Data Engineering Zoomcamp", "Udacity - Data Engineer", "Coursera - GCP Data Engineering", "Fundamentals of Data Engineering (Book)"]'::jsonb,
    ARRAY['Amazon', 'Meta', 'Netflix', 'Uber', 'Swiggy', 'Flipkart', 'Walmart'],
    'System Generated',
    CURRENT_TIMESTAMP,
    0.96,
    'verified',
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM public.role_information WHERE LOWER(title)=LOWER('Data Engineer'));

INSERT INTO public.role_information (
    title, overview, responsibilities, daily_work, required_skills, preferred_skills, 
    languages, frameworks, cloud, tools, expected_experience, promotion_path, 
    salary_progression, future_demand, automation_risk, learning_resources, 
    companies_hiring, source, last_updated, confidence_score, verification_status, created_at
)
SELECT 
    'BI Developer',
    'Business Intelligence (BI) Developers transform data into insights that drive business value through reporting, dashboards, and data visualization.',
    ARRAY['Design and develop BI dashboards and reports', 'Translate business requirements into technical specifications', 'Maintain and optimize BI tools and databases', 'Ensure data accuracy and consistency in reporting', 'Provide training to business users on BI tools'],
    'Writing complex SQL queries, designing interactive Power BI/Tableau dashboards, modeling data, and meeting with stakeholders to gather requirements.',
    ARRAY['SQL', 'Data Visualization (Power BI/Tableau)', 'Data Modeling', 'Analytical Thinking', 'Business Acumen'],
    ARRAY['Python/R', 'ETL basics', 'DAX (Power BI)', 'Cloud Data Warehouses'],
    ARRAY['SQL', 'Python', 'DAX'],
    ARRAY[],
    ARRAY['AWS', 'Azure'],
    ARRAY['Power BI', 'Tableau', 'Looker', 'Excel', 'Git'],
    '0-8 years',
    'Junior BI Developer -> Senior BI Developer -> BI Lead -> Analytics Manager',
    '{"fresher":"₹4-8 LPA","mid":"₹8-16 LPA","senior":"₹16-30 LPA","lead":"₹30-45 LPA"}'::jsonb,
    'High',
    'Medium',
    '["Microsoft Learn - Power BI", "Tableau Training", "Coursera - Google Data Analytics", "Udemy"]'::jsonb,
    ARRAY['Deloitte', 'Mu Sigma', 'Fractal Analytics', 'TCS', 'Accenture', 'KPMG', 'Ernst & Young'],
    'System Generated',
    CURRENT_TIMESTAMP,
    0.92,
    'verified',
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM public.role_information WHERE LOWER(title)=LOWER('BI Developer'));

INSERT INTO public.role_information (
    title, overview, responsibilities, daily_work, required_skills, preferred_skills, 
    languages, frameworks, cloud, tools, expected_experience, promotion_path, 
    salary_progression, future_demand, automation_risk, learning_resources, 
    companies_hiring, source, last_updated, confidence_score, verification_status, created_at
)
SELECT 
    'Solutions Architect',
    'Designs the overall structure of complex software systems, aligning technical solutions with business goals and ensuring scalability, security, and performance.',
    ARRAY['Design technical architecture for large-scale applications', 'Evaluate and select appropriate technologies and frameworks', 'Ensure systems meet security, scalability, and performance requirements', 'Collaborate with engineering teams to guide implementation', 'Communicate architectural decisions to stakeholders'],
    'Creating architecture diagrams, writing technical design documents, researching new cloud services, and advising engineering teams on best practices.',
    ARRAY['System Design', 'Cloud Architecture (AWS/Azure/GCP)', 'Microservices', 'Security & Compliance', 'Excellent Communication'],
    ARRAY['Enterprise Architecture (TOGAF)', 'DevOps practices', 'Cost Optimization', 'Data Engineering basics'],
    ARRAY['Java', 'Python', 'Go', 'C#', 'SQL'],
    ARRAY['Spring Boot', 'Node.js', 'React'],
    ARRAY['AWS', 'Azure', 'GCP'],
    ARRAY['Draw.io', 'Lucidchart', 'Jira', 'Confluence', 'Git'],
    '8-15+ years',
    'Senior Developer -> Solutions Architect -> Enterprise Architect -> CTO',
    '{"fresher":"N/A","mid":"N/A","senior":"₹30-60 LPA","lead":"₹60-120+ LPA"}'::jsonb,
    'Very High',
    'Low',
    '["AWS Certified Solutions Architect Course", "ByteByteGo System Design", "Martin Fowler''s Blog", "Designing Data-Intensive Applications"]'::jsonb,
    ARRAY['Amazon', 'Microsoft', 'Google', 'IBM', 'Salesforce', 'Oracle', 'Cisco'],
    'System Generated',
    CURRENT_TIMESTAMP,
    0.97,
    'verified',
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM public.role_information WHERE LOWER(title)=LOWER('Solutions Architect'));

INSERT INTO public.role_information (
    title, overview, responsibilities, daily_work, required_skills, preferred_skills, 
    languages, frameworks, cloud, tools, expected_experience, promotion_path, 
    salary_progression, future_demand, automation_risk, learning_resources, 
    companies_hiring, source, last_updated, confidence_score, verification_status, created_at
)
SELECT 
    'Technical Product Manager',
    'Combines strong technical expertise with product management skills to lead the development of highly technical products or internal platforms.',
    ARRAY['Define product vision, strategy, and roadmap for technical products', 'Translate business requirements into technical user stories', 'Prioritize backlog based on business value and technical complexity', 'Collaborate closely with engineering and design teams', 'Define and track product metrics and KPIs'],
    'Writing PRDs (Product Requirements Documents), leading sprint planning, analyzing user data in Mixpanel, and discussing API designs with engineers.',
    ARRAY['Product Strategy', 'Technical Architecture Understanding', 'Agile Methodologies', 'Data Analysis', 'Stakeholder Management'],
    ARRAY['API Design', 'System Architecture', 'SQL/Python for analysis', 'A/B Testing'],
    ARRAY['SQL', 'Python (Basic)'],
    ARRAY[],
    ARRAY['AWS (Basic)'],
    ARRAY['Jira', 'Confluence', 'Figma', 'Mixpanel', 'Postman'],
    '3-10+ years',
    'Junior PM -> TPM -> Senior TPM -> Director of Product',
    '{"fresher":"₹8-15 LPA","mid":"₹15-30 LPA","senior":"₹30-55 LPA","lead":"₹55-90+ LPA"}'::jsonb,
    'High',
    'Low',
    '["Reforge", "Lenny''s Newsletter", "Inspired by Marty Cagan", "Coursera - Product Management"]'::jsonb,
    ARRAY['Google', 'Atlassian', 'Microsoft', 'Uber', 'Razorpay', 'Flipkart', 'Stripe'],
    'System Generated',
    CURRENT_TIMESTAMP,
    0.95,
    'verified',
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM public.role_information WHERE LOWER(title)=LOWER('Technical Product Manager'));

INSERT INTO public.role_information (
    title, overview, responsibilities, daily_work, required_skills, preferred_skills, 
    languages, frameworks, cloud, tools, expected_experience, promotion_path, 
    salary_progression, future_demand, automation_risk, learning_resources, 
    companies_hiring, source, last_updated, confidence_score, verification_status, created_at
)
SELECT 
    'Technical Program Manager',
    'Drives execution of complex, cross-functional technical programs. Focuses on delivery, risk management, and coordinating multiple engineering teams.',
    ARRAY['Manage execution of complex technical programs from inception to delivery', 'Coordinate cross-functional teams and manage dependencies', 'Identify and mitigate project risks and technical roadblocks', 'Track program progress and communicate updates to leadership', 'Drive process improvements in engineering delivery'],
    'Hosting cross-team alignment meetings, updating Gantt charts, unblocking engineers, tracking milestones, and writing executive status reports.',
    ARRAY['Program Management', 'Cross-functional Leadership', 'Risk Management', 'Software Development Lifecycle (SDLC)', 'Technical Acumen'],
    ARRAY['Agile/Scrum certifications', 'System Design basics', 'Data-driven decision making'],
    ARRAY[],
    ARRAY[],
    ARRAY[],
    ARRAY['Jira', 'Asana', 'Smartsheet', 'Confluence', 'Tableau'],
    '5-15+ years',
    'Project Manager -> TPM -> Senior TPM -> Director of TPM',
    '{"fresher":"N/A","mid":"₹15-28 LPA","senior":"₹28-50 LPA","lead":"₹50-85+ LPA"}'::jsonb,
    'High',
    'Low',
    '["PMP Certification", "Coursera - Project Management", "System Design Interview (for tech interviews)", "Medium TPM articles"]'::jsonb,
    ARRAY['Meta', 'Amazon', 'Apple', 'Google', 'Uber', 'LinkedIn', 'Microsoft'],
    'System Generated',
    CURRENT_TIMESTAMP,
    0.93,
    'verified',
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM public.role_information WHERE LOWER(title)=LOWER('Technical Program Manager'));

INSERT INTO public.role_information (
    title, overview, responsibilities, daily_work, required_skills, preferred_skills, 
    languages, frameworks, cloud, tools, expected_experience, promotion_path, 
    salary_progression, future_demand, automation_risk, learning_resources, 
    companies_hiring, source, last_updated, confidence_score, verification_status, created_at
)
SELECT 
    'UI/UX Engineer',
    'Bridges the gap between design and engineering, combining UI design sensibilities with frontend development skills to build intuitive user experiences.',
    ARRAY['Translate UI/UX design wireframes to actual code', 'Ensure technical feasibility of UI/UX designs', 'Optimize applications for maximum speed and scalability', 'Build reusable code and libraries for future use', 'Collaborate with designers to improve user experience'],
    'Designing components in Figma, writing React/CSS code, conducting user testing sessions, and building design systems/Storybooks.',
    ARRAY['HTML/CSS', 'JavaScript/TypeScript', 'React/Vue', 'UI/UX Design Principles', 'Figma/Sketch'],
    ARRAY['Framer Motion/Animations', 'Web Accessibility (a11y)', 'Design Systems', 'Tailwind CSS'],
    ARRAY['JavaScript', 'TypeScript', 'HTML', 'CSS'],
    ARRAY['React', 'Vue', 'Next.js'],
    ARRAY['Vercel', 'Netlify'],
    ARRAY['Figma', 'VS Code', 'Storybook', 'Git', 'Lighthouse'],
    '0-8 years',
    'Junior UI/UX Engineer -> Senior UI/UX Engineer -> Lead UX Engineer -> UX Architect',
    '{"fresher":"₹5-10 LPA","mid":"₹10-22 LPA","senior":"₹22-40 LPA","lead":"₹40-60 LPA"}'::jsonb,
    'High',
    'Medium',
    '["Frontend Masters", "Refactoring UI (Book)", "Google UX Design Certificate", "Awwwards Academy"]'::jsonb,
    ARRAY['Apple', 'Airbnb', 'Spotify', 'Cred', 'Swiggy', 'Zomato', 'Atlassian'],
    'System Generated',
    CURRENT_TIMESTAMP,
    0.95,
    'verified',
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM public.role_information WHERE LOWER(title)=LOWER('UI/UX Engineer'));

INSERT INTO public.role_information (
    title, overview, responsibilities, daily_work, required_skills, preferred_skills, 
    languages, frameworks, cloud, tools, expected_experience, promotion_path, 
    salary_progression, future_demand, automation_risk, learning_resources, 
    companies_hiring, source, last_updated, confidence_score, verification_status, created_at
)
SELECT 
    'Salesforce Developer',
    'Customizes, develops, and integrates applications on the Salesforce platform using Apex, Lightning Web Components, and Visualforce.',
    ARRAY['Develop customized solutions within the Salesforce platform', 'Design and implement APIs to integrate Salesforce with other systems', 'Write Apex triggers and batch classes', 'Create Lightning Web Components (LWC)', 'Maintain security and sharing rules'],
    'Writing Apex code for business logic, developing Lightning UI components, configuring Salesforce flows, and deploying code using VS Code and Salesforce DX.',
    ARRAY['Apex', 'Lightning Web Components (LWC)', 'SOQL/SOSL', 'Salesforce Administration', 'JavaScript'],
    ARRAY['Salesforce Certifications (PD1/PD2)', 'REST/SOAP API Integrations', 'Salesforce DX', 'Agile'],
    ARRAY['Apex', 'JavaScript', 'SOQL'],
    ARRAY['LWC', 'Aura'],
    ARRAY['Salesforce Cloud'],
    ARRAY['VS Code (Salesforce Extension)', 'Salesforce CLI', 'Git', 'Data Loader', 'Postman'],
    '0-8 years',
    'Junior Salesforce Dev -> Senior Salesforce Dev -> Technical Architect -> Solution Architect',
    '{"fresher":"₹4-8 LPA","mid":"₹8-18 LPA","senior":"₹18-35 LPA","lead":"₹35-55 LPA"}'::jsonb,
    'High',
    'Low',
    '["Trailhead", "Focus on Force", "Salesforce Ben", "Apex Hours (YouTube)"]'::jsonb,
    ARRAY['Salesforce', 'Accenture', 'Deloitte', 'TCS', 'Cognizant', 'IBM', 'Capgemini'],
    'System Generated',
    CURRENT_TIMESTAMP,
    0.92,
    'verified',
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM public.role_information WHERE LOWER(title)=LOWER('Salesforce Developer'));
