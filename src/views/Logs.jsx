import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Logs = ({ activityLogs, t }) => {
  const [filter, setFilter] = useState('all');
  const [expandedLog, setExpandedLog] = useState(null);

  const filters = [
    { id: 'all', label: 'ALL' },
    { id: 'system', label: 'SYSTEM' },
    { id: 'manual', label: 'MANUAL' },
    { id: 'sensor', label: 'SENSOR' }
  ];

  const getLogType = (action) => {
    if (action.includes('MANUAL') || action.includes('FLIP') || action.includes('BALI')) return 'manual';
    if (action.includes('SENSOR') || action.includes('RAIN') || action.includes('TEMPERATURE') || action.includes('ULAN')) return 'sensor';
    return 'system';
  };

  const getTranslatedAction = (action) => {
    // Check if action contains specific keywords and return user-friendly version
    if (action.includes('MANUAL OVERRIDE') || action.includes('FLIP NOW') || action.includes('BALIHA DAYON')) {
      return t('manualOverride');
    }
    if (action.includes('RAIN PROTOCOL') || action.includes('RAIN DETECTED') || action.includes('NAKITA ANG ULAN')) {
      return 'RAIN ALERT';
    }
    if (action.includes('DRYING MODE') || action.includes('FISH PROFILE')) {
      return 'FISH TYPE CHANGED';
    }
    return action;
  };

  const filteredLogs = activityLogs.filter(log => {
    if (filter === 'all') return true;
    return getLogType(log.action) === filter;
  });

  const getTypeColor = (type) => {
    switch(type) {
      case 'manual': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      case 'sensor': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      default: return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400';
    }
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case 'manual': return t('manualOverride').toUpperCase();
      case 'sensor': return 'SENSOR';
      default: return 'SYSTEM';
    }
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex gap-2 mb-3">
          {filters.map((f) => (
            <motion.button
              key={f.id}
              onClick={() => setFilter(f.id)}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-[0.1em] transition-all ${
                filter === f.id
                  ? 'bg-[#00386D] dark:bg-[#6699CC] text-white'
                  : 'bg-white dark:bg-[#1A202C]/80 border border-[#BDBCBD] dark:border-white/10 text-[#4A5568] dark:text-[#94A3B8]'
              }`}
            >
              {f.label}
            </motion.button>
          ))}
        </div>
        <div className="flex justify-between items-baseline">
          <div className="text-[10px] font-bold text-[#4A5568] dark:text-[#94A3B8] tracking-[0.1em]">
            {t('activityFeed')}
          </div>
          <div className="text-[8px] font-bold text-[#4A5568] dark:text-[#94A3B8]">
            {filteredLogs.length} {t('entries')}
          </div>
        </div>
      </div>
      
      <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
        <AnimatePresence>
          {filteredLogs.map((log, index) => {
            const logType = getLogType(log.action);
            return (
              <motion.div
                key={log.id || index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.02, 0.3) }}
                className="rounded-xl border border-[#BDBCBD] dark:border-white/10 bg-white dark:bg-[#1A202C]/80 backdrop-blur-sm transition-colors duration-300 overflow-hidden"
              >
                <div 
                  className="p-4 cursor-pointer"
                  onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${getTypeColor(logType)}`}>
                        {getTypeLabel(logType)}
                      </span>
                      <span className="text-[10px] font-bold text-[#4A5568] dark:text-[#94A3B8] font-mono">
                        {log.timestamp}
                      </span>
                    </div>
                    <motion.button
                      animate={{ rotate: expandedLog === log.id ? 180 : 0 }}
                      className="text-[#4A5568] dark:text-[#94A3B8]"
                    >
                      ▼
                    </motion.button>
                  </div>
                  
                  <div className="text-sm font-black text-[#00386D] dark:text-[#F7FAFC] tracking-tight">
                    {getTranslatedAction(log.action)}
                  </div>
                  
                  <AnimatePresence>
                    {expandedLog === log.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 pt-3 border-t border-[#BDBCBD] dark:border-white/10"
                      >
                        <div className="text-[10px] font-bold text-[#4A5568] dark:text-[#94A3B8]">
                          {log.details || 'No additional details available'}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {filteredLogs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-xl border border-[#BDBCBD] dark:border-white/10 bg-white dark:bg-[#1A202C]/80 backdrop-blur-sm p-8 text-center"
          >
            <div className="text-4xl font-black text-[#4A5568] dark:text-[#94A3B8] mb-3">—</div>
            <div className="text-sm font-black text-[#00386D] dark:text-[#F7FAFC]">{t('noActivityRecorded')}</div>
            <div className="text-[10px] font-bold text-[#4A5568] dark:text-[#94A3B8] tracking-[0.1em] mt-2">
              {t('systemEventsWillAppear')}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Logs;