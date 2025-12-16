import React from 'react';
import { motion } from 'framer-motion';
import { GitHubWrappedData } from '@/lib/types';
import { formatReadableDate } from '@/utils/date';
import { formatNumber } from '@/lib/utils';
import AnimatedCounter from '@/components/UI/AnimatedCounter';

interface WrappedSlideProps {
  data: GitHubWrappedData;
}

const SummarySlide: React.FC<WrappedSlideProps> = ({ data }) => {
  const { summary, user } = data;
  const joinDate = formatReadableDate(user.created_at);

  return (
    <div className="w-full max-w-2xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-3xl font-bold text-gray-800 mb-2">GitHub Wrapped 2024</h3>
        <div className="flex items-center justify-center mb-6">
          <motion.img
            src={user.avatar_url}
            alt={user.login}
            className="w-16 h-16 rounded-full mr-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          />
          <div className="text-left">
            <h4 className="text-xl font-semibold text-gray-800">{user.name || user.login}</h4>
            <p className="text-gray-600">@{user.login}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 gap-4 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, staggerChildren: 0.1 }}
      >
        <motion.div
          className="bg-blue-50 p-4 rounded-lg"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="text-3xl font-bold text-blue-600">
            <AnimatedCounter value={formatNumber(summary.totalCommits)} />
          </div>
          <div className="text-gray-600">Commits</div>
        </motion.div>
        <motion.div
          className="bg-green-50 p-4 rounded-lg"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="text-3xl font-bold text-green-600">
            <AnimatedCounter value={formatNumber(summary.totalRepos)} />
          </div>
          <div className="text-gray-600">Repositories</div>
        </motion.div>
        <motion.div
          className="bg-yellow-50 p-4 rounded-lg"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="text-3xl font-bold text-yellow-600">
            <AnimatedCounter value={formatNumber(summary.totalStars)} />
          </div>
          <div className="text-gray-600">Stars</div>
        </motion.div>
        <motion.div
          className="bg-purple-50 p-4 rounded-lg"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="text-3xl font-bold text-purple-600">
            <AnimatedCounter value={summary.yearsOnGitHub} suffix="y" />
          </div>
          <div className="text-gray-600">On GitHub</div>
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-6 text-gray-700"
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