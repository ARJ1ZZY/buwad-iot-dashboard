import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Dashboard = ({ sensorData, systemState, sunlightLabel }) => {
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl mb-6 overflow-hidden border transition-colors duration-300 ${
          sensorData.rainDetected 
            ? 'border-[#6699CC]/50 bg-[#6699CC]/10 dark:bg-[#6699CC]/20' 
            : 'border-[#BDBCBD] dark:border-white/10 bg-white dark:bg-[#1A202C]/80 backdrop-blur-sm'
        }`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center">
            <span className={`text-sm font-black tracking-wide transition-colors duration-300 ${
              sensorData.rainDetected ? 'text-[#6699CC]' : 'text-[#00386D] dark:text-[#F7FAFC]'
            }`}>
              RAIN DETECTED
            </span>
            <span className="text-sm font-black text-[#6699CC]">ENCLOSURE SECURED</span>
          </div>
        </div>
      </motion.div>

      <div className="text-[10px] font-bold text-[#4A5568] dark:text-[#94A3B8] tracking-[0.1em] mb-3">ENVIRONMENTAL DATA</div>
      
      <div className="rounded-2xl overflow-hidden border border-[#BDBCBD] dark:border-white/10 bg-white dark:bg-[#1A202C]/80 backdrop-blur-sm transition-colors duration-300 mb-6">
        <div className="grid grid-cols-2">
          <div className={`p-5 border-r border-b border-[#BDBCBD] dark:border-white/10 ${getPulseClass('temperature')}`}>
            <div className="text-[10px] font-bold text-[#4A5568] dark:text-[#94A3B8] tracking-[0.1em] mb-2">TEMPERATURE</div>
            <div className="text-3xl font-black text-[#00386D] dark:text-[#F7FAFC] tracking-tight transition-colors duration-300" style={{ fontFamily: 'Space Grotesk' }}>
              {sensorData.temperature.toFixed(1)}<span className="text-sm ml-0.5 text-[#4A5568] dark:text-[#94A3B8]">°C</span>
            </div>
          </div>
          <div className={`p-5 border-b border-[#BDBCBD] dark:border-white/10 ${getPulseClass('humidity')}`}>
            <div className="text-[10px] font-bold text-[#4A5568] dark:text-[#94A3B8] tracking-[0.1em] mb-2">HUMIDITY</div>
            <div className="text-3xl font-black text-[#00386D] dark:text-[#F7FAFC] tracking-tight transition-colors duration-300" style={{ fontFamily: 'Space Grotesk' }}>
              {Math.floor(sensorData.humidity)}<span className="text-sm ml-0.5 text-[#4A5568] dark:text-[#94A3B8]">%</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className={`p-5 border-r border-[#BDBCBD] dark:border-white/10 ${getPulseClass('sunlight')}`}>
            <div className="text-[10px] font-bold text-[#4A5568] dark:text-[#94A3B8] tracking-[0.1em] mb-2">SUNLIGHT</div>
            <div className="text-2xl font-black text-[#00386D] dark:text-[#F7FAFC] tracking-tight transition-colors duration-300" style={{ fontFamily: 'Space Grotesk' }}>
              {sunlightLabel}
            </div>
          </div>
          <div className={`p-5 ${getPulseClass('rainDetected')}`}>
            <div className="text-[10px] font-bold text-[#4A5568] dark:text-[#94A3B8] tracking-[0.1em] mb-2">RAIN SENSOR</div>
            <div className={`text-2xl font-black tracking-tight transition-colors duration-300 ${
              sensorData.rainDetected ? 'text-[#6699CC]' : 'text-[#00386D] dark:text-[#F7FAFC]'
            }`} style={{ fontFamily: 'Space Grotesk' }}>
              {sensorData.rainDetected ? 'WET' : 'DRY'}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl p-5 mb-4 bg-white dark:bg-[#1A202C]/80 backdrop-blur-sm border border-[#BDBCBD] dark:border-white/10 transition-colors duration-300">
        <div className="text-[10px] font-bold text-[#4A5568] dark:text-[#94A3B8] tracking-[0.1em] mb-2">SYSTEM STATE</div>
        <div className="text-xl font-black text-[#00386D] dark:text-[#F7FAFC] tracking-tight transition-colors duration-300" style={{ fontFamily: 'Space Grotesk' }}>
          PHASE 2: ACTIVE FLIPPING
        </div>
      </div>

      <div className="grid grid-cols-2 rounded-2xl overflow-hidden border border-[#BDBCBD] dark:border-white/10 bg-white dark:bg-[#1A202C]/80 backdrop-blur-sm transition-colors duration-300">
        <div className="p-5 border-r border-[#BDBCBD] dark:border-white/10">
          <div className="text-[10px] font-bold text-[#4A5568] dark:text-[#94A3B8] tracking-[0.1em] mb-2">SCHEDULER</div>
          <div className="text-sm font-black text-[#00386D] dark:text-[#F7FAFC]">STATUS</div>
        </div>
        <div className="p-5">
          <div className="text-[10px] font-bold text-[#4A5568] dark:text-[#94A3B8] tracking-[0.1em] mb-2">NEXT FLIP</div>
          <div className="text-3xl font-black text-[#00386D] dark:text-[#F7FAFC] tracking-tight transition-colors duration-300" style={{ fontFamily: 'Space Grotesk' }}>
            {systemState.nextFlip}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;