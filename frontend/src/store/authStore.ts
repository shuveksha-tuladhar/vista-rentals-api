import { create } from "zustand";
import { useFavoritesStore } from "./favoritesStore";

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
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoggedIn: false,
  isModalOpen: false,
  setUser: (user) => set({ user, isLoggedIn: Boolean(user) }),
  logout: () => {
    // Clear favorites when logging out
    const favoritesStore = useFavoritesStore.getState();
    const currentUser = get().user;
    
    // Clear favorites if they belong to the logged-out user
    if (favoritesStore.userId === currentUser?.id) {
      favoritesStore.clearFavorites();
    }
    
    set({ user: null, isLoggedIn: false });
  },
  setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
}));
