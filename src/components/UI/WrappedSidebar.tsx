import React from "react";
import { normalizeUsername } from "@/lib/utils";

interface WrappedSidebarProps {
  username: string;
  onBackClick: () => void;
}

const WrappedSidebar: React.FC<WrappedSidebarProps> = ({
  username,
  onBackClick,
}) => {
  return (
    <div className="bg-white/5 rounded-2xl p-4 sm:p-6 sticky top-6 border border-white/5 shrink-0">
      <div className="flex flex-col justify-between items-center mb-4">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-100 text-center">
          @{normalizeUsername(username)}`s
        </h2>
        <h3 className="text-sm sm:text-base text-white/80">GitHub Wrapped</h3>
        <button
          onClick={onBackClick}
          className="mt-4 px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm text-white hover:text-white/50 bg-white/10 transition rounded-lg"
        >
          ← Change User
        </button>
      </div>
    </div>
  );
};

export default WrappedSidebar;
