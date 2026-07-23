import React, { useState } from 'react';
import { KnowledgeNode, KnowledgeLink, VaultDocument, ActivePage } from '../types';
import { 
  Network, 
  Sparkles, 
  Filter, 
  Search, 
  Zap, 
  FileText, 
  Layers, 
  RefreshCw, 
  Maximize2, 
  Info, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface KnowledgeGraphPageProps {
  nodes: KnowledgeNode[];
  links: KnowledgeLink[];
  documents: VaultDocument[];
  setActivePage: (page: ActivePage) => void;
  onSelectDoc: (doc: VaultDocument) => void;
}

export const KnowledgeGraphPage: React.FC<KnowledgeGraphPageProps> = ({
  nodes,
  links,
  documents,
  setActivePage,
  onSelectDoc
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(nodes[0] || null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNodes = nodes.filter(node => {
    const matchesCategory = selectedCategory === 'All' || node.type === selectedCategory.toLowerCase();
    const matchesSearch = node.label.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate node position in a circular / force visual layout
  const getNodePos = (index: number, total: number, type: string) => {
    if (type === 'company') {
      return { x: 350, y: 250 }; // Center node
    }
    const angle = (index / total) * 2 * Math.PI;
    const radius = type === 'skill' ? 140 : type === 'project' ? 220 : 200;
    return {
      x: 350 + radius * Math.cos(angle),
      y: 250 + radius * Math.sin(angle)
    };
  };

  const nodePositions = new Map<string, { x: number; y: number }>();
  filteredNodes.forEach((n, idx) => {
    nodePositions.set(n.id, getNodePos(idx, filteredNodes.length, n.type));
  });

  const selectedNodeLinks = selectedNode
    ? links.filter(l => l.source === selectedNode.id || l.target === selectedNode.id)
    : [];

  const connectedNodeIds = selectedNodeLinks.map(l =>
    l.source === selectedNode?.id ? l.target : l.source
  );

  const connectedNodes = nodes.filter(n => connectedNodeIds.includes(n.id));

  const associatedDoc = selectedNode?.docId
    ? documents.find(d => d.id === selectedNode.docId)
    : null;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* TITLE & DESCRIPTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <Network className="w-7 h-7 text-indigo-400" />
            AI Knowledge Graph Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Interactive semantic map connecting skills to verified vault documents, internships, projects, and achievements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedCategory('All')}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-purple-500/20 text-xs text-purple-300 hover:bg-slate-800"
          >
            Reset View
          </button>
        </div>
      </div>

      {/* FILTER BUTTONS & SEARCH */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-3 rounded-2xl border border-purple-500/20">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['All', 'Skill', 'Project', 'Internship', 'Certificate', 'Achievement'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-purple-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search node labels..."
            className="w-full bg-slate-950 border border-purple-500/20 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
          />
        </div>
      </div>

      {/* MAIN GRAPH CANVAS & NODE INSPECTOR PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* GRAPH SVG CANVAS (2 COLS) */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-purple-500/30 rounded-3xl p-4 shadow-2xl relative overflow-hidden min-h-[500px] flex items-center justify-center backdrop-blur-2xl">
          
          <div className="absolute top-4 left-4 flex items-center gap-2 text-[10px] text-purple-300 bg-slate-950/80 px-3 py-1 rounded-full border border-purple-500/20 z-10">
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>Click any node to inspect relationships</span>
          </div>

          <svg className="w-full h-[480px] cursor-grab active:cursor-grabbing" viewBox="0 0 700 500">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
              </linearGradient>
            </defs>

            {/* Render Links */}
            {links.map((link, idx) => {
              const srcPos = nodePositions.get(link.source);
              const tgtPos = nodePositions.get(link.target);
              if (!srcPos || !tgtPos) return null;

              const isHighlighted =
                selectedNode && (link.source === selectedNode.id || link.target === selectedNode.id);

              return (
                <g key={idx}>
                  <line
                    x1={srcPos.x}
                    y1={srcPos.y}
                    x2={tgtPos.x}
                    y2={tgtPos.y}
                    stroke={isHighlighted ? '#a855f7' : '#334155'}
                    strokeWidth={isHighlighted ? 2.5 : 1.2}
                    strokeDasharray={link.relationship === 'verifies' ? '4,4' : 'none'}
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}

            {/* Render Nodes */}
            {filteredNodes.map((node) => {
              const pos = nodePositions.get(node.id) || { x: 350, y: 250 };
              const isSelected = selectedNode?.id === node.id;
              const isConnected = connectedNodeIds.includes(node.id);

              return (
                <g
                  key={node.id}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  onClick={() => setSelectedNode(node)}
                  className="cursor-pointer group"
                >
                  {/* Outer Glow Circle */}
                  <circle
                    r={node.val / 2 + (isSelected ? 8 : 4)}
                    fill={node.color || '#8b5cf6'}
                    opacity={isSelected ? 0.35 : 0.15}
                    className="animate-pulse"
                  />

                  {/* Core Node Circle */}
                  <circle
                    r={node.val / 2}
                    fill={node.color || '#8b5cf6'}
                    stroke={isSelected ? '#ffffff' : isConnected ? '#a855f7' : '#1e293b'}
                    strokeWidth={isSelected ? 3 : 1.5}
                    className="transition-all duration-300 group-hover:scale-110"
                  />

                  {/* Label text */}
                  <text
                    y={node.val / 2 + 14}
                    textAnchor="middle"
                    fill={isSelected ? '#ffffff' : '#cbd5e1'}
                    fontSize={node.type === 'company' ? '12' : '10'}
                    fontWeight={isSelected ? 'bold' : '500'}
                    className="pointer-events-none transition-colors"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="absolute bottom-4 right-4 flex items-center gap-2 text-[10px] text-slate-400 bg-slate-950/80 px-3 py-1 rounded-full border border-slate-800">
            <span>Nodes: {filteredNodes.length}</span>
            <span>•</span>
            <span>Links: {links.length}</span>
          </div>

        </div>

        {/* NODE INSPECTOR DRAWER (1 COL) */}
        <div className="bg-slate-900/90 border border-purple-500/30 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl space-y-6 flex flex-col justify-between">
          
          {selectedNode ? (
            <div className="space-y-5">
              
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-wider">
                    {selectedNode.type}
                  </span>
                  <h3 className="text-xl font-extrabold text-white mt-2">{selectedNode.label}</h3>
                  {selectedNode.category && (
                    <p className="text-xs text-slate-400">Category: {selectedNode.category}</p>
                  )}
                </div>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border"
                  style={{ backgroundColor: `${selectedNode.color}20`, borderColor: selectedNode.color }}
                >
                  <Zap className="w-4 h-4" style={{ color: selectedNode.color }} />
                </div>
              </div>

              {/* Connected Nodes List */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-purple-400" />
                  Connected Graph Nodes ({connectedNodes.length})
                </p>

                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {connectedNodes.map(cn => (
                    <div
                      key={cn.id}
                      onClick={() => setSelectedNode(cn)}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-purple-500/40 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cn.color }} />
                        <span className="text-xs text-slate-200 font-medium">{cn.label}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Associated Vault Document Link */}
              {associatedDoc ? (
                <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 space-y-2">
                  <p className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-purple-400" />
                    Verified Vault Document
                  </p>
                  <p className="text-xs text-white font-semibold">{associatedDoc.name}</p>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{associatedDoc.aiSummary}</p>
                  <button
                    onClick={() => {
                      onSelectDoc(associatedDoc);
                      setActivePage('vault');
                    }}
                    className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1 pt-1"
                  >
                    Open Document in Vault <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 text-xs text-slate-400 italic">
                  Node generated from identity context. Upload a certificate to verify.
                </div>
              )}

            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
              <Info className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-xs">Select a node on the graph to inspect details.</p>
            </div>
          )}

          {/* Quick Nav Button */}
          <button
            onClick={() => setActivePage('vault')}
            className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <FileText className="w-4 h-4 text-purple-400" />
            <span>Upload Document to Expand Graph</span>
          </button>

        </div>

      </div>

    </div>
  );
};
