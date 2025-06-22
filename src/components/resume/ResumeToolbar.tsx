import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  Undo,
  Redo,
  Save,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ResumeToolbarProps {
  onFormat: (command: string, value?: string) => void;
  canUndo: boolean;
  canRedo: boolean;
  onSave: () => void;
  isSaving: boolean;
}

const ResumeToolbar = ({
  onFormat,
  canUndo,
  canRedo,
  onSave,
  isSaving,
}: ResumeToolbarProps) => {
  const handleCommand = (command: string, value?: string) => {
    onFormat(command, value);
  };

  return (
    <div className="flex items-center space-x-1 p-3 border-b bg-card/50">
      {/* Undo/Redo */}
      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleCommand("undo")}
          disabled={!canUndo}
          className="h-8 w-8 p-0"
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleCommand("redo")}
          disabled={!canRedo}
          className="h-8 w-8 p-0"
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* Font Size */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 px-3">
            <Type className="h-4 w-4 mr-1" />
            Size
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleCommand("fontSize", "1")}>
            8pt
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleCommand("fontSize", "2")}>
            10pt
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleCommand("fontSize", "3")}>
            12pt
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleCommand("fontSize", "4")}>
            14pt
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleCommand("fontSize", "5")}>
            18pt
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleCommand("fontSize", "6")}>
            24pt
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Separator orientation="vertical" className="h-6" />

      {/* Text Formatting */}
      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleCommand("bold")}
          className="h-8 w-8 p-0"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleCommand("italic")}
          className="h-8 w-8 p-0"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleCommand("underline")}
          className="h-8 w-8 p-0"
        >
          <Underline className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* Lists */}
      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleCommand("insertUnorderedList")}
          className="h-8 w-8 p-0"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleCommand("insertOrderedList")}
          className="h-8 w-8 p-0"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* Alignment */}
      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleCommand("justifyLeft")}
          className="h-8 w-8 p-0"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleCommand("justifyCenter")}
          className="h-8 w-8 p-0"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleCommand("justifyRight")}
          className="h-8 w-8 p-0"
        >
          <AlignRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1"></div>

      {/* Save */}
      <Button
        variant="outline"
        size="sm"
        onClick={onSave}
        disabled={isSaving}
        className="h-8"
      >
        <Save className="h-4 w-4 mr-1" />
        {isSaving ? "Saving..." : "Save"}
      </Button>
    </div>
  );
};

export default ResumeToolbar;
