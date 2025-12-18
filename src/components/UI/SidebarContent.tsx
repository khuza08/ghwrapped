import React from "react";
import { normalizeUsername } from "@/lib/utils";

interface SidebarContentProps {
  username: string;
  onBackClick: () => void;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  username,
  onBackClick,
}) => {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/20 w-64 shadow-lg max-w-xs">
      <div className="flex flex-col space-y-3">
        <div>
          <h3 className="text-md font-semibold text-white/90">
            @{normalizeUsername(username)}
          </h3>
        </div>

        <div>
          <h2 className="text-lg font-bold text-white/80">GitHub Wrapped</h2>
        </div>

        <button
          onClick={onBackClick}
          className="w-full py-2 px-4 bg-white/5 hover:bg-white/10 text-white/80 rounded-lg border border-white/20 transition"
        >
          ← Change User
        </button>
      </div>
    </div>
  );
};

export default SidebarContent;