'use client';

import { ResponsiveLine } from '@nivo/line';
import { useState, useEffect } from 'react';

interface NivoCommitChartProps {
  commitsByDate: Record<string, number>;
}

const NivoCommitChart: React.FC<NivoCommitChartProps> = ({ commitsByDate }) => {
  const [isMounted, setIsMounted] = useState(false);

  // Convert the commitsByDate object to an array of data points for Nivo
  const data = [
    {
      id: 'commits',
      data: Object.entries(commitsByDate)
        .map(([date, commits]) => ({
          x: date,
          y: commits,
        }))
        .sort((a, b) => new Date(a.x).getTime() - new Date(b.x).getTime()), // Sort by date
    },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Render a placeholder while client-side rendering is happening
    return <div className="w-full h-full bg-gray-800/50 rounded-lg flex items-center justify-center">Loading chart...</div>;
  }

  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'time', format: '%Y-%m-%d', precision: 'day' }}
      xFormat="time:%Y-%m-%d"
      yScale={{ type: 'linear', min: 0, max: 'auto', stacked: false, reverse: false }}
      yFormat=" >-.2f"
      curve="monotoneX"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: '%b %d',
        tickValues: 'every 2 weeks',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -45,
        legend: 'Date',
        legendOffset: 36,
        legendPosition: 'middle',
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
              stroke: '#4B5563', // Darker axis lines
            },
          },
          ticks: {
            line: {
              stroke: '#4B5563', // Darker tick lines
              strokeWidth: 1,
            },
            text: {
              fill: '#e5e7eb', // Light text for axis labels
              fontSize: 12,
            },
          },
          legend: {
            text: {
              fill: '#e5e7eb', // Light text for axis legends
              fontSize: 14,
              fontWeight: 600,
            },
          },
        },
        grid: {
          line: {
            stroke: '#374151', // Darker grid lines
            strokeWidth: 1,
            opacity: 0.5,
          },
        },
        legends: {
          text: {
            fill: '#e5e7eb', // Light text for legends
            fontSize: 12,
          },
        },
        crosshair: {
          line: {
            stroke: '#9CA3AF', // Lighter crosshair
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
          <strong>{point.data.xFormatted}</strong>: {point.data.y} commits
        </div>
      )}
    />
  );
};

export default NivoCommitChart;