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
    <div className="w-full max-w-2xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Commit History</h3>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="bg-blue-50 p-4 rounded-lg"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="text-3xl font-bold text-blue-600">
            <AnimatedCounter value={formatNumber(Object.keys(commits.commitsByDate).length)} />
          </div>
          <div className="text-gray-600">Active Days</div>
        </motion.div>
        <motion.div
          className="bg-green-50 p-4 rounded-lg"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="text-3xl font-bold text-green-600">
            <AnimatedCounter value={
              commits.mostActiveDay
                ? formatNumber(commits.mostActiveDayCount)
                : 'N/A'
            } />
          </div>
          <div className="text-gray-600">
            {commits.mostActiveDay
              ? `on ${commits.mostActiveDay}`
              : 'Most Commits in a Day'}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h4 className="text-lg font-semibold text-gray-700 mb-2">Your Coding Schedule</h4>
        <div className="flex items-center justify-center">
          <div className="text-xl font-bold text-purple-600">
            {commits.mostActiveHour !== null
              ? formatHour(commits.mostActiveHour)
              : 'No data'}
          </div>
          <span className="mx-2">is your most productive time</span>
          <div className="text-xl">⏰</div>
        </div>
        <p className="mt-2 text-gray-600">
          You're a {personality.codingSchedule} coder
        </p>
      </motion.div>

      {commits.longestStreak && (
        <motion.div
          className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded text-left"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h4 className="font-bold text-yellow-700">Longest Streak</h4>
          <p className="text-gray-700">
            You committed code for <span className="font-bold">{commits.longestStreak.length}</span> days in a row!
            From <span className="font-semibold">{commits.longestStreak.start}</span> to{' '}
            <span className="font-semibold">{commits.longestStreak.end}</span>
          </p>
        </motion.div>
      )}

      {!commits.longestStreak && (
        <motion.div
          className="text-gray-600 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          No streak data available
        </motion.div>
      )}

      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <h4 className="text-lg font-semibold text-gray-700 mb-4">Commit Activity Over Time</h4>
        <CommitChart commitsByDate={commits.commitsByDate} />
      </motion.div>
    </div>
  );
};

export default CommitsSlide;