import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  History,
  MoreVertical,
  Download,
  Edit,
  Trash2,
  Clock,
  FileText,
  Star,
} from "lucide-react";

interface ResumeVersion {
  id: string;
  name: string;
  template: string;
  createdAt: string;
  lastModified: string;
  size: string;
  isActive: boolean;
  isFavorite: boolean;
  jobTitle?: string;
}

const mockVersions: ResumeVersion[] = [
  {
    id: "1",
    name: "Software Engineer - Google",
    template: "Ivy Modern",
    createdAt: "2024-01-15",
    lastModified: "2024-01-20",
    size: "245 KB",
    isActive: true,
    isFavorite: true,
    jobTitle: "Senior Software Engineer",
  },
  {
    id: "2",
    name: "Full Stack Developer - Meta",
    template: "Ivy Classic",
    createdAt: "2024-01-10",
    lastModified: "2024-01-18",
    size: "238 KB",
    isActive: false,
    isFavorite: false,
    jobTitle: "Full Stack Developer",
  },
  {
    id: "3",
    name: "Technical Lead - Amazon",
    template: "Ivy Executive",
    createdAt: "2024-01-05",
    lastModified: "2024-01-15",
    size: "252 KB",
    isActive: false,
    isFavorite: true,
    jobTitle: "Technical Lead",
  },
  {
    id: "4",
    name: "General Resume",
    template: "Ivy Classic",
    createdAt: "2023-12-20",
    lastModified: "2024-01-10",
    size: "240 KB",
    isActive: false,
    isFavorite: false,
  },
];

interface VersionHistoryProps {
  onEdit: (versionId: string) => void;
  onDownload: (versionId: string) => void;
  onSetActive: (versionId: string) => void;
}

const VersionHistory = ({
  onEdit,
  onDownload,
  onSetActive,
}: VersionHistoryProps) => {
  const [versions, setVersions] = useState<ResumeVersion[]>(mockVersions);

  const handleDelete = (versionId: string) => {
    setVersions((prev) => prev.filter((v) => v.id !== versionId));
  };

  const handleToggleFavorite = (versionId: string) => {
    setVersions((prev) =>
      prev.map((v) =>
        v.id === versionId ? { ...v, isFavorite: !v.isFavorite } : v,
      ),
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getTimeSince = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <History className="h-5 w-5 mr-2" />
          Version History
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {versions.map((version) => (
          <div
            key={version.id}
            className={`border rounded-lg p-3 transition-all ${
              version.isActive
                ? "ring-2 ring-primary border-primary bg-primary/5"
                : "hover:border-primary/50 hover:bg-accent/50"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                  <h4 className="font-medium text-sm truncate">
                    {version.name}
                  </h4>
                  {version.isActive && (
                    <Badge variant="default" className="text-xs h-5 shrink-0">
                      Active
                    </Badge>
                  )}
                  {version.isFavorite && (
                    <Star className="h-3 w-3 text-warning fill-warning shrink-0" />
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>{version.template}</span>
                    <span>•</span>
                    <span>{version.size}</span>
                  </div>

                  {version.jobTitle && (
                    <Badge variant="outline" className="text-xs h-5">
                      {version.jobTitle}
                    </Badge>
                  )}

                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Modified {getTimeSince(version.lastModified)}</span>
                  </div>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit(version.id)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDownload(version.id)}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </DropdownMenuItem>
                  {!version.isActive && (
                    <DropdownMenuItem onClick={() => onSetActive(version.id)}>
                      <FileText className="h-4 w-4 mr-2" />
                      Set as Active
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={() => handleToggleFavorite(version.id)}
                  >
                    <Star className="h-4 w-4 mr-2" />
                    {version.isFavorite ? "Remove from" : "Add to"} Favorites
                  </DropdownMenuItem>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Delete Resume Version
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{version.name}"? This
                          action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(version.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}

        <div className="pt-2 border-t">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{versions.length} versions total</span>
            <Button variant="ghost" size="sm" className="h-6 text-xs">
              View All
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VersionHistory;
