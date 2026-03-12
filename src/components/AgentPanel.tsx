import React, { useState, useRef, useEffect } from 'react';
import { Project } from '../types';
import { Send, Bot, Sparkles, MessageSquare, Code, Binary, Calculator } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { motion, AnimatePresence } from 'motion/react';

interface AgentPanelProps {
  activeProject: Project | null;
}

interface Message {
  role: 'user' | 'agent';
  content: string;
  type?: 'text' | 'code' | 'data';
}

export const AgentPanel: React.FC<AgentPanelProps> = ({ activeProject }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'agent', content: "SYSTEM INITIALIZED. I am your personal MKone Assistant. How can I help with your simulation today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: input,
        config: {
          systemInstruction: `You are an AI agent in the Universal Simulation Control Panel (MKone/AGT ecosystem). 
          You help with coding, physics simulations (TensorFlow, Qiskit), math, and data analysis.
          Keep your responses concise, technical, and formatted for a scientific control panel.
          Use markdown for code blocks. Current project: ${activeProject?.name || 'None'}.`
        }
      });

      const agentMessage: Message = { role: 'agent', content: response.text || "Error processing request." };
      setMessages(prev => [...prev, agentMessage]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'agent', content: "CONNECTION INTERRUPTED. UNABLE TO REACH CORE." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <aside className="w-80 bg-[#151619] flex flex-col border-l border-[#ffffff]/5">
      <div className="p-4 border-b border-[#ffffff]/5 flex items-center justify-between bg-[#0a0a0a]/30">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00ff00] shadow-[0_0_8px_rgba(0,255,0,0.5)]" />
          <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-white">MK-Assistant</h3>
        </div>
        <div className="flex gap-2">
          <button className="p-1 text-[#8e9299] hover:text-[#00ff00] transition-colors">
            <SettingsIcon className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-[10px]" ref={scrollRef}>
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className={`max-w-[90%] p-3 rounded-lg ${
                msg.role === 'user' 
                  ? 'bg-[#00ff00]/10 border border-[#00ff00]/20 text-[#00ff00]' 
                  : 'bg-[#ffffff]/5 border border-[#ffffff]/10 text-[#e0e0e0]'
              }`}>
                {msg.content}
              </div>
              <span className="mt-1 text-[8px] opacity-30 uppercase">
                {msg.role === 'user' ? 'User' : 'Agent'}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        {isTyping && (
          <div className="flex items-center gap-2 text-[#00ff00] opacity-50">
            <div className="w-1 h-1 bg-current rounded-full animate-bounce" />
            <div className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:0.2s]" />
            <div className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
        )}
      </div>

      <div className="p-4 border-t border-[#ffffff]/5 space-y-3">
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: Code, label: 'Code' },
            { icon: Binary, label: 'Data' },
            { icon: Calculator, label: 'Math' },
            { icon: Sparkles, label: 'Sim' }
          ].map((tool, i) => (
            <button key={i} className="flex flex-col items-center gap-1 p-2 rounded bg-[#ffffff]/5 hover:bg-[#ffffff]/10 transition-colors group">
              <tool.icon className="w-3 h-3 text-[#8e9299] group-hover:text-[#00ff00]" />
              <span className="text-[7px] uppercase text-[#8e9299] group-hover:text-[#00ff00]">{tool.label}</span>
            </button>
          ))}
        </div>

        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
            placeholder="COMMAND..."
            className="w-full bg-[#0a0a0a] border border-[#ffffff]/10 rounded-lg p-3 pr-10 text-[10px] font-mono text-[#00ff00] focus:outline-none focus:border-[#00ff00]/50 resize-none h-20"
          />
          <button 
            onClick={handleSend}
            disabled={isTyping || !input.trim()}
            className="absolute bottom-3 right-3 p-1.5 bg-[#00ff00] text-[#0a0a0a] rounded hover:bg-[#00cc00] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-3 h-3" />
          </button>
        </div>
      </div>
    </aside>
  );
};

const SettingsIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
);
