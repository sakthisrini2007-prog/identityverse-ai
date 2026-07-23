import React from 'react';
import { Sparkles, ShieldCheck, Cpu, Github, Linkedin, Twitter } from 'lucide-react';
import { ActivePage } from '../types';

interface FooterProps {
  setActivePage: (page: ActivePage) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage }) => {
  return (
    <footer className="bg-slate-950 border-t border-purple-500/20 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 p-0.5">
              <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-purple-400" />
              </div>
            </div>
            <span className="text-lg font-bold text-white tracking-tight">IdentityVerse AI</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Your AI-Powered Digital Identity. Automatically parse certificates, build ATS resumes, showcase portfolios, and chart career pathways with Gemini AI.
          </p>
          <div className="flex items-center gap-3 text-slate-400">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-purple-400 transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-purple-400 transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-purple-400 transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-2 text-xs">
          <p className="font-semibold text-slate-200 uppercase tracking-wider mb-3">Product</p>
          <ul className="space-y-2">
            <li><button onClick={() => setActivePage('vault')} className="hover:text-purple-300">Document Vault & OCR</button></li>
            <li><button onClick={() => setActivePage('knowledge-graph')} className="hover:text-purple-300">AI Knowledge Graph</button></li>
            <li><button onClick={() => setActivePage('resume-builder')} className="hover:text-purple-300">ATS Resume Builder</button></li>
            <li><button onClick={() => setActivePage('portfolio-builder')} className="hover:text-purple-300">Portfolio Builder</button></li>
            <li><button onClick={() => setActivePage('skill-timeline')} className="hover:text-purple-300">Skill Timeline</button></li>
          </ul>
        </div>

        {/* Intelligence */}
        <div className="space-y-2 text-xs">
          <p className="font-semibold text-slate-200 uppercase tracking-wider mb-3">AI Engine</p>
          <ul className="space-y-2">
            <li className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-purple-400" /> Google Gemini 2.5 Flash</li>
            <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> Private Encryption</li>
            <li><button onClick={() => setActivePage('career-recommendations')} className="hover:text-purple-300">Career Pathway Matcher</button></li>
            <li><button onClick={() => setActivePage('ai-chat')} className="hover:text-purple-300">Identity Co-Pilot Chat</button></li>
          </ul>
        </div>

        {/* Security & System Status */}
        <div className="space-y-3 text-xs bg-slate-900/50 p-4 rounded-2xl border border-purple-500/10">
          <div className="flex items-center gap-2 text-emerald-400 font-medium">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            IdentityVerse Engine Online
          </div>
          <p className="text-[11px] text-slate-400">
            Powered by Google Cloud & AI Studio. All student documents are processed locally and securely server-side.
          </p>
          <p className="text-[10px] text-slate-500 pt-2 border-t border-slate-800">
            © 2026 IdentityVerse AI Inc. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};
