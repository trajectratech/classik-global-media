import { IContentfulImage, IContentfulImageField } from "./site-settings";

export interface SlideData {
  image: IContentfulImage;
  headline: string;
  description: string;
  buttonLabel: string;
  buttonLink: string;
}

export interface SlideDataParent extends Omit<SlideData, "image"> {
  image: IContentfulImageField;
}
