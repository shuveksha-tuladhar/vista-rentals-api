export interface TripDetailProperty {
  id: number;
  name: string;
  title: string;
  city: string;
  state: string;
  price: string;
  property_images: { url: string }[];
  reviews: { id: number; review: string; rating: number; created_at: string }[];
  rating: number;
  user: {
    first_name: string;
    last_name: string;
    avatar_url: string | null;
    host: { bio: string; created_at: string };
  };
}

export interface ExistingReview {
  id: number;
  rating: number;
  review: string;
  created_at: string;
}

export interface TripDetail {
  id: number;
  user_id: number;
  property_id: number;
  start_date: string;
  end_date: string;
  is_refundable: boolean;
  payment_status: "complete" | "pending" | "failed";
  payment_token: string | null;
  created_at: string;
  has_review: boolean;
  existing_review: ExistingReview | null;
  property: TripDetailProperty;
}
