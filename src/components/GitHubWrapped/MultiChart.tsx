'use client';

import { useState } from 'react';
import LineChart from './Charts/LineChart';
import BarChart from './Charts/BarChart';
import CalendarChart from './Charts/CalendarChart';

interface MultiChartProps {
  commitsByDate: Record<string, number>;
}

const MultiChart: React.FC<MultiChartProps> = ({ commitsByDate }) => {
  const [chartType, setChartType] = useState<'line' | 'bar' | 'calendar'>('line');

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
        <button
          className={`px-4 py-2 rounded-lg transition-colors ${
            chartType === 'calendar'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          onClick={() => setChartType('calendar')}
        >
          Calendar
        </button>
      </div>

      <div className="h-[calc(100%-60px)]">
        {chartType === 'line' ? (
          <LineChart commitsByDate={commitsByDate} />
        ) : chartType === 'bar' ? (
          <BarChart commitsByDate={commitsByDate} />
        ) : (
          <CalendarChart commitsByDate={commitsByDate} />
        )}
      </div>
    </div>
  );
};

export default MultiChart;