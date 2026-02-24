export interface HostListingBedInfo {
  room: string;
  bed_type: string;
}

export interface HostListingImage {
  url: string;
}

export interface HostListing {
  id: number;
  title: string;
  name: string;
  description: string;
  property_type: string;
  price: string;
  city: string;
  state: string;
  country: string;
  bedrooms: number;
  baths: number;
  max_guests: number;
  property_images: HostListingImage[];
  amenities: { id: number; name: string }[];
  property_bed_infos: HostListingBedInfo[];
}

export interface PaginationMeta {
  current_page: number;
  total_pages: number;
  total_count: number;
}

export interface EditListingFormValues {
  title: string;
  description: string;
  price: string;
  photos: string[];
  amenity_names: string[];
}
