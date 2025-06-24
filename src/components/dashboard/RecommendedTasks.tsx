import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { auth } from "@/firebaseConfig"; // Adjust the import based on your project structure
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
  //const [recommendations, setRecommendations] =
  //  useState<RecommendedTask[]>(mockRecommendations);
  const [recommendations, setRecommendations] = useState<RecommendedTask[]>([]);
  const [snoozedTasks, setSnoozedTasks] = useState<Set<string>>(new Set());
  useEffect(() => {
    // fetch recommendations from Firestore
    const unsubscribe = auth.onAuthStateChanged(async (user) => {

      if (!user) return;
      try {
        const token = await user.getIdToken(); 
          const res = await fetch('http://localhost:8000/recommended-tasks',{
            headers: {
              'Authorization': `Bearer ${token}`,
          },
          });
          if (!res.ok) {
            console.error('Failed to fetch tasks:', await res.text());
              return;
      }
      const data = await res.json();
      // fix naming if needed:
      const formatted: RecommendedTask[] = data.map((task: any) => ({ 
        ...task,
        estimatedTime: task.estimated_time, // adjust if needed
      }));
      setRecommendations(formatted);  
    } catch (err){
      console.error('Error fetching tasks:', err);
      toast({
        title: "Failed to load tasks",
        description: "There was a problem connecting to the server. Please try again later.",
        variant: "destructive",
      });
      }
    });
      return () => unsubscribe();
    }, []);
  const handleAcceptTask = async (task: RecommendedTask) => {
    const user = auth.currentUser;
    if (!user) return;
    try{
      const token = await user.getIdToken();
      await fetch("http://localhost:8000/tasks/accept", {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ task_id: task.id})
      });
    onTaskAccepted(task);
    setRecommendations((prev) => prev.filter((t) => t.id !== task.id));

    toast({
      title: "Task added to planner",
      description: `"${task.title}" has been added to your daily planner.`,
      className: "bg-success/10 border-success/20",
    });
  } catch (error) {
    console.error("Error accepting task:", error);
    toast({
      title: "Failed to accept task",
      description: "There was a problem adding the task. Please try again later.",
      variant: "destructive",
    });
  }
  };

  const handleDismissTask = async (taskId: string) => {
    const user = auth.currentUser;
    if (!user) return;
    try {
      const token = await user.getIdToken();
      await fetch("http://localhost:8000/tasks/dismiss", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ task_id: taskId }),
          });

    setRecommendations((prev) => prev.filter((t) => t.id !== taskId));
    toast({
      title: "Task dismissed",
      description: "The recommendation has been removed.",
    });
  } catch (error) {
    console.error("Error dismissing task:", error);
    toast({
      title: "Failed to dismiss task",
      description: "There was a problem removing the task. Please try again later.",
      variant: "destructive",
    });
  }
  };

  const handleSnoozeTask = async (taskId: string) => {
    const user = auth.currentUser;
    if (!user) return;
    try {
      const token = await user.getIdToken();
      await fetch("http://localhost:8000/tasks/snooze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ task_id: taskId }),
      });
    
    setSnoozedTasks((prev) => new Set([...prev, taskId]));
    setRecommendations((prev) => prev.filter((t) => t.id !== taskId));
    toast({
      title: "Task snoozed",
      description: "The recommendation will appear again tomorrow.",
    });
  } catch (error) {
    console.error("Error snoozing task:", error);
    toast({
      title: "Failed to snooze task",
      description: "There was a problem snoozing the task. Please try again later.",
      variant: "destructive",
    });
  }
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
