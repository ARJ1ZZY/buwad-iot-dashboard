import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Alerts = ({ alerts, rainDetected, t }) => {
  const [dismissedAlerts, setDismissedAlerts] = useState([]);

  const handleDismiss = (alertId) => {
    setDismissedAlerts(prev => [...prev, alertId]);
  };

  const criticalAlerts = [
    {
      id: 'rain-critical',
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      message: t('rainDetected'),
      status: t('enclosureSecured'),
      type: 'critical',
      priority: 'HIGH'
    },
    ...alerts.filter(a => !dismissedAlerts.includes(a.id))
  ].slice(0, 15);

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'HIGH': return 'text-red-500 dark:text-red-400';
      case 'MEDIUM': return 'text-yellow-500 dark:text-yellow-400';
      default: return 'text-blue-500 dark:text-blue-400';
    }
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-baseline mb-3">
          <div className="text-[10px] font-bold text-[#4A5568] dark:text-[#94A3B8] tracking-[0.1em]">
            {t('criticalNotifications')}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[8px] font-bold text-[#4A5568] dark:text-[#94A3B8]">
              {criticalAlerts.length} {t('active')}
            </span>
          </div>
        </div>
        
        <div className="space-y-3">
          <AnimatePresence>
            {criticalAlerts.map((alert, index) => (
              <motion.div
                key={alert.id || index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-xl overflow-hidden border border-[#BDBCBD] dark:border-white/10 bg-white dark:bg-[#1A202C]/80 transition-colors duration-300"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold ${getPriorityColor(alert.priority || 'MEDIUM')}`}>
                        {alert.priority || 'NORMAL'}
                      </span>
                      <span className="text-[10px] font-bold text-[#4A5568] dark:text-[#94A3B8] tracking-[0.1em]">
                        {alert.timestamp}
                      </span>
                    </div>
                    <motion.button
                      onClick={() => handleDismiss(alert.id)}
                      whileTap={{ scale: 0.95 }}
                      className="text-[10px] font-bold text-[#4A5568] dark:text-[#94A3B8] hover:text-red-500 transition-colors"
                    >
                      {t('dismiss')}
                    </motion.button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-black text-[#00386D] dark:text-[#F7FAFC] tracking-tight">
                        {alert.message}
                      </div>
                      {alert.details && (
                        <div className="text-[10px] font-bold text-[#4A5568] dark:text-[#94A3B8] mt-1">
                          {alert.details}
                        </div>
                      )}
                    </div>
                    <div className={`text-[10px] font-black px-2 py-1 rounded-lg ${
                      alert.status === t('enclosureSecured')
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                    }`}>
                      {alert.status}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {criticalAlerts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl border border-[#BDBCBD] dark:border-white/10 bg-white dark:bg-[#1A202C]/80 p-8 text-center transition-colors duration-300"
            >
              <div className="text-4xl font-black text-[#4A5568] dark:text-[#94A3B8] mb-3">—</div>
              <div className="text-sm font-black text-[#00386D] dark:text-[#F7FAFC]">{t('noActiveAlerts')}</div>
              <div className="text-[10px] font-bold text-[#4A5568] dark:text-[#94A3B8] tracking-[0.1em] mt-2">
                {t('allSystemsOperational')}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {dismissedAlerts.length > 0 && (
        <div>
          <div className="text-[10px] font-bold text-[#4A5568] dark:text-[#94A3B8] tracking-[0.1em] mb-3">
            DISMISSED ALERTS
          </div>
          <div className="space-y-2">
            {dismissedAlerts.slice(-5).map((alertId) => {
              const alert = alerts.find(a => a.id === alertId);
              if (!alert) return null;
              return (
                <div key={alertId} className="rounded-xl border border-[#BDBCBD] dark:border-white/10 bg-white/50 dark:bg-[#1A202C]/40 p-3 opacity-60 transition-colors duration-300">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-[#4A5568] dark:text-[#94A3B8]">{alert.timestamp}</span>
                    <span className="text-[10px] font-black text-green-600 dark:text-green-400">{t('resolved')}</span>
                  </div>
                  <div className="text-xs font-bold text-[#00386D] dark:text-[#F7FAFC] mt-1">{alert.message}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Alerts;