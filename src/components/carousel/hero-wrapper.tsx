import { SlideData } from "@/interface/hero";
import { HeroCarousel } from "./initial-items";

export const HeroWrapper = ({ heroSlides }: { heroSlides: SlideData[] }) => {
  return <HeroCarousel heroSlides={heroSlides} />;
};
