
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OSState, AppID } from './types';
import StatusBar from './components/StatusBar';
import LockScreen from './components/LockScreen';
import HomeScreen from './components/HomeScreen';
import SettingsApp from './components/SettingsApp';
import AIChatAssistant from './components/AIChatAssistant';
import CameraApp from './components/CameraApp';
import BrowserApp from './components/BrowserApp';
import AppWindow from './components/AppWindow';
import Taskbar from './components/Taskbar';
import ControlCenter from './components/ControlCenter';

const iosSpring = { type: 'spring', damping: 30, stiffness: 300, mass: 0.8 };
const fullscreenTransition = { type: 'spring', damping: 35, stiffness: 300, mass: 1 };

const App: React.FC = () => {
  const [osState, setOsState] = useState<OSState>(OSState.LOCKED);
  const [openApps, setOpenApps] = useState<AppID[]>([]);
  const [focusedApp, setFocusedApp] = useState<AppID | null>(null);
  const [isDesktopMode, setIsDesktopMode] = useState(false); 
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleUnlock = () => setOsState(OSState.HOME);
  
  const openApp = (id: AppID) => {
    if (!openApps.includes(id)) {
      setOpenApps([...openApps, id]);
    }
    setFocusedApp(id);
    if (!isDesktopMode) {
      setOsState(OSState.APP);
    }
    setIsControlCenterOpen(false);
    setIsStartMenuOpen(false);
  };

  const closeApp = (id: AppID) => {
    const nextApps = openApps.filter(a => a !== id);
    setOpenApps(nextApps);
    if (focusedApp === id) {
      setFocusedApp(nextApps.length > 0 ? nextApps[nextApps.length - 1] : null);
    }
    if (!isDesktopMode) {
      setOsState(OSState.HOME);
    }
  };

  const toggleDesktopMode = () => {
    setIsDesktopMode(!isDesktopMode);
    setOpenApps([]);
    setFocusedApp(null);
    setOsState(OSState.HOME);
    setIsControlCenterOpen(false);
    setIsStartMenuOpen(false);
  };

  return (
    <div className="relative w-full h-screen bg-[#1c1c1c] overflow-hidden font-sans select-none">
      
      <motion.div 
        animate={{ 
          scale: osState === OSState.LOCKED ? 1.1 : 1,
          filter: (osState === OSState.APP || isControlCenterOpen || isStartMenuOpen) ? 'blur(60px) brightness(0.4)' : 'blur(0px) brightness(1)'
        }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 -z-10 origin-center"
      >
        <img 
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop" 
          className="w-full h-full object-cover"
          alt="Wallpaper"
        />
        {!isDesktopMode && <div className="absolute inset-0 bg-black/40" />}
      </motion.div>

      {/* Trình kích hoạt Control Center trên Mobile */}
      {!isDesktopMode && osState !== OSState.LOCKED && (
        <div 
          onClick={() => setIsControlCenterOpen(true)}
          className="absolute top-0 left-0 right-0 h-10 z-[110] cursor-pointer active:bg-white/5 transition-colors"
        >
          <StatusBar time={currentTime} />
        </div>
      )}

      <AnimatePresence mode="wait">
        {osState === OSState.LOCKED && (
          <motion.div
            key="lock"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ y: '-100%', opacity: 0, filter: 'blur(20px)' }}
            transition={iosSpring}
            className="absolute inset-0 z-[200]"
          >
            <LockScreen onUnlock={handleUnlock} time={currentTime} />
          </motion.div>
        )}

        {osState === OSState.HOME && (
          <motion.div
            key="home"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={iosSpring}
            className="absolute inset-0 z-10"
          >
            <HomeScreen 
              onOpenApp={openApp} 
              isDesktopMode={isDesktopMode} 
              onToggleDesktop={toggleDesktopMode}
              isDrawerOpen={isStartMenuOpen}
            />
          </motion.div>
        )}

        {!isDesktopMode && osState === OSState.APP && focusedApp && (
          <motion.div
            key={`mobile-app-${focusedApp}`}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={fullscreenTransition}
            className="absolute inset-0 z-[100] bg-black"
          >
            <div className="w-full h-full pt-10 relative">
              {focusedApp === 'settings' && <SettingsApp onClose={() => closeApp('settings')} />}
              {focusedApp === 'ai' && <AIChatAssistant onClose={() => closeApp('ai')} />}
              {focusedApp === 'camera' && <CameraApp onClose={() => closeApp('camera')} />}
              {focusedApp === 'browser' && <BrowserApp onClose={() => closeApp('browser')} />}
              
              <motion.div 
                onClick={() => setOsState(OSState.HOME)}
                whileTap={{ scale: 0.9, opacity: 0.5 }}
                className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-white/30 rounded-full cursor-pointer hover:bg-white/50 transition-colors z-[110]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isDesktopMode && osState !== OSState.LOCKED && (
        <>
          <AnimatePresence>
            {openApps.map((id) => (
              <AppWindow 
                key={id} 
                id={id} 
                isFocused={focusedApp === id}
                onFocus={() => setFocusedApp(id)}
                onClose={() => closeApp(id)}
              >
                {id === 'settings' && <SettingsApp onClose={() => closeApp('settings')} />}
                {id === 'ai' && <AIChatAssistant onClose={() => closeApp('ai')} />}
                {id === 'camera' && <CameraApp onClose={() => closeApp('camera')} />}
                {id === 'browser' && <BrowserApp onClose={() => closeApp('browser')} />}
              </AppWindow>
            ))}
          </AnimatePresence>

          <Taskbar 
            openApps={openApps}
            focusedApp={focusedApp} 
            onOpenApp={openApp} 
            time={currentTime} 
            onToggleDesktop={toggleDesktopMode}
            onToggleStart={() => setIsStartMenuOpen(!isStartMenuOpen)}
            onToggleControlCenter={() => setIsControlCenterOpen(!isControlCenterOpen)}
          />
        </>
      )}

      <AnimatePresence>
        {isControlCenterOpen && (
          <ControlCenter 
            isDesktop={isDesktopMode} 
            onClose={() => setIsControlCenterOpen(false)} 
            onOpenSettings={() => openApp('settings')}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
