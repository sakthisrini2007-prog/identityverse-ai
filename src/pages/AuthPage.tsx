import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Mail, Lock, User, RefreshCw } from 'lucide-react';
import { ActivePage, UserProfile } from '../types';
import { saveAuthUser } from '../services/storageService';

interface AuthPageProps {
  mode: 'login' | 'signup' | 'forgot-password';
  setActivePage: (page: ActivePage) => void;
  setIsLoggedIn: (val: boolean) => void;
  profile: UserProfile;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  mode,
  setActivePage,
  setIsLoggedIn,
  profile
}) => {
  const [email, setEmail] = useState(profile.email || 'alex.chen@university.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState(profile.name || 'Alex Chen');
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (mode === 'forgot-password') {
        setResetSent(true);
      } else {
        saveAuthUser({ email, name: mode === 'signup' ? name : profile.name });
        setIsLoggedIn(true);
        setActivePage('dashboard');
      }
    }, 600);
  };

  const handleDemoBypass = () => {
    saveAuthUser({ email: profile.email, name: profile.name });
    setIsLoggedIn(true);
    setActivePage('dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative">
      <div className="w-full max-w-md bg-slate-900/90 border border-purple-500/30 rounded-3xl p-8 shadow-2xl backdrop-blur-2xl shadow-purple-950/50 space-y-6">
        
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 p-0.5 mx-auto">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            {mode === 'login' && 'Welcome Back'}
            {mode === 'signup' && 'Create Your AI Identity'}
            {mode === 'forgot-password' && 'Reset Password'}
          </h2>
          <p className="text-xs text-slate-400">
            {mode === 'login' && 'Log in to access your document vault & knowledge graph'}
            {mode === 'signup' && 'Join IdentityVerse AI to organize credentials'}
            {mode === 'forgot-password' && 'Enter your email to receive recovery instructions'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-purple-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Chen"
                  className="w-full bg-slate-950 border border-purple-500/20 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-purple-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@university.edu"
                className="w-full bg-slate-950 border border-purple-500/20 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          {mode !== 'forgot-password' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-slate-300">Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setActivePage('forgot-password')}
                    className="text-[11px] text-purple-400 hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-purple-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-purple-500/20 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
                />
              </div>
            </div>
          )}

          {resetSent && mode === 'forgot-password' && (
            <div className="p-3 bg-emerald-950/60 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 text-center">
              Password reset link sent to {email}. Check your inbox!
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white font-bold text-xs shadow-lg shadow-purple-600/30 hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin text-white" />
            ) : (
              <>
                <span>
                  {mode === 'login' && 'Sign In'}
                  {mode === 'signup' && 'Create Free Identity Account'}
                  {mode === 'forgot-password' && 'Send Reset Link'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Fast Track Bypass */}
        <div className="pt-4 border-t border-slate-800 text-center space-y-3">
          <button
            onClick={handleDemoBypass}
            className="w-full py-2.5 rounded-xl bg-purple-950/50 hover:bg-purple-900/60 border border-purple-500/40 text-purple-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>Instant Demo Access (Alex Chen Student Data)</span>
          </button>

          <div className="text-xs text-slate-400">
            {mode === 'login' && (
              <p>
                Don't have an account?{' '}
                <button onClick={() => setActivePage('signup')} className="text-purple-400 font-semibold hover:underline">
                  Sign up
                </button>
              </p>
            )}
            {mode === 'signup' && (
              <p>
                Already registered?{' '}
                <button onClick={() => setActivePage('login')} className="text-purple-400 font-semibold hover:underline">
                  Log in
                </button>
              </p>
            )}
            {mode === 'forgot-password' && (
              <button onClick={() => setActivePage('login')} className="text-purple-400 font-semibold hover:underline">
                Back to log in
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
