import React from "react";
import { GitHubWrappedData } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { getDarkGrayColor, getSubtleDarkGrayColor } from "@/lib/grayscale";

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
    <div className="w-full max-w-4xl mx-auto text-center">
      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-100 mb-4 md:mb-6">
        Your Top Repositories
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 mb-4">
        <div className="bg-white/5 p-3 md:p-4 lg:p-6 rounded-lg">
          <h4 className="font-bold text-sm md:text-lg lg:text-xl text-gray-300 mb-2">
            By Stars
          </h4>
          <div className="space-y-2">
            {topReposByStars.length > 0 ? (
              topReposByStars.map((repo, index) => (
                <div
                  key={repo.id}
                  className="flex justify-between items-center p-2 bg-gray-700 rounded text-xs md:text-sm lg:text-base"
                >
                  <div>
                    <div className="font-medium text-gray-200">{repo.name}</div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span className="font-semibold text-gray-200">
                      {formatNumber(repo.stargazers_count)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs md:text-sm lg:text-base text-gray-400">
                No repositories with stars
              </p>
            )}
          </div>
        </div>

        <div className="bg-white/5 p-3 md:p-4 lg:p-6 rounded-lg">
          <h4 className="font-bold text-sm md:text-lg lg:text-xl text-gray-300 mb-2">
            By Forks
          </h4>
          <div className="space-y-2">
            {topReposByForks.length > 0 ? (
              topReposByForks.map((repo, index) => (
                <div
                  key={repo.id}
                  className="flex justify-between items-center p-2 bg-gray-700 rounded text-xs md:text-sm lg:text-base"
                >
                  <div>
                    <div className="font-medium text-gray-200">{repo.name}</div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-400 mr-1">⎇</span>
                    <span className="font-semibold text-gray-200">
                      {formatNumber(repo.forks_count)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs md:text-sm lg:text-base text-gray-400">
                No repositories with forks
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 md:mt-6">
        <h4 className="font-bold text-sm md:text-lg lg:text-xl text-gray-300 mb-3">
          Repository Stats
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
          <div className="bg-gray-800 p-2 md:p-3 lg:p-4 rounded-lg">
            <div className="text-lg md:text-xl lg:text-2xl font-bold text-gray-200">
              {formatNumber(summary.totalRepos)}
            </div>
            <div className="text-xs md:text-sm lg:text-base text-gray-400">
              Repos
            </div>
          </div>
          <div className="bg-gray-800 p-2 md:p-3 lg:p-4 rounded-lg">
            <div className="text-lg md:text-xl lg:text-2xl font-bold text-gray-200">
              {formatNumber(summary.totalStars)}
            </div>
            <div className="text-xs md:text-sm lg:text-base text-gray-400">
              Stars
            </div>
          </div>
          <div className="bg-gray-800 p-2 md:p-3 lg:p-4 rounded-lg">
            <div className="text-lg md:text-xl lg:text-2xl font-bold text-gray-200">
              {formatNumber(summary.totalForks)}
            </div>
            <div className="text-xs md:text-sm lg:text-base text-gray-400">
              Forks
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReposSlide;
