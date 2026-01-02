
import React from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';
import { AppID } from '../types';

interface AppWindowProps {
  id: AppID;
  children: React.ReactNode;
  onClose: () => void;
  onFocus: () => void;
  isFocused: boolean;
}

const AppWindow: React.FC<AppWindowProps> = ({ id, children, onClose, onFocus, isFocused }) => {
  return (
    <motion.div
      drag
      dragMomentum={false}
      onMouseDown={onFocus}
      initial={{ scale: 0.9, opacity: 0, y: 40 }}
      animate={{ 
        scale: isFocused ? 1 : 0.98, 
        opacity: 1, 
        y: 0,
        zIndex: isFocused ? 100 : 50,
      }}
      exit={{ scale: 0.9, opacity: 0, y: 40 }}
      transition={{ type: 'spring', damping: 30, stiffness: 400 }}
      style={{
        boxShadow: isFocused 
          ? '0 50px 100px -20px rgba(0,0,0,0.7), 0 30px 60px -30px rgba(0,0,0,0.5)' 
          : '0 10px 30px -10px rgba(0,0,0,0.4)'
      }}
      className="absolute top-24 left-32 w-[900px] h-[680px] bg-black/40 backdrop-blur-[60px] rounded-[2rem] overflow-hidden border border-white/10 flex flex-col transition-shadow duration-500"
    >
      {/* Title Bar */}
      <div className="h-12 bg-white/5 flex items-center justify-between px-6 cursor-move active:bg-white/10 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-lg bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
            <span className="text-[10px] font-bold text-indigo-400 uppercase">{id.slice(0, 1)}</span>
          </div>
          <span className="text-[11px] font-bold text-white/60 uppercase tracking-widest">{id}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button className="w-8 h-8 flex items-center justify-center hover:bg-white/5 rounded-full transition-colors text-white/30"><Minus size={14} /></button>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-white/5 rounded-full transition-colors text-white/30"><Maximize2 size={14} /></button>
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }} 
            className="w-8 h-8 flex items-center justify-center hover:bg-red-500/80 rounded-full transition-all text-white/30 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative">
        {children}
        {!isFocused && <div className="absolute inset-0 bg-black/20 pointer-events-none" />}
      </div>
    </motion.div>
  );
};

export default AppWindow;
