import React, { useState } from 'react';
import { ActivePage, UserProfile } from '../types';
import { 
  Sparkles, 
  FolderLock, 
  Network, 
  FileText, 
  Globe, 
  Clock, 
  Compass, 
  MessageSquare, 
  User, 
  Settings, 
  Search, 
  LogOut, 
  Menu, 
  X, 
  LayoutDashboard,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { resetToDemoData } from '../services/storageService';

interface NavbarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  profile: UserProfile;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  profile,
  isLoggedIn,
  setIsLoggedIn,
  onOpenSearch
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems = isLoggedIn
    ? [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'vault', label: 'Document Vault', icon: FolderLock },
        { id: 'knowledge-graph', label: 'Knowledge Graph', icon: Network },
        { id: 'resume-builder', label: 'Resume Builder', icon: FileText },
        { id: 'portfolio-builder', label: 'Portfolio', icon: Globe },
        { id: 'skill-timeline', label: 'Timeline', icon: Clock },
        { id: 'career-recommendations', label: 'Careers', icon: Compass },
        { id: 'ai-chat', label: 'AI Chat', icon: MessageSquare }
      ]
    : [
        { id: 'landing', label: 'Home', icon: Sparkles },
        { id: 'dashboard', label: 'Live Demo', icon: LayoutDashboard }
      ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-purple-500/20 shadow-lg shadow-purple-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* LOGO */}
          <div 
            onClick={() => setActivePage(isLoggedIn ? 'dashboard' : 'landing')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 p-0.5 shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
              </div>
            </div>
            <div>
              <span className="text-xl font-extrabold bg-gradient-to-r from-white via-purple-200 to-indigo-300 bg-clip-text text-transparent tracking-tight">
                IdentityVerse
              </span>
              <span className="ml-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30">
                AI
              </span>
            </div>
          </div>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id as ActivePage)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/25 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-purple-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* RIGHT ACTION BUTTONS */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Quick Search Shortcut */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-purple-500/30 text-xs text-slate-300 hover:border-purple-400/60 hover:text-white transition-all shadow-inner"
            >
              <Search className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden md:inline">AI Search</span>
              <kbd className="px-1.5 py-0.5 text-[10px] bg-slate-800 border border-slate-700 rounded text-purple-300 font-mono">
                ⌘K
              </kbd>
            </button>

            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-slate-900 border border-purple-500/30 hover:border-purple-400 transition-all"
                >
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-purple-500/50"
                  />
                  <span className="text-xs font-medium text-slate-200 max-w-[100px] truncate">
                    {profile.name}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-slate-900/95 border border-purple-500/30 rounded-2xl shadow-2xl backdrop-blur-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-slate-800">
                      <p className="text-xs font-semibold text-white">{profile.name}</p>
                      <p className="text-[11px] text-purple-300/80 truncate">{profile.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        setActivePage('profile');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs text-slate-200 hover:bg-purple-600/20 hover:text-purple-300 transition-colors"
                    >
                      <User className="w-4 h-4 text-purple-400" />
                      View Profile
                    </button>

                    <button
                      onClick={() => {
                        setActivePage('settings');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs text-slate-200 hover:bg-purple-600/20 hover:text-purple-300 transition-colors"
                    >
                      <Settings className="w-4 h-4 text-purple-400" />
                      Settings & Data
                    </button>

                    <button
                      onClick={() => {
                        resetToDemoData();
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs text-amber-300 hover:bg-amber-500/20 transition-colors"
                    >
                      <RefreshCw className="w-4 h-4 text-amber-400" />
                      Reset Sample Data
                    </button>

                    <div className="border-t border-slate-800 mt-1 pt-1">
                      <button
                        onClick={() => {
                          setIsLoggedIn(false);
                          setActivePage('landing');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose-400 hover:bg-rose-500/20 transition-colors"
                      >
                        <LogOut className="w-4 h-4 text-rose-400" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActivePage('login')}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-slate-200 hover:text-white hover:bg-slate-800 transition-all"
                >
                  Log In
                </button>
                <button
                  onClick={() => setActivePage('signup')}
                  className="px-4 py-1.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-600/30 transition-all"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          {/* MOBILE MENU TOGGLE */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-xl bg-slate-900 border border-purple-500/30 text-purple-300"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE NAV DROPDOWN */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-b border-purple-500/20 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id as ActivePage);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4 text-purple-400" />
                {item.label}
              </button>
            );
          })}

          {!isLoggedIn ? (
            <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setActivePage('login');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 rounded-xl text-sm font-medium text-slate-200 bg-slate-900 border border-slate-800"
              >
                Log In
              </button>
              <button
                onClick={() => {
                  setActivePage('signup');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600"
              >
                Create Account
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  setActivePage('profile');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-xs text-purple-300"
              >
                <User className="w-4 h-4" />
                Profile
              </button>
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setActivePage('landing');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-xs text-rose-400"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
