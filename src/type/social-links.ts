export type SocialIcon =
  | "facebook"
  | "twitter"
  | "instagram"
  | "linkedin"
  | "youtube"
  | string;

export type SocialLink = {
  name: string;
  url: string;
  icon: SocialIcon;
  order?: number;
};

export type SocialLinks = {
  socialLinks: SocialLink[];
};
