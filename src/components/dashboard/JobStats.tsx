import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  Eye,
  MessageSquare,
  CheckCircle,
  TrendingUp,
  Clock,
} from "lucide-react";

const stats = [
  {
    title: "Applications Sent",
    value: "47",
    change: "+12",
    changeType: "increase" as const,
    description: "This month",
    icon: Send,
    color: "text-info",
    bgColor: "bg-info/10",
  },
  {
    title: "Profile Views",
    value: "234",
    change: "+18%",
    changeType: "increase" as const,
    description: "Last 30 days",
    icon: Eye,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    title: "Interviews",
    value: "8",
    change: "+3",
    changeType: "increase" as const,
    description: "This month",
    icon: MessageSquare,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    title: "Offers Received",
    value: "2",
    change: "+2",
    changeType: "increase" as const,
    description: "This month",
    icon: CheckCircle,
    color: "text-success",
    bgColor: "bg-success/10",
  },
];

const JobStats = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-3">
              <div className="text-3xl font-bold">{stat.value}</div>
              <Badge
                variant="secondary"
                className="text-xs font-semibold bg-success/10 text-success border-success/20"
              >
                <TrendingUp className="w-3 h-3 mr-1" />
                {stat.change}
              </Badge>
            </div>
            <CardDescription className="flex items-center mt-2">
              <Clock className="w-3 h-3 mr-1" />
              {stat.description}
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default JobStats;
