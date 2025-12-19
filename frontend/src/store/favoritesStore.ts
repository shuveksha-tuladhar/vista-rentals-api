import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  favoriteIds: number[];
  userId: number | null;
  addFavorite: (propertyId: number, userId: number) => void;
  removeFavorite: (propertyId: number) => void;
  toggleFavorite: (propertyId: number, userId: number) => void;
  isFavorite: (propertyId: number) => boolean;
  clearFavorites: () => void;
  getFavoritesCount: () => number;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],
      userId: null,

      addFavorite: (propertyId: number, userId: number) =>
        set((state) => {
          // Only add if not already in favorites
          if (!state.favoriteIds.includes(propertyId)) {
            return {
              favoriteIds: [...state.favoriteIds, propertyId],
              userId,
            };
          }
          return state;
        }),

      removeFavorite: (propertyId: number) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.filter((id) => id !== propertyId),
        })),

      toggleFavorite: (propertyId: number, userId: number) => {
        const { favoriteIds, addFavorite, removeFavorite } = get();
        if (favoriteIds.includes(propertyId)) {
          removeFavorite(propertyId);
        } else {
          addFavorite(propertyId, userId);
        }
      },

      isFavorite: (propertyId: number) => get().favoriteIds.includes(propertyId),

      clearFavorites: () => set({ favoriteIds: [], userId: null }),

      getFavoritesCount: () => get().favoriteIds.length,
    }),
    {
      name: "vista-favorites-storage", // unique name for localStorage key
    }
  )
);
