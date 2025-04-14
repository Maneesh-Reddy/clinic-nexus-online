
import { createContext, useContext, useState, useCallback } from 'react';
import { X } from 'lucide-react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ type = 'default', title, message, duration = 5000 }) => {
    const id = Math.random().toString(36).substring(2, 9);
    
    setToasts((prevToasts) => [...prevToasts, { id, type, title, message }]);
    
    if (duration !== Infinity) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    
    return id;
  }, []);
  
  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed bottom-0 right-0 p-4 space-y-4 z-50 max-w-md w-full">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`animate-fade-in rounded-lg shadow-lg p-4 flex items-start border ${
              toast.type === 'success'
                ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                : toast.type === 'error'
                ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
                : toast.type === 'warning'
                ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800'
                : toast.type === 'info'
                ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
                : 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700'
            }`}
          >
            <div className="flex-1 mr-2">
              {toast.title && (
                <h4 className={`font-medium ${
                  toast.type === 'success'
                    ? 'text-green-800 dark:text-green-400'
                    : toast.type === 'error'
                    ? 'text-red-800 dark:text-red-400'
                    : toast.type === 'warning'
                    ? 'text-yellow-800 dark:text-yellow-400'
                    : toast.type === 'info'
                    ? 'text-blue-800 dark:text-blue-400'
                    : 'text-gray-900 dark:text-gray-100'
                }`}>
                  {toast.title}
                </h4>
              )}
              {toast.message && (
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {toast.message}
                </p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <X size={18} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
