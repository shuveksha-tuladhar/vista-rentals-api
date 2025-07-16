interface HostDetail {
  bio: string;
  created_at: string;
}
export interface Host {
  first_name: string;
  last_name: string;
  avatar_url: string;
  host: HostDetail;
}
