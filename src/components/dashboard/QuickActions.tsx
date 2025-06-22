import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  Search,
  FileText,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";

const actions = [
  {
    title: "Upload Resume",
    description: "Update your resume and portfolio",
    icon: Upload,
    color: "bg-primary text-primary-foreground hover:bg-primary/90",
    featured: true,
  },
  {
    title: "Find Jobs",
    description: "Discover new opportunities",
    icon: Search,
    color: "bg-info text-info-foreground hover:bg-info/90",
    featured: true,
  },
  {
    title: "Generate Cover Letter",
    description: "AI-powered cover letters",
    icon: FileText,
    color: "bg-card text-card-foreground border hover:bg-accent",
    featured: false,
  },
  {
    title: "Network Contacts",
    description: "Manage your connections",
    icon: Users,
    color: "bg-card text-card-foreground border hover:bg-accent",
    featured: false,
  },
  {
    title: "Analytics",
    description: "View detailed reports",
    icon: BarChart3,
    color: "bg-card text-card-foreground border hover:bg-accent",
    featured: false,
  },
  {
    title: "Account Settings",
    description: "Manage preferences",
    icon: Settings,
    color: "bg-card text-card-foreground border hover:bg-accent",
    featured: false,
  },
];

const QuickActions = () => {
  const navigate = useNavigate();
  const featuredActions = actions.filter((action) => action.featured);
  const otherActions = actions.filter((action) => !action.featured);

  const handleActionClick = (actionTitle: string) => {
    if (actionTitle === "Generate Cover Letter") {
      navigate("/generate-cover-letter");
    } else if (actionTitle === "Analytics") {
      navigate("/analytics");
    }
    // Add other navigation logic here as needed
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Quick Actions</CardTitle>
        <CardDescription>Common tasks to boost your job search</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Featured Actions */}
          <div className="grid gap-3">
            {featuredActions.map((action) => (
              <Button
                key={action.title}
                className={`h-auto p-4 justify-start ${action.color}`}
                size="lg"
              >
                <action.icon className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-semibold">{action.title}</div>
                  <div className="text-xs opacity-90">{action.description}</div>
                </div>
              </Button>
            ))}
          </div>

          {/* Other Actions */}
          <div className="pt-2 border-t">
            <h4 className="text-sm font-medium text-muted-foreground mb-3">
              More Actions
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {otherActions.map((action) => (
                <Button
                  key={action.title}
                  variant="outline"
                  className="h-auto p-3 justify-start text-left"
                  size="sm"
                  onClick={() => handleActionClick(action.title)}
                >
                  <action.icon className="w-4 h-4 mr-2 shrink-0" />
                  <div className="min-w-0">
                    <div className="font-medium text-xs truncate">
                      {action.title}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {action.description}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
