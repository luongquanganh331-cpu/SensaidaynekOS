
import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Wifi, Battery, SlidersHorizontal } from 'lucide-react';

interface MenuBarProps {
  time: Date;
  onToggleControlCenter: () => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ time, onToggleControlCenter }) => {
  const formattedTime = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  const formattedDate = time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  const menus = ['File', 'Edit', 'View', 'Go', 'Window', 'Help'];

  return (
    <motion.div 
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="absolute top-0 left-0 right-0 h-8 bg-black/80 backdrop-blur-2xl border-b border-white/5 flex items-center justify-between px-4 z-[200] select-none"
    >
      {/* Left Section: Logo & Menus */}
      <div className="flex items-center gap-4 h-full">
        <div className="flex items-center gap-2 pr-4">
          <Cpu size={14} className="text-indigo-400" />
          <span className="text-[11px] font-black tracking-[0.15em] text-white">SENSAIDAYNEKOS</span>
        </div>
        
        <div className="h-4 w-[1px] bg-white/10" />

        <div className="flex items-center gap-5 ml-2">
          {menus.map(m => (
            <button 
              key={m} 
              className="text-[12px] font-medium text-white/70 hover:text-white transition-colors"
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Right Section: Status & Clock */}
      <div className="flex items-center gap-4 h-full">
        <div className="h-4 w-[1px] bg-white/10" />
        
        <div className="flex items-center gap-4 text-white/60 mr-2">
          <button 
            onClick={onToggleControlCenter} 
            className="hover:text-white transition-colors"
          >
            <SlidersHorizontal size={14} />
          </button>
          <Wifi size={14} />
          <Battery size={15} className="rotate-0" />
        </div>

        <div className="flex items-center gap-2 text-[12px] font-semibold text-white/90">
          <span className="text-white/40 font-medium">{formattedDate}</span>
          <span>{formattedTime}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuBar;