import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface CommitChartProps {
  commitsByDate: Record<string, number>;
}

const CommitChart: React.FC<CommitChartProps> = ({ commitsByDate }) => {
  // Convert the commitsByDate object to an array of objects for Recharts
  const commitData = Object.entries(commitsByDate)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Get max commit count for color scaling
  const maxCount = Math.max(...Object.values(commitsByDate), 1);

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={commitData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => {
              // Show only month and day to keep it readable
              const date = new Date(value);
              return `${date.getMonth() + 1}/${date.getDate()}`;
            }}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            label={{ value: 'Commits', angle: -90, position: 'insideLeft', offset: -5 }}
          />
          <Tooltip 
            formatter={(value) => [value, 'Commits']}
            labelFormatter={(value) => `Date: ${value}`}
          />
          <Bar dataKey="count" name="Commits">
            {commitData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={getCommitColor(entry.count, maxCount)} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Helper function to get color based on commit count
const getCommitColor = (count: number, maxCount: number) => {
  // Create a gradient from light blue to dark blue based on commit count
  const intensity = count / maxCount;
  const r = 135 + Math.floor(120 * (1 - intensity));
  const g = 206 + Math.floor(49 * (1 - intensity));
  const b = 235 + Math.floor(20 * (1 - intensity));
  return `rgb(${r}, ${g}, ${b})`;
};

export default CommitChart;