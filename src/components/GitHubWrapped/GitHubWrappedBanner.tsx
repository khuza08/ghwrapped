import React from "react";
import { GitHubWrappedData } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

interface GitHubWrappedBannerProps {
  data: GitHubWrappedData;
}

const GitHubWrappedBanner: React.FC<GitHubWrappedBannerProps> = ({ data }) => {
  const { summary, user, commits, repositories, personality } = data;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {/* GitHub Wrapped Banner - with data-export-banner attribute for export function */}
      <div
        data-export-banner
        className="w-93.75 h-fit bg-white/5 rounded-xl overflow-hidden relative flex flex-col border-2 border-white/20"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-3 py-2 border-b border-white/20">
          <div className="text-sm font-bold text-white uppercase  tracking-tighter">
            #GITHUBUNWRAPPED
          </div>
          <div className="text-[8px] text-white/80 text-shadow:0 0 8px yellow-400 tracking-wider">
            {personality.title.toUpperCase()}
          </div>
        </div>

        {/* Avatar Section */}
        <div className="relative mx-4 my-3">
          <div className="relative border-2 border-white/20 overflow-hidden rounded-lg">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-full h-80 object-cover"
            />
          </div>

          {/* Username Badge */}
          <div className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 bg-white/5 backdrop-blur-xl border-2 border-white/20 rounded-lg px-4 py-1">
            <div className="text-[12px] font-bold text-white/80 text-center tracking-widest">
              @{user.login}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-1.5 mx-3 mb-2 mt-2">
          <div className="text-center p-2 bg-white/5 border border-white/20 rounded-lg">
            <div className="text-[18px] text-white/80">
              {formatNumber(summary.totalPullRequests || 0)}
            </div>
            <div className="text-[6px] text-white/80 mt-1 tracking-[0.5px]">
              PRs
            </div>
          </div>
          <div className="text-center p-2 bg-white/5 border border-white/20 rounded-lg">
            <div className="text-[18px] text-white/80">
              {formatNumber(summary.totalCommits || 0)}
            </div>
            <div className="text-[6px] text-white/80 mt-1 tracking-[0.5px]">
              COMMITS
            </div>
          </div>
          <div className="text-center p-2 bg-white/5 border border-white/20 rounded-lg">
            <div className="text-[18px] text-white/80">
              {formatNumber(summary.totalRepos || 0)}
            </div>
            <div className="text-[6px] text-white/80 mt-1 tracking-[0.5px]">
              REPOS
            </div>
          </div>
        </div>

        {/* Personality Card */}
        <div className="mx-3 mb-4 p-2.5 bg-white/5 border border-white/20 rounded-lg">
          <div className="text-center text-[12px] text-white/80 tracking-wider mb-1">
            {personality.title.toUpperCase()}
          </div>
          <div className="text-center text-[7px] text-white/80 tracking-[2px] opacity-80 uppercase">
            TYPE: {personality.activityType?.toUpperCase() || "NORMAL"}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center px-3 py-2 border-t border-white/20 text-sm text-white/80">
          <span className="text-left flex-1">ELZA</span>
          <span className="text-center text-white tracking-wider text-lg font-bold uppercase">
            TRYGITWRAP.COM
          </span>
          <span className="text-right flex-1">2K25</span>
        </div>
      </div>
    </div>
  );
};

export default GitHubWrappedBanner;
