
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Mic, Camera, Monitor, Settings, Cpu, Globe, MessageCircle, Mail, Calendar, Play, LayoutGrid, Youtube, Image as ImageIcon, HardDrive, ShieldCheck, FileText, Music, PlaySquare, Home, Smartphone, Compass } from 'lucide-react';
import { AppID } from '../types';

interface HomeScreenProps {
  onOpenApp: (id: AppID) => void;
  isDesktopMode: boolean;
  onToggleDesktop: () => void;
  isDrawerOpen?: boolean;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onOpenApp, isDesktopMode, onToggleDesktop, isDrawerOpen }) => {
  const themeColor = "bg-[#c4d19e] text-[#2d341a]";

  const allApps = [
    { id: 'settings', name: 'Settings', icon: <Settings size={28} /> },
    { id: 'ai', name: 'Gemini', icon: <Cpu size={28} /> },
    { id: 'browser', name: 'Chrome', icon: <Globe size={28} /> },
    { id: 'camera', name: 'Camera', icon: <Camera size={28} /> },
    { id: 'play', name: 'YouTube', icon: <Youtube size={28} /> },
    { id: 'mail', name: 'Gmail', icon: <Mail size={28} /> },
    { id: 'calendar', name: 'Calendar', icon: <Calendar size={28} /> },
    { id: 'drive', name: 'Drive', icon: <HardDrive size={28} /> },
    { id: 'photos', name: 'Photos', icon: <ImageIcon size={28} /> },
    { id: 'sheets', name: 'Sheets', icon: <FileText size={28} /> },
    { id: 'docs', name: 'Docs', icon: <FileText size={28} /> },
    { id: 'keep', name: 'Keep', icon: <Smartphone size={28} /> },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center overflow-hidden bg-[#1c1c1c] relative">
      
      {/* Toggle Button */}
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggleDesktop}
        className="absolute top-12 right-6 z-[100] p-3 bg-black/20 backdrop-blur-xl border border-white/5 rounded-2xl flex items-center gap-2 text-white/40 hover:text-white transition-all shadow-xl"
      >
        <Monitor size={16} />
        <span className="text-[9px] font-black uppercase tracking-widest">{isDesktopMode ? 'Mobile' : 'Desktop'}</span>
      </motion.button>

      {!isDesktopMode ? (
        <div className="w-full h-full flex flex-col px-10 pt-16 relative">
          {/* Mobile UI (Giao diện Material You đã làm từ trước) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col text-white/90 mb-8 z-10"
          >
            <span className="text-xl font-medium tracking-tight">Coffee with Robin in 30 min</span>
            <div className="flex items-center gap-2 text-sm font-medium mt-1">
              <Calendar size={14} />
              <span className="opacity-80">10:00 - 11:00 AM</span>
              <div className="w-1 h-1 bg-white/40 rounded-full mx-1" />
              <span className="opacity-80">68°F</span>
            </div>
          </motion.div>

          <div className="flex-1 relative w-full mt-4">
            <div className="grid grid-cols-3 gap-10 w-[280px]">
              {allApps.slice(0, 3).map((app, i) => (
                <motion.div key={i} onClick={() => onOpenApp(app.id as AppID)} whileTap={{ scale: 0.9 }} className="flex flex-col items-center gap-2 cursor-pointer z-10">
                  <div className={`w-14 h-14 rounded-full ${themeColor} flex items-center justify-center shadow-lg`}>
                    {app.icon}
                  </div>
                  <span className="text-[10px] font-bold text-white/60 tracking-tight">{app.name}</span>
                </motion.div>
              ))}
            </div>

            <motion.div className="absolute top-0 right-0 w-48 h-48 bg-[#c4d19e] rounded-[3.5rem] flex items-center justify-center shadow-2xl z-0">
                <div className="relative w-full h-full p-6">
                    <div className="absolute top-5 right-7 text-[#2d341a] font-black text-xs">Tue 19</div>
                    <div className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                        <div className="w-2 h-16 bg-[#2d341a] rounded-full -rotate-45" />
                        <div className="w-14 h-2 bg-[#2d341a] rounded-full absolute" style={{left: '50%'}} />
                    </div>
                </div>
            </motion.div>
          </div>

          <div className="absolute bottom-10 left-0 right-0 px-6 flex flex-col gap-6 items-center">
             <div className="flex gap-4 items-center mb-2">
                {allApps.slice(3, 9).map((app, i) => (
                  <motion.div 
                    key={i}
                    whileTap={{ scale: 0.85 }}
                    onClick={() => onOpenApp(app.id as AppID)}
                    className={`w-14 h-14 rounded-[1.5rem] border border-white/10 flex items-center justify-center shadow-xl cursor-pointer ${themeColor}`}
                  >
                    {app.icon}
                  </motion.div>
                ))}
             </div>
             <div className="w-full bg-[#2d341a]/90 backdrop-blur-3xl h-14 rounded-full flex items-center px-5 gap-4 shadow-2xl border border-white/5">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-black text-xs italic">G</div>
                <div className="flex-1" />
                <div className="flex gap-4 text-[#c4d19e]">
                   <Mic size={20} />
                   <Camera size={20} />
                </div>
             </div>
          </div>
        </div>
      ) : (
        /* Desktop Mode Launcher (Image 3) */
        <AnimatePresence>
          {isDrawerOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
              className="absolute inset-0 bg-[#e0e3d5]/90 backdrop-blur-3xl z-50 flex flex-col items-center px-20 py-16"
            >
              <div className="w-full max-w-4xl flex flex-col gap-12">
                {/* Search Bar */}
                <div className="w-full h-16 bg-[#2d341a]/5 rounded-full border border-black/5 flex items-center px-8 gap-4 shadow-sm">
                   <Search size={22} className="text-[#2d341a]/40" />
                   <input 
                     type="text" 
                     placeholder="Search web and more" 
                     className="bg-transparent border-none outline-none flex-1 text-lg font-medium text-[#2d341a] placeholder-[#2d341a]/30"
                   />
                   <Mic size={22} className="text-[#2d341a]/40" />
                   <div className="w-1 h-6 bg-black/10 mx-2" />
                   <Compass size={22} className="text-[#2d341a]/40" />
                </div>

                {/* App Grid (6 columns) */}
                <div className="grid grid-cols-6 gap-y-14 gap-x-8">
                  {allApps.map((app) => (
                    <motion.button
                      key={app.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onOpenApp(app.id as AppID)}
                      className="flex flex-col items-center gap-4 group"
                    >
                      <div className={`w-[84px] h-[84px] rounded-full ${themeColor} flex items-center justify-center shadow-lg border border-black/5 group-hover:shadow-xl transition-all`}>
                        {app.icon}
                      </div>
                      <span className="text-xs font-bold text-[#2d341a] tracking-tight">{app.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default HomeScreen;
