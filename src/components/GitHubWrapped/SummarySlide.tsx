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
    <div className="w-full max-w-6xl mx-auto text-center flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <div className="flex items-center justify-center mb-6 md:mb-8">
          <motion.img
            src={user.avatar_url}
            alt={user.login}
            className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full mr-4 md:mr-6 border-2 border-white/20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          />
          <div className="text-left">
            <h4 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white/80">
              {user.name || user.login}
            </h4>
            <p className="text-lg md:text-xl lg:text-2xl text-white/50">
              @{user.login}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 w-full"
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

      <motion.div
        className="mt-6 md:mt-8 lg:mt-10 text-lg md:text-xl lg:text-2xl text-white/80 w-full"
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
