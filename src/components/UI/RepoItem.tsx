import React from "react";
import { formatNumber } from "@/lib/utils";

interface RepoItemProps {
  name: string;
  count: number;
  type: "stars" | "forks";
}

const RepoItem: React.FC<RepoItemProps> = ({ name, count, type }) => {
  return (
    <div className="flex justify-between items-center p-2 bg-white/5 border border-white/20 rounded text-xs md:text-sm lg:text-base">
      <div>
        <div className="font-medium text-gray-200">{name}</div>
      </div>
      <div className="flex items-center">
        {type === "stars" ? (
          <>
            <span className="text-yellow-400 mr-1">★</span>
            <span className="font-semibold text-white/80">
              {formatNumber(count)}
            </span>
          </>
        ) : (
          <>
            <span className="text-blue-400 mr-1">⎇</span>
            <span className="font-semibold text-gray-200">
              {formatNumber(count)}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default RepoItem;
