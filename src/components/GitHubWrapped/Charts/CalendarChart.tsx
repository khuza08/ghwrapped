"use client";
import { useState, useEffect } from "react";
interface CalendarChartProps {
  commitsByDate: Record<string, number>;
}
// Function to get the contribution level based on commit count
const getContributionLevel = (commits: number): number => {
  if (commits === 0) return 0;
  if (commits <= 2) return 1;
  if (commits <= 5) return 2;
  if (commits <= 10) return 3;
  return 4;
};
// Function to get the color class based on contribution level
const getColorClass = (level: number): string => {
  switch (level) {
    case 0:
      return "bg-[#161b22]"; // No contributions - dark gray
    case 1:
      return "bg-[#0e4429]"; // Low contributions - dark green
    case 2:
      return "bg-[#006d32]"; // Medium-low - medium green
    case 3:
      return "bg-[#26a641]"; // Medium-high - light green
    case 4:
      return "bg-[#39d353]"; // High - bright green
    default:
      return "bg-[#161b22]";
  }
};
const CalendarChart: React.FC<CalendarChartProps> = ({ commitsByDate }) => {
  const [isMounted, setIsMounted] = useState(false);
  const year = new Date().getFullYear();
  useEffect(() => {
    setIsMounted(true);
  }, []);
  // Create a date object for the first day of the year
  const startDate = new Date(year, 0, 1);
  // Find the first Sunday of the year (or the Sunday of the week that includes Jan 1)
  const firstSunday = new Date(startDate);
  firstSunday.setDate(startDate.getDate() - startDate.getDay());
  // Create a date object for the last day of the year
  const endDate = new Date(year, 11, 31);
  // Generate all the dates for the calendar grid
  const dates: { date: Date; commits: number; level: number }[] = [];
  let currentDate = new Date(firstSunday);
  // Generate 52 weeks worth of dates (364 days)
  for (let i = 0; i < 52 * 7; i++) {
    const dateStr = currentDate.toISOString().split("T")[0]; // YYYY-MM-DD format
    const commits = commitsByDate[dateStr] || 0;
    const level = getContributionLevel(commits);
    dates.push({
      date: new Date(currentDate),
      commits,
      level,
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  // Group dates by weeks (7 days per week) - standard arrangement
  const weeks: (typeof dates)[] = [];
  for (let i = 0; i < dates.length; i += 7) {
    weeks.push(dates.slice(i, i + 7));
  }
  // Now create columns by day of week (like GitHub calendar)
  const daysOfWeek: (typeof dates)[] = [[], [], [], [], [], [], []]; // Sun, Mon, Tue, Wed, Thu, Fri, Sat
  for (let i = 0; i < 52; i++) {
    // 52 weeks
    for (let j = 0; j < 7; j++) {
      // 7 days
      if (i * 7 + j < dates.length) {
        daysOfWeek[j].push(dates[i * 7 + j]);
      }
    }
  }
  // Get month labels to show in the calendar based on the first day of each week
  const monthLabels: { month: string; weekIndex: number }[] = [];
  let currentMonth = -1;
  for (let weekIndex = 0; weekIndex < weeks.length; weekIndex++) {
    if (weekIndex * 7 < dates.length) {
      const date = dates[weekIndex * 7].date; // First day of the week
      if (date.getMonth() !== currentMonth) {
        monthLabels.push({
          month: date.toLocaleDateString("en-US", { month: "short" }),
          weekIndex: weekIndex,
        });
        currentMonth = date.getMonth();
      }
    }
  }
  if (!isMounted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        Loading chart...
      </div>
    );
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 overflow-x-auto overflow-y-hidden">
      <div className="min-w-max">
        {/* Month labels row */}
        <div className="flex mb-1 h-6 ml-14 relative">
          {monthLabels.map((label, index) => (
            <div
              key={index}
              className="text-[10px] text-gray-500 absolute"
              style={{ left: `${label.weekIndex * 13}px` }}
            >
              {label.month}
            </div>
          ))}
        </div>

        {/* Main calendar grid */}
        <div className="flex overflow-visible">
          {/* Day of week labels */}
          <div className="flex flex-col mr-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
              (day, index) => (
                <div
                  key={day}
                  className="text-[10px] text-gray-500 h-[15px] flex items-center justify-end pr-1"
                >
                  {index % 2 === 0 ? day : ""}
                </div>
              ),
            )}
          </div>

          {/* Calendar grid container */}
          <div className="min-w-[728px] overflow-visible">
            {" "}
            {/* 52 weeks * 14px per week = 728px */}
            <div className="flex flex-col">
              {daysOfWeek.map((dayColumn, dayIndex) => {
                // Each day column has data for all weeks of the year
                return (
                  <div key={dayIndex} className="flex">
                    {dayColumn.map((day, weekIndex) => {
                      const dateStr = day.date.toISOString().split("T")[0];
                      return (
                        <div
                          key={`${dayIndex}-${weekIndex}`}
                          className={`${getColorClass(day.level)} w-3 h-3 mx-0.5 my-0.5 rounded-sm border border-[#161b22] cursor-pointer relative group`}
                          title={`${day.commits} contributions on ${dateStr}`}
                        >
                          <div className="absolute hidden group-hover:block -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10 border border-gray-700">
                            {day.date.toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                            : {day.commits} contributions
                            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center mt-4 text-xs text-gray-400">
          <span className="mr-2">Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`${getColorClass(level)} w-3 h-3 mx-0.5 rounded-sm border border-[#161b22]`}
            ></div>
          ))}
          <span className="ml-2">More</span>
        </div>
      </div>
    </div>
  );
};
export default CalendarChart;
