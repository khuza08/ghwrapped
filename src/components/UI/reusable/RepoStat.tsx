import React from "react";
import { formatNumber } from "@/lib/utils";

interface RepoStatProps {
  value: number;
  label: string;
  isLoading?: boolean;
}

const RepoStat: React.FC<RepoStatProps> = ({
  value,
  label,
  isLoading = false,
}) => {
  return (
    <div className="bg-white/5 border border-white/20 p-2 md:p-3 lg:p-4 rounded-lg">
      <div className="text-lg md:text-xl lg:text-2xl font-bold text-white/80">
        {isLoading ? (
          <div className="h-6 w-16 bg-white/5 rounded animate-pulse"></div>
        ) : (
          formatNumber(value)
        )}
      </div>
      <div className="text-xs md:text-sm lg:text-base text-white/50">
        {label}
      </div>
    </div>
  );
};

export default RepoStat;
