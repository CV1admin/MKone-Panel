import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { motion } from 'motion/react';
import { Cpu, Globe, Zap } from 'lucide-react';

export const Login: React.FC = () => {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 font-mono text-[#00ff00]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-[#151619] border border-[#00ff00]/20 p-8 rounded-lg shadow-[0_0_50px_rgba(0,255,0,0.1)] relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00ff00] to-transparent opacity-50" />
        
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-20 h-20 bg-[#00ff00]/10 rounded-full flex items-center justify-center mb-4 border border-[#00ff00]/30">
            <Cpu className="w-10 h-10 text-[#00ff00]" />
          </div>
          <h1 className="text-2xl font-bold tracking-tighter mb-2 uppercase">Universal Control Panel</h1>
          <p className="text-xs text-[#00ff00]/60 uppercase tracking-widest">MKone / AGT Ecosystem</p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 text-sm border-l-2 border-[#00ff00] pl-4 py-2 bg-[#00ff00]/5">
            <Globe className="w-4 h-4" />
            <span>Multi-User AI Collaboration</span>
          </div>
          <div className="flex items-center gap-3 text-sm border-l-2 border-[#00ff00] pl-4 py-2 bg-[#00ff00]/5">
            <Zap className="w-4 h-4" />
            <span>Real-time Simulation Engine</span>
          </div>
        </div>

        <button
          onClick={handleLogin}
          className="w-full py-4 bg-[#00ff00] text-[#0a0a0a] font-bold uppercase tracking-widest hover:bg-[#00cc00] transition-colors flex items-center justify-center gap-2 group"
        >
          <span>Initialize Access</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            →
          </motion.span>
        </button>

        <div className="mt-8 pt-6 border-t border-[#00ff00]/10 text-[10px] text-center opacity-40 uppercase tracking-tighter">
          System Status: Ready | Protocol: Secure | Version: 2.5.0
        </div>
      </motion.div>
    </div>
  );
};
