import React, { useState } from "react";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import {
  Sparkles,
  FileText,
  Users,
  MessageSquare,
  Bold,
  Italic,
  List,
  Undo,
  Redo,
  Download,
  Save,
  RefreshCw,
  CheckCircle,
  Lightbulb,
  Copy,
  Edit3,
  Mail,
  Eye,
  Building,
  Palette,
  GraduationCap,
  Zap,
} from "lucide-react";

type GenerationType =
  | "job-application"
  | "linkedin-connection"
  | "social-networking";

interface FormData {
  // Job Application
  jobTitle: string;
  companyName: string;
  jobDescription: string;
  jobTone: string;

  // LinkedIn Connection
  connectionReason: string;
  personName: string;
  mutualInterest: string;
  linkedinTone: string;

  // Social/Networking
  eventTopic: string;
  messageGoal: string;
  socialTone: string;
}

interface CustomMessageData {
  recipientName: string;
  subject: string;
  tone: string;
  content: string;
}

interface CoverLetterTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  content: string;
}

const GenerateCoverLetter = () => {
  const [activeTab, setActiveTab] = useState("custom");
  const [generationType, setGenerationType] =
    useState<GenerationType>("job-application");
  const [formData, setFormData] = useState<FormData>({
    jobTitle: "",
    companyName: "",
    jobDescription: "",
    jobTone: "formal",
    connectionReason: "",
    personName: "",
    mutualInterest: "",
    linkedinTone: "friendly",
    eventTopic: "",
    messageGoal: "",
    socialTone: "warm",
  });
  const [customMessage, setCustomMessage] = useState<CustomMessageData>({
    recipientName: "",
    subject: "",
    tone: "professional",
    content: "",
  });
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("traditional");

  const coverLetterTemplates: CoverLetterTemplate[] = [
    {
      id: "traditional",
      name: "Traditional Professional",
      description: "Block format with formal structure",
      icon: Building,
      content: `Dear [Hiring Manager Name],

I am writing to apply for the [Job Title] position at [Company Name]. With my extensive experience and proven track record in [relevant field], I am confident that I would be a valuable addition to your team.

[Paragraph 1: Introduction + intent]
In my previous role at [Previous Company], I successfully [specific achievement that relates to the job]. My expertise in [relevant skills] and commitment to [relevant value/goal] align perfectly with the requirements outlined in your job posting.

[Paragraph 2: Skills and achievements]
Throughout my career, I have demonstrated [key skill 1], [key skill 2], and [key skill 3]. Notable achievements include [specific accomplishment with metrics], [second achievement], and [third achievement]. I am particularly drawn to [Company Name] because of [specific reason related to company values or mission].

[Paragraph 3: Cultural fit + closing statement]
I am excited about the opportunity to contribute to [Company Name]'s continued success and would welcome the chance to discuss how my background and enthusiasm can benefit your team. Thank you for considering my application.

Sincerely,
[Your Name]`,
    },
    {
      id: "modern",
      name: "Modern Minimal",
      description: "Clean lines, left-aligned format",
      icon: FileText,
      content: `Hello [Hiring Manager Name],

I'm excited to apply for the [Job Title] position at [Company Name]. As a [professional background] with [X years] of experience, I'm drawn to your company's innovative approach to [industry/field].

Key highlights of my background:
• [Achievement 1 with specific metrics]
• [Achievement 2 that demonstrates relevant skill]
• [Achievement 3 showing leadership or growth]

What excites me most about this role is [specific aspect of the job/company]. I believe my experience in [relevant area] and passion for [relevant field/value] would enable me to make an immediate impact on your team.

I'd love to discuss how my skills align with your needs. Thank you for your consideration.

Best regards,
[Your Name]`,
    },
    {
      id: "creative",
      name: "Creative",
      description: "Perfect for design and creative roles",
      icon: Palette,
      content: `Hi [Team/Hiring Manager],

Creative storyteller meets strategic thinker — that's how I'd describe my approach to [relevant field]. When I saw the [Job Title] opening at [Company Name], I knew this was the perfect opportunity to blend my passion for [creative area] with my expertise in [relevant skill].

My creative journey includes:
→ [Creative achievement 1]
→ [Project or campaign that shows impact]
→ [Skill or tool mastery relevant to role]

What draws me to [Company Name] is [specific aspect of company's creative work/culture]. I'm particularly inspired by [recent project/campaign/initiative] and would love to contribute to similar innovative work.

I'd be thrilled to share my portfolio and discuss how my creative vision can help [Company Name] continue to [relevant goal/mission].

Looking forward to creating something amazing together!

[Your Name]`,
    },
    {
      id: "ivy",
      name: "Ivy League Standard",
      description: "Harvard/Stanford academic format",
      icon: GraduationCap,
      content: `[Date]

[Hiring Manager Name]
[Title]
[Company Name]
[Address]

Dear [Hiring Manager Name/Sir or Madam],

I am writing to express my sincere interest in the [Job Title] position at [Company Name]. As a [degree] graduate from [University] with demonstrated excellence in [relevant field], I am eager to contribute to your organization's distinguished reputation and continued success.

During my academic tenure at [University], I maintained a [GPA/honors] while actively engaging in [relevant activities/research]. My thesis on [topic] and subsequent publication in [journal/conference] demonstrate my commitment to rigorous research and analytical thinking. Additionally, my experience as [relevant position/internship] at [organization] provided practical application of theoretical knowledge.

My qualifications include:
- [Academic achievement or relevant coursework]
- [Research experience or technical skill]
- [Leadership experience or extracurricular achievement]
- [Language skills or other relevant abilities]

I am particularly drawn to [Company Name] due to [specific reason related to company's reputation/work]. I believe my academic foundation and professional aspirations align exceptionally well with your organization's values and objectives.

I would be honored to discuss my qualifications further and am available at your convenience for an interview. Thank you for your time and consideration.

Respectfully yours,

[Your Name]`,
    },
    {
      id: "startup",
      name: "Startup-Friendly",
      description: "Concise and informal approach",
      icon: Zap,
      content: `Hey [Team/Name],

I'm excited about the opportunity to join [Company Name] as a [Role]. Your mission to [company mission/goal] really resonates with me, and I'd love to help you [specific contribution].

Quick highlights:
→ [Achievement 1 with metrics]
→ [Relevant skill/experience 2]
→ [Personal project or side hustle that shows initiative]

I thrive in fast-paced environments and love wearing multiple hats. At [previous role/project], I [specific example of adaptability or growth mindset]. I'm particularly excited about [specific aspect of the role or company] and believe my [relevant skill/trait] would be a great fit for your team culture.

I'd love to chat more about how I can contribute to [Company Name]'s growth. When works best for a quick call?

Let's build something amazing together!

Best,
[Your Name]

P.S. [Optional: Personal touch or interesting fact about yourself]`,
    },
  ];

  const handleFormDataChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCustomMessageChange = (
    field: keyof CustomMessageData,
    value: string,
  ) => {
    setCustomMessage((prev) => ({ ...prev, [field]: value }));
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = coverLetterTemplates.find((t) => t.id === templateId);
    if (template) {
      setCustomMessage((prev) => ({ ...prev, content: template.content }));
      toast({
        title: "Template applied",
        description: `${template.name} template has been loaded into the editor.`,
      });
    }
  };

  const generateContent = async () => {
    setIsGenerating(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    let content = "";

    if (generationType === "job-application") {
      content = `Dear Hiring Manager,

I am writing to express my strong interest in the ${formData.jobTitle} position at ${formData.companyName}. With my extensive background in software development and passion for innovative technology solutions, I am excited about the opportunity to contribute to your team.

In my previous roles, I have demonstrated proficiency in the key areas outlined in your job description. My experience with React, TypeScript, and modern web development practices aligns perfectly with your requirements. I am particularly drawn to ${formData.companyName}'s commitment to technological innovation and would be thrilled to bring my skills to your dynamic environment.

I have successfully led multiple projects involving scalable web applications, implemented robust testing frameworks, and collaborated effectively with cross-functional teams. My approach to problem-solving and attention to detail would make me a valuable addition to your engineering team.

I would welcome the opportunity to discuss how my background and enthusiasm can contribute to ${formData.companyName}'s continued success. Thank you for considering my application.

Best regards,
Yeshwanth Kumar`;
    } else if (generationType === "linkedin-connection") {
      content = `Hi ${formData.personName},

I hope this message finds you well! I came across your profile and was impressed by your work at ${formData.mutualInterest}.

${
  formData.connectionReason === "same-college"
    ? "I noticed we're both alumni of the same university"
    : formData.connectionReason === "job-interest"
      ? "I'm very interested in the work you're doing in your field"
      : "I believe we share similar professional interests"
}, and I'd love to connect and potentially learn from your experiences.

I'm currently exploring opportunities in software engineering and would appreciate any insights you might have about the industry or your company's culture.

Thank you for considering my connection request!

Best regards,
Yeshwanth`;
    } else {
      content = `Hi there!

I wanted to reach out following ${formData.eventTopic}. It was great to ${
        formData.messageGoal === "follow-up"
          ? "meet you and learn about your work"
          : formData.messageGoal === "appreciation"
            ? "hear your insights and perspective"
            : "connect and discuss our shared interests"
      }.

I'd love to continue our conversation and explore potential ways we might collaborate or support each other's professional goals.

Looking forward to staying in touch!

Best,
Yeshwanth`;
    }

    setGeneratedContent(content);
    setShowResult(true);
    setIsGenerating(false);
  };

  const handleCopyContent = () => {
    const contentToCopy =
      activeTab === "custom" ? customMessage.content : generatedContent;
    navigator.clipboard.writeText(contentToCopy);
    toast({
      title: "Content copied",
      description: "The message has been copied to your clipboard.",
    });
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft saved",
      description: "Your message has been saved to drafts.",
    });
  };

  const handleExport = (format: "pdf" | "docx") => {
    toast({
      title: `Exporting as ${format.toUpperCase()}`,
      description: "Your document will be downloaded shortly.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />

          <main className="flex-1 p-4 lg:p-6">
            <div className="max-w-6xl mx-auto">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground flex items-center">
                  <FileText className="h-8 w-8 mr-3 text-primary" />
                  Cover Letter Generator
                </h1>
                <p className="text-muted-foreground mt-2">
                  Create professional cover letters and messages with AI
                  assistance
                </p>
              </div>

              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="space-y-6"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger
                    value="custom"
                    className="flex items-center space-x-2"
                  >
                    <Edit3 className="h-4 w-4" />
                    <span>Custom Message</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="generator"
                    className="flex items-center space-x-2"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>Job Application Generator</span>
                  </TabsTrigger>
                </TabsList>

                {/* Tab 1: Custom Message */}
                <TabsContent value="custom" className="space-y-6">
                  <div className="grid gap-6 lg:grid-cols-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-6">
                      {/* Optional Fields */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Mail className="h-5 w-5 mr-2" />
                            Message Details (Optional)
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <Label htmlFor="recipientName">
                                Recipient Name
                              </Label>
                              <Input
                                id="recipientName"
                                placeholder="e.g. Sarah Johnson"
                                value={customMessage.recipientName}
                                onChange={(e) =>
                                  handleCustomMessageChange(
                                    "recipientName",
                                    e.target.value,
                                  )
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor="subject">Subject</Label>
                              <Input
                                id="subject"
                                placeholder="e.g. Application for Software Engineer Position"
                                value={customMessage.subject}
                                onChange={(e) =>
                                  handleCustomMessageChange(
                                    "subject",
                                    e.target.value,
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="customTone">Tone</Label>
                            <Select
                              value={customMessage.tone}
                              onValueChange={(value) =>
                                handleCustomMessageChange("tone", value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="professional">
                                  Professional
                                </SelectItem>
                                <SelectItem value="friendly">
                                  Friendly
                                </SelectItem>
                                <SelectItem value="formal">Formal</SelectItem>
                                <SelectItem value="casual">Casual</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Template Selection */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Eye className="h-5 w-5 mr-2" />
                            Select a Cover Letter Template
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                            {coverLetterTemplates.map((template) => (
                              <div
                                key={template.id}
                                className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                                  selectedTemplate === template.id
                                    ? "ring-2 ring-primary border-primary bg-primary/5"
                                    : "hover:border-primary/50"
                                }`}
                                onClick={() =>
                                  handleTemplateSelect(template.id)
                                }
                              >
                                <div className="flex items-start space-x-3">
                                  <div
                                    className={`p-2 rounded-lg ${
                                      selectedTemplate === template.id
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted"
                                    }`}
                                  >
                                    <template.icon className="h-4 w-4" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-sm mb-1">
                                      {template.name}
                                    </h4>
                                    <p className="text-xs text-muted-foreground">
                                      {template.description}
                                    </p>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // Could open a preview modal here
                                      toast({
                                        title: "Preview",
                                        description: `Previewing ${template.name} template`,
                                      });
                                    }}
                                  >
                                    <Eye className="h-3 w-3" />
                                  </Button>
                                </div>
                                {selectedTemplate === template.id && (
                                  <div className="mt-2 pt-2 border-t">
                                    <Badge
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                      Selected
                                    </Badge>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Rich Text Editor */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Edit3 className="h-5 w-5 mr-2" />
                              Message Editor
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="secondary" className="text-xs">
                                😊 {customMessage.tone} Tone
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Grammar: Good
                              </Badge>
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {/* Toolbar */}
                          <div className="flex items-center space-x-1 p-2 border-b mb-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <Bold className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <Italic className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <List className="h-4 w-4" />
                            </Button>
                            <div className="w-px h-6 bg-border mx-2"></div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <Undo className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <Redo className="h-4 w-4" />
                            </Button>
                            <div className="flex-1"></div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={handleCopyContent}
                            >
                              <Copy className="h-4 w-4 mr-1" />
                              Copy
                            </Button>
                          </div>

                          {/* Editor */}
                          <Textarea
                            value={customMessage.content}
                            onChange={(e) =>
                              handleCustomMessageChange(
                                "content",
                                e.target.value,
                              )
                            }
                            className="min-h-[400px] resize-none border-0 focus:ring-0 text-base leading-relaxed"
                            placeholder="Start writing your message here..."
                          />

                          {/* Action Buttons */}
                          <div className="flex items-center justify-between pt-4 border-t">
                            <div className="text-sm text-muted-foreground">
                              {customMessage.content.length} characters
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                onClick={handleSaveDraft}
                              >
                                <Save className="h-4 w-4 mr-2" />
                                Save Draft
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => handleExport("pdf")}
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Export PDF
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => handleExport("docx")}
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Export DOCX
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center text-lg">
                            <Lightbulb className="h-5 w-5 mr-2" />
                            Writing Tips
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-3">
                            <div className="p-3 bg-muted/50 rounded-lg">
                              <h4 className="font-medium text-sm mb-1">
                                📝 Structure
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                Start with a clear opening, develop your main
                                points, and end with a strong conclusion.
                              </p>
                            </div>
                            <div className="p-3 bg-muted/50 rounded-lg">
                              <h4 className="font-medium text-sm mb-1">
                                🎯 Be Specific
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                Use concrete examples and specific details to
                                make your message more compelling.
                              </p>
                            </div>
                            <div className="p-3 bg-muted/50 rounded-lg">
                              <h4 className="font-medium text-sm mb-1">
                                ✨ Show Personality
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                Let your authentic voice come through while
                                maintaining professionalism.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            Tone & Grammar
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Tone Consistency</span>
                              <Badge
                                variant="outline"
                                className="text-xs bg-success/10 text-success"
                              >
                                Excellent
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Grammar</span>
                              <Badge
                                variant="outline"
                                className="text-xs bg-success/10 text-success"
                              >
                                Good
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Readability</span>
                              <Badge
                                variant="outline"
                                className="text-xs bg-warning/10 text-warning"
                              >
                                B+
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                {/* Tab 2: Job Application Generator */}
                <TabsContent value="generator" className="space-y-6">
                  <div className="grid gap-6 lg:grid-cols-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-6">
                      {/* Generation Type Selector */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-xl">
                            What do you want to generate?
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <RadioGroup
                            value={generationType}
                            onValueChange={(value) =>
                              setGenerationType(value as GenerationType)
                            }
                            className="grid gap-4 md:grid-cols-3"
                          >
                            <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50">
                              <RadioGroupItem
                                value="job-application"
                                id="job-application"
                              />
                              <Label
                                htmlFor="job-application"
                                className="flex items-center space-x-2 cursor-pointer"
                              >
                                <FileText className="h-5 w-5 text-primary" />
                                <div>
                                  <div className="font-medium">
                                    Job Application
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    Cover letters & applications
                                  </div>
                                </div>
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50">
                              <RadioGroupItem
                                value="linkedin-connection"
                                id="linkedin-connection"
                              />
                              <Label
                                htmlFor="linkedin-connection"
                                className="flex items-center space-x-2 cursor-pointer"
                              >
                                <Users className="h-5 w-5 text-info" />
                                <div>
                                  <div className="font-medium">
                                    LinkedIn Connection
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    Professional networking
                                  </div>
                                </div>
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50">
                              <RadioGroupItem
                                value="social-networking"
                                id="social-networking"
                              />
                              <Label
                                htmlFor="social-networking"
                                className="flex items-center space-x-2 cursor-pointer"
                              >
                                <MessageSquare className="h-5 w-5 text-success" />
                                <div>
                                  <div className="font-medium">
                                    Social/Networking
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    Event follow-ups
                                  </div>
                                </div>
                              </Label>
                            </div>
                          </RadioGroup>
                        </CardContent>
                      </Card>

                      {/* Form Based on Selection */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            {generationType === "job-application" && (
                              <>
                                <FileText className="h-5 w-5 mr-2" />
                                Job Application Details
                              </>
                            )}
                            {generationType === "linkedin-connection" && (
                              <>
                                <Users className="h-5 w-5 mr-2" />
                                LinkedIn Connection
                              </>
                            )}
                            {generationType === "social-networking" && (
                              <>
                                <MessageSquare className="h-5 w-5 mr-2" />
                                Networking Message
                              </>
                            )}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {generationType === "job-application" && (
                            <>
                              <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                  <Label htmlFor="jobTitle">Job Title</Label>
                                  <Input
                                    id="jobTitle"
                                    placeholder="e.g. Senior Software Engineer"
                                    value={formData.jobTitle}
                                    onChange={(e) =>
                                      handleFormDataChange(
                                        "jobTitle",
                                        e.target.value,
                                      )
                                    }
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="companyName">
                                    Company Name
                                  </Label>
                                  <Input
                                    id="companyName"
                                    placeholder="e.g. Google"
                                    value={formData.companyName}
                                    onChange={(e) =>
                                      handleFormDataChange(
                                        "companyName",
                                        e.target.value,
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              <div>
                                <Label htmlFor="jobDescription">
                                  Job Description
                                </Label>
                                <Textarea
                                  id="jobDescription"
                                  placeholder="Paste the job description here..."
                                  className="min-h-[120px]"
                                  value={formData.jobDescription}
                                  onChange={(e) =>
                                    handleFormDataChange(
                                      "jobDescription",
                                      e.target.value,
                                    )
                                  }
                                />
                              </div>
                              <div>
                                <Label htmlFor="jobTone">Tone</Label>
                                <Select
                                  value={formData.jobTone}
                                  onValueChange={(value) =>
                                    handleFormDataChange("jobTone", value)
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="formal">
                                      Formal
                                    </SelectItem>
                                    <SelectItem value="friendly">
                                      Friendly
                                    </SelectItem>
                                    <SelectItem value="assertive">
                                      Assertive
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </>
                          )}

                          {generationType === "linkedin-connection" && (
                            <>
                              <div>
                                <Label htmlFor="connectionReason">
                                  Connection Reason
                                </Label>
                                <Select
                                  value={formData.connectionReason}
                                  onValueChange={(value) =>
                                    handleFormDataChange(
                                      "connectionReason",
                                      value,
                                    )
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a reason" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="same-college">
                                      Same College/University
                                    </SelectItem>
                                    <SelectItem value="job-interest">
                                      Job/Industry Interest
                                    </SelectItem>
                                    <SelectItem value="mutual-connection">
                                      Mutual Connection
                                    </SelectItem>
                                    <SelectItem value="company-interest">
                                      Company Interest
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                  <Label htmlFor="personName">
                                    Person's Name
                                  </Label>
                                  <Input
                                    id="personName"
                                    placeholder="e.g. Sarah Johnson"
                                    value={formData.personName}
                                    onChange={(e) =>
                                      handleFormDataChange(
                                        "personName",
                                        e.target.value,
                                      )
                                    }
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="mutualInterest">
                                    Mutual Company or Interest
                                  </Label>
                                  <Input
                                    id="mutualInterest"
                                    placeholder="e.g. Stanford University, AI/ML"
                                    value={formData.mutualInterest}
                                    onChange={(e) =>
                                      handleFormDataChange(
                                        "mutualInterest",
                                        e.target.value,
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              <div>
                                <Label htmlFor="linkedinTone">Tone</Label>
                                <Select
                                  value={formData.linkedinTone}
                                  onValueChange={(value) =>
                                    handleFormDataChange("linkedinTone", value)
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="friendly">
                                      Friendly
                                    </SelectItem>
                                    <SelectItem value="confident">
                                      Confident
                                    </SelectItem>
                                    <SelectItem value="polite">
                                      Polite
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </>
                          )}

                          {generationType === "social-networking" && (
                            <>
                              <div>
                                <Label htmlFor="eventTopic">
                                  Event or Topic
                                </Label>
                                <Input
                                  id="eventTopic"
                                  placeholder="e.g. Tech Conference 2024, Coffee chat"
                                  value={formData.eventTopic}
                                  onChange={(e) =>
                                    handleFormDataChange(
                                      "eventTopic",
                                      e.target.value,
                                    )
                                  }
                                />
                              </div>
                              <div>
                                <Label htmlFor="messageGoal">
                                  Message Goal
                                </Label>
                                <Select
                                  value={formData.messageGoal}
                                  onValueChange={(value) =>
                                    handleFormDataChange("messageGoal", value)
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select message goal" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="follow-up">
                                      Follow-up
                                    </SelectItem>
                                    <SelectItem value="appreciation">
                                      Appreciation
                                    </SelectItem>
                                    <SelectItem value="collaboration">
                                      Collaboration
                                    </SelectItem>
                                    <SelectItem value="information">
                                      Information Request
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor="socialTone">Tone</Label>
                                <Select
                                  value={formData.socialTone}
                                  onValueChange={(value) =>
                                    handleFormDataChange("socialTone", value)
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="casual">
                                      Casual
                                    </SelectItem>
                                    <SelectItem value="warm">Warm</SelectItem>
                                    <SelectItem value="curious">
                                      Curious
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </>
                          )}

                          <Button
                            onClick={generateContent}
                            disabled={isGenerating}
                            className="w-full"
                            size="lg"
                          >
                            {isGenerating ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Generating...
                              </>
                            ) : (
                              <>
                                <Sparkles className="h-4 w-4 mr-2" />
                                Generate Message
                              </>
                            )}
                          </Button>
                        </CardContent>
                      </Card>

                      {/* Result */}
                      {showResult && (
                        <Card>
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="flex items-center">
                                <CheckCircle className="h-5 w-5 mr-2 text-success" />
                                Generated Content
                              </CardTitle>
                              <div className="flex items-center space-x-2">
                                <Badge variant="secondary" className="text-xs">
                                  😊 Friendly Tone
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  Grammar: Excellent
                                </Badge>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            {/* Toolbar */}
                            <div className="flex items-center space-x-1 p-2 border-b mb-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <Bold className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <Italic className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <List className="h-4 w-4" />
                              </Button>
                              <div className="w-px h-6 bg-border mx-2"></div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <Undo className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <Redo className="h-4 w-4" />
                              </Button>
                              <div className="flex-1"></div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleCopyContent}
                              >
                                <Copy className="h-4 w-4 mr-1" />
                                Copy
                              </Button>
                            </div>

                            {/* Editable Content */}
                            <Textarea
                              value={generatedContent}
                              onChange={(e) =>
                                setGeneratedContent(e.target.value)
                              }
                              className="min-h-[300px] resize-none border-0 focus:ring-0 text-base leading-relaxed"
                              placeholder="Generated content will appear here..."
                            />

                            {/* Action Buttons */}
                            <div className="flex items-center justify-between pt-4 border-t">
                              <Button
                                variant="outline"
                                onClick={generateContent}
                              >
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Regenerate
                              </Button>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  onClick={handleSaveDraft}
                                >
                                  <Save className="h-4 w-4 mr-2" />
                                  Save as Draft
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() => handleExport("pdf")}
                                >
                                  <Download className="h-4 w-4 mr-2" />
                                  Export PDF
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() => handleExport("docx")}
                                >
                                  <Download className="h-4 w-4 mr-2" />
                                  Export DOCX
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center text-lg">
                            <Lightbulb className="h-5 w-5 mr-2" />
                            Writing Tips
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {generationType === "job-application" && (
                            <div className="space-y-3">
                              <div className="p-3 bg-muted/50 rounded-lg">
                                <h4 className="font-medium text-sm mb-1">
                                  📝 Structure
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                  Start with enthusiasm, highlight relevant
                                  skills, and end with a call to action.
                                </p>
                              </div>
                              <div className="p-3 bg-muted/50 rounded-lg">
                                <h4 className="font-medium text-sm mb-1">
                                  🎯 Personalization
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                  Reference specific company values or recent
                                  news to show genuine interest.
                                </p>
                              </div>
                              <div className="p-3 bg-muted/50 rounded-lg">
                                <h4 className="font-medium text-sm mb-1">
                                  📊 Quantify Results
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                  Include specific metrics and achievements when
                                  possible.
                                </p>
                              </div>
                            </div>
                          )}
                          {generationType === "linkedin-connection" && (
                            <div className="space-y-3">
                              <div className="p-3 bg-muted/50 rounded-lg">
                                <h4 className="font-medium text-sm mb-1">
                                  🤝 Personal Touch
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                  Mention specific mutual connections or shared
                                  experiences.
                                </p>
                              </div>
                              <div className="p-3 bg-muted/50 rounded-lg">
                                <h4 className="font-medium text-sm mb-1">
                                  📱 Keep it Brief
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                  LinkedIn messages should be concise and to the
                                  point.
                                </p>
                              </div>
                            </div>
                          )}
                          {generationType === "social-networking" && (
                            <div className="space-y-3">
                              <div className="p-3 bg-muted/50 rounded-lg">
                                <h4 className="font-medium text-sm mb-1">
                                  💬 Be Authentic
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                  Use a natural, conversational tone that
                                  reflects your personality.
                                </p>
                              </div>
                              <div className="p-3 bg-muted/50 rounded-lg">
                                <h4 className="font-medium text-sm mb-1">
                                  ⚡ Quick Follow-up
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                  Send within 24-48 hours while the interaction
                                  is fresh.
                                </p>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Analytics</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-primary">
                                23
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Messages Generated
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-success">
                                85%
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Success Rate
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default GenerateCoverLetter;
