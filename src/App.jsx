import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { database } from './firebase';
import { ref, onValue, update, push } from 'firebase/database';
import Dashboard from './views/Dashboard';
import Controls from './views/Controls';
import Alerts from './views/Alerts';
import Logs from './views/Logs';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [sensorData, setSensorData] = useState({
    temperature: 32.4,
    humidity: 65,
    sunlight: 78,
    rainDetected: false
  });
  
  const [systemState, setSystemState] = useState({
    phase: 'activeflipping',
    nextFlip: '14:20',
    isPaused: false,
    manualOverride: false,
    dryingMode: 'danggit'
  });
  
  const [alerts, setAlerts] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const [toast, setToast] = useState(null);

  // Apply dark mode class to html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2000);
  };

  useEffect(() => {
    const sensorsRef = ref(database, 'sensors');
    const systemRef = ref(database, 'system');
    const alertsRef = ref(database, 'alerts');
    const logsRef = ref(database, 'logs');
    
    const unsubscribeSensors = onValue(sensorsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const previousRainState = sensorData.rainDetected;
        setSensorData({
          temperature: data.temperature || 32.4,
          humidity: data.humidity || 65,
          sunlight: data.sunlight || 78,
          rainDetected: data.rainDetected || false
        });
        setIsConnected(true);
        
        if (data.rainDetected && !previousRainState) {
          const newAlert = {
            id: Date.now(),
            timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
            message: 'RAIN DETECTED',
            status: 'ENCLOSURE SECURED',
            type: 'critical'
          };
          setAlerts(prev => [newAlert, ...prev]);
          push(alertsRef, newAlert);
          
          const logEntry = {
            id: Date.now(),
            timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
            action: 'RAIN PROTOCOL ACTIVATED',
            details: 'Moisture detected - Enclosure secured'
          };
          setActivityLogs(prev => [logEntry, ...prev]);
          push(logsRef, logEntry);
        }
      } else {
        setIsConnected(false);
      }
    }, (error) => {
      console.error('Firebase connection error:', error);
      setIsConnected(false);
    });
    
    const unsubscribeSystem = onValue(systemRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSystemState({
          phase: data.phase || 'activeflipping',
          nextFlip: data.nextFlip || '14:20',
          isPaused: data.isPaused || false,
          manualOverride: data.manualOverride || false,
          dryingMode: data.dryingMode || 'danggit'
        });
      }
    });
    
    onValue(alertsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const alertsList = Object.values(data);
        setAlerts(alertsList.slice(-15).reverse());
      }
    });
    
    onValue(logsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const logsList = Object.values(data);
        setActivityLogs(logsList.slice(-25).reverse());
      }
    });
    
    return () => {
      unsubscribeSensors();
      unsubscribeSystem();
    };
  }, []);

  const handleManualOverride = async () => {
    const systemRef = ref(database, 'system');
    showToast('Sending command to ESP32...', 'loading');
    
    try {
      await update(systemRef, {
        manual_trigger: true,
        lastOverride: Date.now(),
        manualOverride: true
      });
      
      const logsRef = ref(database, 'logs');
      const logEntry = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
        action: 'MANUAL OVERRIDE',
        details: 'ESP32 flipping actuators triggered'
      };
      setActivityLogs(prev => [logEntry, ...prev]);
      await push(logsRef, logEntry);
      
      showToast('Command synced successfully', 'success');
      
      setTimeout(async () => {
        await update(systemRef, { manual_trigger: false, manualOverride: false });
      }, 3000);
    } catch (error) {
      showToast('Sync failed. Retrying...', 'error');
    }
  };
  
  const handleDryingModeToggle = async (mode) => {
    const systemRef = ref(database, 'system');
    setSystemState(prev => ({ ...prev, dryingMode: mode }));
    showToast(`Switching to ${mode === 'danggit' ? 'Danggit' : 'Bolinao'} mode...`, 'loading');
    
    try {
      await update(systemRef, { dryingMode: mode });
      
      const logsRef = ref(database, 'logs');
      const logEntry = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
        action: 'DRYING MODE CHANGED',
        details: `Switched to ${mode === 'danggit' ? 'Danggit (Rabbitfish)' : 'Bolinao (Anchovies)'}`
      };
      setActivityLogs(prev => [logEntry, ...prev]);
      await push(logsRef, logEntry);
      
      showToast('Mode updated successfully', 'success');
    } catch (error) {
      showToast('Sync failed', 'error');
      setSystemState(prev => ({ ...prev, dryingMode: mode === 'danggit' ? 'bolinao' : 'danggit' }));
    }
  };

  const getSunlightLabel = () => {
    if (sensorData.sunlight > 70) return 'INTENSE';
    if (sensorData.sunlight > 40) return 'MODERATE';
    return 'LOW';
  };

  const navItems = [
    { id: 'dashboard', label: 'DASHBOARD', icon: '▦' },
    { id: 'controls', label: 'CONTROLS', icon: '◷' },
    { id: 'alerts', label: 'ALERTS', icon: '◬' },
    { id: 'logs', label: 'LOGS', icon: '☰' }
  ];

  const tabContent = {
    dashboard: <Dashboard sensorData={sensorData} systemState={systemState} sunlightLabel={getSunlightLabel()} />,
    controls: <Controls dryingMode={systemState.dryingMode} onDryingModeToggle={handleDryingModeToggle} onManualOverride={handleManualOverride} />,
    alerts: <Alerts alerts={alerts} rainDetected={sensorData.rainDetected} />,
    logs: <Logs activityLogs={activityLogs} />
  };

  return (
    <div className="min-h-screen bg-[#E8EDF3] dark:bg-[#1A202C] transition-colors duration-300">
      <div className="max-w-md mx-auto min-h-screen flex flex-col pb-24">
        
        {/* Premium Stealth Header */}
        <header className="sticky top-0 z-20 px-5 pt-6 pb-4 border-b bg-[#E8EDF3]/95 dark:bg-[#1A202C]/95 backdrop-blur-md border-[#BDBCBD] dark:border-white/10 transition-colors duration-300">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black tracking-tight text-[#00386D] dark:text-[#F7FAFC] transition-colors duration-300" style={{ fontFamily: 'Space Grotesk' }}>
                BUWAD
              </h1>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}
              />
            </div>
            
            <motion.button
              onClick={() => setIsDarkMode(!isDarkMode)}
              whileTap={{ scale: 0.92 }}
              className="p-2 rounded-xl transition-all duration-300 hover:bg-[#00386D]/10 dark:hover:bg-[#6699CC]/20"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5 text-[#6699CC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-[#00386D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </motion.button>
          </div>
        </header>

        {/* Toast Notification */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl text-xs font-bold shadow-lg backdrop-blur-md bg-white/90 dark:bg-[#1A202C]/90 border border-[#BDBCBD] dark:border-white/10"
            >
              <span className={toast.type === 'success' ? 'text-green-600' : toast.type === 'error' ? 'text-red-600' : 'text-[#6699CC]'}>
                {toast.message}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 px-5 py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {tabContent[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Floating Navigation Rail */}
        <LayoutGroup>
          <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md rounded-2xl backdrop-blur-xl shadow-lg transition-colors duration-300 bg-white/80 dark:bg-[#1A202C]/80 border border-[#BDBCBD] dark:border-white/10">
            <div className="flex justify-around items-center p-2">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className="relative flex-1 py-3 flex flex-col items-center gap-1 rounded-xl"
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ y: -2 }}
                >
                  {activeTab === item.id && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-xl bg-[#00386D]/10 dark:bg-[#6699CC]/20"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span className={`text-lg relative z-10 transition-colors duration-300 ${
                    activeTab === item.id 
                      ? 'text-[#00386D] dark:text-[#6699CC]' 
                      : 'text-[#4A5568] dark:text-[#94A3B8]'
                  }`}>
                    {item.icon}
                  </span>
                  <span className={`text-[8px] font-bold tracking-[0.1em] relative z-10 transition-colors duration-300 ${
                    activeTab === item.id 
                      ? 'text-[#00386D] dark:text-[#6699CC]' 
                      : 'text-[#4A5568] dark:text-[#94A3B8]'
                  }`}>
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </nav>
        </LayoutGroup>
        
      </div>
    </div>
  );
}

export default App;