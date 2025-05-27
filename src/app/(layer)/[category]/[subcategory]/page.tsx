import { ProductsClient } from "@/components/products/product-client";
import { IProduct } from "@/interface/product";
import {
  getAllCategories,
  getProductsByServiceGroupSubsetUrl
} from "@/lib/contentful";
import { fixUrl, mapEntryToProduct } from "@/lib/utils";
import Link from "next/link";

// type Params = { category: string; subcategory: string };

import { Metadata } from "next";
import { headers } from "next/headers";
import { IServiceGroupSubset } from "@/interface/service-group";

type Params = { params: { category: string; subcategory: string } };

export const revalidate = 7200;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const host = headers().get("host");
  const proto = headers().get("x-forwarded-proto") || "http";
  const baseUrl = `${proto}://${host}`;

  const dynamicUrl = `${baseUrl}`;

  const { category, subcategory } = params;

  const readableCategory = category
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
  const readableSubcategory = subcategory
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const entries = await getProductsByServiceGroupSubsetUrl(
    category,
    subcategory,
    { limit: 50 }
  );
  const products = entries?.map(mapEntryToProduct) ?? [];

  const siteUrl = `${dynamicUrl}/${category}/${subcategory}`;

  const description = `Explore top-rated ${readableSubcategory} products in the ${readableCategory} category. Find detailed specifications, availability, and the best prices with Classik Global Media.`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: readableSubcategory,
    description: description,
    url: siteUrl,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: readableCategory,
          item: `${dynamicUrl}/${category}`
        },
        {
          "@type": "ListItem",
          position: 2,
          name: readableSubcategory,
          item: siteUrl
        }
      ]
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products?.map((product, index) => ({
        "@type": "Product",
        position: index + 1,
        name: product.title,
        description: product.description,
        image: fixUrl(product?.thumbnail?.fields?.file?.url),
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
    title: `${readableSubcategory} | ${readableCategory} | Classik Global Media`,
    description,
    robots: { index: true, follow: true },
    openGraph: {
      title: `${readableSubcategory} | ${readableCategory}`,
      description,
      url: siteUrl,
      type: "website",
      images: fixUrl(products?.[0]?.thumbnail?.fields?.file?.url)
        ? [
            {
              url: fixUrl(products?.[0].thumbnail?.fields?.file?.url),
              width: 800,
              height: 600,
              alt: products[0].title
            }
          ]
        : []
    },
    twitter: {
      card: "summary_large_image",
      title: `${readableSubcategory} | ${readableCategory}`,
      description,
      images: fixUrl(products?.[0]?.thumbnail?.fields?.file?.url)
        ? [fixUrl(products?.[0].thumbnail?.fields?.file?.url)]
        : []
    },
    other: {
      "application/ld+json": JSON.stringify(jsonLd)
    }
  };
}
export async function generateStaticParams() {
  const entries = await getAllCategories();

  return entries.flatMap((category) =>
    (category?.subsets || [])?.map((subset: IServiceGroupSubset) => ({
      category: category?.url,
      subcategory: subset?.slug
    }))
  );
}

export default async function SubcategoryPage(params: Params) {
  const { category, subcategory } = params.params;

  const entries = await getProductsByServiceGroupSubsetUrl(
    category,
    subcategory,
    { limit: 50 }
  );

  const products: IProduct[] = entries?.map(mapEntryToProduct) ?? [];

  return (
    <div className="p-4">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-600">
        <ol className="inline-flex items-center space-x-1">
          <li>
            <Link href={`/${category}`} className="text-golden hover:underline">
              {category.replace(/-/g, " ")}
            </Link>
          </li>
          <li aria-hidden="true">
            <span className="mx-2 text-gray-400">{">"}</span>
          </li>
          <li className="text-gray-500" aria-current="page">
            {subcategory.replace(/-/g, " ")}
          </li>
        </ol>
      </nav>

      <ProductsClient
        initialProducts={products}
        category={category}
        subcategory={subcategory}
      />
    </div>
  );
}
