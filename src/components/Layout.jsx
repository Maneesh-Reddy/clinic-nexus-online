
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";

export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
};

export const LandingLayout = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container-custom py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-clinic-600 flex items-center justify-center text-white font-bold text-lg mr-2">
              VC
            </div>
            <h1 className="text-xl font-bold text-clinic-700 dark:text-clinic-400">Virtual Clinic</h1>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={() => navigate('/login')} 
              className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
            >
              Log In
            </button>
            <button 
              onClick={() => navigate('/signup')} 
              className="px-4 py-2 rounded-md bg-clinic-600 hover:bg-clinic-700 text-white transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>
      <main>
        {children}
      </main>
      <footer className="border-t py-6 mt-12">
        <div className="container-custom text-center text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Virtual Clinic. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export const DashboardLayout = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  
  const role = localStorage.getItem('userRole') || 'patient';
  
  const menuItems = {
    patient: [
      { name: 'Dashboard', path: '/patient' },
      { name: 'Appointments', path: '/patient/appointments' },
      { name: 'Medical Records', path: '/patient/records' },
      { name: 'Prescriptions', path: '/patient/prescriptions' },
      { name: 'Billing', path: '/patient/billing' },
    ],
    doctor: [
      { name: 'Dashboard', path: '/doctor' },
      { name: 'Appointments', path: '/doctor/appointments' },
      { name: 'Patients', path: '/doctor/patients' },
      { name: 'Schedule', path: '/doctor/schedule' },
    ],
    admin: [
      { name: 'Dashboard', path: '/admin' },
      { name: 'Doctors', path: '/admin/doctors' },
      { name: 'Patients', path: '/admin/patients' },
      { name: 'Appointments', path: '/admin/appointments' },
      { name: 'Medicines', path: '/admin/medicines' },
      { name: 'Billing', path: '/admin/billing' },
    ]
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };
  
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border shrink-0 h-screen sticky top-0">
        <div className="p-4 border-b border-sidebar-border flex items-center">
          <div className="w-10 h-10 rounded-full bg-clinic-600 flex items-center justify-center text-white font-bold text-lg mr-2">
            VC
          </div>
          <h1 className="text-xl font-bold text-sidebar-foreground">Virtual Clinic</h1>
        </div>
        <nav className="p-4">
          <p className="text-sm font-medium text-sidebar-foreground/60 mb-3 uppercase">Menu</p>
          <ul className="space-y-1">
            {menuItems[role].map((item) => (
              <li key={item.path}>
                <a 
                  href={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm ${
                    location.pathname === item.path 
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                  }`}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-sidebar-border">
          <button 
            onClick={handleLogout}
            className="w-full px-3 py-2 text-sm bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 rounded-md transition-colors"
          >
            Log Out
          </button>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-border flex items-center justify-end px-6 sticky top-0 bg-background z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="h-8 w-8 rounded-full bg-clinic-100 text-clinic-800 flex items-center justify-center font-medium">
              {role === 'admin' ? 'A' : role === 'doctor' ? 'D' : 'P'}
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>
        
        <footer className="border-t py-4 px-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Virtual Clinic. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};
