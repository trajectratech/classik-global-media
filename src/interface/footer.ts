import { SocialLink } from "@/type/social-links";
import { IServiceGroupExtractedWithSubsets } from "./service-group";

export interface IFooter {
  businessName: string;
  businessAddress: string;
  businessDescription: string;
  emailAddress: string;
  phoneNumber: string;
  socialLinks: SocialLink[];
  whatsAppNumber: string;
  logo: string;
  serviceGroupsWithSubsets: IServiceGroupExtractedWithSubsets[];
}
