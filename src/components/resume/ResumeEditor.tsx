import { useState, useRef, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ResumeToolbar from "./ResumeToolbar";
import { Plus, GripVertical, Trash2 } from "lucide-react";

interface ResumeSection {
  id: string;
  title: string;
  content: string;
}

interface ResumeData {
  name: string;
  email: string;
  phone: string;
  location: string;
  sections: ResumeSection[];
}

interface ResumeEditorProps {
  initialData?: ResumeData;
  onSave: (data: ResumeData) => void;
  autoSave?: boolean;
}

const defaultSections: ResumeSection[] = [
  {
    id: "summary",
    title: "Professional Summary",
    content:
      "<p>Experienced software engineer with 5+ years developing scalable web applications. Proficient in React, Node.js, and cloud technologies. Passionate about creating user-centric solutions and driving technical innovation.</p>",
  },
  {
    id: "experience",
    title: "Work Experience",
    content: `
      <div>
        <h4><strong>Senior Software Engineer</strong> - TechCorp Inc.</h4>
        <p><em>January 2022 - Present</em></p>
        <ul>
          <li>Led development of customer-facing web application serving 100K+ users</li>
          <li>Implemented CI/CD pipelines reducing deployment time by 60%</li>
          <li>Mentored junior developers and conducted code reviews</li>
        </ul>
      </div>
      <br>
      <div>
        <h4><strong>Software Engineer</strong> - StartupXYZ</h4>
        <p><em>June 2020 - December 2021</em></p>
        <ul>
          <li>Built responsive React applications with TypeScript</li>
          <li>Designed RESTful APIs using Node.js and Express</li>
          <li>Collaborated with cross-functional teams in Agile environment</li>
        </ul>
      </div>
    `,
  },
  {
    id: "education",
    title: "Education",
    content: `
      <div>
        <h4><strong>Bachelor of Science in Computer Science</strong></h4>
        <p><em>University of Technology - 2016-2020</em></p>
        <p>GPA: 3.8/4.0 | Relevant Coursework: Data Structures, Algorithms, Database Systems</p>
      </div>
    `,
  },
  {
    id: "skills",
    title: "Technical Skills",
    content: `
      <ul>
        <li><strong>Programming Languages:</strong> JavaScript, TypeScript, Python, Java</li>
        <li><strong>Frontend:</strong> React, Vue.js, HTML5, CSS3, Tailwind CSS</li>
        <li><strong>Backend:</strong> Node.js, Express, Django, RESTful APIs</li>
        <li><strong>Databases:</strong> PostgreSQL, MongoDB, Redis</li>
        <li><strong>Cloud & DevOps:</strong> AWS, Docker, Kubernetes, CI/CD</li>
        <li><strong>Tools:</strong> Git, Jira, Figma, VS Code</li>
      </ul>
    `,
  },
];

const ResumeEditor = ({
  initialData,
  onSave,
  autoSave = true,
}: ResumeEditorProps) => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    name: initialData?.name || "Yeshwanth Kumar",
    email: initialData?.email || "yeshwanth@example.com",
    phone: initialData?.phone || "(555) 123-4567",
    location: initialData?.location || "San Francisco, CA",
    sections: initialData?.sections || defaultSections,
  });

  const [activeSection, setActiveSection] = useState<string>("summary");
  const [isSaving, setIsSaving] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  // Auto-save functionality
  useEffect(() => {
    if (!autoSave) return;

    const saveTimer = setTimeout(() => {
      handleSave();
    }, 2000);

    return () => clearTimeout(saveTimer);
  }, [resumeData, autoSave]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "b":
            e.preventDefault();
            handleFormat("bold");
            break;
          case "i":
            e.preventDefault();
            handleFormat("italic");
            break;
          case "u":
            e.preventDefault();
            handleFormat("underline");
            break;
          case "s":
            e.preventDefault();
            handleSave();
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleFormat = useCallback((command: string, value?: string) => {
    if (command === "undo") {
      document.execCommand("undo");
    } else if (command === "redo") {
      document.execCommand("redo");
    } else {
      document.execCommand(command, false, value);
    }

    setCanUndo(document.queryCommandEnabled("undo"));
    setCanRedo(document.queryCommandEnabled("redo"));
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call
      onSave(resumeData);
    } finally {
      setIsSaving(false);
    }
  };

  const updateSection = (sectionId: string, content: string) => {
    setResumeData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId ? { ...section, content } : section,
      ),
    }));
  };

  const addSection = () => {
    const newSection: ResumeSection = {
      id: `section-${Date.now()}`,
      title: "New Section",
      content: "<p>Add your content here...</p>",
    };
    setResumeData((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }));
    setActiveSection(newSection.id);
  };

  const deleteSection = (sectionId: string) => {
    setResumeData((prev) => ({
      ...prev,
      sections: prev.sections.filter((section) => section.id !== sectionId),
    }));
    if (activeSection === sectionId) {
      setActiveSection(resumeData.sections[0]?.id || "");
    }
  };

  const updateSectionTitle = (sectionId: string, title: string) => {
    setResumeData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId ? { ...section, title } : section,
      ),
    }));
  };

  const activeContent =
    resumeData.sections.find((s) => s.id === activeSection)?.content || "";

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Resume Editor</CardTitle>
      </CardHeader>

      <ResumeToolbar
        onFormat={handleFormat}
        canUndo={canUndo}
        canRedo={canRedo}
        onSave={handleSave}
        isSaving={isSaving}
      />

      <CardContent className="flex-1 p-0">
        {/* Contact Information */}
        <div className="p-4 border-b bg-muted/30">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-xs font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                value={resumeData.name}
                onChange={(e) =>
                  setResumeData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="h-8 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-xs font-medium">
                Email
              </Label>
              <Input
                id="email"
                value={resumeData.email}
                onChange={(e) =>
                  setResumeData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="h-8 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-xs font-medium">
                Phone
              </Label>
              <Input
                id="phone"
                value={resumeData.phone}
                onChange={(e) =>
                  setResumeData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="h-8 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="location" className="text-xs font-medium">
                Location
              </Label>
              <Input
                id="location"
                value={resumeData.location}
                onChange={(e) =>
                  setResumeData((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }))
                }
                className="h-8 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex h-full">
          {/* Section Tabs */}
          <div className="w-48 border-r bg-muted/20">
            <div className="p-3">
              <Button
                variant="outline"
                size="sm"
                onClick={addSection}
                className="w-full text-xs h-8"
              >
                <Plus className="h-3 w-3 mr-1" />
                Add Section
              </Button>
            </div>
            <div className="space-y-1 px-2">
              {resumeData.sections.map((section) => (
                <div
                  key={section.id}
                  className={`group flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                    activeSection === section.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                  }`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <div className="flex items-center space-x-2 flex-1 min-w-0">
                    <GripVertical className="h-3 w-3 opacity-50" />
                    <Input
                      value={section.title}
                      onChange={(e) =>
                        updateSectionTitle(section.id, e.target.value)
                      }
                      className={`text-xs border-none bg-transparent p-0 h-auto font-medium truncate ${
                        activeSection === section.id
                          ? "text-primary-foreground placeholder:text-primary-foreground/70"
                          : ""
                      }`}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  {resumeData.sections.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSection(section.id);
                      }}
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content Editor */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 flex-1">
              <div
                ref={editorRef}
                contentEditable
                className="min-h-[400px] p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: activeContent }}
                onInput={(e) => {
                  const content = e.currentTarget.innerHTML;
                  updateSection(activeSection, content);
                }}
                style={{ fontFamily: "system-ui, sans-serif" }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumeEditor;
