
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Globe, Cpu, Camera, Mail, Calendar, Youtube, LayoutGrid, Triangle, Circle, Square, Wifi, Battery } from 'lucide-react';
import { AppID } from '../types';

interface TaskbarProps {
  openApps: AppID[];
  focusedApp: AppID | null;
  onOpenApp: (id: AppID) => void;
  time: Date;
  onToggleDesktop: () => void;
  onToggleStart: () => void;
  onToggleControlCenter: () => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ 
  onOpenApp, 
  time, 
  onToggleStart,
  onToggleControlCenter
}) => {
  const formattedTime = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <div className="fixed bottom-4 left-4 right-4 h-16 bg-[#e0e3d5]/80 backdrop-blur-3xl border border-white/20 rounded-full flex items-center justify-between px-6 z-[200] shadow-2xl">
      
      {/* Left: App Drawer & Search */}
      <div className="flex items-center gap-4">
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={onToggleStart}
          className="w-10 h-10 flex items-center justify-center text-[#2d341a] hover:bg-black/5 rounded-full transition-colors"
        >
          <LayoutGrid size={24} />
        </motion.button>
        <div className="w-[1px] h-6 bg-black/10" />
        <div className="flex items-center gap-3 px-2">
           <Search size={20} className="text-[#2d341a]/60" />
        </div>
      </div>

      {/* Center: Running/Pinned Apps */}
      <div className="flex items-center gap-2">
        {[
          { id: 'mail', icon: <Mail size={22} /> },
          { id: 'browser', icon: <Globe size={22} /> },
          { id: 'ai', icon: <Cpu size={22} /> },
          { id: 'camera', icon: <Camera size={22} /> },
          { id: 'play', icon: <Youtube size={22} /> },
        ].map((app) => (
          <motion.button
            key={app.id}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onOpenApp(app.id as AppID)}
            className="w-12 h-12 rounded-2xl bg-[#c4d19e] flex items-center justify-center text-[#2d341a] shadow-sm border border-black/5"
          >
            {app.icon}
          </motion.button>
        ))}
      </div>

      {/* Right: Status & Navigation */}
      <div className="flex items-center gap-6">
        {/* Status Pill */}
        <motion.button 
          onClick={onToggleControlCenter}
          className="flex items-center gap-3 bg-black/5 px-4 py-2 rounded-full hover:bg-black/10 transition-colors"
        >
          <div className="flex items-center gap-2 text-[#2d341a]">
            <Wifi size={16} />
            <Battery size={18} />
          </div>
          <span className="text-sm font-bold text-[#2d341a]">{formattedTime}</span>
        </motion.button>

        {/* Android Nav Buttons */}
        <div className="flex items-center gap-6 text-[#2d341a]/60 ml-2">
           <motion.button whileTap={{ scale: 0.8 }}><Triangle size={18} className="-rotate-90 fill-current" /></motion.button>
           <motion.button whileTap={{ scale: 0.8 }}><Circle size={18} className="fill-current" /></motion.button>
           <motion.button whileTap={{ scale: 0.8 }}><Square size={18} className="fill-current" /></motion.button>
        </div>
      </div>

    </div>
  );
};

export default Taskbar;
