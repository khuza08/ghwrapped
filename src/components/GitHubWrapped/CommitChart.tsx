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
  const commitData = Object.entries(commitsByDate)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const maxCount = Math.max(...Object.values(commitsByDate), 1);

  const totalDataPoints = commitData.length;
  const interval = Math.max(1, Math.ceil(totalDataPoints / 5));

  return (
    <div className="h-24 md:h-64 lg:h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={commitData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 8, angle: -45, dx: -10, dy: 5 }}
            interval={interval}
            tickFormatter={(value) => {
              const date = new Date(value);
              return `${date.getMonth() + 1}/${date.getDate()}`;
            }}
            height={60}
          />
          <YAxis hide={true} domain={[0, maxCount]} />
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

const getCommitColor = (count: number, maxCount: number) => {
  if (maxCount === 0) return "#374151"; // Default gray if no commits

  const intensity = count / maxCount;
  const baseValue = 40 + Math.floor(intensity * 100);
  const hexValue = baseValue.toString(16).padStart(2, "0");
  return `#${hexValue}${hexValue}${hexValue}`;
};

export default CommitChart;
