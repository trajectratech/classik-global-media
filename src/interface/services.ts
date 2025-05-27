import { IContentfulImage, IContentfulImageField } from "./site-settings";

export interface IService {
  title: string;
  description: string;
  thumbnail: IContentfulImage;
  ctaText: string;
  ctaSlug: string;
  order: number;
}

export interface IServiceField {
  fields: IService[];
}

export interface IServiceParent {
  title: string;
  description: string;
  services: IService[];
}

export interface IServiceParent {
  title: string;
  description: string;
  services: IService[];
}

export interface IContentfulService {
  title: string;
  description: string;
  thumbnail: IContentfulImageField;
  ctaText: string;
  ctaSlug: string;
  order: number;
}
