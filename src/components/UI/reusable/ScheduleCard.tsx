import React from 'react';
import { motion } from 'framer-motion';

interface ScheduleCardProps {
  title: string;
  time: string;
  timeLabel: string;
  personality: string;
  isLoading?: boolean;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  title,
  time,
  timeLabel,
  personality,
  isLoading = false
}) => {
  return (
    <motion.div
      className="lg:pr-4 bg-white/5 rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <h4 className="text-sm md:text-lg lg:text-xl font-semibold text-white/80 mb-2">
        {title}
      </h4>
      <div className="flex flex-wrap items-center justify-center gap-1 md:gap-2">
        <div className="text-base md:text-xl lg:text-2xl font-bold text-purple-600">
          {isLoading ? (
            <div className="h-6 w-24 bg-gray-700 rounded animate-pulse"></div>
          ) : (
            time
          )}
        </div>
        <span className="text-xs text-white/50 md:text-sm lg:text-base mx-1">
          {timeLabel}
        </span>
        <div className="text-lg lg:text-2xl">⏰</div>
      </div>
      <p className="mt-1 md:mt-2 text-xs md:text-sm lg:text-base text-white/50">
        You're a {personality} coder
      </p>
    </motion.div>
  );
};

export default ScheduleCard;