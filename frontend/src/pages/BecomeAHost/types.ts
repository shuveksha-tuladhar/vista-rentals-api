import type { IconType } from "react-icons";

export interface ListingData {
  propertyType: string;
  location: LocationData;
  basics: BasicsData;
  amenities: string[];
  photos: string[];
  description: DescriptionData;
  price: number;
  bedSetup: BedSetupData;
}

export interface LocationData {
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
}

export interface BasicsData {
  guests: number;
  bedrooms: number;
  bathrooms: number;
}

export interface DescriptionData {
  title: string;
  description: string;
}

export interface Step {
  id: number;
  title: string;
}

export interface PropertyType {
  id: string;
  name: string;
  icon: IconType;
  description: string;
}

export interface Amenity {
  id: string;
  name: string;
  icon: IconType;
}

export type BedType = "King" | "Queen" | "Double" | "Single" | "Sofa Bed" | "Bunk Bed";

export interface BedEntry {
  bedType: BedType | "";
}

export interface BedroomConfig {
  room: string;
  beds: BedEntry[];
}

export interface BedSetupData {
  bedrooms: BedroomConfig[];
}
