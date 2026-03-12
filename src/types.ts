export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  collaborators: string[];
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
}

export interface Agent {
  id: string;
  projectId: string;
  name: string;
  model: string;
  skills: string[];
  memory: string;
  status: 'idle' | 'busy' | 'offline';
}

export interface Module {
  id: string;
  name: string;
  description: string;
  type: string;
  config: any;
  authorId: string;
}

export interface Solution {
  id: string;
  projectId: string;
  name: string;
  results: any;
  visualizations: string[];
  createdAt: string;
}
