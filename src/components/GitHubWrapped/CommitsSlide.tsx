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
        className=""
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div>
          <CalendarChartComponent commitsByDate={data.commits.commitsByDate} />
        </div>
      </motion.div>
    </div>
  );
};

export default CommitsSlide;
