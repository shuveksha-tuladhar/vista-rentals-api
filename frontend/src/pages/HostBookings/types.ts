import type { PaginationMeta } from "../HostListings/types";

export interface HostBookingGuest {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface HostBookingProperty {
  id: number;
  name: string;
  image_url?: string | null;
}

export interface HostBooking {
  id: number;
  property: HostBookingProperty;
  guest: HostBookingGuest;
  start_date: string;
  end_date: string;
  total_nights: number;
  total_price: string;
  payment_status: string;
  is_refundable: boolean;
  created_at: string;
}

export interface HostBookingsResponse {
  bookings: HostBooking[];
  meta: PaginationMeta;
}
