import { format, subDays } from "date-fns";
import type { BookingCosts } from "../pages/PropertyDetails/subcomponents/Bookings/types/BookingCostType";

export const numberOfNights = (
  start: string | Date,
  end: string | Date
): number => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = endDate.getTime() - startDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};

export const calculateBookingCosts = (
  price: string,
  startDate?: Date | null,
  endDate?: Date | null,
  refundable: boolean = false
): BookingCosts => {
  const nightlyPrice = parseFloat(price.replace(/[^0-9.-]+/g, "")) || 0;
  const nights = startDate && endDate ? numberOfNights(startDate, endDate) : 0;

  const baseTotal = nightlyPrice * nights;
  const discount = baseTotal * 0.1;
  const cleaningFee = baseTotal * 0.03;
  const serviceFee = baseTotal * 0.05;
  const subtotalBeforeTaxes = baseTotal + cleaningFee + serviceFee;
  const subtotalBeforeTaxesWithDiscount = subtotalBeforeTaxes - discount;
  const totalBeforeTaxes = refundable
    ? subtotalBeforeTaxes
    : subtotalBeforeTaxesWithDiscount;

  return {
    nights,
    nightlyPrice,
    baseTotal,
    discount,
    cleaningFee,
    serviceFee,
    subtotalBeforeTaxes,
    subtotalBeforeTaxesWithDiscount,
    totalBeforeTaxes,
  };
};

export const getCancellationPolicy = (
  checkInDate?: Date | null,
  freeCancelDays: number = 7,
  partialRefundDays: number = 2
): string => {
  if (!checkInDate) return "";

  const checkIn = new Date(checkInDate);
  const freeCancellationDate = subDays(checkIn, freeCancelDays);
  const partialRefundDate = subDays(checkIn, partialRefundDays);

  return `Free cancellation before ${format(
    freeCancellationDate,
    "MMM d"
  )}. Cancel before check-in on ${format(
    partialRefundDate,
    "MMM d"
  )} for a partial refund.`;
};
