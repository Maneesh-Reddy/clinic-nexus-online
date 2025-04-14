
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MainLayout } from '../components/Layout';
import { useToast } from '../components/Toast';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch('password');
  
  const onSubmit = async (data) => {
    setIsLoading(true);
    
    // Simulating API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Store role (in a real app this would be done by the backend)
      localStorage.setItem('userRole', data.role);
      
      addToast({ 
        type: 'success', 
        title: 'Account created', 
        message: 'Your account has been successfully created!'
      });
      
      navigate('/login');
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
            <p className="text-gray-600 dark:text-gray-400 mt-2">Create your account</p>
          </div>
          
          <div className="bg-card rounded-lg border p-6 shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.firstName ? 'border-red-500' : 'border-input'
                    } bg-background`}
                    placeholder="John"
                    {...register('firstName', { required: 'First name is required' })}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.lastName ? 'border-red-500' : 'border-input'
                    } bg-background`}
                    placeholder="Doe"
                    {...register('lastName', { required: 'Last name is required' })}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>
              
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
                <label htmlFor="role" className="block text-sm font-medium mb-1">
                  I am a
                </label>
                <select
                  id="role"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.role ? 'border-red-500' : 'border-input'
                  } bg-background`}
                  {...register('role', { required: 'Role is required' })}
                >
                  <option value="">Select your role</option>
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                  <option value="admin">Admin</option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
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
                    placeholder="Create a password"
                    {...register('password', { 
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters'
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
                      }
                    })}
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
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.confirmPassword ? 'border-red-500' : 'border-input'
                  } bg-background`}
                  placeholder="Confirm your password"
                  {...register('confirmPassword', { 
                    required: 'Please confirm your password',
                    validate: value => value === password || 'Passwords do not match'
                  })}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>
              
              <div className="flex items-start">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 mt-1 rounded border-gray-300 text-clinic-600 focus:ring-clinic-500"
                  {...register('terms', { required: 'You must agree to the terms and conditions' })}
                />
                <label htmlFor="terms" className="ml-2 block text-sm">
                  I agree to the{' '}
                  <a href="#" className="text-clinic-600 hover:text-clinic-500">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-clinic-600 hover:text-clinic-500">
                    Privacy Policy
                  </a>
                </label>
              </div>
              {errors.terms && (
                <p className="text-red-500 text-xs">{errors.terms.message}</p>
              )}
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-clinic-600 hover:bg-clinic-700 text-white rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="text-clinic-600 hover:text-clinic-500 font-medium">
                  Sign in
                </Link>
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

export default Signup;
