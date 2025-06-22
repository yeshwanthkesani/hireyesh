import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, Palette, CheckCircle } from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  tier: "free" | "ivy";
  features: string[];
}

const templates: Template[] = [
  {
    id: "ivy-classic",
    name: "Ivy Classic",
    description: "Traditional academic style preferred by top universities",
    preview: "/templates/ivy-classic-preview.png",
    tier: "ivy",
    features: ["ATS Optimized", "Academic Format", "Clean Typography"],
  },
  {
    id: "ivy-modern",
    name: "Ivy Modern",
    description: "Contemporary design with sophisticated layout",
    preview: "/templates/ivy-modern-preview.png",
    tier: "ivy",
    features: ["Modern Design", "Skills Section", "Achievement Focus"],
  },
  {
    id: "ivy-executive",
    name: "Ivy Executive",
    description: "Premium format for senior-level positions",
    preview: "/templates/ivy-executive-preview.png",
    tier: "ivy",
    features: ["Executive Format", "Leadership Focus", "Premium Design"],
  },
];

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

const TemplateSelector = ({
  selectedTemplate,
  onSelectTemplate,
}: TemplateSelectorProps) => {
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const handlePreview = (template: Template) => {
    setPreviewTemplate(template);
  };

  const handleSelectTemplate = (templateId: string) => {
    onSelectTemplate(templateId);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Palette className="h-5 w-5 mr-2" />
            Ivy Resume Templates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`border rounded-lg p-4 transition-all cursor-pointer ${
                selectedTemplate === template.id
                  ? "ring-2 ring-primary border-primary bg-primary/5"
                  : "hover:border-primary/50 hover:bg-accent/50"
              }`}
              onClick={() => handleSelectTemplate(template.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-sm">{template.name}</h4>
                    {selectedTemplate === template.id && (
                      <CheckCircle className="h-4 w-4 text-success" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {template.description}
                  </p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePreview(template);
                      }}
                      className="h-8"
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>{template.name} Preview</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="aspect-[8.5/11] bg-white border rounded-lg overflow-hidden">
                        {/* Template Preview - In a real app, this would show actual template */}
                        <div className="h-full p-8 bg-white text-black">
                          <div className="text-center mb-6">
                            <h1 className="text-2xl font-bold mb-2">
                              Yeshwanth Kumar
                            </h1>
                            <p className="text-sm text-gray-600">
                              yeshwanth@example.com • (555) 123-4567 • San
                              Francisco, CA
                            </p>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">
                                Professional Summary
                              </h2>
                              <p className="text-sm">
                                Experienced software engineer with 5+ years
                                developing scalable web applications...
                              </p>
                            </div>

                            <div>
                              <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">
                                Work Experience
                              </h2>
                              <div className="space-y-3">
                                <div>
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h3 className="font-semibold">
                                        Senior Software Engineer
                                      </h3>
                                      <p className="text-sm text-gray-600">
                                        TechCorp Inc.
                                      </p>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                      Jan 2022 - Present
                                    </p>
                                  </div>
                                  <ul className="text-sm mt-1 space-y-1">
                                    <li>
                                      • Led development of customer-facing web
                                      application
                                    </li>
                                    <li>
                                      • Implemented CI/CD pipelines reducing
                                      deployment time
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">
                                Technical Skills
                              </h2>
                              <p className="text-sm">
                                JavaScript, TypeScript, React, Node.js, Python,
                                AWS, Docker...
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex flex-wrap gap-2">
                          {template.features.map((feature) => (
                            <Badge
                              key={feature}
                              variant="secondary"
                              className="text-xs"
                            >
                              {feature}
                            </Badge>
                          ))}
                        </div>
                        <Button
                          onClick={() => handleSelectTemplate(template.id)}
                        >
                          Use This Template
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="flex flex-wrap gap-1">
                {template.features.map((feature) => (
                  <Badge
                    key={feature}
                    variant="outline"
                    className="text-xs h-5"
                  >
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          ))}

          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground text-center">
              All templates are ATS-optimized and designed for professional use
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default TemplateSelector;
