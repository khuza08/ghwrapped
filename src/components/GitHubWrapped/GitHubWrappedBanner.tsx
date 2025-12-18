import React, { useRef } from 'react';
import { GitHubWrappedData } from '@/lib/types';
import { toPng } from 'html-to-image';
import { formatNumber } from '@/lib/utils';

interface GitHubWrappedBannerProps {
  data: GitHubWrappedData;
}

const GitHubWrappedBanner: React.FC<GitHubWrappedBannerProps> = ({ data }) => {
  const { summary, user, commits, repositories, personality } = data;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* GitHub Wrapped Banner - with data-export-banner attribute for export function */}
      <div
        data-export-banner
        className="w-[375px] h-[667px] bg-gray-900 rounded-3xl overflow-hidden relative flex flex-col"
      >
        {/* Header Bar */}
        <div className="flex justify-between items-center px-6 py-4 bg-gray-800">
          <div className="text-xs font-bold text-white uppercase">#GITHUBWRAPPED</div>
          <div className="text-xs text-gray-400">Personality Code</div>
        </div>

        {/* Profile Card */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
          {/* Avatar Container with overlays */}
          <div className="relative w-48 h-48 rounded-full overflow-hidden mb-6">
            <img 
              src={user.avatar_url} 
              alt={user.login} 
              className="w-full h-full object-cover"
            />
            
            {/* Followers Info Overlay */}
            <div className="absolute top-2 left-2 bg-gray-800/80 rounded-full px-2 py-1 border border-gray-600">
              <div className="flex items-center text-xs text-white">
                <span className="mr-2">👤</span>
                <span>{formatNumber(summary.totalFollowers || 0)} Followers</span>
              </div>
            </div>

            {/* Username Badge Overlay */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-800/90 rounded-full px-4 py-2 border border-gray-600">
              <div className="text-white font-bold text-center">
                {user.name || user.login}
              </div>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-3 gap-4 w-full mt-4">
            <div className="bg-gray-800 rounded-lg p-3 border border-gray-700 text-center">
              <div className="text-2xl font-bold text-white">{formatNumber(summary.totalPullRequests || 0)}</div>
              <div className="text-xs text-gray-400 uppercase">PRs</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-3 border border-gray-700 text-center">
              <div className="text-2xl font-bold text-white">{formatNumber(summary.totalCommits || 0)}</div>
              <div className="text-xs text-gray-400 uppercase">Commits</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-3 border border-gray-700 text-center">
              <div className="text-2xl font-bold text-white">{formatNumber(summary.totalRepos || 0)}</div>
              <div className="text-xs text-gray-400 uppercase">Repos</div>
            </div>
          </div>
        </div>

        {/* Contribution Graph Section */}
        <div className="px-6 py-4">
          <div className="text-xs text-gray-400 uppercase mb-2">GITHUB CONTRIBUTION GRAPH COLUMN</div>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 h-24 flex items-center justify-center">
            <div className="text-gray-500 text-center">
              <div className="text-lg mb-1">📊</div>
              <div className="text-xs">Contribution Data</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center px-6 py-4 border-t border-gray-800">
          <div className="text-sm font-bold text-gray-400">2K25</div>
          <div className="text-lg font-bold text-white">SIGNATURE HERE</div>
          <div className="text-sm font-bold text-gray-400">KHZX</div>
        </div>
      </div>
    </div>
  );
};

export default GitHubWrappedBanner;