import React from "react";
import { motion } from "framer-motion";
import { GitHubWrappedData } from "@/lib/types";
import { formatReadableDate } from "@/utils/date";
import { formatNumber } from "@/lib/utils";
import AnimatedCounter from "@/components/UI/AnimatedCounter";
import CommitChart from "@/components/GitHubWrapped/CommitChart";
import StatCard from "@/components/UI/StatCard";
import StreakCard from "@/components/UI/StreakCard";
import ScheduleCard from "@/components/UI/ScheduleCard";

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
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white/80 mb-4 md:mb-6">
          Your Commit History
        </h3>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <StatCard
          value={Object.keys(commits.commitsByDate).length}
          label="Active Days"
        />
        <StatCard
          value={commits.mostActiveDay ? commits.mostActiveDayCount : "N/A"}
          label={
            commits.mostActiveDay ? "Most Commits" : "Most Commits in a Day"
          }
          subtitle={
            commits.mostActiveDay ? `on ${commits.mostActiveDay}` : undefined
          }
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
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
              className="text-xs md:text-sm lg:text-base text-white/80 italic"
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
        <h4 className="text-xs md:text-lg lg:text-xl font-semibold text-white/80 mb-2 md:mb-4">
          Commit Activity
        </h4>
        <div className="h-24 md:h-64 lg:h-80">
          <CommitChart commitsByDate={commits.commitsByDate} />
        </div>
      </motion.div>
    </div>
  );
};

export default CommitsSlide;
