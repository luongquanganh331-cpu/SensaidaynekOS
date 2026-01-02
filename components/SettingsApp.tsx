
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  Wifi, 
  Bluetooth, 
  Smartphone, 
  Battery, 
  Lock, 
  Palette,
  Bell,
  ShieldCheck,
  Cpu,
  Layers,
  Settings,
  Search,
  MapPin,
  Key,
  Accessibility,
  HardDrive,
  Monitor,
  Zap,
  Volume2,
  Moon,
  Info
} from 'lucide-react';

interface SettingsAppProps {
  onClose: () => void;
}

const SettingsApp: React.FC<SettingsAppProps> = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Matcha Latte Palette
  const matchaDark = "#2d341a";
  const matchaLight = "#c4d19e";
  const latteCream = "#f5e6d3";
  const surface = "#fdfdfb";

  const sections = [
    {
      title: 'Kết nối & Thiết bị',
      items: [
        { icon: <Wifi size={22} />, label: 'Mạng & internet', sub: 'Wi-Fi, Điểm phát sóng, VPN', color: 'bg-[#c4d19e]/20' },
        { icon: <Bluetooth size={22} />, label: 'Thiết bị đã kết nối', sub: 'Bluetooth, Ghép nối nhanh', color: 'bg-[#c4d19e]/20' },
      ]
    },
    {
      title: 'Trải nghiệm người dùng',
      items: [
        { icon: <Zap size={22} />, label: 'Vô hạn mượt (120Hz+)', sub: 'Đang bật - Tối ưu hóa iPhone-grade', color: 'bg-yellow-500/10', highlight: true },
        { icon: <Palette size={22} />, label: 'Hình nền & phong cách', sub: 'Matcha Latte, Icon chủ đề', color: 'bg-[#c4d19e]/20' },
        { icon: <Monitor size={22} />, label: 'Chế độ Desktop', sub: 'Tự động kích hoạt khi kết nối màn hình', color: 'bg-[#c4d19e]/20' },
      ]
    },
    {
      title: 'Ứng dụng & Thông báo',
      items: [
        { icon: <Layers size={22} />, label: 'Ứng dụng', sub: 'Quyền truy cập, Ứng dụng mặc định', color: 'bg-[#c4d19e]/20' },
        { icon: <Bell size={22} />, label: 'Thông báo', sub: 'Lịch sử thông báo, Bong bóng chat', color: 'bg-[#c4d19e]/20' },
        { icon: <Volume2 size={22} />, label: 'Âm thanh & rung', sub: 'Âm lượng, Phản hồi xúc giác', color: 'bg-[#c4d19e]/20' },
      ]
    },
    {
      title: 'Bảo mật & Hệ thống',
      items: [
        { icon: <ShieldCheck size={22} />, label: 'Bảo mật & Quyền riêng tư', sub: 'Khóa vân tay, Quyền ứng dụng', color: 'bg-[#c4d19e]/20' },
        { icon: <Battery size={22} />, label: 'Pin', sub: '98% - Hoạt động bình thường', color: 'bg-[#c4d19e]/20' },
        { icon: <HardDrive size={22} />, label: 'Dung lượng lưu trữ', sub: '24.5 GB / 128 GB đã dùng', color: 'bg-[#c4d19e]/20' },
        { icon: <Info size={22} />, label: 'Thông tin điện thoại', sub: 'Sensaidaynekos Infinity v16.0', color: 'bg-[#c4d19e]/20' },
      ]
    }
  ];

  return (
    <div className="flex h-full bg-[#fdfdfb] text-[#2d341a] font-sans overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-80 border-r border-[#2d341a]/5 p-8 hidden lg:flex flex-col bg-[#f5e6d3]/20">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 bg-[#2d341a] rounded-xl text-[#c4d19e]">
            <Settings size={24} />
          </div>
          <h1 className="text-2xl font-black tracking-tighter uppercase">Cài đặt</h1>
        </div>
        
        <div className="bg-[#f5e6d3] p-5 rounded-[2rem] mb-8 flex items-center gap-4 border border-[#2d341a]/5 shadow-sm">
           <div className="w-12 h-12 rounded-full bg-[#2d341a] flex items-center justify-center text-[#c4d19e] font-black italic">
             S
           </div>
           <div>
              <p className="font-black text-sm uppercase">Sensaidaynekos User</p>
              <p className="text-[10px] opacity-60 font-bold">user@sensaidaynekos.dev</p>
           </div>
        </div>

        <nav className="space-y-1">
           {['Mạng & internet', 'Thiết bị', 'Cá nhân hóa', 'Bảo mật', 'Hệ thống'].map((t, i) => (
             <button key={t} className={`w-full text-left px-5 py-4 rounded-2xl hover:bg-[#c4d19e]/20 text-[13px] font-black uppercase tracking-widest transition-all ${i === 2 ? 'bg-[#c4d19e] text-[#2d341a]' : 'opacity-40'}`}>
               {t}
             </button>
           ))}
        </nav>
      </aside>

      <main className="flex-1 flex flex-col relative overflow-hidden">
        <div className="px-6 lg:px-20 pt-10 pb-6">
           <div className="w-full max-w-4xl mx-auto">
              <div className="flex items-center justify-between lg:hidden mb-6">
                 <h1 className="text-3xl font-black tracking-tighter uppercase">Cài đặt</h1>
                 <button onClick={onClose} className="p-3 bg-[#2d341a]/5 rounded-full"><Info size={20}/></button>
              </div>

              <div className="bg-[#f5e6d3]/60 backdrop-blur-xl border border-[#2d341a]/5 h-16 rounded-full flex items-center px-6 gap-4 shadow-sm mb-10 group focus-within:ring-4 ring-[#c4d19e]/20 transition-all">
                 <Search size={22} className="text-[#2d341a]/40 group-focus-within:text-[#2d341a]" />
                 <input 
                   type="text" 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder="Tìm kiếm cài đặt..." 
                   className="bg-transparent border-none outline-none flex-1 text-lg font-bold text-[#2d341a] placeholder-[#2d341a]/30"
                 />
              </div>

              <motion.div 
                whileTap={{ scale: 0.98 }}
                className="bg-[#2d341a] p-8 rounded-[3rem] border border-[#2d341a]/5 mb-10 flex items-center gap-8 shadow-2xl overflow-hidden relative"
              >
                 <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
                    <Zap size={140} className="text-[#c4d19e]" />
                 </div>
                 <div className="w-16 h-16 bg-[#c4d19e] rounded-3xl flex items-center justify-center text-[#2d341a] shadow-lg">
                    <Zap size={32} />
                 </div>
                 <div className="flex-1 z-10">
                    <h2 className="text-xl font-black text-[#c4d19e] uppercase tracking-tight">Hoàn tất thiết lập</h2>
                    <p className="text-[#c4d19e]/60 text-sm font-medium">Bật cử chỉ iPhone, Face Unlock và hơn thế nữa</p>
                 </div>
                 <ChevronRight className="text-[#c4d19e] opacity-40" />
              </motion.div>
           </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar px-6 lg:px-20 pb-32">
          <div className="max-w-4xl mx-auto space-y-12">
            {sections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#2d341a]/40 pl-4">{section.title}</h3>
                <div className="bg-white rounded-[3rem] overflow-hidden border border-[#2d341a]/5 shadow-sm">
                  {section.items.map((item, i) => (
                    <motion.div
                      key={i}
                      whileTap={{ backgroundColor: '#f5e6d3', transition: { duration: 0.1 } }}
                      className={`flex items-center gap-6 p-6 cursor-pointer hover:bg-[#f5e6d3]/30 transition-colors ${
                        i !== section.items.length - 1 ? 'border-b border-[#2d341a]/5' : ''
                      } ${item.highlight ? 'bg-yellow-500/5' : ''}`}
                    >
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center ${item.color} text-[#2d341a] flex-shrink-0 shadow-sm`}>
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <p className={`font-black text-lg leading-tight uppercase tracking-tight ${item.highlight ? 'text-yellow-700' : ''}`}>{item.label}</p>
                        <p className="text-sm opacity-50 font-bold mt-0.5">{item.sub}</p>
                      </div>
                      <ChevronRight size={18} className="opacity-20" />
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center py-20">
             <div className="flex justify-center gap-3 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2d341a]/20" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#2d341a]/20" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#2d341a]/20" />
             </div>
             <p className="text-[10px] font-black tracking-[0.5em] uppercase text-[#2d341a]/30">Sensaidaynekos Infinity Edition</p>
             <p className="text-[9px] font-bold text-[#2d341a]/20 mt-2">BUILD 16.0.240626 - SMOOTHNESS INFINITY %</p>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-4 bg-[#2d341a] text-[#c4d19e] hover:scale-110 rounded-full shadow-2xl border border-white/10 transition-all active:scale-90 hidden lg:block"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12"></path></svg>
        </button>
      </main>
    </div>
  );
};

export default SettingsApp;