import type { PropertyImages } from "../../PropertyDetails/subcomponents/Gallery/types/PropertyImagesType";

export interface Properties {
  id: number;
  city: string;
  property_type: string;
  price: string;
  property_images: PropertyImages[];
  rating: string;
}
