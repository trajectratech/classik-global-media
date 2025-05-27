import { SocialLink } from "@/type/social-links";

export interface IContentfulImage {
  title: string;
  description: string;
  file: {
    url: string;
    details: {
      size: number;
      image: {
        width: number;
        height: number;
      };
    };
    fileName: string;
    contentType: string;
  };
}

export interface IContentfulImageField {
  fields: IContentfulImage;
}

export interface ISiteSettings {
  businessName: string;
  businessAddress: string;
  businessDescription: string;
  phoneNumber: string;
  emailAddress: string;
  logo: IContentfulImageField;
  socialLinks: SocialLink[];
  whatsAppNumber: string;
}
