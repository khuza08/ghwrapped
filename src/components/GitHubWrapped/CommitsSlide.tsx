import React from "react";
import { motion } from "framer-motion";
import { GitHubWrappedData } from "@/lib/types";
import { formatReadableDate } from "@/utils/date";
import { formatNumber } from "@/lib/utils";
import AnimatedCounter from "@/components/UI/AnimatedCounter";
import CommitChart from "@/components/GitHubWrapped/CommitChart";
import StatCard from "@/components/UI/reusable/StatCard";
import StreakCard from "@/components/UI/reusable/StreakCard";
import ScheduleCard from "@/components/UI/reusable/ScheduleCard";

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
    <div className="w-full max-w-6xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white/80 mb-6 md:mb-8">
          Your Commit History
        </h3>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <StatCard
          value={Object.keys(commits.commitsByDate).length}
          label="Active Days"
          className="py-6"
        />
        <StatCard
          value={commits.mostActiveDay ? commits.mostActiveDayCount : "N/A"}
          label={
            commits.mostActiveDay ? "Most Commits" : "Most Commits in a Day"
          }
          subtitle={
            commits.mostActiveDay ? `on ${commits.mostActiveDay}` : undefined
          }
          className="py-6"
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <ScheduleCard
          title="Your Coding Schedule"
          time={
            commits.mostActiveHour !== null
              ? formatHour(commits.mostActiveHour)
              : "No data"
          }
          timeLabel="is your most productive time"
          personality={personality.codingSchedule}
        />

        <div>
          {commits.longestStreak ? (
            <StreakCard
              title="Longest Streak"
              description={`${commits.longestStreak.length} days in a row! ${commits.longestStreak.start} to ${commits.longestStreak.end}`}
            />
          ) : (
            <motion.div
              className="text-lg md:text-xl lg:text-2xl text-white/80 italic"
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
        className="mt-6 md:mt-8 lg:mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <h4 className="text-lg md:text-xl lg:text-2xl font-semibold text-white/80 mb-4 md:mb-6">
          Commit Activity
        </h4>
        <div className="h-40 md:h-80 lg:h-96">
          <CommitChart commitsByDate={commits.commitsByDate} />
        </div>
      </motion.div>
    </div>
  );
};

export default CommitsSlide;
