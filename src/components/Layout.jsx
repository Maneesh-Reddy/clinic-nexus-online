
import React from "react";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun, Calendar, FileText, Pill, CreditCard, UserCog, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {children}
    </div>
  );
};

export const DashboardLayout = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  
  // Navigation items for the sidebar
  const navItems = [
    { 
      title: "Dashboard", 
      icon: <Home size={20} />, 
      path: "/patient", 
      active: location.pathname === "/patient" 
    },
    { 
      title: "Appointments", 
      icon: <Calendar size={20} />, 
      path: "/patient/appointments", 
      active: location.pathname === "/patient/appointments" 
    },
    { 
      title: "Medical Records", 
      icon: <FileText size={20} />, 
      path: "/patient/records", 
      active: location.pathname === "/patient/records" 
    },
    { 
      title: "Prescriptions", 
      icon: <Pill size={20} />, 
      path: "/patient/prescriptions", 
      active: location.pathname === "/patient/prescriptions" 
    },
    { 
      title: "Billing", 
      icon: <CreditCard size={20} />, 
      path: "/patient/billing", 
      active: location.pathname === "/patient/billing" 
    },
    { 
      title: "Profile", 
      icon: <UserCog size={20} />, 
      path: "/patient/profile", 
      active: location.pathname === "/patient/profile" 
    }
  ];

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
        
        {/* Navigation Menu */}
        <nav className="p-3">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    item.active 
                      ? 'bg-clinic-100 text-clinic-600 dark:bg-clinic-900/30 dark:text-clinic-400 font-medium' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};
