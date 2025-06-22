import { useState, useEffect } from "react";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BarChart3,
  Send,
  Eye,
  MessageSquare,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Clock,
  Download,
  Users,
  Target,
  FileText,
  Calendar,
  Award,
  Zap,
  Star,
  Info,
} from "lucide-react";

interface CareerStage {
  id: string;
  name: string;
  description: string;
  color: string;
  progress: number;
  nextStage: string;
  avatar: string;
}

interface ApplicationMetric {
  title: string;
  count: number;
  change: number;
  changeType: "increase" | "decrease";
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface ResponseMetric {
  title: string;
  value: string;
  change: number;
  changeType: "increase" | "decrease";
  description: string;
}

interface DocumentVersion {
  id: string;
  name: string;
  views: number;
  interviews: number;
  atsScore: number;
  optimizationTips: string[];
}

interface WeeklyActivity {
  week: string;
  applications: number;
  messages: number;
  interviews: number;
}

const JobSearchAnalytics = () => {
  const [selectedDocument, setSelectedDocument] = useState("v1");
  const [hoveredAvatar, setHoveredAvatar] = useState(false);
  const [chartsLoaded, setChartsLoaded] = useState(false);

  useEffect(() => {
    // Simulate chart loading animation
    const timer = setTimeout(() => setChartsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const careerStages: CareerStage[] = [
    {
      id: "starter",
      name: "Starter",
      description: "Beginning your job search journey",
      color: "bg-blue-500",
      progress: 100,
      nextStage: "Explorer",
      avatar: "🌱",
    },
    {
      id: "explorer",
      name: "Explorer",
      description: "Actively searching and networking",
      color: "bg-purple-500",
      progress: 65,
      nextStage: "Interviewing",
      avatar: "🔍",
    },
    {
      id: "interviewing",
      name: "Interviewing",
      description: "In the interview process",
      color: "bg-orange-500",
      progress: 30,
      nextStage: "Winner",
      avatar: "💼",
    },
    {
      id: "winner",
      name: "Winner",
      description: "Successfully landed offers",
      color: "bg-green-500",
      progress: 100,
      nextStage: "Career Growth",
      avatar: "🏆",
    },
  ];

  const currentStage = careerStages[1]; // Explorer stage

  const applicationMetrics: ApplicationMetric[] = [
    {
      title: "Applications Sent",
      count: 47,
      change: 12,
      changeType: "increase",
      icon: Send,
      color: "text-blue-500",
    },
    {
      title: "Profile Views",
      count: 234,
      change: 18,
      changeType: "increase",
      icon: Eye,
      color: "text-green-500",
    },
    {
      title: "Interviews",
      count: 8,
      change: 3,
      changeType: "increase",
      icon: MessageSquare,
      color: "text-purple-500",
    },
    {
      title: "Offers",
      count: 2,
      change: 2,
      changeType: "increase",
      icon: CheckCircle,
      color: "text-orange-500",
    },
  ];

  const responseMetrics: ResponseMetric[] = [
    {
      title: "Response Rate",
      value: "32%",
      change: 8,
      changeType: "increase",
      description: "Responses received from applications",
    },
    {
      title: "Interview Ratio",
      value: "17%",
      change: 5,
      changeType: "increase",
      description: "Applications that led to interviews",
    },
    {
      title: "Viewed-No-Reply",
      value: "28%",
      change: -3,
      changeType: "decrease",
      description: "Profile views without response",
    },
    {
      title: "Avg. Response Time",
      value: "5.2 days",
      change: -12,
      changeType: "decrease",
      description: "Average time to receive responses",
    },
  ];

  const documentVersions: DocumentVersion[] = [
    {
      id: "v1",
      name: "Original Resume V1",
      views: 45,
      interviews: 3,
      atsScore: 78,
      optimizationTips: [
        "Add more relevant keywords",
        "Quantify achievements with metrics",
        "Improve skills section formatting",
      ],
    },
    {
      id: "tailored",
      name: "Tailored for Tech",
      views: 32,
      interviews: 5,
      atsScore: 92,
      optimizationTips: [
        "Excellent ATS optimization",
        "Consider adding leadership examples",
      ],
    },
    {
      id: "startup",
      name: "Startup Resume",
      views: 28,
      interviews: 4,
      atsScore: 85,
      optimizationTips: [
        "Great for startup culture",
        "Add more collaborative project examples",
      ],
    },
  ];

  const weeklyActivity: WeeklyActivity[] = [
    { week: "Week 1", applications: 8, messages: 12, interviews: 1 },
    { week: "Week 2", applications: 12, messages: 15, interviews: 2 },
    { week: "Week 3", applications: 10, messages: 18, interviews: 2 },
    { week: "Week 4", applications: 17, messages: 22, interviews: 3 },
  ];

  const selectedDoc = documentVersions.find(
    (doc) => doc.id === selectedDocument,
  );

  const downloadCSV = () => {
    const csvContent = [
      ["Week", "Applications Sent", "Messages Sent", "Interviews Scheduled"],
      ...weeklyActivity.map((week) => [
        week.week,
        week.applications,
        week.messages,
        week.interviews,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "job-search-activity.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />

          <main className="flex-1 p-4 lg:p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Header with Avatar */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground flex items-center">
                    <BarChart3 className="h-8 w-8 mr-3 text-primary" />
                    Job Search Analytics
                  </h1>
                  <p className="text-muted-foreground mt-2">
                    Track your progress and optimize your job search strategy
                  </p>
                </div>

                {/* Animated Avatar Section */}
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Your Career Stage:
                      </div>
                      <Badge
                        variant="secondary"
                        className={`${currentStage.color} text-white font-semibold`}
                      >
                        {currentStage.name}
                      </Badge>
                    </div>
                    <div
                      className={`relative w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-2xl cursor-pointer transition-all duration-300 ${
                        hoveredAvatar ? "scale-110 rotate-12" : ""
                      }`}
                      onMouseEnter={() => setHoveredAvatar(true)}
                      onMouseLeave={() => setHoveredAvatar(false)}
                    >
                      <span className="animate-bounce">
                        {currentStage.avatar}
                      </span>
                      {hoveredAvatar && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-sm animate-pulse">
                          👋
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 w-48">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>Level 2: {currentStage.name}</span>
                      <span>
                        {currentStage.progress}% to {currentStage.nextStage}
                      </span>
                    </div>
                    <Progress value={currentStage.progress} className="h-2" />
                  </div>
                </div>
              </div>

              {/* Section 1: Application Funnel */}
              <section>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Application Funnel
                </h2>
                <div className="grid gap-4 md:grid-cols-4">
                  {applicationMetrics.map((metric, index) => (
                    <Card
                      key={metric.title}
                      className="relative overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <metric.icon className={`h-5 w-5 ${metric.color}`} />
                          <Badge
                            variant={
                              metric.changeType === "increase"
                                ? "default"
                                : "secondary"
                            }
                            className={`text-xs ${
                              metric.changeType === "increase"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {metric.changeType === "increase" ? (
                              <TrendingUp className="w-3 h-3 mr-1" />
                            ) : (
                              <TrendingDown className="w-3 h-3 mr-1" />
                            )}
                            {metric.change > 0 ? "+" : ""}
                            {metric.change}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="text-3xl font-bold">
                            {metric.count}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {metric.title}
                          </div>
                          <Progress
                            value={
                              index === 0
                                ? 100
                                : index === 1
                                  ? 80
                                  : index === 2
                                    ? 60
                                    : 40
                            }
                            className="h-1"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Section 2: Response Metrics */}
              <section>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Response Metrics
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {responseMetrics.map((metric) => (
                    <Card
                      key={metric.title}
                      className="hover:shadow-lg transition-shadow"
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                          {metric.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-baseline space-x-2">
                            <div className="text-2xl font-bold">
                              {metric.value}
                            </div>
                            <Badge
                              variant="secondary"
                              className={`text-xs ${
                                metric.changeType === "increase"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {metric.changeType === "increase" ? "+" : ""}
                              {metric.change}%
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {metric.description}
                          </div>
                          {/* Simple bar chart representation */}
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                metric.changeType === "increase"
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }`}
                              style={{
                                width: `${Math.abs(metric.change) * 2 + 20}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Section 3: Resume & Cover Letter Insights */}
              <section>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Resume & Cover Letter Insights
                </h2>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Document Performance</CardTitle>
                      <Select
                        value={selectedDocument}
                        onValueChange={setSelectedDocument}
                      >
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {documentVersions.map((doc) => (
                            <SelectItem key={doc.id} value={doc.id}>
                              {doc.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {selectedDoc && (
                      <div className="grid gap-6 md:grid-cols-3">
                        <div className="space-y-4">
                          <h4 className="font-semibold">Performance Metrics</h4>
                          <div className="grid gap-3">
                            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                              <div className="flex items-center space-x-2">
                                <Eye className="h-4 w-4 text-blue-500" />
                                <span className="text-sm">Views</span>
                              </div>
                              <span className="font-semibold">
                                {selectedDoc.views}
                              </span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                              <div className="flex items-center space-x-2">
                                <MessageSquare className="h-4 w-4 text-green-500" />
                                <span className="text-sm">Interviews</span>
                              </div>
                              <span className="font-semibold">
                                {selectedDoc.interviews}
                              </span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                              <div className="flex items-center space-x-2">
                                <Award className="h-4 w-4 text-purple-500" />
                                <span className="text-sm">ATS Score</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold">
                                  {selectedDoc.atsScore}/100
                                </span>
                                <Badge
                                  variant={
                                    selectedDoc.atsScore >= 90
                                      ? "default"
                                      : selectedDoc.atsScore >= 75
                                        ? "secondary"
                                        : "outline"
                                  }
                                  className={
                                    selectedDoc.atsScore >= 90
                                      ? "bg-green-100 text-green-800"
                                      : selectedDoc.atsScore >= 75
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                                  }
                                >
                                  {selectedDoc.atsScore >= 90
                                    ? "Excellent"
                                    : selectedDoc.atsScore >= 75
                                      ? "Good"
                                      : "Needs Work"}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="md:col-span-2 space-y-4">
                          <h4 className="font-semibold flex items-center">
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-4 w-4 mr-2 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>AI-powered optimization suggestions</p>
                              </TooltipContent>
                            </Tooltip>
                            Optimization Tips
                          </h4>
                          <div className="space-y-2">
                            {selectedDoc.optimizationTips.map((tip, index) => (
                              <div
                                key={index}
                                className="flex items-start space-x-2 p-3 bg-blue-50 border border-blue-200 rounded-lg"
                              >
                                <Zap className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                                <span className="text-sm text-blue-800">
                                  {tip}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </section>

              {/* Section 4: Weekly Activity */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Weekly Activity
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadCSV}
                    className="flex items-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download CSV</span>
                  </Button>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {/* Activity Chart */}
                      <div className="grid gap-4">
                        {weeklyActivity.map((week, index) => (
                          <div
                            key={week.week}
                            className="grid grid-cols-4 gap-4 items-center p-4 rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <div className="font-medium">{week.week}</div>
                            <div className="space-y-1">
                              <div className="text-sm text-muted-foreground">
                                Applications
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-full bg-muted rounded-full h-2">
                                  <div
                                    className="bg-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
                                    style={{
                                      width: chartsLoaded
                                        ? `${(week.applications / 20) * 100}%`
                                        : "0%",
                                    }}
                                  ></div>
                                </div>
                                <span className="text-sm font-semibold w-8">
                                  {week.applications}
                                </span>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="text-sm text-muted-foreground">
                                Messages
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-full bg-muted rounded-full h-2">
                                  <div
                                    className="bg-green-500 h-2 rounded-full transition-all duration-1000 ease-out"
                                    style={{
                                      width: chartsLoaded
                                        ? `${(week.messages / 25) * 100}%`
                                        : "0%",
                                    }}
                                  ></div>
                                </div>
                                <span className="text-sm font-semibold w-8">
                                  {week.messages}
                                </span>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="text-sm text-muted-foreground">
                                Interviews
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-full bg-muted rounded-full h-2">
                                  <div
                                    className="bg-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
                                    style={{
                                      width: chartsLoaded
                                        ? `${(week.interviews / 5) * 100}%`
                                        : "0%",
                                    }}
                                  ></div>
                                </div>
                                <span className="text-sm font-semibold w-8">
                                  {week.interviews}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Summary Stats */}
                      <div className="border-t pt-4">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-blue-500">
                              {weeklyActivity.reduce(
                                (sum, week) => sum + week.applications,
                                0,
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Total Applications
                            </div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-green-500">
                              {weeklyActivity.reduce(
                                (sum, week) => sum + week.messages,
                                0,
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Total Messages
                            </div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-purple-500">
                              {weeklyActivity.reduce(
                                (sum, week) => sum + week.interviews,
                                0,
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Total Interviews
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default JobSearchAnalytics;
