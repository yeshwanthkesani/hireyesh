import { useState } from "react";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import ResumeEditor from "@/components/resume/ResumeEditor";
import JobTailoring from "@/components/resume/JobTailoring";
import TemplateSelector from "@/components/resume/TemplateSelector";
import VersionHistory from "@/components/resume/VersionHistory";
import ATSScore from "@/components/resume/ATSScore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Download,
  Share,
  Eye,
  Save,
  Settings,
  FileText,
  Sparkles,
} from "lucide-react";

interface ResumeData {
  name: string;
  email: string;
  phone: string;
  location: string;
  sections: Array<{
    id: string;
    title: string;
    content: string;
  }>;
}

const Resume = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("ivy-modern");
  const [isAutoSaveEnabled, setIsAutoSaveEnabled] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(new Date());

  const handleSaveResume = (data: ResumeData) => {
    // In a real implementation, this would save to backend
    console.log("Saving resume:", data);
    setLastSaved(new Date());
  };

  const handleEditVersion = (versionId: string) => {
    // Load the selected version into the editor
    console.log("Loading version for editing:", versionId);
  };

  const handleDownloadVersion = (versionId: string) => {
    // Download the selected version
    console.log("Downloading version:", versionId);
  };

  const handleSetActiveVersion = (versionId: string) => {
    // Set as the active version
    console.log("Setting active version:", versionId);
  };

  const formatLastSaved = (date: Date | null) => {
    if (!date) return "Never";
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)} hr ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />

          {/* Resume Header */}
          <div className="border-b bg-card/50 backdrop-blur">
            <div className="flex items-center justify-between p-4 lg:p-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <FileText className="h-6 w-6 text-primary" />
                  <div>
                    <h1 className="text-xl lg:text-2xl font-bold text-foreground">
                      Resume Editor
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      Last saved: {formatLastSaved(lastSaved)}
                      {isAutoSaveEnabled && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          Auto-save
                        </Badge>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </div>

          <main className="flex-1 p-4 lg:p-6">
            <div className="grid gap-6 lg:grid-cols-12 max-w-full">
              {/* Left Column - Resume Editor */}
              <div className="lg:col-span-7 space-y-6">
                <ResumeEditor
                  onSave={handleSaveResume}
                  autoSave={isAutoSaveEnabled}
                />

                {/* Job Tailoring Section */}
                <div>
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold flex items-center">
                      <Sparkles className="h-5 w-5 mr-2 text-primary" />
                      Tailor Resume to Job
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Paste a job description to get AI-powered optimization
                      suggestions
                    </p>
                  </div>
                  <JobTailoring />
                </div>
              </div>

              {/* Right Column - Templates, History, and Analytics */}
              <div className="lg:col-span-5 space-y-6">
                {/* Templates */}
                <TemplateSelector
                  selectedTemplate={selectedTemplate}
                  onSelectTemplate={setSelectedTemplate}
                />

                {/* Version History */}
                <VersionHistory
                  onEdit={handleEditVersion}
                  onDownload={handleDownloadVersion}
                  onSetActive={handleSetActiveVersion}
                />

                {/* ATS Score */}
                <ATSScore />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 pt-6 border-t">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>Connected</span>
                  </div>
                  <Separator orientation="vertical" className="h-4" />
                  <span>
                    Template:{" "}
                    {selectedTemplate
                      .replace("-", " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </span>
                  <Separator orientation="vertical" className="h-4" />
                  <span>ATS Score: 85/100</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                  <Button variant="outline" size="sm">
                    <Save className="h-4 w-4 mr-2" />
                    Save as New Version
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Resume;
