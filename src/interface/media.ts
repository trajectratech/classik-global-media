import { IContentfulImage } from "./site-settings";

export interface IPhotoMedia {
  heading: string;
  photos: IContentfulImage[];
}

export interface IVideoMedia {
  heading: string;
  videos: IContentfulImage[];
}

export interface IMediaResponse {
  photos?: IPhotoMedia[];
  videos?: IVideoMedia[];
}
