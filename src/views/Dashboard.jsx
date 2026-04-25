import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Dashboard = ({ sensorData, systemState, sunlightLabel, formatCountdown, t }) => {
  const [pulseFields, setPulseFields] = useState({});

  useEffect(() => {
    const fields = ['temperature', 'humidity', 'sunlight', 'rainDetected'];
    fields.forEach(field => {
      setPulseFields(prev => ({ ...prev, [field]: true }));
      setTimeout(() => {
        setPulseFields(prev => ({ ...prev, [field]: false }));
      }, 300);
    });
  }, [sensorData]);

  const getPulseClass = (field) => {
    return pulseFields[field] ? 'sensor-pulse' : '';
  };

  return (
    <div>
      {/* Rain Alert Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-xl mb-6 overflow-hidden border transition-colors duration-300 ${
          sensorData.rainDetected 
            ? 'border-[#6699CC]/50 bg-[#6699CC]/10 dark:bg-[#6699CC]/20' 
            : 'border-[#BDBCBD] dark:border-white/10 bg-white dark:bg-[#1A202C]/80'
        }`}
      >
        <div className="px-4 py-3">
          <div className="flex justify-between items-center">
            <span className={`text-xs font-black tracking-wide transition-colors duration-300 ${
              sensorData.rainDetected ? 'text-[#6699CC]' : 'text-[#00386D] dark:text-[#F7FAFC]'
            }`}>
              {t('rainDetected')}
            </span>
            <span className="text-xs font-black text-[#6699CC]">{t('enclosureSecured')}</span>
          </div>
        </div>
      </motion.div>

      {/* Environmental Data Label */}
      <div className="text-[10px] font-bold text-[#4A5568] dark:text-[#94A3B8] tracking-[0.1em] mb-3">
        {t('environmentalData')}
      </div>
      
      {/* 2x2 Grid - Adjusted padding */}
      <div className="rounded-xl overflow-hidden border border-[#BDBCBD] dark:border-white/10 bg-white dark:bg-[#1A202C]/80 transition-colors duration-300 mb-6">
        <div className="grid grid-cols-2">
          <div className={`px-4 py-4 border-r border-b border-[#BDBCBD] dark:border-white/10 ${getPulseClass('temperature')}`}>
            <div className="text-[9px] font-bold text-[#4A5568] dark:text-[#94A3B8] tracking-[0.1em] mb-1.5">
              {t('temperature')}
            </div>
            <div className="text-2xl font-black text-[#00386D] dark:text-[#F7FAFC] tracking-tight transition-colors duration-300" style={{ fontFamily: 'Space Grotesk' }}>
              {sensorData.temperature.toFixed(1)}<span className="text-xs ml-0.5 text-[#4A5568] dark:text-[#94A3B8]">°C</span>
            </div>
          </div>
          <div className={`px-4 py-4 border-b border-[#BDBCBD] dark:border-white/10 ${getPulseClass('humidity')}`}>
            <div className="text-[9px] font-bold text-[#4A5568] dark:text-[#94A3B8] tracking-[0.1em] mb-1.5">
              {t('humidity')}
            </div>
            <div className="text-2xl font-black text-[#00386D] dark:text-[#F7FAFC] tracking-tight transition-colors duration-300" style={{ fontFamily: 'Space Grotesk' }}>
              {Math.floor(sensorData.humidity)}<span className="text-xs ml-0.5 text-[#4A5568] dark:text-[#94A3B8]">%</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className={`px-4 py-4 border-r border-[#BDBCBD] dark:border-white/10 ${getPulseClass('sunlight')}`}>
            <div className="text-[9px] font-bold text-[#4A5568] dark:text-[#94A3B8] tracking-[0.1em] mb-1.5">
              {t('sunlight')}
            </div>
            <div className="text-xl font-black text-[#00386D] dark:text-[#F7FAFC] tracking-tight transition-colors duration-300" style={{ fontFamily: 'Space Grotesk' }}>
              {sunlightLabel}
            </div>
          </div>
          <div className={`px-4 py-4 ${getPulseClass('rainDetected')}`}>
            <div className="text-[9px] font-bold text-[#4A5568] dark:text-[#94A3B8] tracking-[0.1em] mb-1.5">
              {t('rainSensor')}
            </div>
            <div className={`text-xl font-black tracking-tight transition-colors duration-300 ${
              sensorData.rainDetected ? 'text-[#6699CC]' : 'text-[#00386D] dark:text-[#F7FAFC]'
            }`} style={{ fontFamily: 'Space Grotesk' }}>
              {sensorData.rainDetected ? 'WET' : 'DRY'}
            </div>
          </div>
        </div>
      </div>

      {/* System State Card */}
      <div className="rounded-xl p-4 mb-4 bg-white dark:bg-[#1A202C]/80 border border-[#BDBCBD] dark:border-white/10 transition-colors duration-300">
        <div className="text-[9px] font-bold text-[#4A5568] dark:text-[#94A3B8] tracking-[0.1em] mb-1.5">
          {t('systemState')}
        </div>
        <div className="text-base font-black text-[#00386D] dark:text-[#F7FAFC] tracking-tight transition-colors duration-300" style={{ fontFamily: 'Space Grotesk' }}>
          {t('phase2ActiveFlipping')}
        </div>
      </div>

      {/* Scheduler Grid */}
      <div className="grid grid-cols-2 rounded-xl overflow-hidden border border-[#BDBCBD] dark:border-white/10 bg-white dark:bg-[#1A202C]/80 transition-colors duration-300">
        <div className="px-4 py-4 border-r border-[#BDBCBD] dark:border-white/10">
          <div className="text-[9px] font-bold text-[#4A5568] dark:text-[#94A3B8] tracking-[0.1em] mb-1.5">
            {t('scheduler')}
          </div>
          <div className="text-xs font-black text-[#00386D] dark:text-[#F7FAFC]">{t('status')}</div>
        </div>
        <div className="px-4 py-4">
          <div className="text-[9px] font-bold text-[#4A5568] dark:text-[#94A3B8] tracking-[0.1em] mb-1.5">
            {t('nextFlip')}
          </div>
          <div className="text-2xl font-black text-[#00386D] dark:text-[#F7FAFC] tracking-tight transition-colors duration-300" style={{ fontFamily: 'Space Grotesk' }}>
            {formatCountdown(systemState.nextFlip)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;