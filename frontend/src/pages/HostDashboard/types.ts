export interface DashboardStats {
  revenue_total: string;
  revenue_this_month: string;
  bookings_total: number;
  bookings_pending: number;
  bookings_upcoming: number;
  active_stays: number;
  avg_rating: number | null;
  listings_count: number;
  avg_stay_duration: number | null;
  booking_lead_time: number | null;
  total_nights_booked: number;
}

export interface MonthRevenue {
  month: string;
  revenue: string;
}

export interface OccupancyData {
  booked_nights: number;
  total_nights: number;
  rate: number;
}

export interface RatingBreakdown {
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
}

export interface PropertyPerformance {
  property_id: number;
  property_name: string;
  revenue: string;
  bookings_count: number;
}

export interface RecentReview {
  rating: number;
  review: string | null;
  property_name: string;
  guest_first_name: string;
  created_at: string;
}

export interface UpcomingCheckin {
  booking_id: number;
  guest_first_name: string;
  guest_last_name: string;
  property_name: string;
  check_in: string;
  check_out: string;
  nights: number;
}

export interface DashboardData {
  stats: DashboardStats;
  revenue_by_6_months: MonthRevenue[];
  revenue_by_12_months: MonthRevenue[];
  occupancy_this_month: OccupancyData;
  rating_breakdown: RatingBreakdown;
  property_performance: PropertyPerformance[];
  recent_reviews: RecentReview[];
  upcoming_checkins: UpcomingCheckin[];
}
