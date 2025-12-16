'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedCounterProps {
  value: number | string;
  duration?: number;
  className?: string;
  suffix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  value, 
  duration = 1.5, 
  className = '', 
  suffix = '' 
}) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <motion.span
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 15,
          duration: duration
        }}
        className="inline-block"
      >
        {value}
        {suffix && <span className="text-sm align-super">{suffix}</span>}
      </motion.span>
    </motion.span>
  );
};

export default AnimatedCounter;