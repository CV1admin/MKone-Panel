import React from 'react';
import { MODULE_TYPES } from '../constants';
import { Box, Search, Filter, Download, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

export const ModuleGallery: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#8e9299]">
          Module Repository
        </h3>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-[#8e9299]" />
            <input 
              type="text" 
              placeholder="SEARCH MODULES..." 
              className="bg-[#151619] border border-[#ffffff]/10 rounded px-8 py-1.5 text-[10px] font-mono text-[#00ff00] focus:outline-none focus:border-[#00ff00]/50"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#ffffff]/5 text-[#8e9299] border border-[#ffffff]/10 rounded text-[10px] font-mono uppercase hover:bg-[#ffffff]/10">
            <Filter className="w-3 h-3" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {MODULE_TYPES.map((type, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -2 }}
            className="bg-[#151619] border border-[#ffffff]/5 p-5 rounded-lg group hover:border-[#00ff00]/30 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-[#ffffff]/5 text-[#8e9299] rounded group-hover:text-[#00ff00] transition-colors">
                <Box className="w-5 h-5" />
              </div>
              <div className="flex gap-2">
                <button className="p-1.5 bg-[#ffffff]/5 text-[#8e9299] rounded hover:text-white">
                  <Download className="w-3 h-3" />
                </button>
                <button className="p-1.5 bg-[#ffffff]/5 text-[#8e9299] rounded hover:text-white">
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            <h4 className="text-sm font-mono font-bold uppercase tracking-tight mb-1 text-white group-hover:text-[#00ff00] transition-colors">
              {type}
            </h4>
            <p className="text-[10px] text-[#8e9299] font-mono uppercase mb-4 line-clamp-2">
              Standardized {type} component for the MKone simulation framework. Version 1.2.4-stable.
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-[#ffffff]/5">
              <div className="flex gap-1">
                <span className="text-[8px] px-1.5 py-0.5 bg-[#ffffff]/5 text-[#8e9299] rounded uppercase">Core</span>
                <span className="text-[8px] px-1.5 py-0.5 bg-[#ffffff]/5 text-[#8e9299] rounded uppercase">Stable</span>
              </div>
              <button className="text-[9px] font-mono font-bold uppercase text-[#00ff00] opacity-0 group-hover:opacity-100 transition-all">
                Add to Project
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
