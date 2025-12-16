import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

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

  // Only show every nth tick to prevent overcrowding
  const totalDataPoints = commitData.length;
  const interval = Math.max(1, Math.ceil(totalDataPoints / 5)); // Show max 5 labels

  return (
    <div className="h-24 md:h-64 lg:h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={commitData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 8, angle: -45, dx: -10, dy: 5 }}
            interval={interval} // Only show every nth tick
            tickFormatter={(value) => {
              // Show only month and day to keep it readable
              const date = new Date(value);
              return `${date.getMonth() + 1}/${date.getDate()}`;
            }}
            height={60}
          />
          <YAxis
            hide={true} // Hide Y axis to save space
            domain={[0, maxCount]}
          />
          <Tooltip
            formatter={(value) => [`${value}`, "Commits"]}
            labelFormatter={(value) => `Date: ${value}`}
            contentStyle={{ fontSize: "12px" }}
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
