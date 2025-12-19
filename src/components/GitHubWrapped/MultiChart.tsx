'use client';

import { useState, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveBar } from '@nivo/bar';

interface MultiChartProps {
  commitsByDate: Record<string, number>;
}

const MultiChart: React.FC<MultiChartProps> = ({ commitsByDate }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  const [processedData, setProcessedData] = useState<{lineData: any; barData: any}>({lineData: [], barData: []});

  useEffect(() => {
    setIsMounted(true);

    // Preprocess data to be safe for Nivo
    if (!commitsByDate) {
      setProcessedData({lineData: [{ id: 'commits', data: [] }], barData: []});
      return;
    }

    const entries = Object.entries(commitsByDate);

    // Take only significant data points to keep chart readable
    // Filter to only dates with commits > 0 and sample evenly if too many
    const filteredEntries = entries
      .filter(([date, commits]) => commits !== undefined && commits !== null && commits > 0)
      .map(([date, commits]) => {
        const dateObj = new Date(date);
        if (isNaN(dateObj.getTime())) return null;
        return { date, commits, dateObj };
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
    const lineData = {
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

    // Create safe data for bar chart
    const barData = sampledEntries
      .map(({ date, commits, dateObj }) => {
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        return { date: `${month}/${day}`, commits };
      })
      .sort((a, b) => a.date.localeCompare(b.date));

    setProcessedData({ lineData: [lineData], barData });
  }, [commitsByDate]);

  if (!isMounted) {
    return (
      <div className="w-full h-full bg-gray-800/50 rounded-lg flex items-center justify-center">
        Loading chart...
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <div className="flex justify-center mb-4 space-x-2">
        <button
          className={`px-4 py-2 rounded-lg transition-colors ${
            chartType === 'line'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          onClick={() => setChartType('line')}
        >
          Line Chart
        </button>
        <button
          className={`px-4 py-2 rounded-lg transition-colors ${
            chartType === 'bar'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          onClick={() => setChartType('bar')}
        >
          Bar Chart
        </button>
      </div>

      <div className="h-[calc(100%-60px)]">
        {chartType === 'line' ? (
          <ResponsiveLine
            data={processedData.lineData}
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
        ) : (
          <ResponsiveBar
            data={processedData.barData}
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
        )}
      </div>
    </div>
  );
};

export default MultiChart;