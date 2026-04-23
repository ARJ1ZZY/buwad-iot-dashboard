import React from 'react';
import { motion } from 'framer-motion';

const Logs = ({ activityLogs }) => {
  return (
    <div>
      <div className="text-[10px] font-bold text-secondary tracking-[0.1em] mb-3">ACTIVITY FEED</div>
      
      <div className="rounded-2xl overflow-hidden border border-border card-light divide-y divide-border max-h-[60vh] overflow-y-auto">
        {activityLogs.map((log, index) => (
          <motion.div
            key={log.id || index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.02 }}
            className="p-4"
          >
            <div className="text-[10px] font-bold text-secondary tracking-[0.1em] mb-2">{log.timestamp}</div>
            <div className="text-sm font-black text-primary">{log.action}</div>
            <div className="text-[10px] font-bold text-secondary mt-1">{log.details}</div>
          </motion.div>
        ))}
        
        {activityLogs.length === 0 && (
          <div className="p-6 text-center">
            <div className="text-sm font-black text-secondary">NO ACTIVITY RECORDED</div>
            <div className="text-[10px] font-bold text-secondary tracking-[0.1em] mt-2">SYSTEM EVENTS WILL APPEAR HERE</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Logs;