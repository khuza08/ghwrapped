import React from 'react';
import { GitHubWrappedData } from '@/lib/types';
import { formatNumber } from '@/lib/utils';

interface WrappedSlideProps {
  data: GitHubWrappedData;
}

const ReposSlide: React.FC<WrappedSlideProps> = ({ data }) => {
  const { repositories, summary } = data;

  // Get top repos by stars
  const topReposByStars = repositories.topByStars.slice(0, 3); // Reduced to top 3 for space

  // Get top repos by forks
  const topReposByForks = repositories.topByForks.slice(0, 3); // Reduced to top 3 for space

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h3 className="text-xl md:text-2xl font-bold text-gray-800 text-center mb-4 md:mb-6">Your Top Repositories</h3>

      <div className="grid grid-cols-1 gap-3 md:gap-4 mb-4">
        <div className="bg-yellow-50 p-3 md:p-4 rounded-lg">
          <h4 className="font-bold text-sm md:text-lg text-yellow-700 mb-2 text-center">By Stars</h4>
          <div className="space-y-2">
            {topReposByStars.length > 0 ? (
              topReposByStars.map((repo, index) => (
                <div key={repo.id} className="flex justify-between items-center p-2 bg-white rounded text-xs md:text-sm">
                  <div>
                    <div className="font-medium text-gray-800">{repo.name}</div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="font-semibold">{formatNumber(repo.stargazers_count)}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs md:text-sm text-gray-600 text-center">No repositories with stars</p>
            )}
          </div>
        </div>

        <div className="bg-blue-50 p-3 md:p-4 rounded-lg">
          <h4 className="font-bold text-sm md:text-lg text-blue-700 mb-2 text-center">By Forks</h4>
          <div className="space-y-2">
            {topReposByForks.length > 0 ? (
              topReposByForks.map((repo, index) => (
                <div key={repo.id} className="flex justify-between items-center p-2 bg-white rounded text-xs md:text-sm">
                  <div>
                    <div className="font-medium text-gray-800">{repo.name}</div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-500 mr-1">⎇</span>
                    <span className="font-semibold">{formatNumber(repo.forks_count)}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs md:text-sm text-gray-600 text-center">No repositories with forks</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 md:mt-6">
        <h4 className="font-bold text-sm md:text-lg text-gray-800 mb-3 text-center">Repository Stats</h4>
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          <div className="bg-green-50 p-2 md:p-3 rounded-lg">
            <div className="text-lg font-bold text-green-600">{formatNumber(summary.totalRepos)}</div>
            <div className="text-xs md:text-sm text-gray-600">Repos</div>
          </div>
          <div className="bg-purple-50 p-2 md:p-3 rounded-lg">
            <div className="text-lg font-bold text-purple-600">{formatNumber(summary.totalStars)}</div>
            <div className="text-xs md:text-sm text-gray-600">Stars</div>
          </div>
          <div className="bg-red-50 p-2 md:p-3 rounded-lg">
            <div className="text-lg font-bold text-red-600">{formatNumber(summary.totalForks)}</div>
            <div className="text-xs md:text-sm text-gray-600">Forks</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReposSlide;