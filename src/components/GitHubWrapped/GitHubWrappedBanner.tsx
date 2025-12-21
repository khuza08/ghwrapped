import React from "react";
import { GitHubWrappedData } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { FiUser, FiUserCheck } from "react-icons/fi";

interface GitHubWrappedBannerProps {
  data: GitHubWrappedData;
}

const GitHubWrappedBanner: React.FC<GitHubWrappedBannerProps> = ({ data }) => {
  const { summary, user, personality } = data;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full mb-12 ">
      {/* GitHub Wrapped Banner - with data-export-banner attribute for export function */}
      <div
        data-export-banner
        className="w-93.75 h-fit bg-white/5 rounded-xl overflow-hidden relative flex flex-col border-2 border-white/20"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-2 py-2 border-b border-white/20">
          <div className="text-sm font-bold text-white uppercase tracking-tighter bg-white/5 border border-white/20 rounded-md px-2 text-shadow-[0_0_8px_rgba(255,255,255,0.7)]">
            #GITHUBUNWRAPPED
          </div>
          <div className="text-sm font-bold text-white/80 tracking-tight bg-white/5 border border-white/20 rounded-md px-2 text-shadow-[0_0_8px_rgba(255,255,255,0.7)]">
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
            {/* Overlay Card - Top Left Corner */}
            <div className="absolute top-2 left-2 bg-black/5 backdrop-blur-xl border border-white/20 rounded-lg px-4 py-1 flex gap-4">
              <div className="text-sm text-white/80 flex items-center text-shadow-[0_0_6px_rgba(255,255,255,0.5)]">
                <FiUser className="w-4 h-4 mr-1" />
                {formatNumber(user.followers || 0)}
              </div>
              <div className="text-sm text-white/80 flex items-center text-shadow-[0_0_6px_rgba(255,255,255,0.5)]">
                <FiUserCheck className="w-4 h-4 mr-1" />
                {formatNumber(user.following || 0)}
              </div>
            </div>
          </div>

          {/* Username Badge */}
          <div className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 bg-black/5 backdrop-blur-sm border-2 border-white/20 rounded-lg px-4 py-1">
            <div className="text-sm font-bold text-white/80 text-center tracking-widest text-shadow-[0_0_6px_rgba(255,255,255,0.5)]">
              @{user.login}
            </div>
            <div className="text-[12px] font-semibold text-white/50 text-center text-shadow-[0_0_6px_rgba(255,255,255,0.5)]">
              {summary.yearsOnGitHub} years on GitHub
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-1.5 mx-3 mb-2 mt-2">
          <div className="text-center p-2 bg-black/5 border border-white/20 rounded-lg">
            <div className="text-md text-white/80 text-shadow-[0_0_6px_rgba(255,255,255,0.5)]">
              {formatNumber(summary.totalPullRequests || 66)}
            </div>
            <div className="text-sm font-bold text-white/80 tracking-[0.5px] text-shadow-[0_0_6px_rgba(255,255,255,0.5)]">
              PRs
            </div>
          </div>
          <div className="text-center p-2 bg-black/5 border border-white/20 rounded-lg">
            <div className="text-md text-white/80 text-shadow-[0_0_6px_rgba(255,255,255,0.5)]">
              {formatNumber(summary.totalCommits || 0)}
            </div>
            <div className="text-sm font-bold text-white/80 tracking-[0.5px] text-shadow-[0_0_6px_rgba(255,255,255,0.5)]">
              COMMITS
            </div>
          </div>
          <div className="text-center p-2 bg-black/5 border border-white/20 rounded-lg">
            <div className="text-md text-white/80 text-shadow-[0_0_6px_rgba(255,255,255,0.5)]">
              {formatNumber(summary.totalRepos || 0)}
            </div>
            <div className="text-sm font-bold text-white/80 tracking-[0.5px] text-shadow-[0_0_6px_rgba(255,255,255,0.5)]">
              REPOS
            </div>
          </div>
        </div>

        {/* Calendar Chart */}
        <div className="mx-3 mb-2">
          <div className="flex flex-col border border-white/20 rounded-lg bg-black/5 p-2">
            {Array.from({ length: 4 }).map((_, rowIndex) => {
              // Create 26 weeks worth of data
              return (
                <div key={rowIndex} className="flex flex-1">
                  {Array.from({ length: 26 }).map((_, colIndex) => {
                    const index = rowIndex * 26 + colIndex;
                    // Simulate contribution levels based on actual data if available
                    const commitCount = Math.floor(Math.random() * 10);
                    let level = 0;
                    if (commitCount > 0) level = 1;
                    if (commitCount > 2) level = 2;
                    if (commitCount > 5) level = 3;
                    if (commitCount > 8) level = 4;

                    const colorClass =
                      level === 0
                        ? "bg-[#242424]"
                        : level === 1
                          ? "bg-[#0e4429]"
                          : level === 2
                            ? "bg-[#006d32]"
                            : level === 3
                              ? "bg-[#26a641]"
                              : "bg-[#39d353]";

                    return (
                      <div
                        key={colIndex}
                        className={`${colorClass} h-3 rounded-sm border border-[#222222] flex-1 min-w-0`}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center px-3 py-2 border-t border-white/20 text-sm text-white/80">
          <span className="text-left flex-1 text-shadow-[0_0_6px_rgba(255,255,255,0.5)]">
            {user.name || user.login}
          </span>
          <span className="text-center text-white tracking-tight text-lg font-bold uppercase bg-white/5 border border-white/20 rounded-full px-4 text-shadow-[0_0_8px_rgba(255,255,255,1)]">
            MOMSAIDNOHOES!
          </span>
          <span className="text-right flex-1 text-shadow-[0_0_6px_rgba(255,255,255,0.5)]">
            2K{new Date().getFullYear().toString().slice(-2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GitHubWrappedBanner;
