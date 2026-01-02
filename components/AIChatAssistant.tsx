
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from '@google/genai';
import { Send, Cpu, X, Sparkles, MessageSquare, Bot } from 'lucide-react';

interface AIChatAssistantProps {
  onClose: () => void;
}

const AIChatAssistant: React.FC<AIChatAssistantProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([
    { role: 'ai', content: 'Chào bạn! Tôi là Sensaidaynekos AI. Tôi có thể giúp bạn tối ưu cài đặt hoặc trả lời bất cứ câu hỏi nào.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: 'Bạn là Sensaidaynekos AI, tích hợp sâu vào hệ điều hành Sensaidaynekos. Bạn có phong cách trẻ trung, hiện đại, trả lời thông minh và luôn ưu tiên trải nghiệm mượt mà của người dùng. Trả lời ngắn gọn, tinh tế bằng tiếng Việt.',
          temperature: 0.9,
        }
      });

      const aiText = response.text || 'Tôi gặp sự cố kết nối nhẹ, bạn thử lại nhé?';
      setMessages(prev => [...prev, { role: 'ai', content: aiText }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', content: 'Lỗi hệ thống. Vui lòng kiểm tra lại kết nối.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] text-white">
      <header className="p-10 flex items-center justify-between bg-black/40 backdrop-blur-3xl border-b border-white/5">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-[0_10px_30px_rgba(99,102,241,0.4)]">
            <Cpu size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight">Sensaidaynekos AI</h1>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-widest mt-1">
               <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" /> Neural Engine Active
            </div>
          </div>
        </div>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose} 
          className="p-4 bg-white/5 rounded-full border border-white/10"
        >
          <X size={24} />
        </motion.button>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar p-10 space-y-10 max-w-5xl mx-auto w-full">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start gap-4 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-zinc-800' : 'bg-indigo-900/40 border border-indigo-500/20'}`}>
                {msg.role === 'user' ? <MessageSquare size={18} /> : <Bot size={18} />}
              </div>
              <div className={`p-6 rounded-[2rem] shadow-2xl ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-zinc-900/60 backdrop-blur-xl text-zinc-100 rounded-tl-none border border-white/5'
              }`}>
                <p className="text-lg leading-relaxed font-medium">{msg.content}</p>
              </div>
            </div>
          </motion.div>
        ))}
        {loading && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex justify-start items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-indigo-900/20 flex items-center justify-center">
              <Sparkles size={18} className="text-indigo-400 animate-spin-slow" />
            </div>
            <div className="bg-zinc-900/40 p-6 rounded-[2rem] rounded-tl-none border border-white/5 flex gap-2">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0s'}} />
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}} />
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-10 pb-20 bg-gradient-to-t from-black via-black/80 to-transparent">
        <div className="max-w-4xl mx-auto w-full relative">
          <motion.div 
            className="relative flex items-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your question..."
              className="w-full bg-zinc-900/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] py-6 pl-8 pr-20 focus:outline-none focus:border-indigo-500/50 transition-all text-xl font-medium shadow-2xl"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="absolute right-3 p-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:bg-zinc-800 rounded-full transition-all active:scale-90 shadow-xl"
            >
              <Send size={24} />
            </button>
          </motion.div>
          <div className="mt-6 flex items-center justify-center gap-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">
            <div className="flex items-center gap-2"><Sparkles size={14} className="text-indigo-400" /> AI Suggested</div>
            <div className="w-1 h-1 bg-zinc-700 rounded-full" />
            <div className="flex items-center gap-2"><Cpu size={14} className="text-zinc-400" /> Sensaidaynekos Engine v3</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatAssistant;