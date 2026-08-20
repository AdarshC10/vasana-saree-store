import React, { createContext, useContext, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 pointer-events-none max-w-sm w-full px-4">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className={`pointer-events-auto flex items-start p-4 rounded-none border shadow-luxury backdrop-blur-md ${
                toast.type === 'success'
                  ? 'bg-vasana-burgundy text-white border-vasana-gold'
                  : toast.type === 'error'
                  ? 'bg-red-900 text-white border-red-500'
                  : 'bg-vasana-dark text-vasana-bg border-vasana-gold'
              }`}
            >
              <div className="mr-3 mt-0.5 text-vasana-gold">
                {toast.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-vasana-gold" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-300" />
                )}
              </div>
              <div className="flex-1 text-sm font-sans tracking-wide leading-snug">
                {toast.message}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-3 text-gray-300 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
