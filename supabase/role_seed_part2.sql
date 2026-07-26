INSERT INTO public.role_information (
    title, overview, responsibilities, daily_work, required_skills, preferred_skills, 
    languages, frameworks, cloud, tools, expected_experience, promotion_path, 
    salary_progression, future_demand, automation_risk, learning_resources, 
    companies_hiring, source, last_updated, confidence_score, verification_status, created_at
)
SELECT 
    'Automation Test Engineer',
    'Focuses on designing and writing programs that run automatic tests on new or existing software to ensure it performs correctly.',
    ARRAY['Design, develop and execute automation scripts using open source tools', 'Identify, record, document thoroughly and track bugs', 'Perform thorough regression testing when bugs are resolved', 'Liaise with internal teams to identify system requirements', 'Monitor debugging process results'],
    'Writing automation scripts, configuring CI/CD pipelines for test execution, reviewing test reports, and reporting bugs to the development team.',
    ARRAY['Test Automation', 'Selenium', 'Java/Python', 'API Testing', 'Git'],
    ARRAY['Performance Testing', 'Appium', 'Jenkins/GitLab CI', 'SQL'],
    ARRAY['Java', 'Python', 'JavaScript', 'SQL'],
    ARRAY['Selenium', 'TestNG', 'JUnit', 'RestAssured'],
    ARRAY['AWS', 'BrowserStack'],
    ARRAY['Postman', 'Jira', 'Git', 'Jenkins', 'IntelliJ IDEA'],
    '0-7 years',
    'Junior Automation Engineer -> Senior Automation Engineer -> Test Lead -> QA Manager',
    '{"fresher":"₹4-8 LPA","mid":"₹8-16 LPA","senior":"₹16-28 LPA","lead":"₹28-45 LPA"}'::jsonb,
    'Medium',
    'Medium',
    '["Udemy - Selenium WebDriver", "Guru99", "Coursera - Software Testing", "Test Automation University"]'::jsonb,
    ARRAY['TCS', 'Cognizant', 'Infosys', 'Capgemini', 'IBM', 'Tech Mahindra', 'Wipro'],
    'System Generated',
    CURRENT_TIMESTAMP,
    0.90,
    'verified',
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM public.role_information WHERE LOWER(title)=LOWER('Automation Test Engineer'));

INSERT INTO public.role_information (
    title, overview, responsibilities, daily_work, required_skills, preferred_skills, 
    languages, frameworks, cloud, tools, expected_experience, promotion_path, 
    salary_progression, future_demand, automation_risk, learning_resources, 
    companies_hiring, source, last_updated, confidence_score, verification_status, created_at
)
SELECT 
    'Cloud Engineer',
    'Responsible for any technological duties associated with cloud computing, including design, planning, management, maintenance, and support.',
    ARRAY['Design and implement cloud infrastructure solutions', 'Migrate on-premise infrastructure to cloud environments', 'Monitor cloud infrastructure for performance and security', 'Automate cloud deployments using Infrastructure as Code (IaC)', 'Manage cloud billing and cost optimization'],
    'Provisioning AWS/Azure resources using Terraform, setting up VPCs and IAM roles, debugging serverless functions, and optimizing cloud costs.',
    ARRAY['Cloud Platforms (AWS/Azure/GCP)', 'Infrastructure as Code (Terraform/CloudFormation)', 'Linux/Unix', 'Networking basics', 'Bash/Python scripting'],
    ARRAY['Kubernetes', 'Docker', 'CI/CD Pipelines', 'Cloud Security'],
    ARRAY['Python', 'Bash', 'Go'],
    ARRAY['Serverless Framework'],
    ARRAY['AWS', 'Azure', 'GCP'],
    ARRAY['Terraform', 'AWS CLI', 'Git', 'Jenkins', 'Datadog'],
    '1-8 years',
    'Cloud Engineer -> Senior Cloud Engineer -> Cloud Architect -> Principal Architect',
    '{"fresher":"₹6-12 LPA","mid":"₹12-25 LPA","senior":"₹25-45 LPA","lead":"₹45-70 LPA"}'::jsonb,
    'High',
    'Low',
    '["A Cloud Guru", "AWS Certified Solutions Architect Official Study Guide", "Coursera - Google Cloud", "Udemy"]'::jsonb,
    ARRAY['Amazon', 'Microsoft', 'Google', 'IBM', 'Accenture', 'TCS', 'Cognizant'],
    'System Generated',
    CURRENT_TIMESTAMP,
    0.95,
    'verified',
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM public.role_information WHERE LOWER(title)=LOWER('Cloud Engineer'));

INSERT INTO public.role_information (
    title, overview, responsibilities, daily_work, required_skills, preferred_skills, 
    languages, frameworks, cloud, tools, expected_experience, promotion_path, 
    salary_progression, future_demand, automation_risk, learning_resources, 
    companies_hiring, source, last_updated, confidence_score, verification_status, created_at
)
SELECT 
    'Site Reliability Engineer (SRE)',
    'Applies a software engineering approach to system administration topics. Focuses on ensuring that software systems are highly reliable and scalable.',
    ARRAY['Build software to help operations and support teams', 'Fix support escalation issues', 'Optimize on-call rotations and processes', 'Document "tribal" knowledge', 'Conduct post-incident reviews'],
    'Writing automation scripts, configuring monitoring dashboards (Grafana/Prometheus), responding to PagerDuty alerts, and leading post-mortem meetings.',
    ARRAY['Linux Administration', 'Python/Go Scripting', 'Monitoring (Prometheus/Grafana)', 'Docker & Kubernetes', 'Incident Management'],
    ARRAY['Terraform', 'CI/CD Configuration', 'Advanced Networking', 'Distributed Systems'],
    ARRAY['Python', 'Go', 'Bash'],
    ARRAY['Flask', 'FastAPI'],
    ARRAY['AWS', 'GCP', 'Azure'],
    ARRAY['Kubernetes', 'Docker', 'Prometheus', 'Grafana', 'PagerDuty', 'Terraform'],
    '2-10+ years',
    'Junior SRE -> Senior SRE -> Staff SRE -> Principal SRE',
    '{"fresher":"₹8-15 LPA","mid":"₹15-30 LPA","senior":"₹30-55 LPA","lead":"₹55-85 LPA"}'::jsonb,
    'Very High',
    'Low',
    '["Google SRE Book", "Coursera - SRE", "Udacity", "Linux Foundation SRE Course"]'::jsonb,
    ARRAY['Google', 'LinkedIn', 'Uber', 'Atlassian', 'Flipkart', 'Swiggy', 'Razorpay'],
    'System Generated',
    CURRENT_TIMESTAMP,
    0.96,
    'verified',
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM public.role_information WHERE LOWER(title)=LOWER('Site Reliability Engineer (SRE)'));

INSERT INTO public.role_information (
    title, overview, responsibilities, daily_work, required_skills, preferred_skills, 
    languages, frameworks, cloud, tools, expected_experience, promotion_path, 
    salary_progression, future_demand, automation_risk, learning_resources, 
    companies_hiring, source, last_updated, confidence_score, verification_status, created_at
)
SELECT 
    'Platform Engineer',
    'Designs and builds internal developer platforms (IDPs) that enable software developers to independently develop, deploy, and operate their applications.',
    ARRAY['Build internal developer platforms and portals', 'Automate infrastructure provisioning', 'Standardize CI/CD pipelines across the organization', 'Provide developer tooling and self-service capabilities', 'Ensure platform security and compliance'],
    'Building CLI tools in Go, configuring Backstage developer portals, writing Kubernetes operators, and assisting dev teams with onboarding to the platform.',
    ARRAY['Kubernetes', 'Docker', 'Go/Python', 'CI/CD (GitHub Actions/GitLab)', 'Infrastructure as Code'],
    ARRAY['Backstage', 'Crossplane', 'ArgoCD', 'Service Mesh (Istio)'],
    ARRAY['Go', 'Python', 'Bash'],
    ARRAY['Kubernetes Operator Framework'],
    ARRAY['AWS', 'GCP', 'Azure'],
    ARRAY['Kubernetes', 'ArgoCD', 'Terraform', 'Backstage', 'Git'],
    '3-10+ years',
    'Platform Engineer -> Senior Platform Engineer -> Staff Platform Engineer -> Platform Architect',
    '{"fresher":"₹8-16 LPA","mid":"₹16-32 LPA","senior":"₹32-60 LPA","lead":"₹60-90 LPA"}'::jsonb,
    'High',
    'Low',
    '["Platform Engineering Community", "CNCF Courses", "Udemy - Kubernetes", "Official Go Documentation"]'::jsonb,
    ARRAY['Spotify', 'Netflix', 'Uber', 'Swiggy', 'Cred', 'Razorpay', 'Stripe'],
    'System Generated',
    CURRENT_TIMESTAMP,
    0.94,
    'verified',
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM public.role_information WHERE LOWER(title)=LOWER('Platform Engineer'));

INSERT INTO public.role_information (
    title, overview, responsibilities, daily_work, required_skills, preferred_skills, 
    languages, frameworks, cloud, tools, expected_experience, promotion_path, 
    salary_progression, future_demand, automation_risk, learning_resources, 
    companies_hiring, source, last_updated, confidence_score, verification_status, created_at
)
SELECT 
    'ML Engineer',
    'Bridges the gap between data science and software engineering by deploying machine learning models into production environments and optimizing their performance.',
    ARRAY['Design and build machine learning systems', 'Deploy ML models into production environments', 'Optimize ML models for performance and scalability', 'Build data pipelines for model training and inference', 'Monitor model performance in production'],
    'Writing Python code to deploy PyTorch/TensorFlow models via FastAPI, configuring MLflow, optimizing inference latency with TensorRT, and managing GPU clusters.',
    ARRAY['Python', 'Machine Learning Algorithms', 'PyTorch/TensorFlow', 'Model Deployment (FastAPI/Flask)', 'SQL & Data Engineering Basics'],
    ARRAY['MLOps (MLflow/Kubeflow)', 'Docker/Kubernetes', 'CUDA/TensorRT', 'Cloud ML Services (SageMaker/Vertex)'],
    ARRAY['Python', 'SQL', 'C++'],
    ARRAY['PyTorch', 'TensorFlow', 'Scikit-Learn', 'FastAPI'],
    ARRAY['AWS (SageMaker)', 'GCP (Vertex AI)', 'Azure ML'],
    ARRAY['Jupyter', 'Git', 'Docker', 'MLflow', 'Kubernetes'],
    '1-8 years',
    'Junior ML Engineer -> Senior ML Engineer -> Staff ML Engineer -> AI Architect',
    '{"fresher":"₹8-15 LPA","mid":"₹15-35 LPA","senior":"₹35-65 LPA","lead":"₹65-100+ LPA"}'::jsonb,
    'Very High',
    'Low',
    '["Coursera - Deep Learning Specialization", "Fast.ai", "Full Stack Deep Learning", "Udacity - ML Engineer"]'::jsonb,
    ARRAY['Google', 'Meta', 'Amazon', 'Microsoft', 'NVIDIA', 'OpenAI', 'Flipkart'],
    'System Generated',
    CURRENT_TIMESTAMP,
    0.97,
    'verified',
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM public.role_information WHERE LOWER(title)=LOWER('ML Engineer'));

INSERT INTO public.role_information (
    title, overview, responsibilities, daily_work, required_skills, preferred_skills, 
    languages, frameworks, cloud, tools, expected_experience, promotion_path, 
    salary_progression, future_demand, automation_risk, learning_resources, 
    companies_hiring, source, last_updated, confidence_score, verification_status, created_at
)
SELECT 
    'Prompt Engineer',
    'Specializes in designing, refining, and optimizing text prompts to effectively interact with Large Language Models (LLMs) and generate desired outputs.',
    ARRAY['Design and optimize prompts for various LLM applications', 'Evaluate and benchmark prompt performance', 'Collaborate with developers to integrate prompts into applications', 'Stay updated on the latest LLM capabilities and limitations', 'Develop prompt libraries and best practices'],
    'Testing different prompt variations in OpenAI Playground, analyzing output quality, configuring LangChain agents, and documenting prompt templates.',
    ARRAY['Prompt Engineering Techniques (Few-shot, CoT, etc.)', 'Understanding of LLM architecture', 'Python scripting', 'Analytical thinking', 'Excellent written communication'],
    ARRAY['LangChain/LlamaIndex', 'API Integration', 'Fine-tuning basics', 'Vector Databases'],
    ARRAY['Python', 'JavaScript'],
    ARRAY['LangChain', 'LlamaIndex'],
    ARRAY['AWS', 'OpenAI API', 'Anthropic API'],
    ARRAY['OpenAI Playground', 'Jupyter', 'Git', 'Postman'],
    '0-3 years',
    'Prompt Engineer -> Senior Prompt Engineer -> AI Product Manager -> AI Strategist',
    '{"fresher":"₹6-12 LPA","mid":"₹12-25 LPA","senior":"₹25-45 LPA","lead":"₹45-60 LPA"}'::jsonb,
    'High',
    'Medium',
    '["LearnPrompting.org", "DeepLearning.AI - Prompt Engineering", "OpenAI Cookbook", "Anthropic Docs"]'::jsonb,
    ARRAY['OpenAI', 'Anthropic', 'Google', 'Microsoft', 'Jasper', 'Copy.ai', 'Scale AI'],
    'System Generated',
    CURRENT_TIMESTAMP,
    0.88,
    'verified',
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM public.role_information WHERE LOWER(title)=LOWER('Prompt Engineer'));

INSERT INTO public.role_information (
    title, overview, responsibilities, daily_work, required_skills, preferred_skills, 
    languages, frameworks, cloud, tools, expected_experience, promotion_path, 
    salary_progression, future_demand, automation_risk, learning_resources, 
    companies_hiring, source, last_updated, confidence_score, verification_status, created_at
)
SELECT 
    'NLP Engineer',
    'Focuses on natural language processing tasks, building systems that can understand, interpret, and generate human language.',
    ARRAY['Develop NLP systems and models', 'Perform text classification, sentiment analysis, and entity extraction', 'Train and fine-tune large language models (LLMs)', 'Pre-process and clean large text datasets', 'Deploy NLP models into production APIs'],
    'Fine-tuning HuggingFace models using PyTorch, writing data cleaning scripts in Pandas, building RAG systems, and optimizing inference latency.',
    ARRAY['Python', 'Natural Language Processing', 'PyTorch/TensorFlow', 'Transformers (HuggingFace)', 'Text Preprocessing'],
    ARRAY['Large Language Models (LLMs)', 'Vector Databases (Pinecone/Milvus)', 'RAG Architecture', 'Model Quantization'],
    ARRAY['Python', 'C++'],
    ARRAY['PyTorch', 'HuggingFace Transformers', 'spaCy', 'NLTK'],
    ARRAY['AWS', 'GCP'],
    ARRAY['Jupyter', 'Git', 'Docker', 'WandB'],
    '1-8 years',
    'Junior NLP Engineer -> Senior NLP Engineer -> Staff AI Engineer -> Head of AI',
    '{"fresher":"₹8-16 LPA","mid":"₹16-35 LPA","senior":"₹35-65 LPA","lead":"₹65-100 LPA"}'::jsonb,
    'Very High',
    'Low',
    '["HuggingFace Course", "Stanford CS224N", "Coursera - NLP Specialization", "DeepLearning.AI"]'::jsonb,
    ARRAY['Google', 'Microsoft', 'Amazon', 'Meta', 'Cohere', 'HuggingFace', 'OpenAI'],
    'System Generated',
    CURRENT_TIMESTAMP,
    0.96,
    'verified',
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM public.role_information WHERE LOWER(title)=LOWER('NLP Engineer'));

INSERT INTO public.role_information (
    title, overview, responsibilities, daily_work, required_skills, preferred_skills, 
    languages, frameworks, cloud, tools, expected_experience, promotion_path, 
    salary_progression, future_demand, automation_risk, learning_resources, 
    companies_hiring, source, last_updated, confidence_score, verification_status, created_at
)
SELECT 
    'Computer Vision Engineer',
    'Builds computer vision algorithms and systems to extract information from images and videos for applications like autonomous driving, facial recognition, and medical imaging.',
    ARRAY['Develop computer vision algorithms and models', 'Perform object detection, image segmentation, and facial recognition', 'Optimize models for edge devices (mobile/IoT)', 'Curate and augment image datasets', 'Deploy CV models into production'],
    'Training YOLO/ResNet models using PyTorch, processing video streams with OpenCV, deploying models to NVIDIA Jetson, and analyzing model accuracy.',
    ARRAY['Python', 'C++', 'Computer Vision', 'PyTorch/TensorFlow', 'OpenCV'],
    ARRAY['CUDA/TensorRT', 'Edge AI', '3D Vision', 'Generative Vision (GANs/Diffusion)'],
    ARRAY['Python', 'C++', 'C'],
    ARRAY['PyTorch', 'TensorFlow', 'OpenCV'],
    ARRAY['AWS', 'Azure'],
    ARRAY['Jupyter', 'Git', 'Docker', 'NVIDIA DeepStream'],
    '1-8 years',
    'Junior CV Engineer -> Senior CV Engineer -> Staff AI Engineer -> Head of AI',
    '{"fresher":"₹8-15 LPA","mid":"₹15-32 LPA","senior":"₹32-60 LPA","lead":"₹60-90 LPA"}'::jsonb,
    'High',
    'Low',
    '["Stanford CS231N", "Coursera - Deep Learning", "PyImageSearch", "Udacity - Computer Vision"]'::jsonb,
    ARRAY['Tesla', 'NVIDIA', 'Waymo', 'Meta', 'Amazon', 'Apple', 'Nuro'],
    'System Generated',
    CURRENT_TIMESTAMP,
    0.94,
    'verified',
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM public.role_information WHERE LOWER(title)=LOWER('Computer Vision Engineer'));

INSERT INTO public.role_information (
    title, overview, responsibilities, daily_work, required_skills, preferred_skills, 
    languages, frameworks, cloud, tools, expected_experience, promotion_path, 
    salary_progression, future_demand, automation_risk, learning_resources, 
    companies_hiring, source, last_updated, confidence_score, verification_status, created_at
)
SELECT 
    'Blockchain Developer',
    'Develops and optimizes blockchain protocols, crafts smart contracts, and builds decentralized applications (dApps).',
    ARRAY['Design and develop smart contracts', 'Build decentralized applications (dApps)', 'Optimize blockchain protocols and consensus algorithms', 'Perform smart contract security audits', 'Integrate blockchain with web3 frontends'],
    'Writing Solidity smart contracts, testing with Hardhat/Foundry, integrating Ethers.js in React frontends, and monitoring gas costs.',
    ARRAY['Solidity/Rust', 'Blockchain Architecture', 'Cryptography', 'Smart Contracts', 'Web3.js/Ethers.js'],
    ARRAY['Smart Contract Security', 'DeFi Protocols', 'Zero-Knowledge Proofs', 'Layer 2 Scaling'],
    ARRAY['Solidity', 'Rust', 'JavaScript', 'TypeScript', 'Go'],
    ARRAY['Hardhat', 'Truffle', 'Foundry', 'React'],
    ARRAY['AWS', 'IPFS'],
    ARRAY['VS Code', 'Git', 'Remix', 'Metamask'],
    '0-7 years',
    'Junior Blockchain Dev -> Senior Blockchain Dev -> Smart Contract Auditor -> Web3 Architect',
    '{"fresher":"₹8-18 LPA","mid":"₹18-40 LPA","senior":"₹40-80 LPA","lead":"₹80-120+ LPA"}'::jsonb,
    'Medium',
    'Low',
    '["CryptoZombies", "Buildspace", "ConsenSys Academy", "Alchemy University"]'::jsonb,
    ARRAY['Coinbase', 'Binance', 'ConsenSys', 'Polygon', 'WazirX', 'CoinDCX', 'Ethereum Foundation'],
    'System Generated',
    CURRENT_TIMESTAMP,
    0.89,
    'verified',
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM public.role_information WHERE LOWER(title)=LOWER('Blockchain Developer'));

INSERT INTO public.role_information (
    title, overview, responsibilities, daily_work, required_skills, preferred_skills, 
    languages, frameworks, cloud, tools, expected_experience, promotion_path, 
    salary_progression, future_demand, automation_risk, learning_resources, 
    companies_hiring, source, last_updated, confidence_score, verification_status, created_at
)
SELECT 
    'Game Developer',
    'Creates video games for various platforms including PC, console, and mobile, focusing on game mechanics, graphics, and performance optimization.',
    ARRAY['Write clean, robust, and well-documented game code', 'Implement game mechanics and logic', 'Optimize game performance for different platforms', 'Collaborate with artists and designers', 'Debug and fix game issues'],
    'Writing C#/C++ scripts for Unity/Unreal, profiling frame rates, implementing physics logic, and fixing memory leaks.',
    ARRAY['C# or C++', 'Game Engines (Unity/Unreal)', '3D Math and Physics', 'Object-Oriented Programming', 'Performance Profiling'],
    ARRAY['Shader Programming', 'Multiplayer Networking', 'Graphics APIs (OpenGL/DirectX)', 'AR/VR Development'],
    ARRAY['C#', 'C++', 'Python'],
    ARRAY['Unity', 'Unreal Engine'],
    ARRAY['AWS (GameLift)', 'Azure (PlayFab)'],
    ARRAY['Visual Studio', 'Git/Perforce', 'Unity Editor', 'Unreal Editor', 'RenderDoc'],
    '0-8 years',
    'Junior Game Dev -> Senior Game Dev -> Lead Programmer -> Technical Director',
    '{"fresher":"₹4-8 LPA","mid":"₹8-18 LPA","senior":"₹18-35 LPA","lead":"₹35-50 LPA"}'::jsonb,
    'Medium',
    'Low',
    '["Unity Learn", "Unreal Engine Documentation", "Brackeys (YouTube)", "Coursera - Game Design"]'::jsonb,
    ARRAY['EA', 'Ubisoft', 'Rockstar Games', 'Zynga', 'Dream11', 'Tencent', 'Epic Games'],
    'System Generated',
    CURRENT_TIMESTAMP,
    0.91,
    'verified',
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM public.role_information WHERE LOWER(title)=LOWER('Game Developer'));
