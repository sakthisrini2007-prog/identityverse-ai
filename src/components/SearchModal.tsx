import React, { useState } from 'react';
import { Search, Sparkles, X, FileText, ArrowRight, CornerDownLeft } from 'lucide-react';
import { VaultDocument, UserProfile, ActivePage } from '../types';
import { searchVaultWithNaturalLanguage } from '../services/aiService';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  documents: VaultDocument[];
  profile: UserProfile;
  setActivePage: (page: ActivePage) => void;
  onSelectDoc: (doc: VaultDocument) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  documents,
  profile,
  setActivePage,
  onSelectDoc
}) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<{
    matchingDocIds: string[];
    matchingSkills: string[];
    explanation?: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    const results = await searchVaultWithNaturalLanguage(query, documents, profile.skills, profile);
    setSearchResults(results);
    setIsSearching(false);
  };

  const sampleQueries = [
    'Show my Python certificates',
    'Find my internship evaluation',
    'Show all AI & ML projects',
    'Find my highest confidence skills'
  ];

  const matchedDocs = searchResults
    ? documents.filter(d => searchResults.matchingDocIds.includes(d.id))
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-slate-900 border border-purple-500/30 rounded-2xl shadow-2xl overflow-hidden shadow-purple-950/50">
        
        {/* Search Header */}
        <form onSubmit={handleSearch} className="relative flex items-center p-4 border-b border-slate-800">
          <Search className="w-5 h-5 text-purple-400 ml-2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask natural questions like 'Show my Python certificates' or 'Find my Scale AI letter'..."
            className="w-full bg-transparent border-0 text-white placeholder-slate-400 focus:outline-none focus:ring-0 text-sm px-3"
            autoFocus
          />
          {query && (
            <button
              type="submit"
              disabled={isSearching}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold hover:opacity-90 flex items-center gap-1"
            >
              {isSearching ? 'Analyzing...' : 'Search'}
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </form>

        {/* Body Content */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4">
          
          {/* Sample Prompts */}
          {!searchResults && !isSearching && (
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Suggested Natural Language Queries
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {sampleQueries.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setQuery(sample);
                      setIsSearching(true);
                      searchVaultWithNaturalLanguage(sample, documents, profile.skills, profile).then(res => {
                        setSearchResults(res);
                        setIsSearching(false);
                      });
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/60 border border-purple-500/10 hover:border-purple-500/30 text-left text-xs text-slate-300 hover:text-white transition-all group"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400 group-hover:scale-110 transition-transform" />
                      "{sample}"
                    </span>
                    <CornerDownLeft className="w-3 h-3 text-slate-500 group-hover:text-purple-300" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Searching Loader */}
          {isSearching && (
            <div className="py-12 text-center space-y-3">
              <div className="w-8 h-8 mx-auto rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
              <p className="text-xs text-purple-300 font-medium">Scanning document vault & semantic graph with Gemini AI...</p>
            </div>
          )}

          {/* Results View */}
          {searchResults && !isSearching && (
            <div className="space-y-4">
              {searchResults.explanation && (
                <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>{searchResults.explanation}</span>
                </div>
              )}

              {/* Matched Skills */}
              {searchResults.matchingSkills && searchResults.matchingSkills.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-slate-400 mb-2">Matched Skills:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {searchResults.matchingSkills.map((sk, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-medium">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Documents */}
              <div>
                <p className="text-xs font-semibold text-slate-400 mb-2">
                  Matching Vault Items ({matchedDocs.length}):
                </p>

                {matchedDocs.length === 0 ? (
                  <p className="text-xs text-slate-400 italic py-4 text-center">
                    No matching documents found in vault. Try uploading a new certificate or project!
                  </p>
                ) : (
                  <div className="space-y-2">
                    {matchedDocs.map(doc => (
                      <div
                        key={doc.id}
                        onClick={() => {
                          onSelectDoc(doc);
                          setActivePage('vault');
                          onClose();
                        }}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 hover:border-purple-500/50 cursor-pointer transition-all hover:bg-slate-800 group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-purple-600/20 text-purple-300 flex items-center justify-center shrink-0">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-white group-hover:text-purple-300 transition-colors">
                              {doc.name}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] px-2 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                {doc.category}
                              </span>
                              <span className="text-[10px] text-slate-400">{doc.issuerOrCompany}</span>
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-300 group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 px-4">
          <span>Tip: Press <kbd className="px-1 bg-slate-800 rounded text-purple-300">ESC</kbd> to close</span>
          <span className="text-purple-400 flex items-center gap-1 font-medium">
            <Sparkles className="w-3 h-3" /> Powered by Gemini AI OCR & Vector Index
          </span>
        </div>

      </div>
    </div>
  );
};
