'use client';

import { ResponsiveLine } from '@nivo/line';
import { useState, useEffect } from 'react';

interface LineChartProps {
  commitsByDate: Record<string, number>;
}

const LineChart: React.FC<LineChartProps> = ({ commitsByDate }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [lineData, setLineData] = useState<any[]>([]);

  useEffect(() => {
    setIsMounted(true);

    if (!commitsByDate || typeof commitsByDate !== 'object') {
      setLineData([{ id: 'commits', data: [] }]);
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

    // Create safe data for line chart - use simplified date format
    const data = {
      id: 'commits',
      data: sampledEntries
        .map(({ date, commits, dateObj }) => {
          // Format date as MM/DD for simplicity
          const month = String(dateObj.getMonth() + 1).padStart(2, '0');
          const day = String(dateObj.getDate()).padStart(2, '0');
          return { x: `${month}/${day}`, y: commits };
        })
        .sort((a, b) => a.x.localeCompare(b.x)),
    };

    setLineData([data]);
  }, [commitsByDate]);

  if (!isMounted) {
    return (
      <div className="w-full h-full bg-gray-800/50 rounded-lg flex items-center justify-center">
        Loading chart...
      </div>
    );
  }

  return (
    <ResponsiveLine
      data={lineData}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }} // Use point scale instead of time
      yScale={{ type: 'linear', min: 0, max: 'auto', stacked: false, reverse: false }}
      curve="monotoneX"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -45,
        legend: 'Date',
        legendOffset: 36,
        legendPosition: 'middle',
        tickValues: 'every 15 days' // Only show every 15th day to reduce clutter
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Commits',
        legendOffset: -40,
        legendPosition: 'middle',
      }}
      pointSize={5}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      enableSlices="x"
      enablePoints={true}
      enableArea={false}
      areaOpacity={0.05}
      lineWidth={2}
      colors={{ scheme: 'set2' }}
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
        crosshair: {
          line: {
            stroke: '#9CA3AF',
            strokeWidth: 1,
            strokeDasharray: '6 6',
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
      tooltip={({ point }) => (
        <div className="bg-gray-800 text-white p-2 rounded shadow-md">
          <strong>{point.data.x}</strong>: {point.data.y} commits
        </div>
      )}
    />
  );
};

export default LineChart;