
import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Lock, Delete, Shield, CloudSun } from 'lucide-react';

interface LockScreenProps {
  onUnlock: () => void;
  time: Date;
}

const LockScreen: React.FC<LockScreenProps> = ({ onUnlock, time }) => {
  const [pin, setPin] = useState<string>('');
  const [error, setError] = useState(false);
  const controls = useAnimation();

  const handleKeyPress = (val: string) => {
    if (pin.length < 4) {
      const newPin = pin + val;
      setPin(newPin);
      if (newPin.length === 4) {
        if (newPin === '0000') {
          onUnlock();
        } else {
          setError(true);
          controls.start({
            x: [-10, 10, -10, 10, 0],
            transition: { duration: 0.4 }
          });
          setTimeout(() => {
            setPin('');
            setError(false);
          }, 600);
        }
      }
    }
  };

  const hour = time.toLocaleTimeString('en-US', { hour: '2-digit', hour12: false }).split(':')[0];
  const minute = time.toLocaleTimeString('en-US', { minute: '2-digit' });

  return (
    <div className="relative w-full h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between px-12 lg:px-40">
      
      {/* Left Side: Large Reference Clock Layout */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col text-white z-10"
      >
        <div className="mb-4 flex flex-col">
          <span className="text-2xl font-medium opacity-90">
            {time.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'long' })}
          </span>
          <div className="flex items-center gap-2 opacity-80">
            <CloudSun size={20} className="text-yellow-400" />
            <span className="text-lg">17°C</span>
          </div>
        </div>
        
        <div className="flex flex-col leading-[0.8] tracking-tighter">
          <motion.span 
            className="text-[14rem] md:text-[20rem] font-light text-blue-200/90"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            {hour}
          </motion.span>
          <motion.span 
            className="text-[14rem] md:text-[20rem] font-light text-yellow-100/80"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
          >
            {minute}
          </motion.span>
        </div>
      </motion.div>

      {/* Right Side: Passcode Input */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full max-w-sm flex flex-col items-center mt-12 lg:mt-0"
      >
        <div className="bg-black/20 backdrop-blur-2xl p-10 rounded-[3rem] border border-white/10 w-full shadow-2xl">
          <motion.div 
            animate={controls}
            className="flex gap-6 justify-center mb-12"
          >
            {[0, 1, 2, 3].map((i) => (
              <div 
                key={i} 
                className={`w-5 h-5 rounded-full border-2 border-white/30 transition-all duration-300 ${
                  pin.length > i ? (error ? 'bg-red-500 border-red-500 scale-125' : 'bg-white border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.8)]') : ''
                }`}
              />
            ))}
          </motion.div>

          <div className="grid grid-cols-3 gap-6 w-full">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'delete'].map((val, idx) => (
              <div key={idx} className="flex justify-center">
                {val === 'delete' ? (
                  <button 
                    onClick={() => setPin(pin.slice(0, -1))}
                    className="w-16 h-16 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                  >
                    <Delete size={24} />
                  </button>
                ) : val === '' ? (
                  <div className="w-16 h-16" />
                ) : (
                  <button
                    onClick={() => handleKeyPress(val)}
                    className="w-16 h-16 rounded-full bg-white/5 hover:bg-white/20 text-white text-2xl font-light transition-all active:scale-90 flex items-center justify-center backdrop-blur-xl border border-white/10"
                  >
                    {val}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-white/40 text-xs font-bold flex items-center gap-2 tracking-[0.2em] uppercase">
          <Lock size={14} /> Enter 0000 to unlock
        </div>
      </motion.div>

      {/* Bottom Icons - iPhone Style */}
      <div className="absolute bottom-12 left-0 right-0 px-12 flex justify-between items-center opacity-60">
         <div className="w-14 h-14 bg-black/40 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/10">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>
         </div>
         <div className="w-14 h-14 bg-black/40 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/10">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
         </div>
      </div>
    </div>
  );
};

export default LockScreen;
