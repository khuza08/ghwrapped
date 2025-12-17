import React from "react";
import { motion } from "framer-motion";
import { GitHubWrappedData } from "@/lib/types";
import { formatReadableDate } from "@/utils/date";
import { formatNumber } from "@/lib/utils";
import AnimatedCounter from "@/components/UI/AnimatedCounter";
import StatCard from "@/components/UI/reusable/StatCard";

interface WrappedSlideProps {
  data: GitHubWrappedData;
}

const SummarySlide: React.FC<WrappedSlideProps> = ({ data }) => {
  const { summary, user } = data;
  const joinDate = formatReadableDate(user.created_at);

  return (
    <div className="w-full max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white/80 mb-2">
          GitHub Wrapped 2024
        </h3>
        <div className="flex items-center justify-center mb-4 md:mb-6">
          <motion.img
            src={user.avatar_url}
            alt={user.login}
            className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full mr-3 md:mr-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          />
          <div className="text-left">
            <h4 className="text-lg md:text-xl lg:text-2xl font-semibold text-white/80">
              {user.name || user.login}
            </h4>
            <p className="text-sm md:text-base lg:text-lg text-white/50">
              @{user.login}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, staggerChildren: 0.1 }}
      >
        <StatCard
          value={summary.totalCommits}
          label="Commits"
        />
        <StatCard
          value={summary.totalRepos}
          label="Repos"
        />
        <StatCard
          value={summary.totalStars}
          label="Stars"
        />
        <StatCard
          value={`${summary.yearsOnGitHub}y`}
          label="On GitHub"
        />
      </motion.div>

      <motion.div
        className="mt-4 md:mt-6 lg:mt-8 text-sm md:text-base lg:text-lg text-white/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p>Joined GitHub: {joinDate}</p>
      </motion.div>
    </div>
  );
};

export default SummarySlide;
