import React, { useState } from 'react';
import { Settings, Shield, Moon, Bell, Database, Download, RefreshCw, Trash2, CheckCircle2 } from 'lucide-react';
import { exportBackupJSON, resetToDemoData } from '../services/storageService';

export const SettingsPage: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [ocrAutoProcess, setOcrAutoProcess] = useState(true);
  const [savedMsg, setSavedMsg] = useState(false);

  const handleExportBackup = () => {
    const jsonStr = exportBackupJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `identityverse_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveSettings = () => {
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto">
      
      {/* HEADER */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
          <Settings className="w-7 h-7 text-purple-400" />
          Settings & Identity Preferences
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Configure AI OCR preferences, privacy settings, security backups, and demo dataset reset.
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-slate-900/80 border border-purple-500/30 shadow-2xl backdrop-blur-2xl space-y-6">
        
        {/* PREFERENCES SECTION */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <Moon className="w-4 h-4 text-purple-400" />
            Theme & AI Scanning Preferences
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
              <div>
                <p className="font-bold text-white">Glassmorphism Dark Theme</p>
                <p className="text-[11px] text-slate-400">Vibrant dark blue-purple glass design language</p>
              </div>
              <input type="checkbox" checked readOnly className="w-4 h-4 accent-purple-600 rounded" />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
              <div>
                <p className="font-bold text-white">Automatic Gemini AI OCR Parsing</p>
                <p className="text-[11px] text-slate-400">Automatically extract skills & metadata upon document drop</p>
              </div>
              <input
                type="checkbox"
                checked={ocrAutoProcess}
                onChange={(e) => setOcrAutoProcess(e.target.checked)}
                className="w-4 h-4 accent-purple-600 rounded"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
              <div>
                <p className="font-bold text-white">Career Goal Notifications</p>
                <p className="text-[11px] text-slate-400">Receive alerts when ATS resume score drops below 85%</p>
              </div>
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="w-4 h-4 accent-purple-600 rounded"
              />
            </div>
          </div>
        </div>

        {/* DATA BACKUP & RESET SECTION */}
        <div className="space-y-4 pt-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <Database className="w-4 h-4 text-indigo-400" />
            Data Backup & Demo Reset
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={handleExportBackup}
              className="p-4 rounded-2xl bg-slate-950 border border-purple-500/20 hover:border-purple-400 text-left space-y-2 transition-all group"
            >
              <Download className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
              <p className="text-xs font-bold text-white">Export Vault & Profile JSON</p>
              <p className="text-[11px] text-slate-400">Download encrypted backup file containing all credentials.</p>
            </button>

            <button
              onClick={resetToDemoData}
              className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 hover:border-amber-400 text-left space-y-2 transition-all group"
            >
              <RefreshCw className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              <p className="text-xs font-bold text-amber-300">Reset to Sample Student Data</p>
              <p className="text-[11px] text-slate-400">Re-seed vault with initial Alex Chen documents & graph nodes.</p>
            </button>
          </div>
        </div>

        {/* SAVE BUTTON */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          {savedMsg && (
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Preferences Saved!
            </span>
          )}
          <button
            onClick={handleSaveSettings}
            className="ml-auto px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all"
          >
            Save Preferences
          </button>
        </div>

      </div>

    </div>
  );
};
