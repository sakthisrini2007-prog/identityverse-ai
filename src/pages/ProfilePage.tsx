import React, { useState } from 'react';
import { UserProfile, ActivePage } from '../types';
import { 
  User, 
  Sparkles, 
  Github, 
  Linkedin, 
  Globe, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Zap, 
  CheckCircle2, 
  Save, 
  RefreshCw,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { saveProfile, addActivityLog } from '../services/storageService';

interface ProfilePageProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  setActivePage: (page: ActivePage) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  profile,
  setProfile,
  setActivePage
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(profile);
  const [githubSyncing, setGithubSyncing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setProfile(formData);
    saveProfile(formData);
    setIsEditing(false);
    setSaveSuccess(true);
    addActivityLog('github_sync', 'Profile Updated Successfully');
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleToggleGithub = () => {
    setGithubSyncing(true);
    setTimeout(() => {
      const updated = { ...profile, githubConnected: !profile.githubConnected };
      setProfile(updated);
      setFormData(updated);
      saveProfile(updated);
      setGithubSyncing(false);
      addActivityLog('github_sync', profile.githubConnected ? 'GitHub Sync Paused' : 'GitHub Repositories Synced (14 scanned)');
    }, 800);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* HEADER TITLE */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <User className="w-7 h-7 text-purple-400" />
            Digital Identity Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage your personal profile, college credentials, GitHub repository sync, and verified identity metadata.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {saveSuccess && (
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" /> Saved!
            </span>
          )}

          {isEditing ? (
            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-purple-600/30 hover:opacity-90 flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-5 py-2.5 rounded-xl bg-slate-900 border border-purple-500/20 text-slate-200 font-semibold text-xs hover:bg-slate-800 transition-colors"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* MAIN PROFILE CARD */}
      <div className="p-8 rounded-3xl bg-slate-900/80 border border-purple-500/30 shadow-2xl backdrop-blur-2xl space-y-8">
        
        {/* Top Info Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-5">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-purple-500/40"
            />
            <div className="space-y-1">
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-slate-950 border border-purple-500/30 rounded-xl px-3 py-1.5 text-lg font-bold text-white focus:outline-none"
                />
              ) : (
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  {profile.name}
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </h2>
              )}

              {isEditing ? (
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-slate-950 border border-purple-500/30 rounded-xl px-3 py-1 text-xs text-purple-300 w-full focus:outline-none"
                />
              ) : (
                <p className="text-xs text-purple-300 font-medium">{profile.title}</p>
              )}

              <p className="text-xs text-slate-400">{profile.email} • {profile.location}</p>
            </div>
          </div>

          {/* Connected Integrations Status */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleGithub}
              disabled={githubSyncing}
              className={`px-3.5 py-2 rounded-2xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                profile.githubConnected
                  ? 'bg-purple-950/40 border-purple-500/40 text-purple-300'
                  : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}
            >
              <Github className="w-4 h-4 text-purple-400" />
              <span>{githubSyncing ? 'Syncing...' : profile.githubConnected ? 'GitHub Synced' : 'Connect GitHub'}</span>
            </button>

            <div className="px-3.5 py-2 rounded-2xl border bg-indigo-950/40 border-indigo-500/40 text-indigo-300 text-xs font-semibold flex items-center gap-2">
              <Linkedin className="w-4 h-4 text-indigo-400" />
              <span>LinkedIn Connected</span>
            </div>
          </div>
        </div>

        {/* BIO & ACADEMIC EDUCATION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Bio */}
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Personal Biography
            </h4>
            {isEditing ? (
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={3}
                className="w-full bg-slate-900 border border-purple-500/20 rounded-xl p-2 text-xs text-slate-200 focus:outline-none"
              />
            ) : (
              <p className="text-xs text-slate-300 leading-relaxed">{profile.bio}</p>
            )}
          </div>

          {/* Education */}
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-indigo-400" />
              College & Degree
            </h4>
            <p className="text-xs font-bold text-white">{profile.college}</p>
            <p className="text-xs text-purple-300">{profile.degree}</p>
            <p className="text-[11px] text-slate-400">Class of {profile.graduationYear} • GPA {profile.gpa}</p>
          </div>

        </div>

        {/* FEATURED PROJECTS LIST */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-400" />
              Identity Projects ({profile.projects.length})
            </h3>
            <button
              onClick={() => setActivePage('vault')}
              className="text-xs text-purple-400 hover:underline font-semibold"
            >
              + Upload Project Document
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.projects.map((proj) => (
              <div key={proj.id} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">{proj.title}</h4>
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-purple-400 hover:underline flex items-center gap-1"
                  >
                    GitHub <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-xs text-slate-400">{proj.description}</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {proj.technologies.map((t, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
