import React from "react";
import { GitHubWrappedData } from "@/lib/types";
import CalendarChartComponent from "@/components/GitHubWrapped/MultiChart";

interface WrappedSlideProps {
  data: GitHubWrappedData;
}

const CommitsSlide: React.FC<WrappedSlideProps> = ({ data }) => {
  return (
    <div className="w-full max-w-6xl mx-auto text-center">
      <div className="">
        <div>
          <CalendarChartComponent commitsByDate={data.commits.commitsByDate} />
        </div>
      </div>
    </div>
  );
};

export default CommitsSlide;
