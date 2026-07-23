import React, { useState } from 'react';
import { CareerRecommendation, UserProfile, VaultDocument } from '../types';
import { 
  Compass, 
  Sparkles, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  RefreshCw, 
  BookOpen, 
  Target
} from 'lucide-react';
import { fetchCareerRecommendations } from '../services/aiService';
import { saveCareers, addActivityLog } from '../services/storageService';

interface CareerRecommendationsPageProps {
  careers: CareerRecommendation[];
  setCareers: React.Dispatch<React.SetStateAction<CareerRecommendation[]>>;
  profile: UserProfile;
  documents: VaultDocument[];
}

export const CareerRecommendationsPage: React.FC<CareerRecommendationsPageProps> = ({
  careers,
  setCareers,
  profile,
  documents
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshAI = async () => {
    setIsRefreshing(true);
    const updated = await fetchCareerRecommendations(profile, documents);
    if (updated) {
      setCareers(updated);
      saveCareers(updated);
      addActivityLog('skill_detected', 'AI Career Recommendations Updated');
    }
    setIsRefreshing(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <Compass className="w-7 h-7 text-purple-400" />
            AI Career Pathways & Skill Gap Analysis
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Gemini AI cross-references your verified document vault against 10,000+ industry job specs to match optimal career trajectories.
          </p>
        </div>

        <button
          onClick={handleRefreshAI}
          disabled={isRefreshing}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-purple-600/30 hover:opacity-95 disabled:opacity-50 transition-all flex items-center gap-2"
        >
          {isRefreshing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-purple-200" />}
          <span>Re-Analyze Career Pathways</span>
        </button>
      </div>

      {/* CAREER PATHWAY CARDS */}
      <div className="space-y-6">
        {careers.map((rec) => (
          <div
            key={rec.id}
            className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-purple-500/30 hover:border-purple-400/60 transition-all shadow-2xl backdrop-blur-2xl space-y-6"
          >
            {/* Role Header & Metrics */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-extrabold text-white">{rec.roleTitle}</h3>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                    {rec.matchPercentage}% Match
                  </span>
                </div>
                <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">{rec.description}</p>
              </div>

              <div className="flex items-center gap-4 bg-slate-950 p-3.5 rounded-2xl border border-slate-800 shrink-0">
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Avg Salary</p>
                  <p className="text-sm font-bold text-emerald-400 mt-0.5">{rec.averageSalary}</p>
                </div>
                <div className="w-px h-8 bg-slate-800" />
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Demand YoY</p>
                  <p className="text-sm font-bold text-purple-400 mt-0.5">{rec.demandGrowth}</p>
                </div>
              </div>
            </div>

            {/* SKILLS COMPARISON GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Verified Matching Skills */}
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-3">
                <p className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Your Verified Skills ({rec.matchingSkills.length})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {rec.matchingSkills.map((sk, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-medium">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Skill Gaps */}
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20 space-y-3">
                <p className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  Skill Gap to Bridge ({rec.missingSkills.length})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {rec.missingSkills.map((sk, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-medium">
                      + {sk}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* STEP-BY-STEP ACTION ROADMAP */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-400" />
                Step-by-Step Action Plan Roadmap
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {rec.actionPlanSteps.map((step, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold text-purple-400">Step 0{idx + 1}</span>
                    <p className="text-xs text-slate-300 leading-snug">{step}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
