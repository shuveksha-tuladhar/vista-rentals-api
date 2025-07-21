import React, { useEffect } from "react";
import { useToastStore } from "../../store/toastStore";
import type { ToastType } from "../../store/types/ToastItemType";

const typeStyles: Record<ToastType, string> = {
  success: "border-l-green-500",
  error: "border-l-red-500",
  info: "border-l-blue-500",
};

const ToastContainer: React.FC = () => {
  const { toast, removeToast } = useToastStore();

  useEffect(() => {
    const timer = setTimeout(() => removeToast(), 4000);
    return () => clearTimeout(timer);
  }, [toast, removeToast]);

  if (!toast) return null;

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-3">
      <div
        className={`flex items-start justify-between gap-4 px-4 py-3 bg-white border-l-4 rounded-lg shadow-xl min-w-[300px] transition-all duration-300 ease-in-out ${
          typeStyles[toast.type]
        }`}
      >
        <span className="text-sm text-gray-800 flex-1">{toast.message}</span>
        <button
          onClick={removeToast}
          className="text-gray-400 hover:text-gray-600 text-lg font-semibold leading-none"
          aria-label="Dismiss"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default ToastContainer;
