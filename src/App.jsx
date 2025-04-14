import { Toaster } from "./components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastProvider } from "./components/Toast";
import { ThemeProvider } from "./components/ThemeProvider";

// Page imports
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import DoctorsManagement from "./pages/admin/DoctorsManagement";  // New import

// Patient page imports
import Appointments from "./pages/patient/Appointments";
import Records from "./pages/patient/Records";
import Prescriptions from "./pages/patient/Prescriptions";
import Billing from "./pages/patient/Billing";
import Profile from "./pages/patient/Profile";

// Create a client
const queryClient = new QueryClient();

// Auth guard component
const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && userRole !== requiredRole) {
    // Redirect to the appropriate dashboard for the user's role
    if (userRole === 'admin') {
      return <Navigate to="/admin" replace />;
    } else if (userRole === 'doctor') {
      return <Navigate to="/doctor" replace />;
    } else {
      return <Navigate to="/patient" replace />;
    }
  }
  
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <ToastProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Patient routes */}
            <Route 
              path="/patient" 
              element={
                <ProtectedRoute requiredRole="patient">
                  <PatientDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/patient/appointments" 
              element={
                <ProtectedRoute requiredRole="patient">
                  <Appointments />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/patient/records" 
              element={
                <ProtectedRoute requiredRole="patient">
                  <Records />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/patient/prescriptions" 
              element={
                <ProtectedRoute requiredRole="patient">
                  <Prescriptions />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/patient/billing" 
              element={
                <ProtectedRoute requiredRole="patient">
                  <Billing />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/patient/profile" 
              element={
                <ProtectedRoute requiredRole="patient">
                  <Profile />
                </ProtectedRoute>
              }
            />
            
            {/* Doctor routes */}
            <Route 
              path="/doctor" 
              element={
                <ProtectedRoute requiredRole="doctor">
                  <DoctorDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Admin routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/doctors" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <DoctorsManagement />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch-all route - 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
