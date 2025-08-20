import { create } from "zustand";
import { devtools } from "zustand/middleware";

import type { LocationItem } from "../components/SearchBar/SearchLocation/SearchLocation";

type BookingStore = {
  location: LocationItem | null;
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  setLocation: (location: LocationItem | null) => void;
  setCheckIn: (date: Date | null) => void;
  setCheckOut: (date: Date | null) => void;
  setGuests: (count: number) => void;
  resetDates: () => void;
};

export const useBookingStore = create<BookingStore>()(
  devtools(
    (set) => ({
      location: null,
      checkIn: null,
      checkOut: null,
      guests: 0,
      setLocation: (location) => set({ location }),
      setCheckIn: (date) => set({ checkIn: date }),
      setCheckOut: (date) => set({ checkOut: date }),
      resetDates: () => set({ checkIn: null, checkOut: null }),
      setGuests: (count) => set({ guests: count }),
    }),
    { name: "BookingStore" }
  )
);
