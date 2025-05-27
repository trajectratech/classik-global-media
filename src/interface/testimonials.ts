import { IContentfulImage, IContentfulImageField } from "./site-settings";

export interface ITestimonials {
  name: string;
  role: string;
  message: string;
  rating: number;
  avatar: IContentfulImage;
}

export interface ITestimonialsParent {
  name: string;
  role: string;
  message: string;
  rating: number;
  avatar: IContentfulImageField;
}
