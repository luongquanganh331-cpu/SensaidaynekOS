
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Settings, Globe, Camera, Cpu, Mail, Calendar, MessageCircle, Power, User, ChevronRight, Play } from 'lucide-react';
import { AppID } from '../types';

interface StartMenuProps {
  onOpenApp: (id: AppID) => void;
  onClose: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ onOpenApp, onClose }) => {
  const pinnedApps = [
    { id: 'settings', name: 'CÀI ĐẶT', icon: <Settings size={22} />, color: 'bg-zinc-800' },
    { id: 'ai', name: 'INFINITY AI', icon: <Cpu size={22} />, color: 'bg-indigo-600 shadow-[0_10px_30px_rgba(79,70,229,0.4)]' },
    { id: 'camera', name: 'MÁY ẢNH', icon: <Camera size={22} />, color: 'bg-zinc-900' },
    { id: 'browser', name: 'BROWSER', icon: <Globe size={22} />, color: 'bg-gradient-to-br from-blue-400 to-blue-600' },
    { id: 'messages', name: 'TIN NHẮN', icon: <MessageCircle size={22} />, color: 'bg-emerald-500' },
    { id: 'mail', name: 'GMAIL', icon: <Mail size={22} />, color: 'bg-red-600' },
    { id: 'calendar', name: 'LỊCH', icon: <Calendar size={22} className="text-black" />, color: 'bg-white' },
    { id: 'play', name: 'CỬA HÀNG', icon: <Play size={22} />, color: 'bg-orange-500' },
  ];

  return (
    <motion.div
      initial={{ y: 100, opacity: 0, scale: 0.92, x: '-50%' }}
      animate={{ y: 0, opacity: 1, scale: 1, x: '-50%' }}
      exit={{ y: 80, opacity: 0, scale: 0.95, x: '-50%' }}
      transition={{ type: 'spring', damping: 35, stiffness: 400, mass: 0.8 }}
      className="fixed bottom-[100px] left-1/2 w-[720px] h-[680px] bg-black/80 backdrop-blur-[80px] border border-white/10 rounded-[2.5rem] z-[150] shadow-[0_40px_120px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden origin-bottom"
    >
      {/* Search Section */}
      <div className="p-10 pb-2">
        <div className="relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-indigo-400 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Tìm kiếm ứng dụng, cài đặt và tệp tin..."
            className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl pl-16 pr-6 text-[15px] text-white/90 focus:bg-white/10 focus:border-indigo-500/30 outline-none transition-all placeholder:text-white/15 font-medium"
          />
        </div>
      </div>

      <div className="px-12 flex-1 flex flex-col overflow-y-auto no-scrollbar">
        {/* Pinned Section */}
        <div className="mt-8 mb-8 flex justify-between items-center px-2">
          <span className="text-[13px] font-black text-white/60 uppercase tracking-[0.2em]">Ứng dụng đã ghim</span>
          <button className="flex items-center gap-1.5 text-[10px] bg-white/5 px-4 py-2 rounded-xl text-white/40 hover:bg-white/10 transition-colors font-black uppercase tracking-widest">
            Tất cả <ChevronRight size={14} />
          </button>
        </div>

        {/* Pinned Apps Grid - 6 Columns for pro look */}
        <div className="grid grid-cols-6 gap-y-10 gap-x-4 mb-12">
          {pinnedApps.map(app => (
            <motion.button
              key={app.id}
              whileHover={{ scale: 1.1, y: -8 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onOpenApp(app.id as AppID)}
              className="flex flex-col items-center gap-3 group"
            >
              <div className={`w-16 h-16 rounded-[1.6rem] ${app.color} flex items-center justify-center shadow-xl transition-all group-hover:brightness-125 border border-white/10`}>
                {app.icon}
              </div>
              <span className="text-[10px] font-bold text-white/30 group-hover:text-white/80 transition-colors text-center uppercase tracking-tighter truncate w-full px-1">
                {app.name}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Recommended Section */}
        <div className="px-2 mb-6">
          <span className="text-[13px] font-black text-white/60 uppercase tracking-[0.2em]">Đề xuất</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-10 px-2">
          {[
            { title: 'Chào mừng bạn', sub: 'Khám phá Infinity OS', icon: <Globe size={20} />, color: 'bg-blue-500/20 text-blue-400' },
            { title: 'Cài đặt hệ thống', sub: 'Tối ưu hóa thiết bị', icon: <Settings size={20} />, color: 'bg-zinc-800 text-white/60' }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)', scale: 1.02 }}
              className="flex items-center gap-5 p-4 rounded-[1.5rem] transition-all cursor-pointer group bg-white/5 border border-white/5"
            >
              <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center`}>
                {item.icon}
              </div>
              <div>
                <p className="text-[14px] font-black text-white/90">{item.title}</p>
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{item.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="h-[90px] bg-white/[0.03] backdrop-blur-3xl px-12 flex items-center justify-between border-t border-white/5 mt-auto">
        <motion.div 
          whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
          className="flex items-center gap-4 cursor-pointer group px-4 py-2 rounded-2xl transition-all"
        >
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center border border-white/20 shadow-lg">
            <User size={20} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] font-black text-white/90 tracking-tight">Infinity User</span>
            <span className="text-[9px] font-bold text-indigo-400/60 uppercase tracking-widest">Administrator</span>
          </div>
        </motion.div>
        <motion.button 
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }}
          whileTap={{ scale: 0.9 }}
          className="p-3.5 bg-white/5 rounded-2xl transition-all text-white/30"
        >
          <Power size={22} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default StartMenu;
