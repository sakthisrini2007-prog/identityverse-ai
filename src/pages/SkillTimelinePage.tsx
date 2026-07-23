import React, { useState } from 'react';
import { UserProfile, VaultDocument } from '../types';
import { 
  Clock, 
  Award, 
  Briefcase, 
  FolderLock, 
  Sparkles, 
  CheckCircle2, 
  Calendar,
  Layers
} from 'lucide-react';

interface SkillTimelinePageProps {
  profile: UserProfile;
  documents: VaultDocument[];
}

export const SkillTimelinePage: React.FC<SkillTimelinePageProps> = ({ profile, documents }) => {
  const [filterType, setFilterType] = useState<string>('All');

  // Build unified chronological milestones
  const milestones = [
    ...documents.map(d => ({
      id: d.id,
      title: d.name,
      category: d.category,
      date: d.issueDate || d.uploadDate,
      issuer: d.issuerOrCompany || 'Verified',
      description: d.aiSummary,
      skills: d.skillsExtracted
    })),
    ...profile.projects.map(p => ({
      id: p.id,
      title: p.title,
      category: 'Project',
      date: p.startDate,
      issuer: 'Stanford CS Capstone',
      description: p.description,
      skills: p.technologies
    })),
    ...profile.internships.map(i => ({
      id: i.id,
      title: `${i.role} at ${i.company}`,
      category: 'Internship',
      date: i.duration,
      issuer: i.company,
      description: i.description,
      skills: i.skillsGained
    })),
    ...profile.achievements.map(a => ({
      id: a.id,
      title: a.title,
      category: 'Achievement',
      date: a.date,
      issuer: a.issuer,
      description: a.description,
      skills: ['Leadership', 'Problem Solving']
    }))
  ].sort((a, b) => (a.date < b.date ? 1 : -1));

  const filteredMilestones = filterType === 'All'
    ? milestones
    : milestones.filter(m => m.category.toLowerCase() === filterType.toLowerCase());

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <Clock className="w-7 h-7 text-purple-400" />
            Skill Evolution & Journey Timeline
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Chronological record of academic milestones, certifications, hackathon victories, and internships over time.
          </p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {['All', 'Certificate', 'Internship', 'Project', 'Achievement'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterType(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                filterType === cat
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-md'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* CHRONOLOGICAL TIMELINE STREAM */}
      <div className="relative max-w-4xl mx-auto pl-6 sm:pl-8 border-l-2 border-purple-500/30 space-y-8 my-8">
        
        {filteredMilestones.map((m, idx) => (
          <div key={idx} className="relative group">
            
            {/* Timeline Dot Marker */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-slate-950 border-2 border-purple-500 flex items-center justify-center text-purple-400 group-hover:scale-125 transition-transform shadow-lg shadow-purple-500/50">
              <div className="w-2 h-2 rounded-full bg-purple-400" />
            </div>

            {/* Content Card */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-purple-500/20 hover:border-purple-400/60 transition-all shadow-xl backdrop-blur-xl space-y-3">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-wider">
                    {m.category}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">{m.issuer}</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-purple-300 font-mono bg-slate-950 px-3 py-1 rounded-full border border-slate-800 w-fit">
                  <Calendar className="w-3.5 h-3.5 text-purple-400" />
                  <span>{m.date}</span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                  {m.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {m.description}
                </p>
              </div>

              {/* Skills gained */}
              {m.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
                  {m.skills.map((sk, sIdx) => (
                    <span key={sIdx} className="text-[10px] px-2 py-0.5 rounded-lg bg-slate-950 text-purple-300 border border-slate-800">
                      + {sk}
                    </span>
                  ))}
                </div>
              )}

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};
