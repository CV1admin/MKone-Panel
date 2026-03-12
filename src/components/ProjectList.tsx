import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './FirebaseProvider';
import { Project } from '../types';
import { Plus, Folder, Users, Globe, Lock } from 'lucide-react';
import { motion } from 'motion/react';

interface ProjectListProps {
  onSelectProject: (project: Project) => void;
  activeProject: Project | null;
}

export const ProjectList: React.FC<ProjectListProps> = ({ onSelectProject, activeProject }) => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [showNewProject, setShowNewProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'projects'),
      where('ownerId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
      setProjects(projs);
    });

    return () => unsubscribe();
  }, [user]);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newProjectName.trim()) return;

    try {
      await addDoc(collection(db, 'projects'), {
        name: newProjectName,
        description: 'New simulation workspace',
        ownerId: user.uid,
        collaborators: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isPublic: false
      });
      setNewProjectName('');
      setShowNewProject(false);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#8e9299]">
          Active Workspaces ({projects.length})
        </h3>
        <button 
          onClick={() => setShowNewProject(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#00ff00]/10 text-[#00ff00] border border-[#00ff00]/20 rounded text-[10px] font-mono uppercase hover:bg-[#00ff00]/20 transition-all"
        >
          <Plus className="w-3 h-3" />
          <span>New Project</span>
        </button>
      </div>

      {showNewProject && (
        <motion.form 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleCreateProject}
          className="bg-[#151619] border border-[#00ff00]/20 p-4 rounded-lg flex gap-4"
        >
          <input 
            autoFocus
            type="text"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            placeholder="PROJECT NAME..."
            className="flex-1 bg-[#0a0a0a] border border-[#ffffff]/10 rounded px-3 py-2 text-xs font-mono text-[#00ff00] focus:outline-none focus:border-[#00ff00]/50"
          />
          <button type="submit" className="px-4 py-2 bg-[#00ff00] text-[#0a0a0a] text-[10px] font-mono font-bold uppercase rounded">
            Initialize
          </button>
          <button 
            type="button"
            onClick={() => setShowNewProject(false)}
            className="px-4 py-2 bg-[#ffffff]/5 text-[#8e9299] text-[10px] font-mono font-bold uppercase rounded"
          >
            Cancel
          </button>
        </motion.form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <motion.button
            key={project.id}
            whileHover={{ y: -2 }}
            onClick={() => onSelectProject(project)}
            className={`text-left p-5 rounded-lg border transition-all group relative overflow-hidden ${
              activeProject?.id === project.id
                ? 'bg-[#00ff00]/5 border-[#00ff00]/30 shadow-[0_0_20px_rgba(0,255,0,0.05)]'
                : 'bg-[#151619] border-[#ffffff]/5 hover:border-[#ffffff]/20'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-2 rounded ${activeProject?.id === project.id ? 'bg-[#00ff00]/20 text-[#00ff00]' : 'bg-[#ffffff]/5 text-[#8e9299]'}`}>
                <Folder className="w-5 h-5" />
              </div>
              <div className="flex gap-1">
                {project.isPublic ? <Globe className="w-3 h-3 text-[#8e9299]" /> : <Lock className="w-3 h-3 text-[#8e9299]" />}
              </div>
            </div>

            <h4 className={`text-sm font-mono font-bold uppercase tracking-tight mb-1 ${activeProject?.id === project.id ? 'text-[#00ff00]' : 'text-white'}`}>
              {project.name}
            </h4>
            <p className="text-[10px] text-[#8e9299] font-mono uppercase mb-4 line-clamp-2">
              {project.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-[#ffffff]/5">
              <div className="flex items-center gap-2 text-[9px] font-mono text-[#8e9299] uppercase">
                <Users className="w-3 h-3" />
                <span>{project.collaborators.length + 1} Members</span>
              </div>
              <span className="text-[9px] font-mono text-[#8e9299] uppercase">
                {new Date(project.updatedAt).toLocaleDateString()}
              </span>
            </div>

            {activeProject?.id === project.id && (
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#00ff00]/10 blur-2xl -mr-8 -mt-8 rounded-full" />
            )}
          </motion.button>
        ))}

        {projects.length === 0 && !showNewProject && (
          <div className="col-span-full py-12 border-2 border-dashed border-[#ffffff]/5 rounded-lg flex flex-col items-center justify-center text-[#8e9299]">
            <Folder className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-xs font-mono uppercase tracking-widest">No projects found in this sector</p>
            <button 
              onClick={() => setShowNewProject(true)}
              className="mt-4 text-[10px] font-mono uppercase text-[#00ff00] hover:underline"
            >
              Initialize First Workspace
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
