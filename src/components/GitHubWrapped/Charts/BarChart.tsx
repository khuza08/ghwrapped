'use client';

import { ResponsiveBar } from '@nivo/bar';
import { useState, useEffect } from 'react';

interface BarChartProps {
  commitsByDate: Record<string, number>;
}

const BarChart: React.FC<BarChartProps> = ({ commitsByDate }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [barData, setBarData] = useState<any[]>([]);

  useEffect(() => {
    setIsMounted(true);

    if (!commitsByDate || typeof commitsByDate !== 'object') {
      setBarData([]);
      return;
    }

    const entries = Object.entries(commitsByDate);
    
    // Take only significant data points to keep chart readable
    // Filter to only dates with commits > 0 and sample evenly if too many
    const filteredEntries = entries
      .filter(([date, commits]) => {
        if (!date || commits === undefined || commits === null) return false;
        return !isNaN(Number(commits)) && Number(commits) > 0;
      })
      .map(([date, commits]) => {
        const dateObj = new Date(date);
        if (isNaN(dateObj.getTime())) return null;
        return { date, commits: Number(commits), dateObj };
      })
      .filter(item => item !== null)
      .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());

    // If too many data points, only take every nth point to keep chart readable
    const maxPoints = 60; // Maximum number of points to show
    let sampledEntries = filteredEntries;
    if (filteredEntries.length > maxPoints) {
      const step = Math.ceil(filteredEntries.length / maxPoints);
      sampledEntries = [];
      for (let i = 0; i < filteredEntries.length; i += step) {
        sampledEntries.push(filteredEntries[i]);
      }
    }

    // Create safe data for bar chart
    const data = sampledEntries
      .map(({ date, commits, dateObj }) => {
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        return { date: `${month}/${day}`, commits };
      })
      .sort((a, b) => a.date.localeCompare(b.date));

    setBarData(data);
  }, [commitsByDate]);

  if (!isMounted) {
    return (
      <div className="w-full h-full bg-gray-800/50 rounded-lg flex items-center justify-center">
        Loading chart...
      </div>
    );
  }

  return (
    <ResponsiveBar
      data={barData}
      keys={['commits']}
      indexBy="date"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: 'linear', min: 0, max: 'auto' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'set2' }}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -45,
        legend: 'Date',
        legendPosition: 'middle',
        legendOffset: 32,
        tickValues: 'every 15 days' // Only show every 15th day to reduce clutter
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Commits',
        legendPosition: 'middle',
        legendOffset: -50,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: 'color',
        modifiers: [['darker', 1.6]],
      }}
      theme={{
        background: 'transparent',
        axis: {
          domain: {
            line: {
              stroke: '#4B5563',
            },
          },
          ticks: {
            line: {
              stroke: '#4B5563',
              strokeWidth: 1,
            },
            text: {
              fill: '#e5e7eb',
              fontSize: 12,
            },
          },
          legend: {
            text: {
              fill: '#e5e7eb',
              fontSize: 14,
              fontWeight: 600,
            },
          },
        },
        grid: {
          line: {
            stroke: '#374151',
            strokeWidth: 1,
            opacity: 0.5,
          },
        },
        legends: {
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
      tooltip={({ id, value, indexValue }) => (
        <div className="bg-gray-800 text-white p-2 rounded shadow-md">
          <strong>{indexValue}</strong>: {value} commits
        </div>
      )}
      animate={true}
      motionConfig="gentle"
    />
  );
};

export default BarChart;