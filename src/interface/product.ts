import { IServiceGroup, IServiceGroupSubset } from "./service-group";
import { IContentfulImageField } from "./site-settings";

export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  specifications?: ISpecifications[];
  thumbnail: IContentfulImageField;
  images: IContentfulImageField[];
  category: string;
  inStock: boolean;
  serviceGroup?: IServiceGroup;
  serviceGroupSubSet?: IServiceGroupSubset;
}

export interface ISpecificationsField {
  fields: ISpecifications[];
}

export interface ISpecifications {
  key: string;
  label: string;
  value: string;
  unit: string;
}

export interface ProductSpecificationsProps {
  description: string;
  specifications: ISpecifications[];
}
