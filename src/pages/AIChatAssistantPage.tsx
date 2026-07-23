import React, { useState, useRef, useEffect } from 'react';
import { UserProfile, VaultDocument, ChatMessage } from '../types';
import { MessageSquare, Sparkles, Send, Bot, User, RefreshCw, FileText, Compass, Zap } from 'lucide-react';
import { sendChatMessageToAI } from '../services/aiService';

interface AIChatAssistantPageProps {
  profile: UserProfile;
  documents: VaultDocument[];
}

export const AIChatAssistantPage: React.FC<AIChatAssistantPageProps> = ({ profile, documents }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: `Hello ${profile.name}! I am **IdentityVerse AI Assistant**, fully aware of your ${documents.length} verified vault credentials and career goals in ${profile.title}.\n\nAsk me anything! For example:\n- "How can I tailor my resume for Anthropic or Google?"\n- "Summarize my top 3 skills across all uploaded certificates."\n- "What missing skills should I learn for AI Systems engineering?"`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    setInput('');

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    const reply = await sendChatMessageToAI(userText, messages, profile, documents);

    const botMsg: ChatMessage = {
      id: `b_${Date.now()}`,
      sender: 'assistant',
      text: reply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, botMsg]);
    setIsTyping(false);
  };

  const quickPrompts = [
    'How should I highlight my GPU optimization metrics on my ATS resume?',
    'Summarize my top 3 verified skills from my uploaded certificates',
    'What projects am I missing for a Lead AI Engineer role?'
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-5xl mx-auto">
      
      {/* HEADER */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
          <MessageSquare className="w-7 h-7 text-purple-400" />
          IdentityVerse AI Co-Pilot
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Conversational agent backed by Gemini 2.5 Flash with live access to your document vault, knowledge graph, and career pathways.
        </p>
      </div>

      {/* CHAT CONTAINER */}
      <div className="bg-slate-900/90 border border-purple-500/30 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl h-[600px] flex flex-col justify-between overflow-hidden shadow-purple-950/80">
        
        {/* MESSAGES FEED */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 text-xs">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-lg shadow-purple-600/30">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] p-4 rounded-2xl ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-xs'
                    : 'bg-slate-950/90 text-slate-200 border border-slate-800 rounded-bl-xs'
                }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed">{m.text}</p>
                <span className="text-[9px] opacity-60 mt-1.5 block text-right">{m.timestamp}</span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 items-center text-purple-300">
              <div className="w-8 h-8 rounded-2xl bg-purple-600/20 text-purple-300 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-slate-950 px-4 py-2.5 rounded-2xl border border-slate-800 text-xs flex items-center gap-2">
                <span>Gemini 2.5 Flash analyzing vault knowledge...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* QUICK PROMPTS CHIPS */}
        <div className="pt-3 pb-2 border-t border-slate-800 flex items-center gap-2 overflow-x-auto">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInput(p);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-950 border border-purple-500/20 hover:border-purple-400 text-xs text-slate-300 hover:text-white whitespace-nowrap shrink-0 transition-colors"
            >
              "{p}"
            </button>
          ))}
        </div>

        {/* INPUT FORM */}
        <form onSubmit={handleSend} className="pt-2 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about tailored interview prep, resume optimizations, or skill roadmaps..."
            className="flex-1 bg-slate-950 border border-purple-500/20 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-purple-600/30 hover:opacity-90 disabled:opacity-50 flex items-center gap-1.5 shrink-0"
          >
            <span>Send</span>
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>

    </div>
  );
};
