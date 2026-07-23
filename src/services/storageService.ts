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

import {
  INITIAL_USER_PROFILE,
  INITIAL_DOCUMENTS,
  INITIAL_KNOWLEDGE_NODES,
  INITIAL_KNOWLEDGE_LINKS,
  INITIAL_CAREER_RECOMMENDATIONS,
  INITIAL_ACTIVITY_LOGS,
  INITIAL_ATS_RESUME,
  INITIAL_PORTFOLIO_DATA
} from '../data/initialData';

const STORAGE_KEYS = {
  PROFILE: 'identityverse_profile_v1',
  DOCUMENTS: 'identityverse_docs_v1',
  NODES: 'identityverse_nodes_v1',
  LINKS: 'identityverse_links_v1',
  CAREERS: 'identityverse_careers_v1',
  LOGS: 'identityverse_logs_v1',
  RESUME: 'identityverse_resume_v1',
  PORTFOLIO: 'identityverse_portfolio_v1',
  AUTH: 'identityverse_auth_user_v1'
};

export function getStoredProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading profile from storage:', e);
  }
  return INITIAL_USER_PROFILE;
}

export function saveProfile(profile: UserProfile): void {
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  window.dispatchEvent(new CustomEvent('identityverse_profile_updated', { detail: profile }));
}

export function getStoredDocuments(): VaultDocument[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DOCUMENTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading documents from storage:', e);
  }
  return INITIAL_DOCUMENTS;
}

export function saveDocuments(docs: VaultDocument[]): void {
  localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(docs));
  window.dispatchEvent(new CustomEvent('identityverse_docs_updated', { detail: docs }));
}

export function getStoredKnowledgeGraph(): { nodes: KnowledgeNode[]; links: KnowledgeLink[] } {
  try {
    const rawN = localStorage.getItem(STORAGE_KEYS.NODES);
    const rawL = localStorage.getItem(STORAGE_KEYS.LINKS);
    if (rawN && rawL) {
      return { nodes: JSON.parse(rawN), links: JSON.parse(rawL) };
    }
  } catch (e) {
    console.error('Failed reading knowledge graph from storage:', e);
  }
  return { nodes: INITIAL_KNOWLEDGE_NODES, links: INITIAL_KNOWLEDGE_LINKS };
}

export function saveKnowledgeGraph(nodes: KnowledgeNode[], links: KnowledgeLink[]): void {
  localStorage.setItem(STORAGE_KEYS.NODES, JSON.stringify(nodes));
  localStorage.setItem(STORAGE_KEYS.LINKS, JSON.stringify(links));
  window.dispatchEvent(new CustomEvent('identityverse_graph_updated', { detail: { nodes, links } }));
}

export function getStoredCareers(): CareerRecommendation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CAREERS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading careers from storage:', e);
  }
  return INITIAL_CAREER_RECOMMENDATIONS;
}

export function saveCareers(careers: CareerRecommendation[]): void {
  localStorage.setItem(STORAGE_KEYS.CAREERS, JSON.stringify(careers));
}

export function getStoredLogs(): ActivityLog[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LOGS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading logs from storage:', e);
  }
  return INITIAL_ACTIVITY_LOGS;
}

export function saveLogs(logs: ActivityLog[]): void {
  localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(logs));
  window.dispatchEvent(new CustomEvent('identityverse_logs_updated', { detail: logs }));
}

export function addActivityLog(type: ActivityLog['type'], title: string, docName?: string): void {
  const current = getStoredLogs();
  const newLog: ActivityLog = {
    id: `act_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    type,
    title,
    timestamp: 'Just now',
    docName
  };
  const updated = [newLog, ...current].slice(0, 30);
  saveLogs(updated);
}

export function getStoredResume(): ATSResume {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RESUME);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading resume from storage:', e);
  }
  return INITIAL_ATS_RESUME;
}

export function saveResume(resume: ATSResume): void {
  localStorage.setItem(STORAGE_KEYS.RESUME, JSON.stringify(resume));
}

export function getStoredPortfolio(): PortfolioData {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PORTFOLIO);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading portfolio from storage:', e);
  }
  return INITIAL_PORTFOLIO_DATA;
}

export function savePortfolio(portfolio: PortfolioData): void {
  localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(portfolio));
}

export function getAuthUser(): { email: string; name: string } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.AUTH);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading auth user:', e);
  }
  // Default to logged-in Alex Chen for rich demo experience
  return { email: 'alex.chen@university.edu', name: 'Alex Chen' };
}

export function saveAuthUser(user: { email: string; name: string } | null): void {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  }
  window.dispatchEvent(new CustomEvent('identityverse_auth_changed', { detail: user }));
}

export function resetToDemoData(): void {
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(INITIAL_USER_PROFILE));
  localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(INITIAL_DOCUMENTS));
  localStorage.setItem(STORAGE_KEYS.NODES, JSON.stringify(INITIAL_KNOWLEDGE_NODES));
  localStorage.setItem(STORAGE_KEYS.LINKS, JSON.stringify(INITIAL_KNOWLEDGE_LINKS));
  localStorage.setItem(STORAGE_KEYS.CAREERS, JSON.stringify(INITIAL_CAREER_RECOMMENDATIONS));
  localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(INITIAL_ACTIVITY_LOGS));
  localStorage.setItem(STORAGE_KEYS.RESUME, JSON.stringify(INITIAL_ATS_RESUME));
  localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(INITIAL_PORTFOLIO_DATA));
  saveAuthUser({ email: INITIAL_USER_PROFILE.email, name: INITIAL_USER_PROFILE.name });
  
  window.location.reload();
}

export function exportBackupJSON(): string {
  const backup = {
    version: '1.0',
    timestamp: new Date().toISOString(),
    profile: getStoredProfile(),
    documents: getStoredDocuments(),
    knowledgeGraph: getStoredKnowledgeGraph(),
    careers: getStoredCareers(),
    logs: getStoredLogs(),
    resume: getStoredResume(),
    portfolio: getStoredPortfolio()
  };
  return JSON.stringify(backup, null, 2);
}
