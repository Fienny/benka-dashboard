import {
  FolderKanban,
  FileText,
  Users,
  TrendingUp,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardMetrics } from "@/lib/mock-data";
import {
  ProjectsByTypeChart,
  ProjectsByRegionChart,
  MonthlyActivityChart,
  ProjectProgressChart,
} from "@/components/dashboard-charts";

const stats = [
  {
    title: "Total Projects",
    value: dashboardMetrics.totalProjects,
    icon: FolderKanban,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Active Projects",
    value: dashboardMetrics.activeProjects,
    icon: Activity,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    title: "Completed",
    value: dashboardMetrics.completedProjects,
    icon: CheckCircle2,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    title: "Total Files",
    value: dashboardMetrics.totalFiles,
    icon: FileText,
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    title: "Team Members",
    value: dashboardMetrics.totalMembers,
    icon: Users,
    color: "text-pink-600",
    bg: "bg-pink-50",
  },
  {
    title: "Avg Progress",
    value: `${dashboardMetrics.avgProgress}%`,
    icon: TrendingUp,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Overview of all projects, metrics and team activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`rounded-lg p-2 ${stat.bg}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{stat.title}</p>
                  <p className="text-xl font-bold">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Projects by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ProjectsByTypeChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Projects by Region</CardTitle>
          </CardHeader>
          <CardContent>
            <ProjectsByRegionChart />
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Monthly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <MonthlyActivityChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Active Projects Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ProjectProgressChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
