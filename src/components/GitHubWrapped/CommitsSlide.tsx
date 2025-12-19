import React from "react";
import { motion } from "framer-motion";
import { GitHubWrappedData } from "@/lib/types";
import CalendarChartComponent from "@/components/GitHubWrapped/MultiChart";

interface WrappedSlideProps {
  data: GitHubWrappedData;
}

const CommitsSlide: React.FC<WrappedSlideProps> = ({ data }) => {
  return (
    <div className="w-full max-w-6xl mx-auto text-center">
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
          <CalendarChartComponent commitsByDate={data.commits.commitsByDate} />
        </div>
      </motion.div>
    </div>
  );
};

export default CommitsSlide;
