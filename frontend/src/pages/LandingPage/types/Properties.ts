import type { PropertyImages } from "../../PropertyDetails/subcomponents/Gallery/types/PropertyImagesType";

export interface Properties {
  id: number;
  name: string;
  city: string;
  state: string;
  property_type: string;
  price: string;
  property_images: PropertyImages[];
  rating: string;
  coordinates_latitude: string;
  coordinates_longitude: string;
}
