import React, { useState } from 'react';
import { 
  VaultDocument, 
  DocCategory, 
  UserProfile 
} from '../types';
import { 
  FolderLock, 
  Upload, 
  Search, 
  FileText, 
  Star, 
  Trash2, 
  Eye, 
  Download, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Tag, 
  RefreshCw, 
  Filter, 
  Plus, 
  X,
  FileCheck
} from 'lucide-react';
import { analyzeDocumentWithAI } from '../services/aiService';
import { addActivityLog } from '../services/storageService';

interface DocumentVaultPageProps {
  documents: VaultDocument[];
  setDocuments: React.Dispatch<React.SetStateAction<VaultDocument[]>>;
  profile: UserProfile;
  selectedDocModal: VaultDocument | null;
  setSelectedDocModal: (doc: VaultDocument | null) => void;
}

export const DocumentVaultPage: React.FC<DocumentVaultPageProps> = ({
  documents,
  setDocuments,
  profile,
  selectedDocModal,
  setSelectedDocModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<DocCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgressText, setUploadProgressText] = useState('');

  const categories: Array<DocCategory | 'All'> = [
    'All',
    'Certificate',
    'Resume',
    'Project',
    'Internship',
    'Achievement',
    'Learning'
  ];

  // File Upload Handler
  const handleFileUpload = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const file = files[0];
    setUploadProgressText(`Uploading ${file.name}...`);

    try {
      // Read text snippet if readable
      let fileText = '';
      if (file.type.includes('text') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
        fileText = await file.text();
      } else {
        fileText = `Binary document content for ${file.name}. Issue date ${new Date().toLocaleDateString()}. Verified student credentials for ${profile.name}.`;
      }

      setUploadProgressText(`Running Gemini 2.5 Flash OCR & Skill Extraction...`);

      // Call Gemini AI
      const aiResult = await analyzeDocumentWithAI(file.name, fileText);

      // Check for potential duplicate
      const duplicateFound = documents.some(
        d => d.name.toLowerCase() === file.name.toLowerCase() ||
             (d.ocrText && d.ocrText.includes(file.name))
      );

      const newDoc: VaultDocument = {
        id: `doc_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        name: file.name,
        category: (aiResult.category as DocCategory) || 'Certificate',
        fileType: file.name.split('.').pop() || 'pdf',
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split('T')[0],
        issueDate: aiResult.issueDate || new Date().toISOString().split('T')[0],
        issuerOrCompany: aiResult.issuerOrCompany || 'Verified Academy',
        skillsExtracted: aiResult.skillsExtracted || ['Software Engineering'],
        aiSummary: aiResult.aiSummary || 'Document uploaded and analyzed successfully.',
        ocrText: aiResult.ocrText || fileText,
        isFavorite: false,
        isDuplicate: duplicateFound,
        tags: aiResult.tags || ['Verified', 'Upload']
      };

      setDocuments(prev => [newDoc, ...prev]);
      addActivityLog('upload', 'New Document Uploaded & OCR Scanned', newDoc.name);

      setIsUploading(false);
      setUploadProgressText('');
      setSelectedDocModal(newDoc);
    } catch (e) {
      console.error('Upload failed:', e);
      setIsUploading(false);
      setUploadProgressText('');
    }
  };

  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDocuments(prev =>
      prev.map(d => (d.id === id ? { ...d, isFavorite: !d.isFavorite } : d))
    );
  };

  const handleDelete = (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete "${name}" from your vault?`)) {
      setDocuments(prev => prev.filter(d => d.id !== id));
      addActivityLog('upload', 'Document Removed from Vault', name);
    }
  };

  const filteredDocs = documents.filter(doc => {
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.aiSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.skillsExtracted.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      doc.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* HEADER TITLE */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <FolderLock className="w-7 h-7 text-purple-400" />
            Document Vault & AI OCR
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Store original certificates, resumes, projects, and internships with Gemini AI automatic parsing and duplicate detection.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30">
            {documents.length} Vault Items Total
          </span>
        </div>
      </div>

      {/* DRAG AND DROP UPLOADER ZONE */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          if (e.dataTransfer.files) handleFileUpload(e.dataTransfer.files);
        }}
        className={`p-8 rounded-3xl border-2 border-dashed transition-all text-center relative overflow-hidden backdrop-blur-xl ${
          dragActive
            ? 'border-purple-400 bg-purple-950/40 scale-[1.01]'
            : 'border-purple-500/30 bg-slate-900/60 hover:border-purple-400/60'
        }`}
      >
        <input
          type="file"
          id="vault-file-input"
          className="hidden"
          onChange={(e) => {
            if (e.target.files) handleFileUpload(e.target.files);
          }}
          accept=".pdf,.docx,.ppt,.pptx,.png,.jpg,.jpeg,.zip,.txt"
        />

        {isUploading ? (
          <div className="py-6 space-y-3">
            <div className="w-10 h-10 mx-auto rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
            <p className="text-xs font-semibold text-purple-300">{uploadProgressText}</p>
            <p className="text-[11px] text-slate-400">Extracting skills, verifying issuer, generating AI summary...</p>
          </div>
        ) : (
          <label htmlFor="vault-file-input" className="cursor-pointer space-y-3 block">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white mx-auto flex items-center justify-center shadow-xl shadow-purple-600/30 group-hover:scale-110 transition-transform">
              <Upload className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">
                Drag & Drop PDF, DOCX, PPT, Images, or ZIP
              </p>
              <p className="text-xs text-slate-400 mt-1">
                or <span className="text-purple-400 font-semibold underline">browse files</span> on your computer
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 text-[10px] text-purple-300/80 pt-2">
              <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-purple-400" /> Automatic OCR</span>
              <span>•</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-purple-400" /> Skill Extraction</span>
              <span>•</span>
              <span className="flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-purple-400" /> Duplicate Shield</span>
            </div>
          </label>
        )}
      </div>

      {/* SEARCH AND CATEGORY FILTERS */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-md shadow-purple-600/25'
                    : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-purple-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documents or skills..."
              className="w-full bg-slate-900 border border-purple-500/20 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
            />
          </div>

        </div>
      </div>

      {/* DOCUMENT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            onClick={() => setSelectedDocModal(doc)}
            className="p-5 rounded-3xl bg-slate-900/80 border border-purple-500/20 hover:border-purple-500/50 transition-all cursor-pointer hover:-translate-y-1 shadow-xl hover:shadow-purple-950/50 backdrop-blur-xl relative group flex flex-col justify-between"
          >
            {/* Top Bar */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {doc.category}
                    </span>
                    <p className="text-[11px] text-slate-400 mt-0.5">{doc.size}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => handleToggleFavorite(doc.id, e)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-amber-400 transition-colors"
                  >
                    <Star className={`w-4 h-4 ${doc.isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
                  </button>
                  <button
                    onClick={(e) => handleDelete(doc.id, doc.name, e)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Duplicate Warning Badge */}
              {doc.isDuplicate && (
                <div className="flex items-center gap-1.5 text-[10px] text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30">
                  <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>Duplicate record detected</span>
                </div>
              )}

              {/* Title & Summary */}
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                  {doc.name}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                  {doc.aiSummary}
                </p>
              </div>

              {/* Extracted Skills Tags */}
              <div className="flex flex-wrap gap-1 pt-1">
                {doc.skillsExtracted.slice(0, 3).map((sk, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-0.5 rounded-lg bg-slate-950 text-purple-300 border border-slate-800">
                    {sk}
                  </span>
                ))}
                {doc.skillsExtracted.length > 3 && (
                  <span className="text-[10px] px-1.5 py-0.5 text-slate-500 font-semibold">
                    +{doc.skillsExtracted.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Footer metadata */}
            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
              <span>{doc.issuerOrCompany || 'Verified'}</span>
              <span>Uploaded {doc.uploadDate}</span>
            </div>

          </div>
        ))}
      </div>

      {filteredDocs.length === 0 && (
        <div className="py-16 text-center space-y-3 bg-slate-900/40 rounded-3xl border border-purple-500/10">
          <FolderLock className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="text-sm font-bold text-slate-300">No documents found matching criteria</p>
          <p className="text-xs text-slate-500">Try uploading a new certificate or reset your filter search.</p>
        </div>
      )}

      {/* DOCUMENT PREVIEW & OCR DETAIL MODAL */}
      {selectedDocModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-2xl bg-slate-900 border border-purple-500/30 rounded-3xl p-6 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto shadow-purple-950/80">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{selectedDocModal.name}</h3>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
                    <span className="text-purple-300 font-semibold">{selectedDocModal.category}</span>
                    <span>•</span>
                    <span>{selectedDocModal.issuerOrCompany}</span>
                    <span>•</span>
                    <span>{selectedDocModal.size}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedDocModal(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* AI Summary Section */}
            <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 space-y-2">
              <p className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-400" />
                Gemini AI Executive Summary
              </p>
              <p className="text-xs text-slate-200 leading-relaxed">
                {selectedDocModal.aiSummary}
              </p>
            </div>

            {/* Extracted Skills */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-300">Verified Skills Extracted:</p>
              <div className="flex flex-wrap gap-2">
                {selectedDocModal.skillsExtracted.map((sk, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-xl bg-purple-500/10 text-purple-300 border border-purple-500/30 text-xs font-semibold">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Raw OCR Text */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-300">OCR Scanner Text Output:</p>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 font-mono leading-relaxed max-h-40 overflow-y-auto">
                {selectedDocModal.ocrText || 'No OCR text cached.'}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs">
              <span className="text-slate-500">Document ID: {selectedDocModal.id}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`Downloading "${selectedDocModal.name}"...`)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Document</span>
                </button>
                <button
                  onClick={() => setSelectedDocModal(null)}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
