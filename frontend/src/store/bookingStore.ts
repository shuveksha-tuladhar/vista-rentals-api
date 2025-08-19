import { create } from 'zustand';

type BookingStore = {
  checkIn: Date | null;
  checkOut: Date | null;
  setCheckIn: (date: Date | null) => void;
  setCheckOut: (date: Date | null) => void;
  resetDates: () => void;
};

export const useBookingStore = create<BookingStore>((set) => ({
  checkIn: null,
  checkOut: null,
  setCheckIn: (date) => set({ checkIn: date }),
  setCheckOut: (date) => set({ checkOut: date }),
  resetDates: () => set({ checkIn: null, checkOut: null }),
}));
