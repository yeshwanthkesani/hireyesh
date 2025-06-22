import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BarChart3,
  Target,
  BookOpen,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Info,
} from "lucide-react";

interface ATSMetrics {
  atsScore: number;
  skillsMatch: number;
  readabilityGrade: string;
  wordCount: number;
  keywordDensity: number;
  sections: {
    name: string;
    score: number;
    status: "good" | "warning" | "error";
  }[];
  recommendations: string[];
}

const mockMetrics: ATSMetrics = {
  atsScore: 85,
  skillsMatch: 78,
  readabilityGrade: "B+",
  wordCount: 485,
  keywordDensity: 3.2,
  sections: [
    { name: "Contact Info", score: 100, status: "good" },
    { name: "Professional Summary", score: 90, status: "good" },
    { name: "Work Experience", score: 85, status: "good" },
    { name: "Skills", score: 70, status: "warning" },
    { name: "Education", score: 95, status: "good" },
  ],
  recommendations: [
    "Add more relevant keywords from the job description",
    "Include specific metrics and achievements",
    "Use standard section headings for better ATS parsing",
  ],
};

interface ATSScoreProps {
  metrics?: ATSMetrics;
  isAnalyzing?: boolean;
}

const ATSScore = ({
  metrics = mockMetrics,
  isAnalyzing = false,
}: ATSScoreProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return "bg-success";
    if (score >= 60) return "bg-warning";
    return "bg-destructive";
  };

  const getReadabilityColor = (grade: string) => {
    if (grade.includes("A") || grade.includes("B")) return "text-success";
    if (grade.includes("C")) return "text-warning";
    return "text-destructive";
  };

  const getSectionIcon = (status: string) => {
    switch (status) {
      case "good":
        return <CheckCircle className="h-3 w-3 text-success" />;
      case "warning":
        return <AlertTriangle className="h-3 w-3 text-warning" />;
      case "error":
        return <AlertTriangle className="h-3 w-3 text-destructive" />;
      default:
        return <Info className="h-3 w-3 text-muted-foreground" />;
    }
  };

  if (isAnalyzing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <BarChart3 className="h-5 w-5 mr-2" />
            ATS Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-3"></div>
            <p className="text-sm text-muted-foreground">
              Analyzing resume for ATS compatibility...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <BarChart3 className="h-5 w-5 mr-2" />
          ATS Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Scores */}
        <div className="space-y-4">
          {/* ATS Score */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">ATS Score</span>
              <div className="flex items-center space-x-1">
                <span
                  className={`text-lg font-bold ${getScoreColor(metrics.atsScore)}`}
                >
                  {metrics.atsScore}
                </span>
                <span className="text-sm text-muted-foreground">/100</span>
              </div>
            </div>
            <Progress value={metrics.atsScore} className="h-2" />
          </div>

          {/* Skills Match */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium flex items-center">
                <Target className="h-3 w-3 mr-1" />
                Skills Match
              </span>
              <div className="flex items-center space-x-1">
                <span
                  className={`text-lg font-bold ${getScoreColor(metrics.skillsMatch)}`}
                >
                  {metrics.skillsMatch}
                </span>
                <span className="text-sm text-muted-foreground">%</span>
              </div>
            </div>
            <Progress value={metrics.skillsMatch} className="h-2" />
          </div>

          {/* Readability Grade */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium flex items-center">
              <BookOpen className="h-3 w-3 mr-1" />
              Readability Grade
            </span>
            <Badge
              variant="outline"
              className={`${getReadabilityColor(metrics.readabilityGrade)}`}
            >
              {metrics.readabilityGrade}
            </Badge>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 p-3 bg-muted/30 rounded-lg">
          <div className="text-center">
            <p className="text-sm font-semibold">{metrics.wordCount}</p>
            <p className="text-xs text-muted-foreground">Words</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold">{metrics.keywordDensity}%</p>
            <p className="text-xs text-muted-foreground">Keywords</p>
          </div>
        </div>

        {/* Section Breakdown */}
        <div>
          <h4 className="text-sm font-semibold mb-3 flex items-center">
            <TrendingUp className="h-4 w-4 mr-1" />
            Section Scores
          </h4>
          <div className="space-y-2">
            {metrics.sections.map((section) => (
              <div
                key={section.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  {getSectionIcon(section.status)}
                  <span className="text-xs">{section.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-muted rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${getScoreBackground(section.score)}`}
                      style={{ width: `${section.score}%` }}
                    ></div>
                  </div>
                  <span
                    className={`text-xs font-medium ${getScoreColor(section.score)}`}
                  >
                    {section.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        {metrics.recommendations.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-3">Recommendations</h4>
            <div className="space-y-2">
              {metrics.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {rec}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        <Button variant="outline" size="sm" className="w-full">
          <BarChart3 className="h-3 w-3 mr-2" />
          View Detailed Report
        </Button>
      </CardContent>
    </Card>
  );
};

export default ATSScore;
