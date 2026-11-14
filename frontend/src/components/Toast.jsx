import React, { createContext, useCallback, useContext, useState } from 'react';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    ({ title, message, type = 'success', duration = 3500 }) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((prev) => [...prev, { id, title, message, type }]);
      setTimeout(() => {
        removeToast(id);
      }, duration);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-[calc(100vw-2.5rem)] pointer-events-none"
        aria-live="polite"
      >
        {toasts.map((toast) => {
          const isSuccess = toast.type === 'success';
          const isInfo = toast.type === 'info';
          const Icon = isSuccess ? CheckCircle2 : isInfo ? Info : AlertCircle;

          return (
            <div
              key={toast.id}
              className="pointer-events-auto flex items-start gap-3 rounded-xl bg-white p-4 shadow-lg border border-slate-200/80 transition-all duration-300"
            >
              <div
                className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  isSuccess
                    ? 'bg-[#DCFCE7] text-[#166534]'
                    : isInfo
                    ? 'bg-emerald-50 text-[#10B981]'
                    : 'bg-amber-50 text-amber-600'
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                {toast.title && (
                  <p className="text-sm font-semibold text-[#1E293B]">{toast.title}</p>
                )}
                {toast.message && (
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{toast.message}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                aria-label="Dismiss notification"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
}

