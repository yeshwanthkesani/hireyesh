import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sparkles,
  Target,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Lightbulb,
} from "lucide-react";

interface Suggestion {
  type: "add" | "remove" | "modify";
  section: string;
  original?: string;
  suggested: string;
  reason: string;
  priority: "high" | "medium" | "low";
}

const JobTailoring = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const mockSuggestions: Suggestion[] = [
    {
      type: "add",
      section: "Skills",
      suggested: "React Native, GraphQL, Docker",
      reason:
        "These technologies are mentioned multiple times in the job description",
      priority: "high",
    },
    {
      type: "modify",
      section: "Professional Summary",
      original: "Experienced software engineer with 5+ years",
      suggested:
        "Senior full-stack developer with 5+ years specializing in React and Node.js",
      reason: "Job specifically requires full-stack experience with React",
      priority: "high",
    },
    {
      type: "add",
      section: "Work Experience",
      suggested: "Highlight experience with microservices architecture",
      reason: "Job description emphasizes microservices and scalable systems",
      priority: "medium",
    },
    {
      type: "remove",
      section: "Skills",
      original: "Java, PHP",
      suggested: "",
      reason: "These technologies are not mentioned in the job requirements",
      priority: "low",
    },
  ];

  const handleOptimize = async () => {
    if (!jobDescription.trim()) return;

    setIsAnalyzing(true);
    setShowSuggestions(false);

    // Simulate AI analysis
    setTimeout(() => {
      setSuggestions(mockSuggestions);
      setIsAnalyzing(false);
      setShowSuggestions(true);
    }, 2000);
  };

  const applySuggestion = (index: number) => {
    // In a real implementation, this would update the resume editor
    setSuggestions((prev) =>
      prev.map((suggestion, i) =>
        i === index ? { ...suggestion, applied: true } : suggestion,
      ),
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "medium":
        return "bg-warning/10 text-warning border-warning/20";
      case "low":
        return "bg-muted text-muted-foreground border-muted";
      default:
        return "bg-muted text-muted-foreground border-muted";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "add":
        return <TrendingUp className="h-4 w-4 text-success" />;
      case "remove":
        return <AlertCircle className="h-4 w-4 text-warning" />;
      case "modify":
        return <Target className="h-4 w-4 text-info" />;
      default:
        return <Lightbulb className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Target className="h-5 w-5 mr-2" />
          Tailor Resume to Job
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Textarea
            placeholder="Paste the job description here to get AI-powered optimization suggestions..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="min-h-[120px] resize-none"
          />
        </div>

        <Button
          onClick={handleOptimize}
          disabled={!jobDescription.trim() || isAnalyzing}
          className="w-full"
        >
          {isAnalyzing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Optimize Resume
            </>
          )}
        </Button>

        {showSuggestions && suggestions.length > 0 && (
          <>
            <Separator />
            <div>
              <h3 className="font-semibold text-sm mb-3 flex items-center">
                <Lightbulb className="h-4 w-4 mr-2" />
                Optimization Suggestions ({suggestions.length})
              </h3>
              <div className="space-y-3">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-3 border rounded-lg bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(suggestion.type)}
                        <span className="font-medium text-sm">
                          {suggestion.section}
                        </span>
                        <Badge
                          variant="outline"
                          className={`text-xs ${getPriorityColor(
                            suggestion.priority,
                          )}`}
                        >
                          {suggestion.priority}
                        </Badge>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => applySuggestion(index)}
                        className="h-7 text-xs"
                      >
                        Apply
                      </Button>
                    </div>

                    {suggestion.original && (
                      <div className="mb-2">
                        <p className="text-xs text-muted-foreground mb-1">
                          Current:
                        </p>
                        <p className="text-sm bg-muted/50 p-2 rounded text-muted-foreground line-through">
                          {suggestion.original}
                        </p>
                      </div>
                    )}

                    <div className="mb-2">
                      <p className="text-xs text-muted-foreground mb-1">
                        {suggestion.type === "add"
                          ? "Add:"
                          : suggestion.type === "remove"
                            ? "Remove:"
                            : "Replace with:"}
                      </p>
                      <p className="text-sm bg-success/10 p-2 rounded font-medium">
                        {suggestion.suggested}
                      </p>
                    </div>

                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-3 w-3 text-info mt-0.5 shrink-0" />
                      <p className="text-xs text-muted-foreground">
                        {suggestion.reason}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {showSuggestions && suggestions.length === 0 && (
          <div className="text-center py-6">
            <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Your resume looks well-optimized for this job!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JobTailoring;
