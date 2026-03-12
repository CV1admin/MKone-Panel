import React, { useState } from 'react';
import { useAuth } from './FirebaseProvider';
import { Login } from './Login';
import { Sidebar } from './Sidebar';
import { ProjectList } from './ProjectList';
import { SimulationWindow } from './SimulationWindow';
import { AgentPanel } from './AgentPanel';
import { ModuleGallery } from './ModuleGallery';
import { SolutionGallery } from './SolutionGallery';
import { Project } from '../types';

export const Dashboard: React.FC = () => {
  const { user, loading } = useAuth();
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'simulation' | 'modules' | 'solutions'>('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center font-mono text-[#00ff00]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#00ff00]/20 border-t-[#00ff00] rounded-full animate-spin" />
          <span className="text-xs uppercase tracking-widest animate-pulse">Synchronizing with MKone Core...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-[#e0e0e0] font-sans overflow-hidden">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        activeProject={activeProject}
      />
      
      <main className="flex-1 flex flex-col min-w-0 bg-[#0f0f0f] border-x border-[#ffffff]/5">
        <header className="h-14 border-bottom border-[#ffffff]/5 flex items-center justify-between px-6 bg-[#151619]">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-[#00ff00]">
              {activeProject ? activeProject.name : 'System Overview'}
            </h2>
            {activeProject && (
              <span className="text-[10px] bg-[#00ff00]/10 text-[#00ff00] px-2 py-0.5 rounded border border-[#00ff00]/20 uppercase">
                Active Session
              </span>
            )}
          </div>
          <div className="flex items-center gap-4 text-[10px] font-mono opacity-50">
            <span>LATENCY: 14ms</span>
            <span>UPTIME: 99.9%</span>
            <span>CORE: MK-V3</span>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          {activeTab === 'dashboard' && (
            <ProjectList onSelectProject={setActiveProject} activeProject={activeProject} />
          )}
          {activeTab === 'simulation' && activeProject && (
            <SimulationWindow project={activeProject} />
          )}
          {activeTab === 'simulation' && !activeProject && (
            <div className="h-full flex items-center justify-center text-[#00ff00]/40 uppercase text-xs tracking-widest">
              Select a project to initialize simulation
            </div>
          )}
          {activeTab === 'modules' && <ModuleGallery />}
          {activeTab === 'solutions' && <SolutionGallery />}
        </div>
      </main>

      <AgentPanel activeProject={activeProject} />
    </div>
  );
};
