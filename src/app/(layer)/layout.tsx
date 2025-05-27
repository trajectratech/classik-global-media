import { Footer } from "@/components/footer";
import { ISiteSettings } from "@/interface/site-settings";
import Navbar from "@/navigations/navbar";

import { getSharedData } from "@/lib/contentful";
import { Metadata } from "next";
import { fixUrl } from "@/lib/utils";
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const host = headers().get("host");
  const proto = headers().get("x-forwarded-proto") || "http";
  const baseUrl = `${proto}://${host}`;

  const dynamicUrl = `${baseUrl}`;

  const data = await getSharedData();
  const { siteSettings } = data;

  const {
    logo,
    businessName,
    emailAddress,
    phoneNumber,
    socialLinks,
    // businessAddress,
    businessDescription
  } = siteSettings as unknown as ISiteSettings;

  const siteUrl = dynamicUrl;
  const logoUrl = fixUrl(logo?.fields?.file?.url) || `${siteUrl}/logo.png`;
  const description =
    businessDescription ||
    `${businessName} offers premium digital services, business solutions, and curated products for individuals and organizations.`;

  const jsonLdWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: businessName,
    url: siteUrl,
    description: description,
    publisher: {
      "@type": "Organization",
      name: businessName,
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: logoUrl
      },
      sameAs: socialLinks?.map((link) => link.url),
      contactPoint: {
        "@type": "ContactPoint",
        telephone: phoneNumber,
        contactType: "Customer Support",
        areaServed: "NG",
        availableLanguage: ["English"]
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "34 Binuyo Street, Off Aroloya",
        addressLocality: "Lagos Island",
        addressRegion: "Lagos",
        postalCode: "102273",
        addressCountry: "NG"
      }
    }
  };

  const jsonLdLocalBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: businessName,
    url: siteUrl,
    logo: logoUrl,
    image: logoUrl,
    description: description,
    telephone: phoneNumber,
    email: emailAddress,
    address: {
      "@type": "PostalAddress",
      streetAddress: "34 Binuyo Street, Off Aroloya",
      addressLocality: "Lagos Island",
      addressRegion: "Lagos",
      postalCode: "102273",
      addressCountry: "NG"
    },
    sameAs: socialLinks?.map((link) => link.url)
  };

  return {
    title: "Home | " + businessName,
    description,
    robots: { index: true, follow: true },
    openGraph: {
      title: businessName,
      description,
      url: siteUrl,
      siteName: businessName,
      type: "website",
      images: [
        {
          url: logoUrl,
          width: 800,
          height: 600,
          alt: `${businessName} Logo`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: businessName,
      description,
      images: [logoUrl]
    },

    other: {
      "application/ld+json": JSON.stringify([
        jsonLdWebsite,
        jsonLdLocalBusiness
      ])
    }
  };
}

export default async function LayerLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const data = await getSharedData();

  const { siteSettings, serviceGroups } = data;

  const {
    logo,
    businessName,
    emailAddress,
    phoneNumber,
    socialLinks,
    whatsAppNumber,
    businessAddress,
    businessDescription
  } = siteSettings as unknown as ISiteSettings;

  const siteLogo = logo?.fields?.file?.url;

  const navbarProps = {
    logo: siteLogo,
    serviceGroupsWithSubsets: serviceGroups,
    socialLinks
  };

  const props = {
    businessName,
    businessAddress,
    emailAddress,
    phoneNumber,
    whatsAppNumber,
    businessDescription,
    ...navbarProps
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar {...navbarProps} />
      <main className="flex-grow max-w-[1440px] w-full mx-auto">
        {children}
      </main>
      <Footer {...props} />
      {/* <CursorTrail /> */}
    </div>
  );
}
