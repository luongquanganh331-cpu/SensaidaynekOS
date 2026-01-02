
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, RotateCw, Home, Search, 
  ShieldCheck, MoreVertical, Bookmark, Share2
} from 'lucide-react';

interface BrowserAppProps {
  onClose: () => void;
}

const BrowserApp: React.FC<BrowserAppProps> = ({ onClose }) => {
  const [url, setUrl] = useState('https://www.bing.com');
  const [currentUrl, setCurrentUrl] = useState('https://www.bing.com');
  const [history, setHistory] = useState<string[]>(['https://www.bing.com']);
  const [loading, setLoading] = useState(false);

  const handleGo = (e: React.FormEvent) => {
    e.preventDefault();
    let target = url;
    if (!target.startsWith('http')) {
      target = `https://www.google.com/search?q=${encodeURIComponent(target)}`;
    }
    setLoading(true);
    setCurrentUrl(target);
    setUrl(target);
  };

  return (
    <div className="w-full h-full bg-[#f8f9fa] flex flex-col text-zinc-900 font-sans">
      {/* Browser Header */}
      <header className="bg-white border-b border-zinc-200 px-4 py-3 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-zinc-100 rounded-full transition-colors"><ArrowLeft size={18} className="text-zinc-400" /></button>
          <button className="p-2 hover:bg-zinc-100 rounded-full transition-colors"><ArrowRight size={18} className="text-zinc-400" /></button>
          <button onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 1000); }} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
            <RotateCw size={18} className={`text-zinc-400 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <form onSubmit={handleGo} className="flex-1 relative flex items-center">
          <div className="absolute left-4 text-emerald-600"><ShieldCheck size={16} /></div>
          <input 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full bg-zinc-100 h-10 rounded-full pl-10 pr-12 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none transition-all border border-transparent"
          />
          <div className="absolute right-4 flex gap-3 text-zinc-400">
            <Bookmark size={16} />
            <Share2 size={16} />
          </div>
        </form>

        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-zinc-100 rounded-full"><MoreVertical size={20} className="text-zinc-600" /></button>
          <button onClick={onClose} className="bg-zinc-900 text-white px-4 py-2 rounded-xl text-sm font-bold ml-2">X</button>
        </div>
      </header>

      {/* Main Viewport */}
      <div className="flex-1 bg-white relative">
        {loading && (
          <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 animate-pulse z-20" />
        )}
        <iframe 
          src={currentUrl} 
          className="w-full h-full border-none"
          onLoad={() => setLoading(false)}
          title="Browser Viewport"
        />
      </div>

      {/* Bottom Bar Mobile Style */}
      <div className="lg:hidden h-14 bg-white border-t border-zinc-200 flex items-center justify-around px-8">
        <Home size={22} className="text-zinc-400" />
        <div className="w-10 h-10 bg-zinc-100 rounded-xl flex items-center justify-center"><Search size={22} className="text-zinc-900" /></div>
        <div className="w-6 h-6 border-2 border-zinc-400 rounded-lg flex items-center justify-center text-[10px] font-bold text-zinc-400">1</div>
      </div>
    </div>
  );
};

export default BrowserApp;
