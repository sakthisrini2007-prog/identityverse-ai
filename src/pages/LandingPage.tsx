import React, { useState } from 'react';
import { 
  Sparkles, 
  FolderLock, 
  Network, 
  FileText, 
  Globe, 
  Compass, 
  ShieldCheck, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  Upload, 
  Layers, 
  Zap,
  ChevronDown
} from 'lucide-react';
import { ActivePage } from '../types';

interface LandingPageProps {
  setActivePage: (page: ActivePage) => void;
  onQuickStartDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ setActivePage, onQuickStartDemo }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const features = [
    {
      icon: FolderLock,
      title: 'Smart Document Vault & OCR',
      description: 'Upload PDFs, DOCX, PPTs, or certificates. Gemini AI automatically scans text, extracts metadata, verifies skills, and detects duplicates.'
    },
    {
      icon: Network,
      title: 'AI Knowledge Graph',
      description: 'Visualize your entire academic and professional journey as an interactive network connecting skills, certificates, projects, and internships.'
    },
    {
      icon: FileText,
      title: 'One-Click ATS Resume Builder',
      description: 'Transform raw document credentials into formatted, ATS-optimized resumes tailored for target software and AI roles.'
    },
    {
      icon: Globe,
      title: 'Auto-Generated Web Portfolio',
      description: 'Publish a beautiful dark-glass online portfolio highlighting verified projects, skills, and experience with a custom domain.'
    },
    {
      icon: Compass,
      title: 'Career Pathway & Skill Gap AI',
      description: 'Receive real-time match scores against industry job roles with personalized step-by-step action plans to bridge missing skills.'
    },
    {
      icon: Cpu,
      title: 'Natural Language Identity Search',
      description: 'Search your vault using conversational queries like "Show my Python certificates" or "Find my scale AI internship offer letter".'
    }
  ];

  const faqs = [
    {
      q: 'How does IdentityVerse AI extract skills from my certificates and documents?',
      a: 'IdentityVerse uses Gemini 2.5 Flash OCR and multi-modal analysis to read image and PDF text, parse verified issuers, extract skill keywords, and connect them directly to your personal Knowledge Graph.'
    },
    {
      q: 'Will my ATS resume pass scanner algorithms at top tech companies?',
      a: 'Yes! The Resume Builder exports clean, machine-readable ATS standard layouts formatted with standard section headings, bullet points with action verbs, and quantifiable metrics.'
    },
    {
      q: 'Is my document vault private and secure?',
      a: 'Absolutely. Your documents are stored safely with encrypted client-side storage and secure server proxies. You retain total control to export or delete your identity data anytime.'
    },
    {
      q: 'Can I connect my GitHub and LinkedIn profiles?',
      a: 'Yes! IdentityVerse syncs repository commit stats, tech stacks, and professional experience to build a comprehensive digital profile.'
    }
  ];

  return (
    <div className="min-h-screen text-slate-100 bg-slate-950 overflow-hidden">
      
      {/* HERO SECTION WITH ANIMATED BACKGROUND */}
      <section className="relative pt-20 pb-24 md:pt-32 md:pb-36 px-4 sm:px-6 lg:px-8">
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10 space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold backdrop-blur-md shadow-lg shadow-purple-950/50 animate-bounce">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Next-Gen AI Digital Identity System</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Your AI-Powered <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent">
              Digital Identity & Portfolio
            </span>
          </h1>

          {/* Tagline / Subtitle */}
          <p className="max-w-3xl mx-auto text-base sm:text-xl text-slate-300 leading-relaxed font-normal">
            Upload certificates, resumes, projects, and internships. IdentityVerse AI automatically organizes your entire academic journey into an interactive Knowledge Graph, ATS Resumes, and Career Pathways.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onQuickStartDemo}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white font-bold text-base shadow-xl shadow-purple-600/30 hover:scale-105 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Explore Interactive Demo</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setActivePage('signup')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 border border-purple-500/30 text-slate-200 font-semibold text-base hover:bg-slate-800 hover:border-purple-400 transition-all flex items-center justify-center gap-2"
            >
              <Upload className="w-5 h-5 text-purple-400" />
              <span>Create Free Profile</span>
            </button>
          </div>

          {/* HERO PREVIEW CARD */}
          <div className="pt-12">
            <div className="relative mx-auto max-w-5xl rounded-3xl bg-slate-900/80 border border-purple-500/30 p-4 sm:p-6 shadow-2xl backdrop-blur-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs text-slate-400 font-mono ml-2">identityverse.ai/dashboard</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Credentials Live</span>
                </div>
              </div>

              {/* Grid Preview Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-left">
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-purple-500/20">
                  <p className="text-xs text-slate-400">Vault Documents</p>
                  <p className="text-2xl font-bold text-white mt-1">5 Items</p>
                  <span className="text-[10px] text-emerald-400 font-medium">100% OCR Scanned</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/60 border border-purple-500/20">
                  <p className="text-xs text-slate-400">Verified Skills</p>
                  <p className="text-2xl font-bold text-purple-300 mt-1">8 Detected</p>
                  <span className="text-[10px] text-purple-400 font-medium">Python, Gemini, TS</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/60 border border-purple-500/20">
                  <p className="text-xs text-slate-400">ATS Resume Score</p>
                  <p className="text-2xl font-bold text-blue-300 mt-1">88 / 100</p>
                  <span className="text-[10px] text-blue-400 font-medium">Top 5% Match</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/60 border border-purple-500/20">
                  <p className="text-xs text-slate-400">Knowledge Graph</p>
                  <p className="text-2xl font-bold text-indigo-300 mt-1">12 Connections</p>
                  <span className="text-[10px] text-indigo-400 font-medium">Interactive Graph</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* FEATURES GRID SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-purple-400">Comprehensive AI Architecture</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Everything You Need to Build Your Digital Footprint
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            No fragmented folders or lost PDF files. IdentityVerse AI organizes your complete record into actionable knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-900/60 border border-purple-500/20 hover:border-purple-500/50 transition-all hover:-translate-y-1 shadow-xl hover:shadow-purple-950/50 backdrop-blur-xl group"
              >
                <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{feat.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-slate-900/40 rounded-3xl border border-purple-500/20 my-10">
        <div className="text-center space-y-4 mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-400">4-Step Automated Flow</p>
          <h2 className="text-3xl font-extrabold text-white">How IdentityVerse Works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 space-y-3">
            <div className="w-10 h-10 rounded-full bg-purple-600 text-white font-bold mx-auto flex items-center justify-center text-sm shadow-lg shadow-purple-600/40">1</div>
            <h4 className="text-sm font-bold text-white">Upload Documents</h4>
            <p className="text-xs text-slate-400">Drop certificates, resumes, or project writeups in any format.</p>
          </div>

          <div className="p-4 space-y-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold mx-auto flex items-center justify-center text-sm shadow-lg shadow-indigo-600/40">2</div>
            <h4 className="text-sm font-bold text-white">Gemini OCR Scan</h4>
            <p className="text-xs text-slate-400">AI reads text, extracts skills, and classifies credentials.</p>
          </div>

          <div className="p-4 space-y-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold mx-auto flex items-center justify-center text-sm shadow-lg shadow-blue-600/40">3</div>
            <h4 className="text-sm font-bold text-white">Graph & Resumes</h4>
            <p className="text-xs text-slate-400">Generates connected Knowledge Graph and ATS resumes.</p>
          </div>

          <div className="p-4 space-y-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold mx-auto flex items-center justify-center text-sm shadow-lg shadow-emerald-600/40">4</div>
            <h4 className="text-sm font-bold text-white">Career Guidance</h4>
            <p className="text-xs text-slate-400">Receive matched job pathways & missing skill roadmaps.</p>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-purple-400">Simple Transparent Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Built for Students & AI Researchers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Free Tier */}
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 text-left space-y-6">
            <div>
              <p className="text-sm font-semibold text-purple-400">Student Scholar</p>
              <p className="text-3xl font-extrabold text-white mt-1">$0 <span className="text-xs text-slate-400 font-normal">/ forever free</span></p>
            </div>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Up to 25 Vault Documents</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Gemini AI OCR Scanner</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Interactive Knowledge Graph</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Standard ATS Resume PDF Export</li>
            </ul>
            <button onClick={onQuickStartDemo} className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors">
              Get Started Free
            </button>
          </div>

          {/* Pro Tier (Featured) */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-purple-900/40 via-indigo-900/30 to-slate-900 border-2 border-purple-500 shadow-2xl shadow-purple-950/80 text-left space-y-6 relative">
            <span className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-purple-600 text-white text-[10px] font-bold uppercase tracking-wider">
              Most Popular
            </span>
            <div>
              <p className="text-sm font-semibold text-purple-300">AI Pro Career</p>
              <p className="text-3xl font-extrabold text-white mt-1">$9 <span className="text-xs text-slate-400 font-normal">/ month</span></p>
            </div>
            <ul className="space-y-3 text-xs text-slate-200">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Unlimited Vault Storage</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Advanced Gemini 2.5 Flash OCR</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> 1-Click Hosted Portfolio Website</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400" /> Real-time Career Pathway AI</li>
            </ul>
            <button onClick={onQuickStartDemo} className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all">
              Try Pro Demo
            </button>
          </div>

          {/* Institution Tier */}
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 text-left space-y-6">
            <div>
              <p className="text-sm font-semibold text-indigo-400">University / Lab</p>
              <p className="text-3xl font-extrabold text-white mt-1">Custom</p>
            </div>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> University LMS Integration</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Batch Certificate Verification</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Departmental Analytics</li>
            </ul>
            <button onClick={() => setActivePage('signup')} className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors">
              Contact Sales
            </button>
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-white text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-2xl bg-slate-900 border border-purple-500/20 overflow-hidden">
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left text-sm font-semibold text-white hover:text-purple-300 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-purple-400 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/80 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-20 px-4 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-900/60 via-indigo-900/60 to-slate-900 p-12 rounded-3xl border border-purple-500/40 shadow-2xl relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Ready to Organize Your AI Identity?</h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Join thousands of students and engineers organizing their certificates, building ATS resumes, and crafting knowledge graphs.
          </p>
          <button
            onClick={onQuickStartDemo}
            className="px-8 py-4 rounded-2xl bg-white text-slate-950 font-bold text-sm shadow-xl hover:bg-slate-100 transition-all cursor-pointer"
          >
            Launch IdentityVerse AI Demo
          </button>
        </div>
      </section>

    </div>
  );
};
