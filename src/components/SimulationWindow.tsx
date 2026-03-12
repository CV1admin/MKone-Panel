import React, { useState, useRef, useEffect } from 'react';
import { Project } from '../types';
import { Play, Square, Save, Activity, Layers, Database, Terminal } from 'lucide-react';
import { motion } from 'motion/react';

interface SimulationWindowProps {
  project: Project;
}

export const SimulationWindow: React.FC<SimulationWindowProps> = ({ project }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        const timestamp = new Date().toLocaleTimeString();
        const events = [
          "Processing tensor network...",
          "Quantum circuit state updated",
          "Physics table lookup: successful",
          "Symmetry rendering in progress",
          "API handshake: OK",
          "Energy field stabilized"
        ];
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        setLogs(prev => [...prev.slice(-19), `[${timestamp}] ${randomEvent}`]);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  // Simple animation for the simulation window
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number, y: number, vx: number, vy: number, size: number }[] = [];

    const init = () => {
      particles = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 2 + 1
      }));
    };

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (isRunning) {
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 0.5;
        particles.forEach((p, i) => {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = '#00ff00';
          ctx.fill();

          // Connect nearby particles
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
              ctx.globalAlpha = 1 - dist / 100;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
              ctx.globalAlpha = 1;
            }
          }
        });
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = canvas.parentElement?.clientHeight || 400;
      init();
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isRunning]);

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-[#151619] border border-[#ffffff]/10 rounded text-[10px] font-mono uppercase">
            <Activity className="w-3 h-3 text-[#00ff00]" />
            <span>Engine: ACTIVE</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-[#151619] border border-[#ffffff]/10 rounded text-[10px] font-mono uppercase">
            <Layers className="w-3 h-3 text-[#00ff00]" />
            <span>Layers: 12</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isRunning ? (
            <button 
              onClick={() => setIsRunning(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#00ff00] text-[#0a0a0a] rounded text-[10px] font-mono font-bold uppercase hover:bg-[#00cc00] transition-all"
            >
              <Play className="w-3 h-3" />
              <span>Initialize Run</span>
            </button>
          ) : (
            <button 
              onClick={() => setIsRunning(false)}
              className="flex items-center gap-2 px-4 py-2 bg-[#ff4444] text-white rounded text-[10px] font-mono font-bold uppercase hover:bg-[#cc0000] transition-all"
            >
              <Square className="w-3 h-3" />
              <span>Terminate</span>
            </button>
          )}
          <button className="flex items-center gap-2 px-4 py-2 bg-[#ffffff]/5 text-[#8e9299] border border-[#ffffff]/10 rounded text-[10px] font-mono font-bold uppercase hover:bg-[#ffffff]/10 transition-all">
            <Save className="w-3 h-3" />
            <span>Save State</span>
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-4 gap-6 min-h-0">
        <div className="col-span-3 flex flex-col gap-4">
          <div className="flex-1 bg-[#0a0a0a] border border-[#ffffff]/5 rounded-lg relative overflow-hidden">
            <canvas ref={canvasRef} className="w-full h-full" />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <div className="px-2 py-1 bg-[#00ff00]/10 border border-[#00ff00]/20 rounded text-[8px] font-mono text-[#00ff00] uppercase">
                Symmetry Render: V2
              </div>
              <div className="px-2 py-1 bg-[#00ff00]/10 border border-[#00ff00]/20 rounded text-[8px] font-mono text-[#00ff00] uppercase">
                Field Density: 0.84
              </div>
            </div>
            {!isRunning && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]/80 backdrop-blur-sm">
                <div className="text-center">
                  <Activity className="w-12 h-12 text-[#00ff00]/20 mx-auto mb-4" />
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#00ff00]/40">
                    System Standby
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="h-48 bg-[#151619] border border-[#ffffff]/5 rounded-lg flex flex-col overflow-hidden">
            <div className="h-8 border-b border-[#ffffff]/5 px-4 flex items-center justify-between bg-[#0a0a0a]/30">
              <div className="flex items-center gap-2 text-[9px] font-mono font-bold uppercase text-[#8e9299]">
                <Terminal className="w-3 h-3" />
                <span>System Logs</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-[#00ff00] animate-pulse" />
            </div>
            <div className="flex-1 p-4 font-mono text-[10px] text-[#00ff00]/70 overflow-y-auto space-y-1">
              {logs.length === 0 && <span className="opacity-30">Waiting for initialization...</span>}
              {logs.map((log, i) => (
                <div key={i} className="flex gap-2">
                  <span className="opacity-30">[{i.toString().padStart(3, '0')}]</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-[#151619] border border-[#ffffff]/5 rounded-lg p-4">
            <h4 className="text-[10px] font-mono font-bold uppercase text-[#8e9299] mb-4 flex items-center gap-2">
              <Database className="w-3 h-3" />
              <span>Physics Tables</span>
            </h4>
            <div className="space-y-3">
              {[
                { label: "Fine Structure", value: "7.297e-3" },
                { label: "Cosmic Constant", value: "1.105e-52" },
                { label: "Planck Mass", value: "2.176e-8" },
                { label: "Symmetry Group", value: "SU(3)xSU(2)" }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between border-b border-[#ffffff]/5 pb-2">
                  <span className="text-[9px] font-mono uppercase text-[#8e9299]">{item.label}</span>
                  <span className="text-[9px] font-mono text-[#00ff00]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 bg-[#151619] border border-[#ffffff]/5 rounded-lg p-4 flex flex-col">
            <h4 className="text-[10px] font-mono font-bold uppercase text-[#8e9299] mb-4">
              Active Modules
            </h4>
            <div className="flex-1 space-y-2 overflow-y-auto">
              {["TensorFlow v4", "Qiskit Core", "CSV Loader", "MKone V3"].map((mod, i) => (
                <div key={i} className="p-2 bg-[#0a0a0a] border border-[#ffffff]/5 rounded flex items-center justify-between group hover:border-[#00ff00]/30 transition-all">
                  <span className="text-[9px] font-mono uppercase text-white">{mod}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00ff00]" />
                </div>
              ))}
            </div>
            <button className="mt-4 w-full py-2 border border-dashed border-[#ffffff]/10 rounded text-[9px] font-mono uppercase text-[#8e9299] hover:border-[#00ff00]/30 hover:text-[#00ff00] transition-all">
              + Add Module
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
