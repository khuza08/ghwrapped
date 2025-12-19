'use client';

import { ResponsiveCalendar } from '@nivo/calendar';
import { useState, useEffect } from 'react';

interface CalendarChartProps {
  commitsByDate: Record<string, number>;
}

const CalendarChart: React.FC<CalendarChartProps> = ({ commitsByDate }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [calendarData, setCalendarData] = useState<any[]>([]);

  useEffect(() => {
    setIsMounted(true);

    if (!commitsByDate || typeof commitsByDate !== 'object') {
      setCalendarData([]);
      return;
    }

    const entries = Object.entries(commitsByDate);

    // Create data for calendar heatmap - use all entries for calendar view
    const data = entries
      .filter(([date, commits]) => {
        if (!date || commits === undefined || commits === null) return false;
        const dateObj = new Date(date);
        return !isNaN(dateObj.getTime()) && !isNaN(Number(commits));
      })
      .map(([date, commits]) => {
        const dateObj = new Date(date);
        return {
          day: dateObj.toISOString().split('T')[0], // YYYY-MM-DD format
          value: Number(commits)
        };
      })
      .filter(item => item !== null);

    setCalendarData(data);
  }, [commitsByDate]);

  if (!isMounted) {
    return (
      <div className="w-full h-full bg-gray-800/50 rounded-lg flex items-center justify-center">
        Loading chart...
      </div>
    );
  }

  return (
    <ResponsiveCalendar
      data={calendarData}
      from={`${new Date().getFullYear()}-01-01`}
      to={`${new Date().getFullYear()}-12-31`}
      emptyColor="#1F2937" // Dark background for empty days
      colors={['#166534', '#15803d', '#22c55e', '#84cc16', '#eab308']} // Green to yellow gradient
      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      yearSpacing={40}
      monthBorderColor="#4B5563"
      dayBorderWidth={1}
      dayBorderColor="#1F2937"
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'row',
          translateY: 36,
          itemCount: 4,
          itemWidth: 42,
          itemHeight: 36,
          itemsSpacing: 14,
          itemDirection: 'right-to-left',
        }
      ]}
      theme={{
        labels: {
          text: {
            fill: '#e5e7eb',
            fontSize: 12,
          },
        },
        tooltip: {
          container: {
            background: '#1F2937',
            color: '#F9FAFB',
            fontSize: 12,
          },
        },
      }}
      tooltip={({ day, value }) => (
        <div className="bg-gray-800 text-white p-2 rounded shadow-md">
          <strong>{day}</strong>: {value} commits
        </div>
      )}
    />
  );
};

export default CalendarChart;