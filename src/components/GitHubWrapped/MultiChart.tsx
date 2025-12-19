"use client";

import CalendarChart from "./Charts/CalendarChart";

interface CalendarChartComponentProps {
  commitsByDate: Record<string, number>;
}

const CalendarChartComponent: React.FC<CalendarChartComponentProps> = ({ commitsByDate }) => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full overflow-x-auto overflow-y-hidden">
        <CalendarChart commitsByDate={commitsByDate} />
      </div>
    </div>
  );
};

export default CalendarChartComponent;
