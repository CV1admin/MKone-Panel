import React from 'react';
import { 
  LayoutDashboard, 
  Zap, 
  Box, 
  CheckCircle2, 
  Settings, 
  LogOut,
  User as UserIcon
} from 'lucide-react';
import { useAuth } from './FirebaseProvider';
import { auth } from '../firebase';
import { Project } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  activeProject: Project | null;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, activeProject }) => {
  const { profile } = useAuth();

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Projects' },
    { id: 'simulation', icon: Zap, label: 'Simulation', disabled: !activeProject },
    { id: 'modules', icon: Box, label: 'Modules' },
    { id: 'solutions', icon: CheckCircle2, label: 'Solutions' },
  ];

  return (
    <aside className="w-64 bg-[#151619] flex flex-col border-r border-[#ffffff]/5">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-[#00ff00] rounded flex items-center justify-center">
            <Zap className="w-5 h-5 text-[#0a0a0a]" />
          </div>
          <h1 className="text-sm font-mono font-bold tracking-tighter uppercase text-[#00ff00]">
            MKone Control
          </h1>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => !item.disabled && setActiveTab(item.id)}
              disabled={item.disabled}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-mono uppercase tracking-wider transition-all ${
                activeTab === item.id
                  ? 'bg-[#00ff00]/10 text-[#00ff00] border border-[#00ff00]/20'
                  : item.disabled
                  ? 'opacity-20 cursor-not-allowed'
                  : 'text-[#8e9299] hover:bg-[#ffffff]/5 hover:text-white'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-[#ffffff]/5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-[#ffffff]/10 rounded-full flex items-center justify-center border border-[#ffffff]/10">
            {profile?.photoURL ? (
              <img src={profile.photoURL} alt="" className="w-full h-full rounded-full" referrerPolicy="no-referrer" />
            ) : (
              <UserIcon className="w-4 h-4 text-[#8e9299]" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-mono font-bold truncate uppercase text-white">
              {profile?.displayName || 'Unknown User'}
            </p>
            <p className="text-[9px] font-mono text-[#8e9299] truncate uppercase">
              {profile?.role || 'User'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center p-2 rounded bg-[#ffffff]/5 hover:bg-[#ffffff]/10 transition-colors text-[#8e9299]">
            <Settings className="w-4 h-4" />
          </button>
          <button 
            onClick={() => auth.signOut()}
            className="flex items-center justify-center p-2 rounded bg-[#ffffff]/5 hover:bg-[#ffffff]/10 transition-colors text-[#8e9299]"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
