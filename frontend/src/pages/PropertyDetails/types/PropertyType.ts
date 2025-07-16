import type { Amenity } from "../subcomponents/Amenities/type/AmenityType";
import type { PropertyImages } from "../subcomponents/Gallery/types/PropertyImagesType";
import type { Host } from "../subcomponents/HostDetails/type/HostType";
import type { Review } from "../subcomponents/Reviews/types/ReviewType";
import type { Rule } from "../subcomponents/ThingsToKnow/HouseRules/types/RuleType";
import type { SafetyNote } from "../subcomponents/ThingsToKnow/SafetyNotes/types/SafetyNoteType";
import type { BedInfo } from "./PropertyBedInfoType";

export interface Property {
  id: number;
  user_id: number;
  address: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  name: string;
  description: string;
  price: string;
  bedrooms: number;
  baths: number;
  max_guests: number;
  created_at: string;
  updated_at: string;
  cancellation_policy: string;
  coordinates_latitude: string;
  coordinates_longitude: string;
  title: string;
  property_type: string;
  property_images: Array<PropertyImages>;
  property_bed_infos: Array<BedInfo>;
  property_rules: Array<Rule>;
  property_safety_notes: Array<SafetyNote>;
  amenities: Array<Amenity>;
  user: Host;
  reviews: Array<Review>;
  rating: string;
}
