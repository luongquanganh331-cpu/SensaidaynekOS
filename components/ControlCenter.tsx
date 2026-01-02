
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Wifi, Bluetooth, Plane, Moon, Sun, Volume2, 
  Battery, Zap, Music, RotateCcw, Monitor, 
  Lightbulb, Shield, Timer, Calculator, Camera, Power, Settings,
  WifiOff, BellOff, SunMedium, Smartphone, Edit2, RotateCw, MousePointer2
} from 'lucide-react';

interface ControlCenterProps {
  onClose: () => void;
  isDesktop?: boolean;
  onOpenSettings?: () => void;
}

const ControlCenter: React.FC<ControlCenterProps> = ({ onClose, isDesktop, onOpenSettings }) => {
  const [brightness, setBrightness] = useState(85);

  // Matcha Latte Palette
  const activeBg = "bg-[#f5e6d3]"; // Cream Latte
  const activeText = "text-[#2d341a]"; // Matcha Dark
  const inactiveBg = "bg-[#2d341a]"; // Dark Matcha
  const inactiveText = "text-[#c4d19e]"; // Light Matcha

  if (isDesktop) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="fixed bottom-24 right-4 w-[850px] bg-[#e0e3d5]/90 backdrop-blur-3xl border border-white/20 z-[300] p-8 rounded-[3rem] shadow-2xl flex flex-col gap-6"
      >
        {/* Top: Brightness Slider */}
        <div className="flex items-center gap-4 bg-[#2d341a] h-14 rounded-2xl px-6 relative overflow-hidden">
          <Sun size={20} className="text-[#c4d19e] z-10" />
          <input 
            type="range" 
            value={brightness} 
            onChange={(e) => setBrightness(parseInt(e.target.value))}
            className="flex-1 h-full bg-transparent appearance-none cursor-pointer z-10 accent-[#c4d19e]"
          />
          <div className="absolute top-0 left-0 h-full bg-white/10 pointer-events-none" style={{ width: `${brightness}%` }} />
        </div>

        <div className="flex gap-8">
          <div className="flex-1 grid grid-cols-2 gap-4">
            {[
              { icon: <Wifi size={20} />, label: 'Internet', sub: 'Matcha Fiber', active: true },
              { icon: <Bluetooth size={20} />, label: 'Bluetooth', sub: 'On', active: true },
              { icon: <Moon size={20} />, label: 'Modes', sub: 'No active modes', active: false },
              { icon: <Lightbulb size={20} />, label: 'Flashlight', sub: 'Off', active: false },
              { icon: <BellOff size={20} />, label: 'Alarm', sub: 'No alarm set', active: false },
              { icon: <Plane size={20} />, label: 'Airplane mode', sub: 'Off', active: false },
            ].map((tile, i) => (
              <motion.div 
                key={i}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-4 p-4 rounded-3xl cursor-pointer transition-colors ${tile.active ? 'bg-[#2d341a] text-[#c4d19e]' : 'bg-black/5 text-[#2d341a]'}`}
              >
                <div className={`p-3 rounded-full ${tile.active ? 'bg-[#c4d19e] text-[#2d341a]' : 'bg-black/5'}`}>
                  {tile.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold">{tile.label}</span>
                  <span className="text-[10px] opacity-60 font-medium">{tile.sub}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="w-[350px] bg-white/40 rounded-[2.5rem] p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center opacity-40 mb-2">
              <span className="text-xs font-bold uppercase tracking-widest">Sensaidaynekos System</span>
              <RotateCcw size={14} />
            </div>
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-[#2d341a] rounded-full text-[#c4d19e]">
                <Smartphone size={18} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#2d341a]">Sensaidaynekos Infinity Engine</p>
                <p className="text-xs text-[#2d341a]/60 mt-1">Hệ thống đang hoạt động tối ưu</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <div className="flex gap-2">
             <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center cursor-pointer"><Power size={18} /></div>
             <div onClick={onOpenSettings} className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center cursor-pointer"><Settings size={18} /></div>
          </div>
          <button onClick={onClose} className="bg-[#2d341a] text-[#c4d19e] px-8 py-3 rounded-full text-sm font-bold">Done</button>
        </div>
      </motion.div>
    );
  }

  // MOBILE CONTROL CENTER
  return (
    <motion.div
      initial={{ y: '-100%' }}
      animate={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 bg-[#0a0a0a]/95 backdrop-blur-[60px] z-[300] flex flex-col pt-12 px-6 pb-20 overflow-y-auto no-scrollbar"
    >
      {/* Mobile Top Header (Status) */}
      <div className="flex justify-between items-center mb-8 px-2">
        <div className="flex flex-col">
          <span className="text-white/40 text-xs font-black uppercase tracking-[0.2em]">Sensaidaynekos OS v16</span>
          <span className="text-white text-4xl font-light mt-1">10:37</span>
        </div>
        <div className="flex items-center gap-4 text-white/80">
          <div className="flex items-center gap-1">
            <Battery size={16} />
            <span className="text-[10px] font-bold">98% Optimized</span>
          </div>
        </div>
      </div>

      {/* Brightness Slider */}
      <div className="w-full bg-[#f5e6d3] h-16 rounded-full flex items-center px-6 gap-4 mb-10 shadow-lg">
        <div className="flex-1 h-full flex items-center relative">
          <input 
            type="range"
            value={brightness}
            onChange={(e) => setBrightness(parseInt(e.target.value))}
            className="w-full h-full opacity-0 absolute inset-0 z-20 cursor-pointer"
          />
          <div className="absolute left-0 h-2 bg-[#2d341a]/10 rounded-full w-full" />
          <div className="absolute left-0 h-2 bg-[#2d341a] rounded-full" style={{ width: `${brightness}%` }} />
        </div>
        <Settings size={20} className="text-[#2d341a] opacity-80" onClick={onOpenSettings} />
      </div>

      {/* Quick Settings Grid */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        {[
          { icon: <Wifi size={20} />, label: 'Internet', sub: 'Matcha Fiber', active: true, color: 'bg-[#f5e6d3] text-[#2d341a]' },
          { icon: <Bluetooth size={20} />, label: 'Latte Pods', sub: 'On', active: true, color: 'bg-[#f5e6d3] text-[#2d341a]' },
          { icon: <BellOff size={20} />, label: 'Do Not Disturb', sub: 'Off', active: false, color: 'bg-[#1e2216] text-[#c4d19e]' },
          { icon: <Lightbulb size={20} />, label: 'Flashlight', sub: 'Off', active: false, color: 'bg-[#1e2216] text-[#c4d19e]' },
          { icon: <RotateCw size={20} />, label: 'Auto-rotate', sub: 'Off', active: false, color: 'bg-[#1e2216] text-[#c4d19e]' },
          { icon: <Battery size={20} />, label: 'Battery Saver', sub: 'Off', active: false, color: 'bg-[#1e2216] text-[#c4d19e]' },
          { icon: <Plane size={20} />, label: 'Zen Mode', sub: 'Off', active: false, color: 'bg-[#1e2216] text-[#c4d19e]' },
          { icon: <Moon size={20} />, label: 'Night Light', sub: 'Warm', active: false, color: 'bg-[#1e2216] text-[#c4d19e]' },
        ].map((tile, i) => (
          <motion.div 
            key={i}
            whileTap={{ scale: 0.95 }}
            className={`h-24 rounded-[2.5rem] p-5 flex items-center gap-4 cursor-pointer shadow-md border border-white/5 ${tile.color}`}
          >
            <div className={`p-2 rounded-full ${tile.active ? 'bg-[#2d341a]/10' : 'bg-white/5'}`}>
              {tile.icon}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-black uppercase truncate">{tile.label}</span>
              <span className="text-[10px] opacity-60 font-bold uppercase tracking-widest">{tile.sub}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-between items-center px-4 mt-auto">
        <motion.button whileTap={{ scale: 0.9 }} className="flex-1 max-w-[100px] h-14 border border-white/20 rounded-full flex items-center justify-center text-white/40"><Edit2 size={20} /></motion.button>
        <motion.button whileTap={{ scale: 0.9 }} className="flex-1 max-w-[100px] h-14 border border-white/20 rounded-full flex items-center justify-center text-white/40 mx-4"><Power size={20} /></motion.button>
        <motion.button whileTap={{ scale: 0.9 }} onClick={onOpenSettings} className="flex-1 max-w-[100px] h-14 bg-[#f5e6d3] rounded-full flex items-center justify-center text-[#2d341a]"><Settings size={20} /></motion.button>
      </div>

      <motion.div onClick={onClose} className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-white/20 rounded-full cursor-pointer" />
    </motion.div>
  );
};

export default ControlCenter;