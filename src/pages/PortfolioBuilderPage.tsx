import React, { useState } from 'react';
import { PortfolioData, UserProfile, ActivePage } from '../types';
import { 
  Globe, 
  Sparkles, 
  ExternalLink, 
  Copy, 
  Check, 
  Download, 
  Smartphone, 
  Monitor, 
  Palette, 
  CheckCircle2, 
  Code, 
  Github, 
  Linkedin, 
  Mail,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { savePortfolio, addActivityLog } from '../services/storageService';

interface PortfolioBuilderPageProps {
  portfolio: PortfolioData;
  setPortfolio: React.Dispatch<React.SetStateAction<PortfolioData>>;
  profile: UserProfile;
  setActivePage: (page: ActivePage) => void;
}

export const PortfolioBuilderPage: React.FC<PortfolioBuilderPageProps> = ({
  portfolio,
  setPortfolio,
  profile,
  setActivePage
}) => {
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'mobile'>('desktop');
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedThemeColor, setSelectedThemeColor] = useState(portfolio.themeColor || '#8b5cf6');

  const themeColors = [
    { label: 'Vibrant Purple', value: '#8b5cf6' },
    { label: 'Cyan Glow', value: '#06b6d4' },
    { label: 'Emerald Green', value: '#10b981' },
    { label: 'Electric Blue', value: '#3b82f6' },
    { label: 'Rose Pink', value: '#ec4899' }
  ];

  const shareableUrl = `https://${portfolio.customDomain || `${profile.portfolioSlug}.identityverse.ai`}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopiedLink(true);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    addActivityLog('portfolio_updated', 'Portfolio URL Copied', shareableUrl);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleExportHTML = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${profile.name} - IdentityVerse Portfolio</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-slate-100 font-sans min-h-screen">
  <div class="max-w-5xl mx-auto px-6 py-16 space-y-16">
    <header class="text-center space-y-4">
      <h1 class="text-5xl font-extrabold text-white">${profile.name}</h1>
      <p class="text-xl text-purple-400 font-medium">${portfolio.heroTagline}</p>
      <p class="text-sm text-slate-400 max-w-2xl mx-auto">${portfolio.aboutText}</p>
    </header>

    <section class="space-y-6">
      <h2 class="text-2xl font-bold border-b border-slate-800 pb-2">Featured Projects</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${portfolio.featuredProjects.map(p => `
          <div class="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <h3 class="text-lg font-bold text-white">${p.title}</h3>
            <p class="text-xs text-slate-400 my-2">${p.description}</p>
            <div class="flex flex-wrap gap-1">
              ${p.technologies.map(t => `<span class="text-[10px] bg-slate-800 text-purple-300 px-2 py-0.5 rounded">${t}</span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${profile.portfolioSlug}_portfolio.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* HEADER & CONTROLS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <Globe className="w-7 h-7 text-indigo-400" />
            One-Click Web Portfolio Generator
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Instantly publish a responsive online portfolio showcasing your verified projects, credentials, and experience.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all flex items-center gap-1.5"
          >
            {copiedLink ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            <span>{copiedLink ? 'Link Copied!' : 'Copy Shareable Link'}</span>
          </button>

          <button
            onClick={handleExportHTML}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-purple-500/20 text-slate-200 font-semibold text-xs hover:bg-slate-800 transition-colors flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-purple-400" />
            <span>Export Standalone HTML</span>
          </button>
        </div>
      </div>

      {/* PORTFOLIO SETTINGS & THEME PICKER */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-purple-500/20 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Palette className="w-4 h-4 text-purple-400" />
            Customize Portfolio Identity & Color
          </h3>

          {/* Device Toggle */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setDevicePreview('desktop')}
              className={`p-1.5 rounded-lg text-xs flex items-center gap-1 ${
                devicePreview === 'desktop' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400'
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span>Desktop</span>
            </button>
            <button
              onClick={() => setDevicePreview('mobile')}
              className={`p-1.5 rounded-lg text-xs flex items-center gap-1 ${
                devicePreview === 'mobile' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Mobile</span>
            </button>
          </div>
        </div>

        {/* Input Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Tagline</label>
            <input
              type="text"
              value={portfolio.heroTagline}
              onChange={(e) => setPortfolio({ ...portfolio, heroTagline: e.target.value })}
              className="w-full bg-slate-950 border border-purple-500/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Custom Subdomain</label>
            <div className="flex items-center bg-slate-950 border border-purple-500/20 rounded-xl px-3 py-2 text-xs text-purple-300">
              <span>https://</span>
              <input
                type="text"
                value={portfolio.customDomain || 'alexchen.identityverse.ai'}
                onChange={(e) => setPortfolio({ ...portfolio, customDomain: e.target.value })}
                className="bg-transparent border-0 text-white focus:outline-none flex-1 px-1 font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Theme Color Selector */}
        <div className="flex items-center gap-3 pt-2">
          <span className="text-xs text-slate-400">Accent Glow:</span>
          <div className="flex items-center gap-2">
            {themeColors.map((col) => (
              <button
                key={col.value}
                onClick={() => {
                  setSelectedThemeColor(col.value);
                  setPortfolio({ ...portfolio, themeColor: col.value });
                }}
                className={`w-6 h-6 rounded-full ring-2 transition-transform ${
                  selectedThemeColor === col.value ? 'ring-white scale-110' : 'ring-transparent'
                }`}
                style={{ backgroundColor: col.value }}
              />
            ))}
          </div>
        </div>

      </div>

      {/* RESPONSIVE PREVIEW IFRAME SIMULATOR */}
      <div className="flex justify-center">
        <div
          className={`bg-slate-950 border border-purple-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-2xl transition-all duration-300 space-y-12 overflow-hidden relative ${
            devicePreview === 'mobile' ? 'w-[375px]' : 'w-full max-w-4xl'
          }`}
        >
          {/* Top Address Bar Simulation */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="font-mono text-[11px] text-purple-300 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
              {shareableUrl}
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          </div>

          {/* PORTFOLIO HERO */}
          <div className="text-center space-y-4 pt-4">
            <div className="w-20 h-20 rounded-full mx-auto p-1 ring-4 ring-purple-500/40">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <h2 className="text-3xl font-extrabold text-white">{profile.name}</h2>
            <p className="text-sm font-semibold text-purple-300 max-w-xl mx-auto leading-relaxed">
              {portfolio.heroTagline}
            </p>
            <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">
              {portfolio.aboutText}
            </p>

            <div className="flex items-center justify-center gap-3 pt-2 text-xs text-slate-300">
              <span className="flex items-center gap-1"><Github className="w-4 h-4 text-purple-400" /> github.com/alexchen-dev</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Linkedin className="w-4 h-4 text-purple-400" /> linkedin.com/in/alexchen</span>
            </div>
          </div>

          {/* FEATURED PROJECTS */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">
              Featured Verified Projects
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portfolio.featuredProjects.map((p) => (
                <div key={p.id} className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/40 space-y-3">
                  <h4 className="text-sm font-bold text-white">{p.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {p.technologies.map((tech, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-purple-300 border border-slate-800">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SKILLS MATRIX */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">
              Verified Technical Competencies
            </h3>
            <div className="flex flex-wrap gap-2">
              {portfolio.highlightSkills.map((sk, idx) => (
                <span key={idx} className="px-3 py-1 rounded-xl bg-purple-600/20 text-purple-300 border border-purple-500/30 text-xs font-semibold">
                  {sk}
                </span>
              ))}
            </div>
          </div>

          {/* EXPERIENCE & EDUCATION */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">
              Professional Experience
            </h3>
            <div className="space-y-3">
              {portfolio.experienceList.map((exp) => (
                <div key={exp.id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span>{exp.role} — {exp.company}</span>
                    <span className="text-purple-300">{exp.duration}</span>
                  </div>
                  <p className="text-xs text-slate-400">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FOOTER */}
          <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
            Powered by IdentityVerse AI Digital Identity System
          </div>

        </div>
      </div>

    </div>
  );
};
