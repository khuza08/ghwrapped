import React from "react";
import { GitHubWrappedData } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import RepoItem from "@/components/UI/reusable/RepoItem";
import RepoStat from "@/components/UI/reusable/RepoStat";

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
    <div className="w-full max-w-6xl mx-auto text-center">
      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-100 mb-6 md:mb-8">
        Your Top Repositories
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white/5 p-6 md:p-8 lg:p-10 rounded-xl">
          <h4 className="font-bold text-xl md:text-2xl lg:text-3xl text-gray-300 mb-4">
            By Stars
          </h4>
          <div className="space-y-4">
            {topReposByStars.length > 0 ? (
              topReposByStars.map((repo) => (
                <RepoItem
                  key={repo.id}
                  name={repo.name}
                  count={repo.stargazers_count}
                  type="stars"
                  className="py-3"
                />
              ))
            ) : (
              <p className="text-lg md:text-xl lg:text-2xl text-gray-400">
                No repositories with stars
              </p>
            )}
          </div>
        </div>

        <div className="bg-white/5 p-6 md:p-8 lg:p-10 rounded-xl">
          <h4 className="font-bold text-xl md:text-2xl lg:text-3xl text-gray-300 mb-4">
            By Forks
          </h4>
          <div className="space-y-4">
            {topReposByForks.length > 0 ? (
              topReposByForks.map((repo) => (
                <RepoItem
                  key={repo.id}
                  name={repo.name}
                  count={repo.forks_count}
                  type="forks"
                  className="py-3"
                />
              ))
            ) : (
              <p className="text-lg md:text-xl lg:text-2xl text-gray-400">
                No repositories with forks
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 md:mt-12">
        <h4 className="font-bold text-xl md:text-2xl lg:text-3xl text-gray-300 mb-6">
          Repository Stats
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <RepoStat
            value={summary.totalRepos}
            label="Repos"
            className="py-6"
          />
          <RepoStat
            value={summary.totalStars}
            label="Stars"
            className="py-6"
          />
          <RepoStat
            value={summary.totalForks}
            label="Forks"
            className="py-6"
          />
        </div>
      </div>
    </div>
  );
};

export default ReposSlide;
