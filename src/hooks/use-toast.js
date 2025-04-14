
// This is a simplified version of the useToast hook
import { useState } from "react";

// Create a context-like implementation for JavaScript
const toasts = [];
let listeners = [];

export const useToast = () => {
  const [, setToastsState] = useState(toasts);

  const toast = ({ title, description, variant = "default" }) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { id, title, description, variant };
    
    toasts.push(newToast);
    listeners.forEach(listener => listener([...toasts]));
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
      const index = toasts.findIndex(t => t.id === id);
      if (index !== -1) {
        toasts.splice(index, 1);
        listeners.forEach(listener => listener([...toasts]));
      }
    }, 5000);
    
    return id;
  };

  const dismiss = (toastId) => {
    const index = toasts.findIndex(t => t.id === toastId);
    if (index !== -1) {
      toasts.splice(index, 1);
      listeners.forEach(listener => listener([...toasts]));
    }
  };

  // Subscribe to toast updates
  useState(() => {
    const listener = (updatedToasts) => {
      setToastsState([...updatedToasts]);
    };
    
    listeners.push(listener);
    
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }, []);

  return {
    toast,
    dismiss,
    toasts
  };
};

// Also export the standalone toast function for convenience
export const toast = ({ title, description, variant = "default" }) => {
  const { toast: toastFn } = useToast();
  return toastFn({ title, description, variant });
};
