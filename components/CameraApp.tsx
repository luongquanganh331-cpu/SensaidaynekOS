
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Added missing 'Camera' import
import { Settings, RotateCcw, X, Zap, ChevronDown, SlidersHorizontal, Camera } from 'lucide-react';

interface CameraAppProps {
  onClose: () => void;
}

const CameraApp: React.FC<CameraAppProps> = ({ onClose }) => {
  const [zoom, setZoom] = useState('1x');
  const [mode, setMode] = useState('Ảnh');
  const modes = ['Thêm tôi', 'Chân dung', 'Ảnh', 'Ban đêm', 'Toàn cảnh'];

  return (
    <div className="w-full h-full bg-black flex flex-col text-white font-sans overflow-hidden">
      {/* Top Toolbar */}
      <header className="px-8 py-6 flex items-center justify-between z-10">
        <motion.button whileTap={{ scale: 0.9 }} onClick={onClose} className="p-3 bg-zinc-900/50 rounded-full">
          <X size={24} />
        </motion.button>
        <div className="flex gap-4">
          <motion.div whileTap={{ scale: 0.9 }} className="p-3 bg-zinc-900/50 rounded-full"><Zap size={24} /></motion.div>
          <motion.div whileTap={{ scale: 0.9 }} className="p-3 bg-zinc-900/50 rounded-full"><Settings size={24} /></motion.div>
        </div>
      </header>

      {/* Main Viewfinder */}
      <div className="flex-1 relative mx-4 rounded-[3rem] overflow-hidden bg-zinc-950 border border-white/5 flex items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1549608276-5786d7513470?q=80&w=2070&auto=format&fit=crop" 
          className="w-full h-full object-cover opacity-80"
          alt="Viewfinder"
        />
        
        {/* Zoom Controls */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-3">
          {['.5', '1x', '2', '5'].map(z => (
            <button 
              key={z}
              onClick={() => setZoom(z)}
              className={`w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center text-sm font-bold transition-all ${zoom === z ? 'bg-white text-black scale-110' : 'bg-black/40 text-white border border-white/10'}`}
            >
              {z}
            </button>
          ))}
        </div>

        <div className="absolute top-4 left-0 right-0 flex justify-center">
           <div className="bg-black/30 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-widest opacity-80">RAW</span>
              <div className="w-1 h-1 bg-white/20 rounded-full" />
              <span className="text-xs font-black uppercase tracking-widest opacity-80">4K 60</span>
           </div>
        </div>
      </div>

      {/* Mode Carousel */}
      <div className="h-20 flex items-center overflow-x-auto no-scrollbar px-10 gap-8 mt-4">
        {modes.map(m => (
          <button 
            key={m}
            onClick={() => setMode(m)}
            className={`whitespace-nowrap text-sm font-bold tracking-widest uppercase transition-colors ${mode === m ? 'text-white' : 'text-white/30'}`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Bottom Controls */}
      <div className="px-10 pb-16 pt-4 flex items-center justify-between">
        <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/20">
          <img src="https://images.unsplash.com/photo-1549608276-5786d7513470?w=100" className="w-full h-full object-cover" alt="Gallery" />
        </div>

        <motion.button 
          whileTap={{ scale: 0.9 }}
          className="w-24 h-24 rounded-full bg-white flex items-center justify-center p-2 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
        >
          <div className="w-full h-full rounded-full border-4 border-black/5" />
        </motion.button>

        <motion.button 
          whileTap={{ scale: 0.8, rotate: 180 }}
          className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center border border-white/10"
        >
          <RotateCcw size={28} />
        </motion.button>
      </div>
      
      {/* Mode Indicator & Tools */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-12 text-white/40">
        <SlidersHorizontal size={20} className="hover:text-white cursor-pointer" />
        <div className="flex items-center gap-2 bg-white/10 px-4 py-1 rounded-full border border-white/5">
          <div className="w-6 h-6 bg-zinc-800 rounded-full flex items-center justify-center">
            {/* Camera component is now imported */}
            <Camera size={14} />
          </div>
          <div className="w-8 h-1 bg-white/20 rounded-full" />
          <div className="w-6 h-6 opacity-40">
            <RotateCcw size={14} />
          </div>
        </div>
        <ChevronDown size={20} className="hover:text-white cursor-pointer" />
      </div>
    </div>
  );
};

export default CameraApp;
