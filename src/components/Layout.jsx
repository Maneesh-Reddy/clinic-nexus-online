
import React from "react";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";

export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {children}
    </div>
  );
};

export const DashboardLayout = ({ children, sidebarContent }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background text-foreground">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-card border-r border-border">
        <div className="p-4 flex items-center justify-between border-b border-border">
          <h1 className="text-xl font-bold text-clinic-600 dark:text-clinic-400">Virtual Clinic</h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-muted"
          >
            {theme === "dark" ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )}
          </button>
        </div>
        <div className="p-4">{sidebarContent}</div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};
