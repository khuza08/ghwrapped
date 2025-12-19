"use client";

import { useState } from "react";
import LineChart from "./Charts/LineChart";
import BarChart from "./Charts/BarChart";
import CalendarChart from "./Charts/CalendarChart";

interface MultiChartProps {
  commitsByDate: Record<string, number>;
}

const MultiChart: React.FC<MultiChartProps> = ({ commitsByDate }) => {
  const [chartType, setChartType] = useState<"line" | "bar" | "calendar">(
    "line",
  );

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-center mb-4 space-x-2">
        <button
          className={`px-4 py-2 rounded-lg transition-colors ${
            chartType === "line"
              ? "bg-white/10 text-white/80 border border-white/20"
              : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80 border border-white/20"
          }`}
          onClick={() => setChartType("line")}
        >
          Line Chart
        </button>
        <button
          className={`px-4 py-2 rounded-lg transition-colors ${
            chartType === "bar"
              ? "bg-white/10 text-white/80 border border-white/20"
              : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80 border border-white/20"
          }`}
          onClick={() => setChartType("bar")}
        >
          Bar Chart
        </button>
        <button
          className={`px-4 py-2 rounded-lg transition-colors ${
            chartType === "calendar"
              ? "bg-white/10 text-white/80 border border-white/20"
              : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80 border border-white/20"
          }`}
          onClick={() => setChartType("calendar")}
        >
          Calendar
        </button>
      </div>

      <div className="flex-grow overflow-hidden">
        {chartType === "line" ? (
          <div className="w-full h-full">
            <LineChart commitsByDate={commitsByDate} />
          </div>
        ) : chartType === "bar" ? (
          <div className="w-full h-full">
            <BarChart commitsByDate={commitsByDate} />
          </div>
        ) : (
          <div className="w-fit h-full overflow-x-auto overflow-y-hidden">
            <CalendarChart commitsByDate={commitsByDate} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiChart;
