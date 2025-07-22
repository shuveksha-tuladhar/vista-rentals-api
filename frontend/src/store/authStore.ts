import { create } from "zustand";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  setUser: (user) => set({ user, isLoggedIn: Boolean(user) }),
  logout: () => set({ user: null, isLoggedIn: false }),
}));
