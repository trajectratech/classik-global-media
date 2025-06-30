import dynamic from "next/dynamic";

import { BusinessMap } from "@/components/business-map";
import { FeaturedCollections } from "@/components/featured-collections";
import { Products } from "@/components/products";
import { getPageSpecificData } from "@/lib/contentful";
import { HeroWrapper } from "@/components/carousel/hero-wrapper";
import { Services } from "@/components/services";
import { ISiteSettings } from "@/interface/site-settings";
import { getCachedSharedData } from "@/lib/shared";

// Dynamic import with no SSR for client-only HeroCarousel
const Testimonials = dynamic(
  () => import("@/components/testimonials").then((mod) => mod.Testimonials),
  { ssr: false }
);

export default async function Home() {
  const {
    featuredProducts,
    groupedProductsByServiceGroup,
    companyServices,
    testimonials,
    heroSlides
  } = await getPageSpecificData();

  let whatsapp = "249027786284";

  const data = await getCachedSharedData();

  const { siteSettings } = data;

  const { whatsAppNumber } = siteSettings as unknown as ISiteSettings;

  whatsapp = whatsAppNumber;

  return (
    <main className="min-h-screen  text-gray-900" id="testimonials">
      <HeroWrapper heroSlides={heroSlides} />

      {/* PRODUCT SHOWCASE FEATURES */}
      <FeaturedCollections products={featuredProducts} whatsapp={whatsapp} />

      {/* CATEGORIES */}
      {groupedProductsByServiceGroup?.map(({ name, products }, index) => (
        <Products
          key={index}
          heading={name}
          products={products}
          whatsapp={whatsapp}
        />
      ))}

      <Services data={companyServices} />
      <Testimonials testimonials={testimonials} />
      <BusinessMap />
    </main>
  );
}
