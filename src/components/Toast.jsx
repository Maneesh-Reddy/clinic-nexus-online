
import React, { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { id, ...toast };
    
    setToasts((currentToasts) => [...currentToasts, newToast]);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      dismissToast(newToast.id);
    }, 5000);
  };

  const dismissToast = (id) => {
    setToasts((currentToasts) => 
      currentToasts.filter((toast) => toast.id !== id)
    );
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, dismissToast }}>
      {children}
      <div className="fixed bottom-0 right-0 p-4 w-full md:max-w-sm z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`rounded-lg border p-4 shadow-md transition-all duration-300 ease-in-out transform translate-y-0 bg-card text-card-foreground ${
              toast.type === "error" ? "border-red-500" : 
              toast.type === "success" ? "border-green-500" : 
              toast.type === "warning" ? "border-yellow-500" : "border-border"
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                {toast.title && (
                  <h5 className="font-medium mb-1">{toast.title}</h5>
                )}
                {toast.message && (
                  <p className="text-sm text-muted-foreground">{toast.message}</p>
                )}
              </div>
              <button
                onClick={() => dismissToast(toast.id)}
                className="ml-4 text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
