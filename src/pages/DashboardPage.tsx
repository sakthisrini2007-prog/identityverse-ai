import React from 'react';
import { 
  UserProfile, 
  VaultDocument, 
  KnowledgeNode, 
  ActivityLog, 
  ActivePage 
} from '../types';
import { 
  FolderLock, 
  Network, 
  FileText, 
  Globe, 
  Award, 
  Briefcase, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  Upload,
  Cpu,
  ShieldCheck,
  Zap,
  Target
} from 'lucide-react';

interface DashboardPageProps {
  profile: UserProfile;
  documents: VaultDocument[];
  nodes: KnowledgeNode[];
  logs: ActivityLog[];
  setActivePage: (page: ActivePage) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  profile,
  documents,
  nodes,
  logs,
  setActivePage
}) => {

  const skillCount = profile.skills.length;
  const projectCount = profile.projects.length;
  const certCount = documents.filter(d => d.category === 'Certificate').length;
  const internshipCount = profile.internships.length;

  const goals = [
    { label: 'Upload Latest Certificate / Evaluation', completed: certCount > 0, page: 'vault' },
    { label: 'Connect GitHub & Sync Repositories', completed: profile.githubConnected, page: 'profile' },
    { label: 'Generate ATS Optimized Resume', completed: profile.resumeScore > 80, page: 'resume-builder' },
    { label: 'Publish One-Click Web Portfolio', completed: !!profile.portfolioSlug, page: 'portfolio-builder' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* PROFILE WELCOME BANNER */}
      <div className="relative rounded-3xl bg-gradient-to-r from-purple-900/60 via-indigo-900/40 to-slate-900 border border-purple-500/30 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-20 h-20 rounded-2xl object-cover ring-4 ring-purple-500/40 shadow-xl"
              />
              <span className="absolute -bottom-1 -right-1 p-1 rounded-full bg-emerald-500 text-slate-950">
                <ShieldCheck className="w-4 h-4" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{profile.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-semibold">
                  Stanford CS Senior
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">{profile.title}</p>
              <p className="text-xs text-purple-300/80 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-purple-400" /> IdentityVerse Knowledge Base Synchronized
              </p>
            </div>
          </div>

          {/* Completion Score Ring / Badge */}
          <div className="flex items-center gap-4 bg-slate-950/60 p-4 rounded-2xl border border-purple-500/20">
            <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
              <svg className="w-14 h-14 -rotate-90">
                <circle cx="28" cy="28" r="22" stroke="currentColor" strokeWidth="4" className="text-slate-800" fill="transparent" />
                <circle 
                  cx="28" 
                  cy="28" 
                  r="22" 
                  stroke="currentColor" 
                  strokeWidth="4" 
                  className="text-purple-400 transition-all duration-1000" 
                  fill="transparent"
                  strokeDasharray="138"
                  strokeDashoffset={138 - (138 * profile.completionScore) / 100}
                />
              </svg>
              <span className="absolute text-xs font-extrabold text-white">{profile.completionScore}%</span>
            </div>
            <div>
              <p className="text-xs font-bold text-white">Identity Score</p>
              <p className="text-[11px] text-slate-400">Profile completion & document verification level</p>
            </div>
          </div>
        </div>
      </div>

      {/* METRICS CARDS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        
        <div 
          onClick={() => setActivePage('vault')} 
          className="p-4 rounded-2xl bg-slate-900/80 border border-purple-500/20 hover:border-purple-400/60 transition-all cursor-pointer hover:-translate-y-0.5 group"
        >
          <div className="flex items-center justify-between text-purple-400 mb-2">
            <FolderLock className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-purple-300" />
          </div>
          <p className="text-2xl font-black text-white">{documents.length}</p>
          <p className="text-[11px] text-slate-400 font-medium">Vault Docs</p>
        </div>

        <div 
          onClick={() => setActivePage('profile')} 
          className="p-4 rounded-2xl bg-slate-900/80 border border-purple-500/20 hover:border-purple-400/60 transition-all cursor-pointer hover:-translate-y-0.5 group"
        >
          <div className="flex items-center justify-between text-indigo-400 mb-2">
            <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-300" />
          </div>
          <p className="text-2xl font-black text-white">{skillCount}</p>
          <p className="text-[11px] text-slate-400 font-medium">Skills Verified</p>
        </div>

        <div 
          onClick={() => setActivePage('knowledge-graph')} 
          className="p-4 rounded-2xl bg-slate-900/80 border border-purple-500/20 hover:border-purple-400/60 transition-all cursor-pointer hover:-translate-y-0.5 group"
        >
          <div className="flex items-center justify-between text-blue-400 mb-2">
            <Network className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-blue-300" />
          </div>
          <p className="text-2xl font-black text-white">{nodes.length}</p>
          <p className="text-[11px] text-slate-400 font-medium">Graph Nodes</p>
        </div>

        <div 
          onClick={() => setActivePage('resume-builder')} 
          className="p-4 rounded-2xl bg-slate-900/80 border border-purple-500/20 hover:border-purple-400/60 transition-all cursor-pointer hover:-translate-y-0.5 group"
        >
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-300" />
          </div>
          <p className="text-2xl font-black text-white">{profile.resumeScore}</p>
          <p className="text-[11px] text-slate-400 font-medium">ATS Score</p>
        </div>

        <div 
          onClick={() => setActivePage('profile')} 
          className="p-4 rounded-2xl bg-slate-900/80 border border-purple-500/20 hover:border-purple-400/60 transition-all cursor-pointer hover:-translate-y-0.5 group"
        >
          <div className="flex items-center justify-between text-amber-400 mb-2">
            <Award className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-amber-300" />
          </div>
          <p className="text-2xl font-black text-white">{certCount}</p>
          <p className="text-[11px] text-slate-400 font-medium">Certificates</p>
        </div>

        <div 
          onClick={() => setActivePage('profile')} 
          className="p-4 rounded-2xl bg-slate-900/80 border border-purple-500/20 hover:border-purple-400/60 transition-all cursor-pointer hover:-translate-y-0.5 group"
        >
          <div className="flex items-center justify-between text-rose-400 mb-2">
            <Briefcase className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-rose-300" />
          </div>
          <p className="text-2xl font-black text-white">{internshipCount}</p>
          <p className="text-[11px] text-slate-400 font-medium">Internships</p>
        </div>

      </div>

      {/* TWO COLUMN CONTENT SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN (2 COLS) - AI SUGGESTIONS & SKILLS OVERVIEW */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* AI SMART SUGGESTIONS */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-purple-500/20 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
                Gemini Identity Recommendations
              </h3>
              <button 
                onClick={() => setActivePage('career-recommendations')}
                className="text-xs text-purple-400 hover:underline font-semibold flex items-center gap-1"
              >
                View Career Match Pathways <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-purple-300">
                  <span>ATS Resume Optimization</span>
                  <span className="px-2 py-0.5 rounded bg-purple-500/20 text-[10px]">High Priority</span>
                </div>
                <p className="text-xs text-slate-300">
                  Your Python and Gemini API credentials qualify you for Senior AI Engineer roles. Generate a fresh ATS resume to highlight Anthropic latency metrics.
                </p>
                <button
                  onClick={() => setActivePage('resume-builder')}
                  className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1"
                >
                  Generate ATS Resume →
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-indigo-300">
                  <span>Knowledge Graph Connection</span>
                  <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-[10px]">Graph Update</span>
                </div>
                <p className="text-xs text-slate-300">
                  Connect your Google GenAI Certificate node to your NeuralVision project to boost verified skill confidence to 98%.
                </p>
                <button
                  onClick={() => setActivePage('knowledge-graph')}
                  className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                >
                  Open Knowledge Graph →
                </button>
              </div>

            </div>
          </div>

          {/* VERIFIED SKILLS BREAKDOWN */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-purple-500/20 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                Verified Skill Map & Confidence
              </h3>
              <span className="text-xs text-slate-400">Extracted from Vault Docs</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {profile.skills.map((sk) => (
                <div key={sk.id} className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{sk.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      {sk.level}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-1000"
                      style={{ width: `${sk.confidenceScore}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>Verified by {sk.documentCount} docs</span>
                    <span>{sk.confidenceScore}% AI Confidence</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN (1 COL) - GOALS & ACTIVITY LOG */}
        <div className="space-y-6">
          
          {/* UPCOMING GOALS CHECKLIST */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-purple-500/20 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-400" />
              Identity Action Plan
            </h3>

            <div className="space-y-2.5">
              {goals.map((goal, idx) => (
                <div
                  key={idx}
                  onClick={() => setActivePage(goal.page as ActivePage)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-purple-500/40 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className={`w-4 h-4 ${goal.completed ? 'text-emerald-400' : 'text-slate-600'}`} />
                    <span className={`text-xs ${goal.completed ? 'text-slate-200 line-through' : 'text-slate-300 font-medium'}`}>
                      {goal.label}
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                </div>
              ))}
            </div>
          </div>

          {/* RECENT ACTIVITY LOG */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-purple-500/20 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-400" />
              Recent Vault Activity
            </h3>

            <div className="space-y-3">
              {logs.map((log) => (
                <div key={log.id} className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/80">
                  <div className="w-2 h-2 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-white">{log.title}</p>
                    {log.docName && <p className="text-[11px] text-purple-300/80 truncate">{log.docName}</p>}
                    <span className="text-[10px] text-slate-500 mt-0.5 block">{log.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* QUICK ACTION BUTTON */}
          <button
            onClick={() => setActivePage('vault')}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-xl shadow-purple-600/30 hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            <Upload className="w-4 h-4" />
            <span>Upload New Document To Vault</span>
          </button>

        </div>

      </div>

    </div>
  );
};
