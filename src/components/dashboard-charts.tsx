"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import {
  projectsByType,
  projectsByRegion,
  monthlyActivity,
  mockProjects,
} from "@/lib/mock-data";

const COLORS = [
  "hsl(220, 70%, 55%)",
  "hsl(160, 60%, 45%)",
  "hsl(30, 80%, 55%)",
  "hsl(340, 65%, 50%)",
  "hsl(270, 55%, 55%)",
  "hsl(190, 70%, 45%)",
];

export function ProjectsByTypeChart() {
  const data = projectsByType.filter((d) => d.count > 0);
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={90}
          paddingAngle={4}
          dataKey="count"
          nameKey="type"
          label={({ name, value }) => `${name}: ${value}`}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function ProjectsByRegionChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={projectsByRegion}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis dataKey="region" fontSize={12} />
        <YAxis allowDecimals={false} fontSize={12} />
        <Tooltip />
        <Bar dataKey="count" fill="hsl(220, 70%, 55%)" radius={[4, 4, 0, 0]} name="Projects" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function MonthlyActivityChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={monthlyActivity}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis dataKey="month" fontSize={12} />
        <YAxis fontSize={12} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="files"
          stroke="hsl(220, 70%, 55%)"
          strokeWidth={2}
          dot={{ r: 4 }}
          name="Files uploaded"
        />
        <Line
          type="monotone"
          dataKey="projects"
          stroke="hsl(160, 60%, 45%)"
          strokeWidth={2}
          dot={{ r: 4 }}
          name="New projects"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function ProjectProgressChart() {
  const activeProjects = mockProjects
    .filter((p) => p.status === "active")
    .sort((a, b) => b.progress - a.progress);

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={activeProjects} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis type="number" domain={[0, 100]} fontSize={12} />
        <YAxis type="category" dataKey="code" width={110} fontSize={11} />
        <Tooltip formatter={(value) => `${value}%`} />
        <Bar dataKey="progress" radius={[0, 4, 4, 0]} name="Progress">
          {activeProjects.map((project, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                project.progress >= 75
                  ? "hsl(160, 60%, 45%)"
                  : project.progress >= 50
                  ? "hsl(220, 70%, 55%)"
                  : project.progress >= 25
                  ? "hsl(30, 80%, 55%)"
                  : "hsl(340, 65%, 50%)"
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
