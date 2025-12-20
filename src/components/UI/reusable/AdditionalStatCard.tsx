import React from "react";

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
    <div
      className={`bg-white/5 p-4 md:p-6 rounded-xl ${borderClass} backdrop-blur-sm cursor-pointer hover:scale-103 transition-transform duration-200`}
    >
      <div className="text-lg md:text-xl font-semibold text-white/80 mb-2">
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
        <div className="text-sm md:text-base text-white/60 mt-1 truncate">
          {subtitle}
        </div>
      )}
    </div>
  );
};

export default AdditionalStatCard;
