import { ProductsClient } from "@/components/products/product-client";
import { IProduct } from "@/interface/product";
import {
  getProductsByServiceGroupUrl,
  getServiceGroup
} from "@/lib/contentful";
import { fixUrl, mapEntryToProduct } from "@/lib/utils";
import { Metadata } from "next";
import { headers } from "next/headers";

type Params = { params: { category: string } };

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
  const entries = await getProductsByServiceGroupUrl(category, { limit: 50 });

  const products: IProduct[] = entries?.map(mapEntryToProduct) ?? [];

  return (
    <div className="bg-white px-4 mt-2">
      <h1 className="text-xl sm:text-2xl font-serif font-extrabold text-golden mb-10 tracking-wide drop-shadow-lg">
        Category: {category.replaceAll("-", " ")}
      </h1>

      <ProductsClient initialProducts={products} category={category} />
    </div>
  );
}
