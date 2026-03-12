import React from 'react';
import { CheckCircle2, Clock, Share2, BarChart3, FileText } from 'lucide-react';
import { motion } from 'motion/react';

export const SolutionGallery: React.FC = () => {
  const solutions = [
    { name: "Fine Structure Simulation", date: "2026-03-10", author: "MK-Physics", result: "Success" },
    { name: "Cosmic Field Model", date: "2026-03-08", author: "Tensor-Analyzer", result: "Success" },
    { name: "Time Crystal Test", date: "2026-03-05", author: "Quantum-Sim", result: "Warning" },
    { name: "Unified Field Run", date: "2026-03-01", author: "MKone-Core", result: "Success" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#8e9299]">
          Solution Gallery
        </h3>
        <button className="text-[10px] font-mono uppercase text-[#00ff00] hover:underline">
          Export All Results
        </button>
      </div>

      <div className="bg-[#151619] border border-[#ffffff]/5 rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#0a0a0a]/50 border-b border-[#ffffff]/5">
              <th className="p-4 text-[10px] font-mono font-bold uppercase text-[#8e9299]">Solution Name</th>
              <th className="p-4 text-[10px] font-mono font-bold uppercase text-[#8e9299]">Execution Date</th>
              <th className="p-4 text-[10px] font-mono font-bold uppercase text-[#8e9299]">Agent / Author</th>
              <th className="p-4 text-[10px] font-mono font-bold uppercase text-[#8e9299]">Status</th>
              <th className="p-4 text-[10px] font-mono font-bold uppercase text-[#8e9299] text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {solutions.map((sol, i) => (
              <tr key={i} className="border-b border-[#ffffff]/5 hover:bg-[#ffffff]/5 transition-colors group">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-[#00ff00]/10 text-[#00ff00] rounded">
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                    <span className="text-xs font-mono font-bold uppercase text-white">{sol.name}</span>
                  </div>
                </td>
                <td className="p-4 text-[10px] font-mono text-[#8e9299] uppercase">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    {sol.date}
                  </div>
                </td>
                <td className="p-4 text-[10px] font-mono text-[#8e9299] uppercase">{sol.author}</td>
                <td className="p-4">
                  <span className={`text-[8px] px-1.5 py-0.5 rounded uppercase font-bold ${
                    sol.result === 'Success' ? 'bg-[#00ff00]/10 text-[#00ff00]' : 'bg-[#ffaa00]/10 text-[#ffaa00]'
                  }`}>
                    {sol.result}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button className="p-1.5 bg-[#ffffff]/5 text-[#8e9299] rounded hover:text-[#00ff00]">
                      <BarChart3 className="w-3 h-3" />
                    </button>
                    <button className="p-1.5 bg-[#ffffff]/5 text-[#8e9299] rounded hover:text-[#00ff00]">
                      <FileText className="w-3 h-3" />
                    </button>
                    <button className="p-1.5 bg-[#ffffff]/5 text-[#8e9299] rounded hover:text-[#00ff00]">
                      <Share2 className="w-3 h-3" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
