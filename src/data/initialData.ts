import {
  UserProfile,
  VaultDocument,
  KnowledgeNode,
  KnowledgeLink,
  CareerRecommendation,
  ActivityLog,
  ATSResume,
  PortfolioData
} from '../types';

export const INITIAL_USER_PROFILE: UserProfile = {
  id: 'usr_alex_chen_01',
  name: 'Alex Chen',
  email: 'alex.chen@university.edu',
  title: 'Full Stack & AI/ML Student Developer',
  bio: 'Computer Science senior passionate about Building Intelligent Autonomous Systems, Distributed Web Apps, and Knowledge Graphs.',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  college: 'Stanford University / Dept of Computer Science',
  degree: 'B.S. in Computer Science (Artificial Intelligence Track)',
  graduationYear: '2026',
  gpa: '3.92 / 4.0',
  location: 'Palo Alto, California, US',
  githubUsername: 'alexchen-dev',
  githubConnected: true,
  linkedinConnected: true,
  portfolioSlug: 'alex-chen-identity',
  completionScore: 92,
  resumeScore: 88,
  skills: [
    { id: 'sk_1', name: 'Python', category: 'AI & ML', level: 'Expert', confidenceScore: 95, documentCount: 6, lastUsedDate: '2026-07-20', verifiedByDocIds: ['doc_1', 'doc_2'] },
    { id: 'sk_2', name: 'TypeScript', category: 'Frontend', level: 'Advanced', confidenceScore: 90, documentCount: 5, lastUsedDate: '2026-07-22', verifiedByDocIds: ['doc_3'] },
    { id: 'sk_3', name: 'PyTorch', category: 'AI & ML', level: 'Advanced', confidenceScore: 88, documentCount: 4, lastUsedDate: '2026-07-15', verifiedByDocIds: ['doc_1'] },
    { id: 'sk_4', name: 'React / Next.js', category: 'Frontend', level: 'Advanced', confidenceScore: 92, documentCount: 5, lastUsedDate: '2026-07-22', verifiedByDocIds: ['doc_3'] },
    { id: 'sk_5', name: 'Node.js & Express', category: 'Backend', level: 'Advanced', confidenceScore: 87, documentCount: 4, lastUsedDate: '2026-07-18', verifiedByDocIds: ['doc_3'] },
    { id: 'sk_6', name: 'PostgreSQL & Firestore', category: 'Data & DB', level: 'Intermediate', confidenceScore: 82, documentCount: 3, lastUsedDate: '2026-07-10', verifiedByDocIds: ['doc_3'] },
    { id: 'sk_7', name: 'Docker & Kubernetes', category: 'Cloud & DevOps', level: 'Intermediate', confidenceScore: 78, documentCount: 2, lastUsedDate: '2026-06-28', verifiedByDocIds: ['doc_2'] },
    { id: 'sk_8', name: 'LLM Fine-tuning & Gemini API', category: 'AI & ML', level: 'Expert', confidenceScore: 94, documentCount: 5, lastUsedDate: '2026-07-21', verifiedByDocIds: ['doc_1', 'doc_5'] }
  ],
  projects: [
    {
      id: 'proj_1',
      title: 'NeuralVision: Multi-Modal Document Summarizer',
      description: 'End-to-end OCR and semantic document graph construction engine utilizing Gemini 2.5 Flash and PyTorch vector embeddings.',
      role: 'Lead AI Engineer',
      technologies: ['Python', 'PyTorch', 'Gemini API', 'FastAPI', 'React'],
      githubUrl: 'https://github.com/alexchen-dev/neuralvision',
      liveUrl: 'https://neuralvision-demo.app',
      startDate: '2026-01-15',
      endDate: '2026-05-30',
      associatedDocId: 'doc_1'
    },
    {
      id: 'proj_2',
      title: 'CloudSync: Real-time Distributed File Vault',
      description: 'Zero-knowledge encrypted cloud storage interface with automatic OCR indexing and offline sync support.',
      role: 'Full Stack Creator',
      technologies: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js', 'Docker'],
      githubUrl: 'https://github.com/alexchen-dev/cloudsync-vault',
      startDate: '2025-09-01',
      endDate: '2025-12-15',
      associatedDocId: 'doc_3'
    }
  ],
  internships: [
    {
      id: 'intern_1',
      company: 'Anthropic AI Research Lab',
      role: 'AI Infrastructure Intern',
      location: 'San Francisco, CA',
      duration: 'Jun 2025 - Sep 2025',
      description: 'Optimized multi-GPU prompt caching pipelines, reducing inference latency by 34%. Built real-time evaluation benchmarks for synthetic dataset generation.',
      skillsGained: ['PyTorch', 'Python', 'Distributed Computing', 'CUDA', 'Docker'],
      associatedDocId: 'doc_2'
    },
    {
      id: 'intern_2',
      company: 'Scale AI',
      role: 'Software Engineering Intern',
      location: 'Remote',
      duration: 'Jun 2024 - Sep 2024',
      description: 'Engineered automated human-in-the-loop validation dashboards for multi-modal data processing using React and GraphQL.',
      skillsGained: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'PostgreSQL'],
      associatedDocId: 'doc_4'
    }
  ],
  achievements: [
    {
      id: 'ach_1',
      title: '1st Place Winner - Global AI Studio Hackathon 2026',
      issuer: 'Google Cloud & AI Studio',
      date: '2026-03-14',
      description: 'Awarded $15,000 for building an accessible AI knowledge graph assistant for neurodiverse students.',
      associatedDocId: 'doc_5'
    },
    {
      id: 'ach_2',
      title: 'Dean’s Honor List (4 Consecutive Semesters)',
      issuer: 'Stanford School of Engineering',
      date: '2024 - 2026',
      description: 'Maintained GPA above 3.9 while completing graduate-level machine learning course load.'
    }
  ]
};

export const INITIAL_DOCUMENTS: VaultDocument[] = [
  {
    id: 'doc_1',
    name: 'Google_GenAI_Specialization_Certificate.pdf',
    category: 'Certificate',
    fileType: 'pdf',
    size: '2.4 MB',
    uploadDate: '2026-06-12',
    issueDate: '2026-06-10',
    issuerOrCompany: 'Google Cloud Training',
    skillsExtracted: ['Python', 'Gemini API', 'LLM Fine-tuning', 'Prompt Engineering', 'PyTorch'],
    aiSummary: 'Official certification validating expertise in building multi-modal GenAI applications, vector databases, and fine-tuning Gemini model pipelines.',
    ocrText: 'GOOGLE CLOUD CERTIFICATION OF COMPLETION. This certifies that Alex Chen has successfully demonstrated mastery in Advanced Generative AI Application Development, Gemini Pro Multi-modal APIs, and Prompt Engineering.',
    isFavorite: true,
    tags: ['Google AI', 'Cert', 'Verified', 'AI/ML']
  },
  {
    id: 'doc_2',
    name: 'Anthropic_Internship_Offer_and_Evaluation.pdf',
    category: 'Internship',
    fileType: 'pdf',
    size: '1.8 MB',
    uploadDate: '2025-09-28',
    issueDate: '2025-09-20',
    issuerOrCompany: 'Anthropic Research',
    skillsExtracted: ['PyTorch', 'Distributed Computing', 'Docker', 'Python', 'CUDA'],
    aiSummary: 'Performance evaluation highlighting exceptional performance during summer internship. Noted for reducing model inference latency by 34% and authoring 3 internal tooling packages.',
    ocrText: 'Anthropic Research Lab Summer Internship Final Review. Employee: Alex Chen. Performance Rating: Exceeds All Expectations. Key Accomplishment: Optimized cluster GPU resource utilization by 34%.',
    isFavorite: true,
    tags: ['Internship', 'Anthropic', 'AI Infrastructure', 'High Performance']
  },
  {
    id: 'doc_3',
    name: 'FullStack_Architect_Project_Submission.docx',
    category: 'Project',
    fileType: 'docx',
    size: '4.1 MB',
    uploadDate: '2025-12-18',
    issueDate: '2025-12-15',
    issuerOrCompany: 'Stanford CS Capstone',
    skillsExtracted: ['TypeScript', 'React / Next.js', 'Node.js & Express', 'PostgreSQL & Firestore'],
    aiSummary: 'Capstone project documentation describing architectural design, database schemas, and performance benchmarks for CloudSync.',
    ocrText: 'Stanford CS Capstone Final Project Report. CloudSync Distributed Vault. Authors: Alex Chen. Technology Stack: TypeScript, React, Next.js, Express, Firestore, Tailwind CSS.',
    isFavorite: false,
    tags: ['Capstone', 'Stanford', 'Full Stack']
  },
  {
    id: 'doc_4',
    name: 'ScaleAI_Software_Internship_Completion.pdf',
    category: 'Internship',
    fileType: 'pdf',
    size: '1.1 MB',
    uploadDate: '2024-09-15',
    issueDate: '2024-09-01',
    issuerOrCompany: 'Scale AI',
    skillsExtracted: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
    aiSummary: 'Verification letter for software engineering internship focused on front-end data validation tools.',
    ocrText: 'To Whom It May Concern: Alex Chen completed a 12-week internship with Scale AI building validation UI components.',
    isFavorite: false,
    tags: ['Scale AI', 'Frontend', 'Letter']
  },
  {
    id: 'doc_5',
    name: 'Global_AI_Hackathon_1st_Place_Award.jpg',
    category: 'Achievement',
    fileType: 'image',
    size: '3.6 MB',
    uploadDate: '2026-03-15',
    issueDate: '2026-03-14',
    issuerOrCompany: 'Google Cloud',
    skillsExtracted: ['Gemini API', 'Accessibility', 'Knowledge Graph'],
    aiSummary: 'First place prize certificate and trophy snapshot for IdentityVerse AI Knowledge Graph submission.',
    ocrText: 'WINNER CERTIFICATE. 1st Place awarded to Alex Chen at Global AI Studio Hackathon 2026 for outstanding innovation.',
    isFavorite: true,
    tags: ['Hackathon', '1st Place', 'Google']
  }
];

export const INITIAL_KNOWLEDGE_NODES: KnowledgeNode[] = [
  // Center identity node
  { id: 'node_identity', label: 'Alex Chen (Digital Identity)', type: 'company', val: 32, color: '#a855f7' },

  // Skills
  { id: 'node_sk_python', label: 'Python', type: 'skill', category: 'AI & ML', val: 24, color: '#3b82f6' },
  { id: 'node_sk_ts', label: 'TypeScript', type: 'skill', category: 'Frontend', val: 22, color: '#06b6d4' },
  { id: 'node_sk_pytorch', label: 'PyTorch', type: 'skill', category: 'AI & ML', val: 20, color: '#a855f7' },
  { id: 'node_sk_gemini', label: 'Gemini API & LLMs', type: 'skill', category: 'AI & ML', val: 24, color: '#8b5cf6' },
  { id: 'node_sk_react', label: 'React / Next.js', type: 'skill', category: 'Frontend', val: 20, color: '#38bdf8' },
  { id: 'node_sk_docker', label: 'Docker & CUDA', type: 'skill', category: 'Cloud', val: 18, color: '#10b981' },

  // Projects
  { id: 'node_p1', label: 'NeuralVision (Multi-Modal OCR)', type: 'project', val: 22, color: '#f59e0b', docId: 'doc_1' },
  { id: 'node_p2', label: 'CloudSync Vault', type: 'project', val: 18, color: '#f59e0b', docId: 'doc_3' },

  // Internships / Companies
  { id: 'node_c1', label: 'Anthropic Research', type: 'internship', val: 22, color: '#ec4899', docId: 'doc_2' },
  { id: 'node_c2', label: 'Scale AI', type: 'internship', val: 18, color: '#ec4899', docId: 'doc_4' },

  // Certificates & Achievements
  { id: 'node_crt1', label: 'Google GenAI Specialization', type: 'certificate', val: 20, color: '#10b981', docId: 'doc_1' },
  { id: 'node_ach1', label: '1st Place Global AI Hackathon', type: 'achievement', val: 20, color: '#eab308', docId: 'doc_5' }
];

export const INITIAL_KNOWLEDGE_LINKS: KnowledgeLink[] = [
  { source: 'node_identity', target: 'node_p1', relationship: 'uses' },
  { source: 'node_identity', target: 'node_p2', relationship: 'uses' },
  { source: 'node_identity', target: 'node_c1', relationship: 'earned_in' },
  { source: 'node_identity', target: 'node_c2', relationship: 'earned_in' },
  { source: 'node_identity', target: 'node_crt1', relationship: 'verifies' },
  { source: 'node_identity', target: 'node_ach1', relationship: 'related' },

  { source: 'node_p1', target: 'node_sk_python', relationship: 'built_with' },
  { source: 'node_p1', target: 'node_sk_gemini', relationship: 'built_with' },
  { source: 'node_p1', target: 'node_sk_pytorch', relationship: 'built_with' },

  { source: 'node_p2', target: 'node_sk_ts', relationship: 'built_with' },
  { source: 'node_p2', target: 'node_sk_react', relationship: 'built_with' },

  { source: 'node_c1', target: 'node_sk_pytorch', relationship: 'verifies' },
  { source: 'node_c1', target: 'node_sk_docker', relationship: 'verifies' },
  { source: 'node_c1', target: 'node_sk_python', relationship: 'verifies' },

  { source: 'node_c2', target: 'node_sk_ts', relationship: 'verifies' },
  { source: 'node_c2', target: 'node_sk_react', relationship: 'verifies' },

  { source: 'node_crt1', target: 'node_sk_gemini', relationship: 'verifies' },
  { source: 'node_crt1', target: 'node_sk_python', relationship: 'verifies' },

  { source: 'node_ach1', target: 'node_sk_gemini', relationship: 'related' }
];

export const INITIAL_CAREER_RECOMMENDATIONS: CareerRecommendation[] = [
  {
    id: 'rec_1',
    roleTitle: 'Senior AI Application Engineer / LLM Specialist',
    matchPercentage: 96,
    description: 'Build cutting-edge autonomous agents, prompt orchestration pipelines, and multi-modal neural interfaces for top tech research labs.',
    averageSalary: '$175,000 - $240,000 / yr',
    demandGrowth: '+48% annual YoY',
    matchingSkills: ['Python', 'Gemini API', 'PyTorch', 'TypeScript', 'React', 'Docker'],
    missingSkills: ['LangChain / LlamaIndex Vector Indexes', 'Triton Inference Server', 'vLLM Optimization'],
    actionPlanSteps: [
      'Publish a benchmark on Gemini 2.5 Flash context window optimization',
      'Deploy an open-source vector search plugin using Qdrant or Pinecone',
      'Obtain AWS Certified Machine Learning Specialty or Google Professional ML Engineer'
    ],
    recommendedCertifications: ['Google Professional Machine Learning Engineer', 'AWS ML Specialty']
  },
  {
    id: 'rec_2',
    roleTitle: 'Full Stack AI Product Architect',
    matchPercentage: 92,
    description: 'Bridge software architecture with intelligence layers, building end-to-end user-facing products powered by cloud LLMs and high-concurrency Node/TypeScript backends.',
    averageSalary: '$160,000 - $210,000 / yr',
    demandGrowth: '+36% annual YoY',
    matchingSkills: ['TypeScript', 'React / Next.js', 'Node.js', 'PostgreSQL', 'Python', 'Gemini API'],
    missingSkills: ['Redis Caching Layer', 'System Design at Scale (100k QPS)', 'GraphQL Federation'],
    actionPlanSteps: [
      'Architect multi-region deployment for IdentityVerse using Docker & Kubernetes',
      'Add WebSocket streaming for real-time AI knowledge graph collaboration'
    ],
    recommendedCertifications: ['Google Professional Cloud Architect', 'Certified Kubernetes Application Developer (CKAD)']
  },
  {
    id: 'rec_3',
    roleTitle: 'AI Infrastructure & GPU Systems Engineer',
    matchPercentage: 88,
    description: 'Design multi-GPU distributed clusters, low-latency prompt cache servers, and high-throughput evaluation harnesses.',
    averageSalary: '$180,000 - $260,000 / yr',
    demandGrowth: '+52% annual YoY',
    matchingSkills: ['PyTorch', 'Python', 'Docker', 'CUDA basics'],
    missingSkills: ['C++ Systems Programming', 'DeepSpeed / Megatron-LM', 'Ray Cluster Orchestration'],
    actionPlanSteps: [
      'Implement custom C++ PyTorch binding for GPU matrix operations',
      'Contribute to vLLM or Hugging Face TGI repository'
    ],
    recommendedCertifications: ['NVIDIA Deep Learning Institute Specialist']
  }
];

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  { id: 'act_1', type: 'upload', title: 'Document Uploaded', timestamp: '2 hours ago', docName: 'Google_GenAI_Specialization_Certificate.pdf' },
  { id: 'act_2', type: 'ocr', title: 'OCR & AI Analysis Complete', timestamp: '2 hours ago', docName: 'Extracted 5 verified skills & 3 tags' },
  { id: 'act_3', type: 'skill_detected', title: 'Skill Level Up: Gemini API', timestamp: ' Yesterday', docName: 'Level increased to Expert (94% confidence)' },
  { id: 'act_4', type: 'resume_generated', title: 'ATS Resume Compiled', timestamp: '2 days ago', docName: 'IdentityVerse_ATS_Resume_Alex_Chen.pdf' },
  { id: 'act_5', type: 'github_sync', title: 'GitHub Integration Synced', timestamp: '3 days ago', docName: '14 repositories scanned, 128 commits detected' }
];

export const INITIAL_ATS_RESUME: ATSResume = {
  fullName: 'Alex Chen',
  email: 'alex.chen@university.edu',
  phone: '+1 (650) 555-0192',
  location: 'Palo Alto, CA',
  linkedin: 'linkedin.com/in/alexchen-dev',
  github: 'github.com/alexchen-dev',
  summary: 'High-performing Computer Science senior at Stanford University with 2+ years of hands-on experience in generative AI applications, full-stack web platforms, and distributed systems. Demonstrated history of reducing GPU inference latency by 34% at Anthropic and winning 1st place at the Global AI Studio Hackathon 2026.',
  education: [
    {
      institution: 'Stanford University',
      degree: 'B.S. in Computer Science (AI Track)',
      year: 'Graduating May 2026',
      gpa: '3.92 / 4.0',
      highlights: ['Dean’s Honor List', 'Course Assistant for CS 224N Natural Language Processing with Deep Learning']
    }
  ],
  experience: [
    {
      company: 'Anthropic Research Lab',
      role: 'AI Infrastructure Intern',
      duration: 'Jun 2025 - Sep 2025',
      location: 'San Francisco, CA',
      bulletPoints: [
        'Engineered GPU prompt-caching pipeline using PyTorch and CUDA, reducing model cold-start inference latency by 34%.',
        'Built automated synthetic benchmark evaluation framework processing over 50,000 multi-turn conversation logs daily.',
        'Collaborated with senior research scientists to optimize multi-node distributed training scripts in PyTorch.'
      ]
    },
    {
      company: 'Scale AI',
      role: 'Software Engineering Intern',
      duration: 'Jun 2024 - Sep 2024',
      location: 'Remote',
      bulletPoints: [
        'Designed and implemented human-in-the-loop web dashboards using React, TypeScript, and GraphQL.',
        'Streamlined multi-modal annotation validation workflows, improving dataset throughput by 22%.',
        'Wrote end-to-end integration test suites with Cypress and Jest, maintaining 95%+ code coverage.'
      ]
    }
  ],
  projects: [
    {
      name: 'NeuralVision - Multi-Modal Document Knowledge Engine',
      techStack: 'Python, PyTorch, Gemini 2.5 Flash API, FastAPI, React',
      bullets: [
        'Developed an end-to-end document OCR and semantic graph construction engine capable of parsing PDFs and images in under 1.2 seconds.',
        'Extracted skill vectors and generated interactive Knowledge Graphs with 98% categoric accuracy.'
      ],
      link: 'https://github.com/alexchen-dev/neuralvision'
    },
    {
      name: 'CloudSync - Zero-Knowledge File Vault',
      techStack: 'TypeScript, Next.js, Node.js, Express, Firestore, Docker',
      bullets: [
        'Built a encrypted web platform with client-side OCR caching and background synchronization.',
        'Containerized multi-service app with Docker Compose for seamless single-command deployment.'
      ],
      link: 'https://github.com/alexchen-dev/cloudsync-vault'
    }
  ],
  skills: {
    languages: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'C++', 'HTML/CSS'],
    frameworks: ['PyTorch', 'React', 'Next.js', 'Express.js', 'FastAPI', 'Tailwind CSS'],
    tools: ['Docker', 'Git', 'Gemini API', 'PostgreSQL', 'Firestore', 'Linux/Bash'],
    concepts: ['Multi-Modal Generative AI', 'Document OCR', 'Knowledge Graphs', 'Distributed Systems', 'REST/GraphQL APIs']
  },
  certifications: [
    'Google Cloud Generative AI Specialization (2026)',
    '1st Place Winner - Global AI Studio Hackathon (2026)',
    'AWS Cloud Practitioner Certified'
  ]
};

export const INITIAL_PORTFOLIO_DATA: PortfolioData = {
  heroTagline: 'Building the Next Generation of Intelligent Multi-Modal Software & Knowledge Systems',
  aboutText: 'I am a Computer Science Senior at Stanford University specializing in Artificial Intelligence and Full Stack Engineering. My focus is combining deep generative AI models (like Gemini Pro) with seamless, high-performance web experiences.',
  featuredProjects: [
    {
      id: 'proj_1',
      title: 'NeuralVision: Multi-Modal Document Summarizer',
      description: 'End-to-end OCR and semantic document graph construction engine utilizing Gemini 2.5 Flash and PyTorch vector embeddings.',
      role: 'Lead AI Engineer',
      technologies: ['Python', 'PyTorch', 'Gemini API', 'FastAPI', 'React'],
      githubUrl: 'https://github.com/alexchen-dev/neuralvision',
      liveUrl: 'https://neuralvision-demo.app',
      startDate: '2026-01-15'
    },
    {
      id: 'proj_2',
      title: 'CloudSync: Real-time Distributed File Vault',
      description: 'Zero-knowledge encrypted cloud storage interface with automatic OCR indexing and offline sync support.',
      role: 'Full Stack Creator',
      technologies: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js', 'Docker'],
      githubUrl: 'https://github.com/alexchen-dev/cloudsync-vault',
      startDate: '2025-09-01'
    }
  ],
  highlightSkills: ['Python', 'TypeScript', 'Gemini API', 'PyTorch', 'React / Next.js', 'Node.js', 'Docker', 'PostgreSQL'],
  experienceList: [
    {
      id: 'intern_1',
      company: 'Anthropic AI Research Lab',
      role: 'AI Infrastructure Intern',
      location: 'San Francisco, CA',
      duration: 'Jun 2025 - Sep 2025',
      description: 'Optimized multi-GPU prompt caching pipelines, reducing inference latency by 34%. Built real-time evaluation benchmarks.',
      skillsGained: ['PyTorch', 'Python', 'Distributed Computing', 'CUDA']
    },
    {
      id: 'intern_2',
      company: 'Scale AI',
      role: 'Software Engineering Intern',
      location: 'Remote',
      duration: 'Jun 2024 - Sep 2024',
      description: 'Engineered human-in-the-loop validation dashboards for multi-modal data processing using React and GraphQL.',
      skillsGained: ['React', 'TypeScript', 'Node.js', 'GraphQL']
    }
  ],
  certificatesList: [
    'Google Cloud Generative AI Specialization (2026)',
    '1st Place Winner - Global AI Studio Hackathon (2026)',
    'Stanford University CS Honors'
  ],
  themeColor: '#8b5cf6',
  customDomain: 'alexchen.identityverse.ai'
};
