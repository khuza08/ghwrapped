"use client";

import CalendarChart from "./Charts/CalendarChart";

interface MultiChartProps {
  commitsByDate: Record<string, number>;
}

const MultiChart: React.FC<MultiChartProps> = ({ commitsByDate }) => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full overflow-x-auto overflow-y-hidden">
        <CalendarChart commitsByDate={commitsByDate} />
      </div>
    </div>
  );
};

export default MultiChart;
