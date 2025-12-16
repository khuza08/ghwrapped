import React from 'react';
import { motion } from 'framer-motion';
import { GitHubWrappedData } from '@/lib/types';
import { formatReadableDate } from '@/utils/date';
import { formatNumber } from '@/lib/utils';
import AnimatedCounter from '@/components/UI/AnimatedCounter';
import CommitChart from '@/components/GitHubWrapped/CommitChart';

interface WrappedSlideProps {
  data: GitHubWrappedData;
}

const CommitsSlide: React.FC<WrappedSlideProps> = ({ data }) => {
  const { commits, personality } = data;

  // Format hour for display
  const formatHour = (hour: number) => {
    if (hour === 0) return "12 AM";
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return "12 PM";
    return `${hour - 12} PM`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 md:mb-6">Your Commit History</h3>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="bg-blue-50 p-3 md:p-4 lg:p-6 rounded-lg"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-600">
            <AnimatedCounter value={formatNumber(Object.keys(commits.commitsByDate).length)} />
          </div>
          <div className="text-xs md:text-sm lg:text-base text-gray-600">Active Days</div>
        </motion.div>
        <motion.div
          className="bg-green-50 p-3 md:p-4 lg:p-6 rounded-lg"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="text-xl md:text-2xl lg:text-3xl font-bold text-green-600">
            <AnimatedCounter value={
              commits.mostActiveDay
                ? formatNumber(commits.mostActiveDayCount)
                : 'N/A'
            } />
          </div>
          <div className="text-xs md:text-sm lg:text-base text-gray-600">
            {commits.mostActiveDay
              ? `on ${commits.mostActiveDay}`
              : 'Most Commits in a Day'}
          </div>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <motion.div
          className="lg:pr-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h4 className="text-sm md:text-lg lg:text-xl font-semibold text-gray-700 mb-2">Your Coding Schedule</h4>
          <div className="flex flex-wrap items-center justify-center gap-1 md:gap-2">
            <div className="text-base md:text-xl lg:text-2xl font-bold text-purple-600">
              {commits.mostActiveHour !== null
                ? formatHour(commits.mostActiveHour)
                : 'No data'}
            </div>
            <span className="text-xs md:text-sm lg:text-base mx-1">is your most productive time</span>
            <div className="text-lg lg:text-2xl">⏰</div>
          </div>
          <p className="mt-1 md:mt-2 text-xs md:text-sm lg:text-base text-gray-600">
            You're a {personality.codingSchedule} coder
          </p>
        </motion.div>

        <div>
          {commits.longestStreak && (
            <motion.div
              className="bg-yellow-50 border-l-4 border-yellow-500 p-3 md:p-4 lg:p-6 rounded text-left text-xs md:text-sm lg:text-base"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h4 className="font-bold text-yellow-700">Longest Streak</h4>
              <p className="text-gray-700">
                {commits.longestStreak.length} days in a row!
                {commits.longestStreak.start} to {commits.longestStreak.end}
              </p>
            </motion.div>
          )}

          {!commits.longestStreak && (
            <motion.div
              className="text-xs md:text-sm lg:text-base text-gray-600 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              No streak data available
            </motion.div>
          )}
        </div>
      </div>

      <motion.div
        className="mt-4 md:mt-6 lg:mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <h4 className="text-xs md:text-lg lg:text-xl font-semibold text-gray-700 mb-2 md:mb-4">Commit Activity</h4>
        <div className="h-24 md:h-64 lg:h-80">
          <CommitChart commitsByDate={commits.commitsByDate} />
        </div>
      </motion.div>
    </div>
  );
};

export default CommitsSlide;