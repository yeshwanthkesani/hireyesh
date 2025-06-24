import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, Clock, AlertCircle } from "lucide-react";
import { useState } from "react";
import RecommendedTasks from "./RecommendedTasks";
import {useEffect} from "react";
import { auth } from "@/firebaseConfig";
import {toast} from "@/hooks/use-toast"

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: "high" | "medium" | "low";
  time?: string;
  completed: boolean;
  type: "application" | "interview" | "follow-up" | "research" | "networking";
  status?: "accepted" | "completed" | "snoozed" | "dismissed"| 'pending';
}

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

// const initialTasks: Task[] = [
//   {
//     id: "1",
//     title: "Follow up with TechCorp",
//     description: "Send thank you email after yesterday's interview",
//     priority: "high",
//     time: "10:00 AM",
//     completed: false,
//     type: "follow-up",
//   },
//   {
//     id: "2",
//     title: "Complete application for Google",
//     description: "Software Engineer position - deadline today",
//     priority: "high",
//     time: "2:00 PM",
//     completed: false,
//     type: "application",
//   },
//   {
//     id: "3",
//     title: "Research startup companies",
//     description: "Find 5 potential companies in fintech space",
//     priority: "medium",
//     completed: false,
//     type: "research",
//   },
//   {
//     id: "4",
//     title: "Update LinkedIn profile",
//     description: "Add recent projects and skills",
//     priority: "low",
//     completed: true,
//     type: "networking",
//   },
//   {
//     id: "5",
//     title: "Prepare for Amazon interview",
//     description: "Review system design concepts",
//     priority: "high",
//     time: "Tomorrow 11:00 AM",
//     completed: false,
//     type: "interview",
//   },
// ];

const priorityColors = {
  high: "bg-destructive/10 text-destructive border-destructive/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  low: "bg-success/10 text-success border-success/20",
};

const typeColors = {
  application: "bg-info/10 text-info",
  interview: "bg-warning/10 text-warning",
  "follow-up": "bg-success/10 text-success",
  research: "bg-muted text-muted-foreground",
  networking: "bg-primary/10 text-primary",
};

const DailyPlanner = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged ( async(user) => { 
      
      if (!user) return;
      try {
        const token = await user.getIdToken();
        const response = await fetch("http://localhost:8000/planner-tasks",{
          headers:{
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
    }
    const data = await response.json();
    const formatted: Task[] = data.map((task: any) => ({
          id: task.id,
          title: task.title,
          description: task.description || "",
          priority: task.priority,
          time: task.time,
          completed: task.completed === "completed",
          type: task.type,
        }));
        setTasks(formatted);
      } catch (error) {
        console.error("Error fetching planner tasks:", error);
        toast({
          title: "Error",
          description: "Failed to load tasks. Please try again later.",
          variant: "destructive",
        });
      }
    });
    return () => unsubscribe();
    }, []);

  const toggleTask = async (taskId: string, completed: boolean) => {
    const user = auth.currentUser;
    if (!user) return;
    try {
      const token = await user.getIdToken();
      const response = await fetch(`http://localhost:8000/tasks/complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ task_id: taskId, completed }),
      });
      if (!response.ok) {
        throw new Error("Failed to update task");
      }
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed } : task
    )
    );
    } catch (error) {
      console.error("Error updating task:", error);
      toast({
        title: "Error",
        description: "Failed to update task. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const addTaskFromRecommendation = (recommendedTask: RecommendedTask) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: recommendedTask.title,
      description: recommendedTask.description,
      priority: recommendedTask.priority,
      type: recommendedTask.type,
      completed: false,
      time: recommendedTask.estimatedTime
        ? `Est. ${recommendedTask.estimatedTime}`
        : undefined,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="space-y-6">
      {/* Recommended Tasks */}
      <RecommendedTasks onTaskAccepted={addTaskFromRecommendation} />

      {/* Daily Planner */}
      <Card className="col-span-1">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Daily Planner</CardTitle>
              <CardDescription className="flex items-center mt-2">
                <Calendar className="w-4 h-4 mr-2" />
                Today • {completedTasks} of {totalTasks} completed
              </CardDescription>
            </div>
            <Button size="sm" className="h-8">
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-start space-x-3 p-3 rounded-lg border transition-all ${
                  task.completed
                    ? "bg-muted/50 border-muted"
                    : "bg-card border-border hover:bg-accent/50"
                }`}
              >
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={(checked) => toggleTask(task.id, !!checked)}
                  className="mt-0.5"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4
                      className={`font-medium text-sm ${
                        task.completed
                          ? "line-through text-muted-foreground"
                          : ""
                      }`}
                    >
                      {task.title}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant="outline"
                        className={`text-xs ${priorityColors[task.priority]}`}
                      >
                        {task.priority === "high" && (
                          <AlertCircle className="w-3 h-3 mr-1" />
                        )}
                        {task.priority}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={`text-xs ${typeColors[task.type]}`}
                      >
                        {task.type}
                      </Badge>
                    </div>
                  </div>
                  {task.description && (
                    <p
                      className={`text-sm ${
                        task.completed
                          ? "line-through text-muted-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {task.description}
                    </p>
                  )}
                  {task.time && (
                    <div className="flex items-center mt-2">
                      <Clock className="w-3 h-3 mr-1 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {task.time}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyPlanner;
