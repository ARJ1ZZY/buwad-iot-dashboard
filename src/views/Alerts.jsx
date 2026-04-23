import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Alerts = ({ alerts, rainDetected }) => {
  const criticalAlerts = [
    {
      id: 'rain-critical',
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      message: 'RAIN PROTOCOL',
      status: 'ENCLOSURE SECURED',
      type: 'critical'
    },
    ...alerts
  ];

  return (
    <div>
      <div className="text-[10px] font-bold text-secondary tracking-[0.1em] mb-3">CRITICAL NOTIFICATIONS</div>
      
      <div className="rounded-2xl overflow-hidden border border-border card-light divide-y divide-border">
        <AnimatePresence>
          {criticalAlerts.slice(0, 12).map((alert, index) => (
            <motion.div
              key={alert.id || index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.05 }}
              className="p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-secondary tracking-[0.1em]">{alert.timestamp || 'NOW'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-black text-primary">{alert.message || 'RAIN DETECTED'}</span>
                <span className="text-[10px] font-black text-electric-blue tracking-wide">
                  {alert.status || 'ENCLOSURE SECURED'}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {criticalAlerts.length === 1 && !alerts.length && (
          <div className="p-6 text-center">
            <div className="text-sm font-black text-secondary">NO ACTIVE ALERTS</div>
            <div className="text-[10px] font-bold text-secondary tracking-[0.1em] mt-2">ALL SYSTEMS NOMINAL</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alerts;