export type DocCategory = 
  | 'Certificate'
  | 'Resume'
  | 'Project'
  | 'Internship'
  | 'Achievement'
  | 'Learning'
  | 'Other';

export interface VaultDocument {
  id: string;
  name: string;
  category: DocCategory;
  fileType: string; // 'pdf' | 'docx' | 'image' | 'ppt' | 'zip'
  size: string;
  uploadDate: string;
  issueDate?: string;
  issuerOrCompany?: string;
  skillsExtracted: string[];
  aiSummary: string;
  ocrText?: string;
  fileUrl?: string;
  isFavorite?: boolean;
  isDuplicate?: boolean;
  tags: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'AI & ML' | 'Cloud & DevOps' | 'Data & DB' | 'Soft Skills';
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  confidenceScore: number; // 0 - 100
  documentCount: number;
  lastUsedDate: string;
  verifiedByDocIds: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  role: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  startDate: string;
  endDate?: string;
  associatedDocId?: string;
}

export interface InternshipItem {
  id: string;
  company: string;
  role: string;
  location: string;
  duration: string;
  description: string;
  skillsGained: string[];
  associatedDocId?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  associatedDocId?: string;
}

export interface KnowledgeNode {
  id: string;
  label: string;
  type: 'skill' | 'project' | 'certificate' | 'internship' | 'achievement' | 'company';
  category?: string;
  val: number; // Node size weight
  color?: string;
  docId?: string;
}

export interface KnowledgeLink {
  source: string;
  target: string;
  relationship: 'uses' | 'verifies' | 'completed_at' | 'built_with' | 'earned_in' | 'related';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  title: string;
  bio: string;
  avatarUrl: string;
  college: string;
  degree: string;
  graduationYear: string;
  gpa?: string;
  location: string;
  githubUsername?: string;
  githubConnected: boolean;
  linkedinConnected: boolean;
  portfolioSlug: string;
  skills: SkillItem[];
  projects: ProjectItem[];
  internships: InternshipItem[];
  achievements: AchievementItem[];
  completionScore: number; // 0 - 100
  resumeScore: number; // 0 - 100
}

export interface ATSResume {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  summary: string;
  education: Array<{
    institution: string;
    degree: string;
    year: string;
    gpa?: string;
    highlights: string[];
  }>;
  experience: Array<{
    company: string;
    role: string;
    duration: string;
    location: string;
    bulletPoints: string[];
  }>;
  projects: Array<{
    name: string;
    techStack: string;
    bullets: string[];
    link?: string;
  }>;
  skills: {
    languages: string[];
    frameworks: string[];
    tools: string[];
    concepts: string[];
  };
  certifications: string[];
}

export interface PortfolioData {
  heroTagline: string;
  aboutText: string;
  featuredProjects: ProjectItem[];
  highlightSkills: string[];
  experienceList: InternshipItem[];
  certificatesList: string[];
  themeColor: string;
  customDomain?: string;
}

export interface CareerRecommendation {
  id: string;
  roleTitle: string;
  matchPercentage: number;
  description: string;
  averageSalary: string;
  demandGrowth: string;
  matchingSkills: string[];
  missingSkills: string[];
  actionPlanSteps: string[];
  recommendedCertifications: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedActions?: Array<{ label: string; actionKey: string; data?: any }>;
}

export interface ActivityLog {
  id: string;
  type: 'upload' | 'ocr' | 'skill_detected' | 'resume_generated' | 'portfolio_updated' | 'github_sync';
  title: string;
  timestamp: string;
  docName?: string;
}

export type ActivePage = 
  | 'landing'
  | 'login'
  | 'signup'
  | 'forgot-password'
  | 'dashboard'
  | 'vault'
  | 'knowledge-graph'
  | 'resume-builder'
  | 'portfolio-builder'
  | 'skill-timeline'
  | 'career-recommendations'
  | 'profile'
  | 'ai-chat'
  | 'settings';
