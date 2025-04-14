
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MainLayout } from '../components/Layout';
import { useToast } from '../components/Toast';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = async (data) => {
    setIsLoading(true);
    
    // Simulating API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Mock successful login
      const role = data.email.includes('admin') ? 'admin' : 
                 data.email.includes('doctor') ? 'doctor' : 'patient';
                 
      // Store token and role (in a real app this would come from the backend)
      localStorage.setItem('token', 'fake-jwt-token');
      localStorage.setItem('userRole', role);
      
      addToast({ 
        type: 'success', 
        title: 'Login successful', 
        message: 'Welcome back to Virtual Clinic!'
      });
      
      // Redirect based on role
      const redirectPath = role === 'admin' ? '/admin' : 
                          role === 'doctor' ? '/doctor' : '/patient';
      navigate(redirectPath);
    }, 1500);
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <MainLayout>
      <div className="container-custom py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-clinic-600 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
              VC
            </div>
            <h1 className="text-3xl font-bold title-gradient">Virtual Clinic</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Sign in to your account</p>
          </div>
          
          <div className="bg-card rounded-lg border p-6 shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.email ? 'border-red-500' : 'border-input'
                  } bg-background`}
                  placeholder="example@email.com"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.password ? 'border-red-500' : 'border-input'
                    } bg-background pr-10`}
                    placeholder="Enter your password"
                    {...register('password', { required: 'Password is required' })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-clinic-600 focus:ring-clinic-500"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-600 dark:text-gray-400">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-clinic-600 hover:text-clinic-500">
                  Forgot password?
                </a>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-clinic-600 hover:bg-clinic-700 text-white rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <Link to="/signup" className="text-clinic-600 hover:text-clinic-500 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
            
            <div className="mt-6">
              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                By signing in, you agree to our{' '}
                <a href="#" className="underline">Terms of Service</a> and{' '}
                <a href="#" className="underline">Privacy Policy</a>
              </p>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-clinic-600 dark:hover:text-clinic-400">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
