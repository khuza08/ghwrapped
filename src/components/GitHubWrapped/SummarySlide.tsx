import React from "react";
import { motion } from "framer-motion";
import { GitHubWrappedData } from "@/lib/types";
import StatCard from "@/components/UI/reusable/StatCard";
import AdditionalStatCard from "@/components/UI/reusable/AdditionalStatCard";

interface WrappedSlideProps {
  data: GitHubWrappedData;
}

const SummarySlide: React.FC<WrappedSlideProps> = ({ data }) => {
  const { summary, commits, repositories, personality } = data;

  // Get top repository by stars
  const topRepo =
    repositories.topByStars.length > 0 ? repositories.topByStars[0] : null;

  return (
    <div className="w-full max-w-6xl mx-auto text-center flex flex-col items-center justify-center">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, staggerChildren: 0.1 }}
      >
        <StatCard
          value={summary.totalCommits}
          label="Commits"
          className="py-6"
        />
        <StatCard value={summary.totalRepos} label="Repos" className="py-6" />
        <StatCard value={summary.totalStars} label="Stars" className="py-6" />
        <StatCard
          value={`${summary.yearsOnGitHub}y`}
          label="On GitHub"
          className="py-6"
        />
      </motion.div>

      {/* Additional Stats Section */}
      <motion.div
        className="mt-4 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, staggerChildren: 0.1 }}
        >
          {/* Streak Card */}
          <AdditionalStatCard
            title="Longest Streak"
            value={`${commits.longestStreak ? commits.longestStreak.length : 0} days`}
            subtitle={commits.longestStreak ? `${commits.longestStreak.start} to ${commits.longestStreak.end}` : undefined}
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
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SummarySlide;
