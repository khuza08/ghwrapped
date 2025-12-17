import React from 'react';
import { motion } from 'framer-motion';

interface StreakCardProps {
  title: string;
  description: string;
  isLoading?: boolean;
}

const StreakCard: React.FC<StreakCardProps> = ({ 
  title, 
  description, 
  isLoading = false 
}) => {
  return (
    <motion.div
      className="bg-white/5 border-l-4 border-white/80 p-3 md:p-4 lg:p-6 rounded text-left text-xs md:text-sm lg:text-base"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h4 className="font-bold text-white/80">{title}</h4>
      <p className="text-white/50">{description}</p>
    </motion.div>
  );
};

export default StreakCard;