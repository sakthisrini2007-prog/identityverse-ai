import React, { useState } from 'react';
import { ATSResume, UserProfile, VaultDocument } from '../types';
import { 
  FileText, 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  RefreshCw, 
  Printer, 
  Plus, 
  Trash2, 
  Briefcase, 
  GraduationCap, 
  Award,
  Layers,
  Wand2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateATSResumeWithAI } from '../services/aiService';
import { saveResume, addActivityLog } from '../services/storageService';

interface ResumeBuilderPageProps {
  resume: ATSResume;
  setResume: React.Dispatch<React.SetStateAction<ATSResume>>;
  profile: UserProfile;
  documents: VaultDocument[];
}

export const ResumeBuilderPage: React.FC<ResumeBuilderPageProps> = ({
  resume,
  setResume,
  profile,
  documents
}) => {
  const [template, setTemplate] = useState<'modern' | 'minimal' | 'executive'>('modern');
  const [targetRole, setTargetRole] = useState('Full Stack AI & ML Engineer');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Trigger confetti celebration and print
  const handleExportPDF = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#a855f7', '#6366f1', '#3b82f6']
    });

    addActivityLog('resume_generated', 'ATS Resume Exported to PDF', `${profile.name}_ATS_Resume.pdf`);
    window.print();
  };

  const handleCopyMarkdown = () => {
    const md = `# ${resume.fullName}
${resume.email} | ${resume.phone} | ${resume.location}
LinkedIn: ${resume.linkedin} | GitHub: ${resume.github}

## PROFESSIONAL SUMMARY
${resume.summary}

## EDUCATION
${resume.education.map(e => `### ${e.institution} - ${e.degree} (${e.year})
GPA: ${e.gpa || 'N/A'}
${e.highlights.map(h => `- ${h}`).join('\n')}`).join('\n\n')}

## EXPERIENCE
${resume.experience.map(exp => `### ${exp.role} - ${exp.company} (${exp.duration}) | ${exp.location}
${exp.bulletPoints.map(b => `- ${b}`).join('\n')}`).join('\n\n')}

## PROJECTS
${resume.projects.map(p => `### ${p.name} [${p.techStack}]
${p.bullets.map(b => `- ${b}`).join('\n')}`).join('\n\n')}

## TECHNICAL SKILLS
- Languages: ${resume.skills.languages.join(', ')}
- Frameworks: ${resume.skills.frameworks.join(', ')}
- Tools: ${resume.skills.tools.join(', ')}

## CERTIFICATIONS
${resume.certifications.map(c => `- ${c}`).join('\n')}
`;

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAIOptimizeResume = async () => {
    setIsGenerating(true);
    const optimized = await generateATSResumeWithAI(profile, documents, targetRole);

    if (optimized) {
      setResume(optimized);
      saveResume(optimized);
      addActivityLog('resume_generated', 'ATS Resume AI Re-Optimized', targetRole);
    }
    setIsGenerating(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* HEADER & CONTROLS (Hidden during print) */}
      <div className="print:hidden space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
              <FileText className="w-7 h-7 text-emerald-400" />
              ATS Resume Builder & AI Optimizer
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Automatically format your verified vault credentials into machine-readable ATS standard resumes.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleCopyMarkdown}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-purple-500/20 text-slate-200 text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-purple-400" />}
              <span>{copied ? 'Copied Markdown' : 'Copy Markdown'}</span>
            </button>

            <button
              onClick={handleExportPDF}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-purple-600/30 hover:opacity-95 transition-all flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Export PDF / Print</span>
            </button>
          </div>
        </div>

        {/* AI TARGET ROLE & TEMPLATES SELECTOR */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-purple-500/20 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Target Role Selector */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold text-white flex items-center gap-1.5">
              <Wand2 className="w-4 h-4 text-purple-400" />
              Target Role Alignment
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Full Stack AI Engineer, ML Scientist..."
                className="flex-1 bg-slate-950 border border-purple-500/20 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
              />
              <button
                onClick={handleAIOptimizeResume}
                disabled={isGenerating}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs hover:opacity-90 disabled:opacity-50 flex items-center gap-1.5 shrink-0"
              >
                {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-purple-200" />}
                <span>AI Re-Optimize</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Gemini AI will re-weight skills & rewrite bullet points with action verbs for this specific role.
            </p>
          </div>

          {/* Template Style Toggle */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-white flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-400" />
              Layout Template Style
            </label>
            <div className="grid grid-cols-3 gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setTemplate('modern')}
                className={`py-1.5 rounded-lg text-xs font-medium transition-all ${
                  template === 'modern' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Modern
              </button>
              <button
                onClick={() => setTemplate('minimal')}
                className={`py-1.5 rounded-lg text-xs font-medium transition-all ${
                  template === 'minimal' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Minimal
              </button>
              <button
                onClick={() => setTemplate('executive')}
                className={`py-1.5 rounded-lg text-xs font-medium transition-all ${
                  template === 'executive' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Executive
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* LIVE RESUME PREVIEW (Clean Light/Dark Printable Container) */}
      <div className="max-w-4xl mx-auto bg-white text-slate-900 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-6 print:p-0 print:shadow-none print:bg-white print:text-black print:rounded-none">
        
        {/* Header Name & Contact */}
        <div className="text-center border-b pb-6 border-slate-200">
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">{resume.fullName}</h2>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600 font-medium mt-2">
            <span>{resume.email}</span>
            <span>•</span>
            <span>{resume.phone}</span>
            <span>•</span>
            <span>{resume.location}</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-indigo-700 font-medium mt-1">
            <a href={`https://${resume.linkedin}`} target="_blank" rel="noreferrer">{resume.linkedin}</a>
            <span>•</span>
            <a href={`https://${resume.github}`} target="_blank" rel="noreferrer">{resume.github}</a>
          </div>
        </div>

        {/* Professional Summary */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-300 pb-1">
            Professional Summary
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed font-sans">
            {resume.summary}
          </p>
        </div>

        {/* Experience Section */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-300 pb-1">
            Work Experience
          </h3>
          {resume.experience.map((exp, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                <span>{exp.role} — {exp.company}</span>
                <span className="text-slate-600 font-normal">{exp.duration} | {exp.location}</span>
              </div>
              <ul className="list-disc list-inside text-xs text-slate-700 space-y-1 pl-1">
                {exp.bulletPoints.map((b, bIdx) => (
                  <li key={bIdx} className="leading-snug">{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Projects Section */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-300 pb-1">
            Featured Technical Projects
          </h3>
          {resume.projects.map((proj, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                <span>{proj.name}</span>
                <span className="text-[11px] text-indigo-700 font-mono font-medium">{proj.techStack}</span>
              </div>
              <ul className="list-disc list-inside text-xs text-slate-700 space-y-1 pl-1">
                {proj.bullets.map((b, bIdx) => (
                  <li key={bIdx} className="leading-snug">{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Education Section */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-300 pb-1">
            Education
          </h3>
          {resume.education.map((edu, idx) => (
            <div key={idx} className="text-xs text-slate-800 space-y-0.5">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>{edu.institution} — {edu.degree}</span>
                <span className="text-slate-600 font-normal">{edu.year}</span>
              </div>
              {edu.gpa && <p className="text-slate-600 text-[11px]">GPA: {edu.gpa}</p>}
              {edu.highlights.length > 0 && (
                <p className="text-slate-600 text-[11px]">Honors: {edu.highlights.join(', ')}</p>
              )}
            </div>
          ))}
        </div>

        {/* Skills Section */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-300 pb-1">
            Technical Skills
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-800">
            <div><span className="font-bold">Languages:</span> {resume.skills.languages.join(', ')}</div>
            <div><span className="font-bold">Frameworks:</span> {resume.skills.frameworks.join(', ')}</div>
            <div><span className="font-bold">Tools & Cloud:</span> {resume.skills.tools.join(', ')}</div>
            <div><span className="font-bold">Concepts:</span> {resume.skills.concepts.join(', ')}</div>
          </div>
        </div>

        {/* Certifications & Achievements */}
        {resume.certifications.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-300 pb-1">
              Certifications & Awards
            </h3>
            <ul className="list-disc list-inside text-xs text-slate-700 space-y-0.5">
              {resume.certifications.map((cert, idx) => (
                <li key={idx}>{cert}</li>
              ))}
            </ul>
          </div>
        )}

      </div>

    </div>
  );
};
