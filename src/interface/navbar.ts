import { SocialLink } from "@/type/social-links";
import { IServiceGroupExtractedWithSubsets } from "./service-group";

export interface LinkType {
  name: string;
  href: string;
}

export interface DrawerProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  links: LinkType[];
}

export interface NavbarProps {
  logo: string;
  serviceGroupsWithSubsets: IServiceGroupExtractedWithSubsets[];
  socialLinks: SocialLink[];
}
