import React, { useState, useEffect } from 'react';
import { 
  ActivePage, 
  UserProfile, 
  VaultDocument, 
  KnowledgeNode, 
  KnowledgeLink, 
  CareerRecommendation, 
  ActivityLog, 
  ATSResume, 
  PortfolioData 
} from './types';

import {
  getStoredProfile,
  saveProfile,
  getStoredDocuments,
  saveDocuments,
  getStoredKnowledgeGraph,
  saveKnowledgeGraph,
  getStoredCareers,
  getStoredLogs,
  getStoredResume,
  saveResume,
  getStoredPortfolio,
  savePortfolio,
  getAuthUser,
  saveAuthUser
} from './services/storageService';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { AIFloatingWidget } from './components/AIFloatingWidget';

// Pages
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { DocumentVaultPage } from './pages/DocumentVaultPage';
import { KnowledgeGraphPage } from './pages/KnowledgeGraphPage';
import { ResumeBuilderPage } from './pages/ResumeBuilderPage';
import { PortfolioBuilderPage } from './pages/PortfolioBuilderPage';
import { SkillTimelinePage } from './pages/SkillTimelinePage';
import { CareerRecommendationsPage } from './pages/CareerRecommendationsPage';
import { ProfilePage } from './pages/ProfilePage';
import { AIChatAssistantPage } from './pages/AIChatAssistantPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // Pre-logged in for instant rich demo

  // Data State
  const [profile, setProfile] = useState<UserProfile>(getStoredProfile());
  const [documents, setDocuments] = useState<VaultDocument[]>(getStoredDocuments());
  const [graphData, setGraphData] = useState<{ nodes: KnowledgeNode[]; links: KnowledgeLink[] }>(getStoredKnowledgeGraph());
  const [careers, setCareers] = useState<CareerRecommendation[]>(getStoredCareers());
  const [logs, setLogs] = useState<ActivityLog[]>(getStoredLogs());
  const [resume, setResume] = useState<ATSResume>(getStoredResume());
  const [portfolio, setPortfolio] = useState<PortfolioData>(getStoredPortfolio());

  // Search & Modal State
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [selectedDocModal, setSelectedDocModal] = useState<VaultDocument | null>(null);

  // Sync state changes to storage
  useEffect(() => {
    saveDocuments(documents);
  }, [documents]);

  useEffect(() => {
    saveProfile(profile);
  }, [profile]);

  useEffect(() => {
    saveResume(resume);
  }, [resume]);

  useEffect(() => {
    savePortfolio(portfolio);
  }, [portfolio]);

  // Global Keyboard Listener (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleQuickStartDemo = () => {
    setIsLoggedIn(true);
    setActivePage('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-purple-500/30 selection:text-purple-200">
      
      {/* NAVBAR */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        profile={profile}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* MAIN VIEW ROUTER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {activePage === 'landing' && (
          <LandingPage
            setActivePage={setActivePage}
            onQuickStartDemo={handleQuickStartDemo}
          />
        )}

        {(activePage === 'login' || activePage === 'signup' || activePage === 'forgot-password') && (
          <AuthPage
            mode={activePage as any}
            setActivePage={setActivePage}
            setIsLoggedIn={setIsLoggedIn}
            profile={profile}
          />
        )}

        {activePage === 'dashboard' && (
          <DashboardPage
            profile={profile}
            documents={documents}
            nodes={graphData.nodes}
            logs={logs}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'vault' && (
          <DocumentVaultPage
            documents={documents}
            setDocuments={setDocuments}
            profile={profile}
            selectedDocModal={selectedDocModal}
            setSelectedDocModal={setSelectedDocModal}
          />
        )}

        {activePage === 'knowledge-graph' && (
          <KnowledgeGraphPage
            nodes={graphData.nodes}
            links={graphData.links}
            documents={documents}
            setActivePage={setActivePage}
            onSelectDoc={(doc) => setSelectedDocModal(doc)}
          />
        )}

        {activePage === 'resume-builder' && (
          <ResumeBuilderPage
            resume={resume}
            setResume={setResume}
            profile={profile}
            documents={documents}
          />
        )}

        {activePage === 'portfolio-builder' && (
          <PortfolioBuilderPage
            portfolio={portfolio}
            setPortfolio={setPortfolio}
            profile={profile}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'skill-timeline' && (
          <SkillTimelinePage
            profile={profile}
            documents={documents}
          />
        )}

        {activePage === 'career-recommendations' && (
          <CareerRecommendationsPage
            careers={careers}
            setCareers={setCareers}
            profile={profile}
            documents={documents}
          />
        )}

        {activePage === 'profile' && (
          <ProfilePage
            profile={profile}
            setProfile={setProfile}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'ai-chat' && (
          <AIChatAssistantPage
            profile={profile}
            documents={documents}
          />
        )}

        {activePage === 'settings' && (
          <SettingsPage />
        )}

      </main>

      {/* FLOATING AI CHAT WIDGET */}
      {isLoggedIn && (
        <AIFloatingWidget
          profile={profile}
          documents={documents}
        />
      )}

      {/* NATURAL LANGUAGE SEARCH MODAL */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        documents={documents}
        profile={profile}
        setActivePage={setActivePage}
        onSelectDoc={(doc) => {
          setSelectedDocModal(doc);
        }}
      />

      {/* FOOTER */}
      <Footer setActivePage={setActivePage} />

    </div>
  );
}
