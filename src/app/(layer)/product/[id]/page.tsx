import { Metadata } from "next";

import ProductCatalog from "@/components/products/product-catalog";
import { getAllProducts, getProductById } from "@/lib/contentful";
import { fixUrl, mapEntryToProduct } from "@/lib/utils";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { ISiteSettings } from "@/interface/site-settings";
import { getCachedSharedData } from "@/lib/shared";

export const revalidate = 60;

export async function generateStaticParams() {
  const entries = await getAllProducts();
  return entries.map((entry) => ({ id: entry.id }));
}

export async function generateMetadata({
  params
}: {
  params: { id: string };
}): Promise<Metadata> {
  const host = headers().get("host");
  const proto = headers().get("x-forwarded-proto") || "http";
  const baseUrl = `${proto}://${host}`;

  const dynamicUrl = `${baseUrl}`;

  const entry = await getProductById(params.id);

  // Fallback SEO metadata if the product does not exist
  if (!entry) {
    return {
      title: "Product Not Found | Classik Global Media",
      description:
        "The product you're looking for does not exist or may have been removed.",
      robots: { index: false, follow: false },
      openGraph: {
        title: "Product Not Found | Classik Global Media",
        description:
          "The product you're looking for does not exist or may have been removed.",
        url: `${dynamicUrl}/products/${params.id}`,
        type: "website"
      },
      twitter: {
        card: "summary",
        title: "Product Not Found",
        description: "The product you're looking for does not exist."
      }
    };
  }

  const product = mapEntryToProduct(entry);
  const siteUrl = dynamicUrl;
  const productUrl = `${siteUrl}/products/${product.id}`;
  const imageUrl =
    fixUrl(product.thumbnail?.fields?.file?.url) ??
    fixUrl(product.images?.[0]?.fields?.file?.url) ??
    "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: imageUrl,
    sku: product.id,
    brand: {
      "@type": "Organization",
      name: "Classik Global Media"
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.price.toFixed(2),
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: productUrl,
      itemCondition: "https://schema.org/NewCondition"
    }
  };

  return {
    title: `${product.title} | Classik Global Media`,
    description: product.description,
    keywords: [
      product.title,
      product.category,
      "Wall Art",
      "Custom Design",
      "Buy Online",
      "Classik Global Media",
      "Photography",
      "Video"
    ],
    openGraph: {
      title: `${product.title} | Classik Global Media`,
      description: product.description,
      url: productUrl,
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | Classik Global Media`,
      description: product.description,
      images: [imageUrl]
    },
    alternates: {
      canonical: productUrl
    },
    robots: { index: true, follow: true },
    other: {
      "application/ld+json": JSON.stringify(jsonLd)
    }
  };
}

export default async function ProductPage({
  params
}: {
  params: { id: string };
}) {
  const { id } = params;

  const entry = await getProductById(id);

  if (!entry) return notFound();

  const product = mapEntryToProduct(entry);

  const data = await getCachedSharedData();

  const { siteSettings } = data;
  const { whatsAppNumber } = siteSettings as unknown as ISiteSettings;

  return (
    <div>
      <ProductCatalog product={product} whatsapp={whatsAppNumber} />
    </div>
  );
}
