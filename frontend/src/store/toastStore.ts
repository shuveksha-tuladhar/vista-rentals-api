import { create } from "zustand";
import type { ToastItem } from "./types/ToastItemType";

type ToastState = {
  toast: ToastItem | null;
  addToast: (toast: ToastItem) => void;
  removeToast: () => void;
};

export const useToastStore = create<ToastState>((set) => ({
  toast: null,
  addToast: (toast) => {
    const id = Date.now().toString();
    set({ toast: { ...toast, id } });
  },
  removeToast: () => set({ toast: null }),
}));
