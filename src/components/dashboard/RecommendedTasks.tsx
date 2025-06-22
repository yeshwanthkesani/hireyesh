import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import {
  Sparkles,
  Check,
  X,
  Clock,
  Target,
  Users,
  Briefcase,
  FileText,
  TrendingUp,
} from "lucide-react";

interface RecommendedTask {
  id: string;
  title: string;
  description: string;
  tags: string[];
  priority: "high" | "medium" | "low";
  type: "application" | "interview" | "follow-up" | "research" | "networking";
  estimatedTime?: string;
  reason: string;
}

interface RecommendedTasksProps {
  onTaskAccepted: (task: RecommendedTask) => void;
}

const mockRecommendations: RecommendedTask[] = [
  {
    id: "rec-1",
    title: "Apply to Microsoft Senior Developer role",
    description:
      "High-match position based on your React and TypeScript skills. Application deadline in 3 days.",
    tags: ["High Match", "React", "TypeScript", "Urgent"],
    priority: "high",
    type: "application",
    estimatedTime: "45 min",
    reason: "95% skill match with your profile",
  },
  {
    id: "rec-2",
    title: "Connect with Sarah Chen on LinkedIn",
    description:
      "Senior Engineering Manager at Meta. You have 3 mutual connections and similar background.",
    tags: ["Networking", "Meta", "Mutual Connections"],
    priority: "medium",
    type: "networking",
    estimatedTime: "10 min",
    reason: "Strategic networking opportunity",
  },
  {
    id: "rec-3",
    title: "Research Stripe's engineering culture",
    description:
      "Upcoming interview next week. Understand their values and recent tech initiatives.",
    tags: ["Interview Prep", "Stripe", "Company Research"],
    priority: "high",
    type: "research",
    estimatedTime: "30 min",
    reason: "Interview scheduled for next week",
  },
  {
    id: "rec-4",
    title: "Update portfolio with recent projects",
    description:
      "Add your latest React dashboard and resume builder projects. 67% of your applied roles mention portfolio review.",
    tags: ["Portfolio", "Projects", "Showcase"],
    priority: "medium",
    type: "application",
    estimatedTime: "2 hours",
    reason: "Requested in 67% of your applications",
  },
];

const typeIcons = {
  application: Briefcase,
  interview: Users,
  "follow-up": Check,
  research: FileText,
  networking: Users,
};

const priorityColors = {
  high: "bg-destructive/10 text-destructive border-destructive/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  low: "bg-success/10 text-success border-success/20",
};

const RecommendedTasks = ({ onTaskAccepted }: RecommendedTasksProps) => {
  const [recommendations, setRecommendations] =
    useState<RecommendedTask[]>(mockRecommendations);
  const [snoozedTasks, setSnoozedTasks] = useState<Set<string>>(new Set());

  const handleAcceptTask = (task: RecommendedTask) => {
    onTaskAccepted(task);
    setRecommendations((prev) => prev.filter((t) => t.id !== task.id));

    toast({
      title: "Task added to planner",
      description: `"${task.title}" has been added to your daily planner.`,
      className: "bg-success/10 border-success/20",
    });
  };

  const handleDismissTask = (taskId: string) => {
    setRecommendations((prev) => prev.filter((t) => t.id !== taskId));
    toast({
      title: "Task dismissed",
      description: "The recommendation has been removed.",
    });
  };

  const handleSnoozeTask = (taskId: string) => {
    setSnoozedTasks((prev) => new Set([...prev, taskId]));
    setRecommendations((prev) => prev.filter((t) => t.id !== taskId));
    toast({
      title: "Task snoozed",
      description: "The recommendation will appear again tomorrow.",
    });
  };

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <Card className="mb-6">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-lg">
          <Sparkles className="h-5 w-5 mr-2 text-primary" />
          Recommended Tasks
          <Badge variant="secondary" className="ml-2 text-xs">
            AI Powered
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 md:grid-cols-2">
          {recommendations.map((task) => {
            const TypeIcon = typeIcons[task.type];
            return (
              <div
                key={task.id}
                className="p-4 rounded-lg border bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 hover:from-yellow-100 hover:to-yellow-150 transition-all"
              >
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <TypeIcon className="h-4 w-4 text-yellow-700 shrink-0" />
                      <h4 className="font-semibold text-sm text-yellow-900 leading-tight">
                        {task.title}
                      </h4>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Badge
                        variant="outline"
                        className={`text-xs h-5 ${priorityColors[task.priority]}`}
                      >
                        {task.priority}
                      </Badge>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-yellow-800 leading-relaxed">
                    {task.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {task.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs h-5 bg-yellow-200 text-yellow-800 border-yellow-300"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Meta info */}
                  <div className="flex items-center justify-between text-xs text-yellow-700">
                    <div className="flex items-center space-x-3">
                      {task.estimatedTime && (
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{task.estimatedTime}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        <Target className="h-3 w-3" />
                        <span>{task.reason}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center space-x-1">
                      <Button
                        size="sm"
                        onClick={() => handleAcceptTask(task)}
                        className="h-7 px-3 text-xs bg-success hover:bg-success/90 text-success-foreground"
                      >
                        <Check className="h-3 w-3 mr-1" />
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDismissTask(task.id)}
                        className="h-7 px-3 text-xs border-yellow-300 text-yellow-700 hover:bg-yellow-200"
                      >
                        <X className="h-3 w-3 mr-1" />
                        Dismiss
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleSnoozeTask(task.id)}
                      className="h-7 w-7 p-0 text-yellow-600 hover:bg-yellow-200"
                    >
                      <Clock className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="mt-4 pt-3 border-t border-yellow-200">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-yellow-700">
              <TrendingUp className="h-4 w-4" />
              <span>
                {recommendations.length} AI-generated recommendation
                {recommendations.length !== 1 ? "s" : ""} based on your profile
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-yellow-600 hover:bg-yellow-200"
            >
              View All Suggestions
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendedTasks;
