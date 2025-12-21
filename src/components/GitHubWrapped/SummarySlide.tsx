import React from "react";
import { GitHubWrappedData } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import AdditionalStatCard from "@/components/UI/reusable/AdditionalStatCard";

interface WrappedSlideProps {
  data: GitHubWrappedData;
}

const SummarySlide: React.FC<WrappedSlideProps> = ({ data }) => {
  const { summary, commits, repositories, personality } = data;

  // top repository by stars
  const topRepo =
    repositories.topByStars.length > 0 ? repositories.topByStars[0] : null;

  return (
    <div className="w-full max-w-6xl mx-auto text-center flex flex-col items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {/* Stat cards without animation */}
        <div className="bg-white/5 border border-white/20 p-3 md:p-4 lg:p-6 rounded-lg py-6 hover:scale-103 transition-transform duration-200 cursor-pointer">
          <div className="text-xl md:text-2xl lg:text-3xl font-bold text-white/80">
            {formatNumber(summary.totalCommits)}
          </div>
          <div className="text-xs md:text-sm lg:text-base text-white/50">
            Commits
          </div>
        </div>

        <div className="bg-white/5 border border-white/20 p-3 md:p-4 lg:p-6 rounded-lg py-6 hover:scale-103 transition-transform duration-200 cursor-pointer">
          <div className="text-xl md:text-2xl lg:text-3xl font-bold text-white/80">
            {formatNumber(summary.totalRepos)}
          </div>
          <div className="text-xs md:text-sm lg:text-base text-white/50">
            Repos
          </div>
        </div>

        <div className="bg-white/5 border border-white/20 p-3 md:p-4 lg:p-6 rounded-lg py-6 hover:scale-103 transition-transform duration-200 cursor-pointer">
          <div className="text-xl md:text-2xl lg:text-3xl font-bold text-white/80">
            {formatNumber(summary.totalStars)}
          </div>
          <div className="text-xs md:text-sm lg:text-base text-white/50">
            Stars
          </div>
        </div>

        <div className="bg-white/5 border border-white/20 p-3 md:p-4 lg:p-6 rounded-lg py-6 hover:scale-103 transition-transform duration-200 cursor-pointer">
          <div className="text-xl md:text-2xl lg:text-3xl font-bold text-white/80">
            {summary.yearsOnGitHub}y
          </div>
          <div className="text-xs md:text-sm lg:text-base text-white/50">
            On GitHub
          </div>
        </div>
      </div>

      {/* Additional Stats Section */}
      <div className="mt-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          {/* Streak Card */}
          <AdditionalStatCard
            title="Longest Streak"
            value={`${commits.longestStreak ? commits.longestStreak.length : 0} days`}
            subtitle={
              commits.longestStreak
                ? `${commits.longestStreak.start} to ${commits.longestStreak.end}`
                : undefined
            }
          />

          {/* Top Repository Card */}
          <AdditionalStatCard
            title="Top Repository"
            value={topRepo ? topRepo.name : "N/A"}
            subtitle={topRepo ? `${topRepo.stargazers_count} stars` : undefined}
          />

          {/* Personality Card */}
          <AdditionalStatCard
            title="Personality"
            value={personality.title}
            subtitle={personality.description}
          />
        </div>
      </div>
    </div>
  );
};

export default SummarySlide;
