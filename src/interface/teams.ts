import { IContentfulImage, IContentfulImageField } from "./site-settings";

export interface ITeamData {
  avatar: IContentfulImage;
  firstName: string;
  lastName: string;
  role: string;
  order: string;
}

export interface ITeamParent extends Omit<ITeamData, "avatar"> {
  avatar: IContentfulImageField;
}
