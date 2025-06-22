import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Users,
  Settings,
  Target,
  BarChart3,
  Menu,
  ChevronLeft,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Resume",
    href: "/resume",
    icon: FileText,
  },
  {
    name: "Jobs",
    href: "/jobs",
    icon: Briefcase,
  },
  {
    name: "Networking",
    href: "/networking",
    icon: Users,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header with Logo and Toggle */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
          <div
            className={cn(
              "flex items-center transition-all duration-300",
              isCollapsed ? "justify-center w-full" : "space-x-3",
            )}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary">
              <Target className="h-6 w-6 text-sidebar-primary-foreground" />
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <h2 className="text-lg font-semibold text-sidebar-foreground whitespace-nowrap">
                  JobTracker
                </h2>
                <p className="text-xs text-sidebar-foreground/70 whitespace-nowrap">
                  Career Dashboard
                </p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="h-8 w-8 p-0 text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {isCollapsed ? (
              <Menu className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center rounded-lg text-sm font-medium transition-colors relative group",
                      isCollapsed
                        ? "justify-center px-3 py-3"
                        : "space-x-3 px-4 py-3",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                    )}
                    title={isCollapsed ? item.name : ""}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {!isCollapsed && (
                      <span className="truncate">{item.name}</span>
                    )}

                    {/* Tooltip for collapsed state */}
                    {isCollapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-sidebar-accent text-sidebar-accent-foreground text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                        {item.name}
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom section */}
        {!isCollapsed && (
          <div className="p-4 border-t border-sidebar-border">
            <div className="rounded-lg bg-sidebar-accent p-4">
              <h3 className="text-sm font-semibold text-sidebar-accent-foreground mb-2">
                Pro Tip
              </h3>
              <p className="text-xs text-sidebar-accent-foreground/80 leading-relaxed">
                Set up job alerts to never miss opportunities in your field.
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
