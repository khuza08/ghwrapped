import React from 'react';
import { GitHubWrappedData } from '@/lib/types';
import { formatNumber } from '@/lib/utils';

interface WrappedSlideProps {
  data: GitHubWrappedData;
}

const ReposSlide: React.FC<WrappedSlideProps> = ({ data }) => {
  const { repositories, summary } = data;
  
  // Get top repos by stars
  const topReposByStars = repositories.topByStars.slice(0, 5);
  
  // Get top repos by forks
  const topReposByForks = repositories.topByForks.slice(0, 5);
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Your Top Repositories</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-bold text-lg text-yellow-700 mb-3 text-center">By Stars</h4>
          <div className="space-y-3">
            {topReposByStars.length > 0 ? (
              topReposByStars.map((repo, index) => (
                <div key={repo.id} className="flex justify-between items-center p-2 bg-white rounded">
                  <div>
                    <div className="font-medium text-gray-800">{repo.name}</div>
                    <div className="text-sm text-gray-600">{repo.full_name}</div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="font-semibold">{formatNumber(repo.stargazers_count)}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center">No repositories with stars</p>
            )}
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-bold text-lg text-blue-700 mb-3 text-center">By Forks</h4>
          <div className="space-y-3">
            {topReposByForks.length > 0 ? (
              topReposByForks.map((repo, index) => (
                <div key={repo.id} className="flex justify-between items-center p-2 bg-white rounded">
                  <div>
                    <div className="font-medium text-gray-800">{repo.name}</div>
                    <div className="text-sm text-gray-600">{repo.full_name}</div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-500 mr-1">⎇</span>
                    <span className="font-semibold">{formatNumber(repo.forks_count)}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center">No repositories with forks</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <h4 className="font-bold text-lg text-gray-800 mb-3">Repository Stats</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{formatNumber(summary.totalRepos)}</div>
            <div className="text-sm text-gray-600">Total Repos</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{formatNumber(summary.totalStars)}</div>
            <div className="text-sm text-gray-600">Total Stars</div>
          </div>
          <div className="bg-red-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{formatNumber(summary.totalForks)}</div>
            <div className="text-sm text-gray-600">Total Forks</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReposSlide;