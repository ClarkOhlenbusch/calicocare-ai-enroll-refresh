import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle, 
  Users, 
  Calendar, 
  TrendingUp, 
  Search,
  Filter,
  Eye,
  MoreHorizontal,
  Activity,
  Brain,
  Weight,
  Heart
} from "lucide-react";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Critical metrics that need immediate attention
  const criticalMetrics = [
    { label: "Active Alerts", value: 1, status: "critical", icon: AlertTriangle, trend: "+0" },
    { label: "Missing Data", value: 58, status: "warning", icon: Activity, trend: "+3" },
    { label: "Care Requests", value: 0, status: "good", icon: Heart, trend: "0" },
  ];

  // Overview metrics for general monitoring
  const overviewMetrics = [
    { label: "Enrolled Seniors", value: 61, status: "stable", icon: Users, trend: "+2" },
    { label: "Expiring Care Plans", value: 0, status: "good", icon: Calendar, trend: "0" },
    { label: "Open Alerts", value: 10, status: "attention", icon: AlertTriangle, trend: "-2" },
  ];

  // Trend metrics for insights
  const trendMetrics = [
    { label: "Weight Trends", value: "Stable", icon: Weight, change: "2% improvement" },
    { label: "Caregiver Engagement", value: "85%", icon: TrendingUp, change: "+5% this week" },
    { label: "AI Insights", value: "12 New", icon: Brain, change: "3 high priority" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "text-destructive";
      case "warning": return "text-orange-600";
      case "attention": return "text-blue-600";
      case "good": return "text-green-600";
      default: return "text-muted-foreground";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "critical": return "destructive";
      case "warning": return "outline";
      case "attention": return "secondary";
      case "good": return "outline";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h1>
          <p className="text-muted-foreground">
            Monitor your patients' care status and system alerts in real-time
          </p>
        </div>

        {/* Critical Alerts Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-destructive" />
            Immediate Attention Required
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {criticalMetrics.map((metric, index) => (
              <Card key={index} className="shadow-medium border-l-4 border-l-primary hover:shadow-large transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-muted ${getStatusColor(metric.status)}`}>
                        <metric.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{metric.label}</p>
                        <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={getStatusBadge(metric.status)} className="mb-2">
                        {metric.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground">{metric.trend}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-4"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Dashboard Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <TabsList className="grid w-full sm:w-auto grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="patients">Patients</TabsTrigger>
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search patients, alerts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <TabsContent value="overview" className="space-y-6">
            {/* Overview Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {overviewMetrics.map((metric, index) => (
                <Card key={index} className="shadow-soft hover:shadow-medium transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {metric.label}
                      </CardTitle>
                      <metric.icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-foreground">{metric.value}</span>
                      <Badge variant="outline" className="text-xs">
                        {metric.trend}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Trend Insights */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Health & Care Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {trendMetrics.map((trend, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                      <trend.icon className="w-8 h-8 text-primary" />
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{trend.label}</h4>
                        <p className="text-2xl font-bold text-foreground">{trend.value}</p>
                        <p className="text-sm text-muted-foreground">{trend.change}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patients" className="space-y-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Patient Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Detailed patient information and care management tools.
                </p>
                <Button>
                  <Users className="w-4 h-4 mr-2" />
                  View All Patients
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="w-5 h-5 mr-2" />
                  AI-Powered Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Intelligent analysis and recommendations for patient care.
                </p>
                <Button>
                  <Brain className="w-4 h-4 mr-2" />
                  View AI Recommendations
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;