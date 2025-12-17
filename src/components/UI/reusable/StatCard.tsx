import React from "react";
import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";
import { formatNumber } from "@/lib/utils";

interface StatCardProps {
  value: number | string;
  label: string;
  subtitle?: string;
  isLoading?: boolean;
  hasBorder?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  subtitle,
  isLoading = false,
  hasBorder = true,
}) => {
  const borderClass = hasBorder ? "border border-white/20" : "";

  return (
    <motion.div
      className={`bg-white/5 p-3 md:p-4 lg:p-6 rounded-lg ${borderClass}`}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="text-xl md:text-2xl lg:text-3xl font-bold text-white/80">
        {isLoading ? (
          <div className="h-8 w-20 bg-white/5 rounded animate-pulse"></div>
        ) : (
          <AnimatedCounter
            value={typeof value === "number" ? formatNumber(value) : value}
          />
        )}
      </div>
      <div className="text-xs md:text-sm lg:text-base text-white/50">
        {label}
        {subtitle && (
          <div className="text-xs md:text-sm text-white/40 mt-1">
            {subtitle}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;
