import PhotographyVideoPage from "@/components/photography-video";
import { ProductsClient } from "@/components/products/product-client";
import { IMediaResponse } from "@/interface/media";
import { IProduct } from "@/interface/product";
import { ISiteSettings } from "@/interface/site-settings";
import {
  getMediaByServiceGroupUrl,
  getProductsByServiceGroupUrl,
  getServiceGroup,
  getSharedData
} from "@/lib/contentful";
import { fixUrl, mapEntryToProduct } from "@/lib/utils";
import { Metadata } from "next";
import { headers } from "next/headers";

type Params = { params: { category: string } };
const photographyVideo = "photography-video";

export const revalidate = 7200;

export async function generateMetadata(params: Params): Promise<Metadata> {
  const host = headers().get("host");
  const proto = headers().get("x-forwarded-proto") || "http";
  const baseUrl = `${proto}://${host}`;

  const dynamicUrl = `${baseUrl}`;
  const category = params.params.category;

  const readableCategory = category
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const entries = await getProductsByServiceGroupUrl(category, { limit: 50 });
  const products = entries?.map(mapEntryToProduct) ?? [];

  const description = `Browse top-rated products in ${readableCategory} from Classik Global Media. Discover featured items, specifications, and best sellers.`;

  const siteUrl = `${dynamicUrl}/category/${category}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: readableCategory,
    description: description,
    url: siteUrl,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products?.map((product, index) => ({
        "@type": "Product",
        position: index + 1,
        name: product.title,
        description: product.description,
        image: fixUrl(product.thumbnail?.fields?.file?.url),
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "USD",
          availability: product.inStock
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock"
        }
      }))
    }
  };

  return {
    title: `${readableCategory} | Classik Global Media`,
    description,
    robots: { index: true, follow: true },
    openGraph: {
      title: `${readableCategory} | Classik Global Media`,
      description,
      url: siteUrl,
      type: "website",
      images: fixUrl(products?.[0]?.thumbnail?.fields?.file?.url)
        ? [
            {
              url: fixUrl(products?.[0]?.thumbnail?.fields?.file?.url),
              width: 800,
              height: 600,
              alt: products?.[0].title
            }
          ]
        : []
    },
    twitter: {
      card: "summary_large_image",
      title: `${readableCategory} | Classik Global Media`,
      description,
      images: fixUrl(products?.[0]?.thumbnail?.fields?.file?.url)
        ? [fixUrl(products?.[0]?.thumbnail?.fields?.file?.url)]
        : []
    },
    other: {
      "application/ld+json": JSON.stringify(jsonLd)
    }
  };
}

export async function generateStaticParams() {
  const entries = await getServiceGroup();
  return entries.items.map((item) => ({
    category: item.fields.url
  }));
}

export default async function CategoryPage(params: Params) {
  const category = params.params.category;
  let products: IProduct[] = [];
  let media: IMediaResponse | null = null;
  let email = "classikglobalmedia@gmail.com";
  let whatsapp = "249027786284";
  if (category?.toLowerCase() !== photographyVideo) {
    const productEntries = await getProductsByServiceGroupUrl(category, {
      limit: 50
    });

    products = productEntries?.map(mapEntryToProduct) ?? [];
  } else {
    media = await getMediaByServiceGroupUrl(category, {
      limit: 100
    });

    const data = await getSharedData();

    const { siteSettings } = data;

    const { emailAddress, whatsAppNumber } =
      siteSettings as unknown as ISiteSettings;

    email = emailAddress;
    whatsapp = whatsAppNumber;
  }
  //bg-[#f8f8f8]

  return (
    <div className="bg-gradient-to-b from-[#fff0c2] via-[#fff9e6] to-[#fff0c2]  px-4">
      {category?.toLowerCase() === photographyVideo ? (
        <PhotographyVideoPage media={media} email={email} whatsapp={whatsapp} />
      ) : (
        <>
          <h1 className="text-xl sm:text-2xl font-serif font-extrabold text-golden mb-10 tracking-wide drop-shadow-lg">
            Category: {category.replaceAll("-", " ")}
          </h1>
          <ProductsClient initialProducts={products} category={category} />
        </>
      )}
    </div>
  );
}
