import React from "react";
import AnimatedCounter from "../AnimatedCounter";
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
    <div
      className={`bg-white/5 p-3 md:p-4 lg:p-6 rounded-lg ${borderClass} hover:scale-103 transition-transform duration-200 cursor-pointer`}
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
    </div>
  );
};

export default StatCard;
