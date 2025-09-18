import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import MetricCard from "@/components/MetricCard";
import SeniorsTable from "@/components/SeniorsTable";
import { 
  AlertTriangle, 
  Database, 
  Heart, 
  Calendar, 
  Users, 
  Activity,
  TrendingUp,
  Weight,
  Brain
} from "lucide-react";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const metricsData = [
    {
      title: "Alerts",
      value: 1,
      icon: AlertTriangle,
      color: "green" as const,
      trend: { current: 0, target: 5 },
      tooltip: "Critical alerts requiring immediate attention. Low numbers indicate good system health."
    },
    {
      title: "Missing Data",
      value: 58,
      icon: Database,
      color: "yellow" as const,
      trend: { current: 4, target: 40 },
      tooltip: "Seniors with incomplete or outdated health data. Regular data collection ensures better care."
    },
    {
      title: "Care Requests", 
      value: 0,
      icon: Heart,
      color: "blue" as const,
      tooltip: "Active care requests from seniors or family members. Zero indicates no pending requests."
    },
    {
      title: "Expiring Care Plans",
      value: 0,
      icon: Calendar,
      color: "green" as const,
      trend: { current: 0, target: 5 },
      tooltip: "Care plans that need renewal soon. Proactive management prevents service gaps."
    },
    {
      title: "Enrolled Seniors",
      value: 61,
      icon: Users,
      color: "yellow" as const,
      trend: { current: 5, target: 10 },
      tooltip: "Total number of seniors actively enrolled in the care program."
    },
    {
      title: "Open Alerts",
      value: 10,
      icon: AlertTriangle,
      color: "yellow" as const,
      trend: { current: 3, target: 8 },
      tooltip: "Alerts that are still being investigated or resolved. Track progress on ongoing issues."
    },
    {
      title: "Weight Trends",
      value: "—",
      icon: Weight,
      color: "gray" as const,
      tooltip: "Overall weight trend analysis across all seniors. Stable trends indicate good nutritional health."
    },
    {
      title: "Caregiver Triage Trend",
      value: 3,
      icon: TrendingUp,
      color: "yellow" as const,
      trend: { current: 0, target: 10 },
      tooltip: "Number of cases requiring caregiver triage in the past 7 days."
    },
    {
      title: "AI Companion Trend",
      value: 0,
      icon: Brain,
      color: "yellow" as const,
      trend: { current: 0, target: 10 },
      tooltip: "AI companion interactions and engagement levels. Higher engagement indicates better senior satisfaction."
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Skeleton for metrics grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <Card key={i} className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-4 rounded" />
                  </div>
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-2 w-full rounded" />
                </div>
              </Card>
            ))}
          </div>
          
          {/* Skeleton for table */}
          <Card className="p-6">
            <div className="space-y-4">
              <Skeleton className="h-6 w-48" />
              <div className="space-y-2">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metricsData.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              icon={metric.icon}
              color={metric.color}
              trend={metric.trend}
              tooltip={metric.tooltip}
              onClick={() => console.log(`Clicked ${metric.title}`)}
            />
          ))}
        </div>

        {/* Seniors Table */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Seniors Management</CardTitle>
          </CardHeader>
          <CardContent>
            <SeniorsTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;