interface User {
  first_name: string;
  last_name: string;
}

export interface Review {
  id: number;
  user: User;
  review: string;
  rating: number;
}
