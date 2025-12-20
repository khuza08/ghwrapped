import React from "react";
import { motion } from "framer-motion";

interface AdditionalStatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  isLoading?: boolean;
  hasBorder?: boolean;
}

const AdditionalStatCard: React.FC<AdditionalStatCardProps> = ({
  title,
  value,
  subtitle,
  isLoading = false,
  hasBorder = true,
}) => {
  const borderClass = hasBorder ? "border border-white/20" : "";

  return (
    <motion.div
      className={`bg-white/5 p-4 md:p-6 rounded-xl ${borderClass} backdrop-blur-sm cursor-pointer`}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="text-lg md:text-xl font-semibold text-white/50 mb-2">
        {title}
      </div>
      <div className="text-xl md:text-2xl font-bold text-white">
        {isLoading ? (
          <div className="h-8 w-20 bg-white/10 rounded animate-pulse"></div>
        ) : (
          value
        )}
      </div>
      {subtitle && (
        <div className="text-sm md:text-base text-white/50 mt-1 truncate">
          {subtitle}
        </div>
      )}
    </motion.div>
  );
};

export default AdditionalStatCard;
