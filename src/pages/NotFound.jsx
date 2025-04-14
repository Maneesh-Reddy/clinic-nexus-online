
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { MainLayout } from "../components/Layout";
import { AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <MainLayout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600 dark:text-red-400 mx-auto mb-6">
            <AlertCircle size={40} />
          </div>
          <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">404</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            The page you are trying to access might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link to="/" className="px-6 py-3 bg-clinic-600 hover:bg-clinic-700 text-white rounded-md font-medium transition-colors inline-block">
            Return to Homepage
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFound;
