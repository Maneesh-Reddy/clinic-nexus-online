
import React from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "../components/Layout";
import { useTheme } from "../components/ThemeProvider";
import { Moon, Sun } from "lucide-react";

const Index = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <MainLayout>
      <div className="relative min-h-screen flex flex-col">
        {/* Header */}
        <header className="py-4 px-6 md:px-10 absolute top-0 left-0 right-0">
          <nav className="flex justify-between items-center">
            <div className="text-2xl font-bold text-clinic-600 dark:text-clinic-400">
              VC
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
              <Link
                to="/login"
                className="px-4 py-2 rounded-md text-clinic-600 dark:text-clinic-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-md bg-clinic-600 hover:bg-clinic-700 text-white"
              >
                Register
              </Link>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex items-center justify-center p-6">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 title-gradient">
              Virtual Clinic
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
              Advanced healthcare at your fingertips. Connect with doctors, manage appointments, and access your medical records online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="px-6 py-3 rounded-md bg-clinic-600 hover:bg-clinic-700 text-white font-medium"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 rounded-md border border-clinic-600 text-clinic-600 dark:border-clinic-400 dark:text-clinic-400 hover:bg-clinic-50 dark:hover:bg-gray-800 font-medium"
              >
                Sign In
              </Link>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-6 px-6 md:px-10 text-center text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Virtual Clinic. All rights reserved.</p>
        </footer>
      </div>
    </MainLayout>
  );
};

export default Index;
