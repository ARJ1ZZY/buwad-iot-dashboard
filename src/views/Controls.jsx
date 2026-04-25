import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Controls = ({ dryingMode, onDryingModeToggle, onManualOverride, t }) => {
  const [isOverriding, setIsOverriding] = useState(false);
  const [localDryingMode, setLocalDryingMode] = useState(dryingMode);

  const handleDryingClick = async (mode) => {
    setLocalDryingMode(mode);
    await onDryingModeToggle(mode);
  };

  const handleManualOverrideClick = async () => {
    setIsOverriding(true);
    await onManualOverride();
    setIsOverriding(false);
  };

  return (
    <div>
      <div className="mb-6">
        <div className="text-[10px] font-bold text-[#4A5568] dark:text-[#94A3B8] tracking-[0.1em] mb-3">
          {t('dryingParameters')}
        </div>
        <div className="relative grid grid-cols-2 gap-2 bg-gray-100 dark:bg-white/5 p-1 rounded-xl">
          <motion.button
            onClick={() => handleDryingClick('danggit')}
            className={`relative z-10 py-3.5 text-center font-black tracking-wide text-sm rounded-lg transition-all duration-300 ${
              localDryingMode === 'danggit' 
                ? 'text-white' 
                : 'text-[#00386D] dark:text-[#F7FAFC]'
            }`}
            whileTap={{ scale: 0.95 }}
            whileHover={{ y: -1 }}
          >
            {t('danggit')}
          </motion.button>
          <motion.button
            onClick={() => handleDryingClick('bolinao')}
            className={`relative z-10 py-3.5 text-center font-black tracking-wide text-sm rounded-lg transition-all duration-300 ${
              localDryingMode === 'bolinao' 
                ? 'text-white' 
                : 'text-[#00386D] dark:text-[#F7FAFC]'
            }`}
            whileTap={{ scale: 0.95 }}
            whileHover={{ y: -1 }}
          >
            {t('bolinao')}
          </motion.button>
          <motion.div
            className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#6699CC] rounded-lg"
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            style={{
              left: localDryingMode === 'danggit' ? '4px' : 'calc(50% + 4px)',
            }}
          />
        </div>
        <div className="mt-2.5 text-center">
          <div className="text-[9px] font-black text-[#4A5568] dark:text-[#94A3B8] tracking-[0.05em]">
            {localDryingMode === 'danggit' ? t('rabbitfishThickFillet') : t('anchoviesSmallMass')}
          </div>
        </div>
      </div>

      <div>
        <div className="text-[10px] font-bold text-[#4A5568] dark:text-[#94A3B8] tracking-[0.1em] mb-3">
          {t('flipMechanism')}
        </div>
        <motion.button
          onClick={handleManualOverrideClick}
          className="w-full py-5 font-black text-base tracking-wide rounded-xl transition-all duration-300 bg-[#6699CC] text-white relative overflow-hidden"
          whileTap={{ scale: 0.95 }}
          whileHover={{ y: -1 }}
          disabled={isOverriding}
        >
          {isOverriding ? (
            <motion.div
              className="absolute inset-0 bg-white/20"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
          ) : null}
          <span className="relative z-10">
            {isOverriding ? 'WAIT...' : t('manualOverride')}
          </span>
        </motion.button>
        <div className="text-center text-[9px] font-bold text-[#4A5568] dark:text-[#94A3B8] tracking-[0.1em] mt-2.5">
          {t('triggersImmediateFlip')}
        </div>
      </div>
    </div>
  );
};

export default Controls;