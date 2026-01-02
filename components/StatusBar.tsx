
import React from 'react';
import { Wifi, Battery, Signal, BellOff } from 'lucide-react';

interface StatusBarProps {
  time: Date;
  isLarge?: boolean;
}

const StatusBar: React.FC<StatusBarProps> = ({ time, isLarge }) => {
  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  });

  const formattedDate = time.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className={`absolute top-0 left-0 right-0 h-10 flex items-center justify-between px-6 z-[90] text-white/90 font-medium text-sm transition-all`}>
      <div className="flex items-center gap-4">
        <span>{formattedTime}</span>
        {isLarge && <span className="opacity-60 text-xs">|</span>}
        {isLarge && <span className="opacity-80">{formattedDate}</span>}
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 bg-black/20 px-3 py-1 rounded-full backdrop-blur-md border border-white/5">
          <BellOff size={14} className="opacity-60" />
          <Signal size={16} />
          <Wifi size={16} />
          <div className="flex items-center gap-1.5 ml-1">
            <span className="text-[11px] font-bold">84%</span>
            <Battery size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
