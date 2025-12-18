import React from "react";
import { normalizeUsername } from "@/lib/utils";

interface FixedSidebarProps {
  username: string;
  onBackClick: () => void;
}

const FixedSidebar: React.FC<FixedSidebarProps> = ({
  username,
  onBackClick,
}) => {
  return (
    <div className="fixed left-4 top-4 z-50 bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/20 w-64 shadow-lg max-w-xs">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white/80">GitHub Wrapped</h2>
          <button
            onClick={onBackClick}
            className="text-white/80 hover:text-white transition-colors"
          >
            ←
          </button>
        </div>

        <div>
          <h3 className="text-md font-semibold text-white/90 text-center">
            @{normalizeUsername(username)}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default FixedSidebar;