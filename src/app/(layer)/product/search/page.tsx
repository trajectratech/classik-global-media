import { fetchProductsByQuery } from "@/lib/contentful";
import React from "react";
import { IProduct } from "@/interface/product";
import { Product } from "@/components/products/product";
import { NoResults } from "./components/no-result.tsx";
import Link from "next/link";
import { Metadata } from "next";
import { headers } from "next/headers.js";

interface SearchPageProps {
  searchParams: { q?: string };
}

type SearchParams = { searchParams: { q?: string } };

export async function generateMetadata({
  searchParams
}: SearchParams): Promise<Metadata> {
  const query = searchParams.q?.trim();

  const host = headers().get("host");
  const proto = headers().get("x-forwarded-proto") || "http";
  const baseUrl = `${proto}://${host}`;

  const dynamicUrl = `${baseUrl}`;

  if (!query) {
    return {
      title: "Search | Classik Global Media",
      description: "Search for products and artwork.",
      robots: { index: false, follow: false }
    };
  }

  const { matched } = await fetchProductsByQuery(query);
  const found = matched?.length > 0;

  if (!found) {
    return {
      title: `No results for "${query}" | Classik Global Media`,
      description: `No products found matching "${query}". Try a different search.`,
      robots: { index: true, follow: false },
      openGraph: {
        title: `No results for "${query}"`,
        description: `We couldn't find anything for "${query}" on Classik Global Media.`,
        url: `${dynamicUrl}/product/search?q=${encodeURIComponent(query)}`
      },
      twitter: {
        card: "summary",
        title: `No results for "${query}"`,
        description: `Search query: "${query}". Nothing matched.`
      }
    };
  }

  return {
    title: `Results for "${query}" | Classik Global Media`,
    description: `Showing results for "${query}". Discover matching products and artwork.`,
    robots: { index: true, follow: true },
    openGraph: {
      title: `Search results for "${query}"`,
      description: `Products related to "${query}" on Classik Global Media.`,
      url: `${dynamicUrl}/product/search?q=${encodeURIComponent(query)}`
    },
    twitter: {
      card: "summary",
      title: `Search: "${query}"`,
      description: `Explore what we found for "${query}"`
    }
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q?.trim();

  if (!query) {
    return (
      <p className="p-4 text-center text-gray-500">
        Please enter a search query.
      </p>
    );
  }

  // Fetch matched and related products from Contentful
  const { matched, related } = await fetchProductsByQuery(query);

  const products: IProduct[] = matched;

  const relatedProducts: IProduct[] = related;

  if (products.length === 0) {
    return <NoResults query={query} />;
  }

  return (
    <div className="px-4 mb-5">
      {products?.length > 0 && (
        <>
          <h1 className="text-2xl font-bold mb-4 text-center my-6">
            Search results for &quot;{query}&quot;
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products?.map((product) => (
              <Product key={product?.id} product={product} />
            ))}
          </div>
        </>
      )}

      {relatedProducts.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-4">
            Other products you might like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {relatedProducts?.map((product) => (
              <Product key={product?.id} product={product} />
            ))}
          </div>
        </>
      )}

      <div className="mt-8 text-center">
        <Link
          prefetch
          href="/"
          className="inline-block px-6 py-2 bg-golden text-white rounded-full hover:bg-golden-dark transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
