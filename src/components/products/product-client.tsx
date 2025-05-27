"use client";

import { useEffect, useState, useRef, useCallback } from "react";

import type { IProduct } from "@/interface/product";
import { ProductCardSkeleton } from "./skeleton";
import { Product } from "./product";

interface ProductsClientProps {
  initialProducts: IProduct[];
  category: string;
  subcategory?: string;
}

const PAGE_SIZE = 50;

export function ProductsClient({
  initialProducts,
  category,
  subcategory
}: ProductsClientProps) {
  const [products, setProducts] = useState<IProduct[]>(initialProducts);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true); // track if more data exists
  const loaderRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (!hasMore) return; // no more to load, skip

    setLoading(true);
    setError(null);
    try {
      const nextPage = page + 1;
      const queryParams = new URLSearchParams({
        category: category,
        page: String(nextPage),
        pageSize: String(PAGE_SIZE)
      });
      if (subcategory) {
        queryParams.append("subcategory", subcategory);
      }
      const res = await fetch(`/api/products?${queryParams.toString()}`);

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.error || "Failed to load products");
      }

      const json = await res.json();
      const data: IProduct[] = json.data;

      if (data.length > 0) {
        setProducts((prev) => [...prev, ...data]);
        setPage(nextPage);
        if (data.length < PAGE_SIZE) {
          setHasMore(false); // last page reached
        }
      } else {
        setHasMore(false); // no more data
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "An error occurred");
      console.error("Load more error:", err);
    } finally {
      setLoading(false);
    }
  }, [hasMore, page, category, subcategory]);

  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !loading &&
          !error &&
          hasMore // only load if more data is available
        ) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loadMore, loading, error, hasMore]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}

        {loading &&
          Array.from({ length: 8 }).map((_, idx) => (
            <ProductCardSkeleton key={idx} />
          ))}
      </div>

      <div ref={loaderRef} className="h-12 mt-8 text-center text-gray-500">
        {loading
          ? "Loading more products..."
          : error
            ? `Error: ${error}`
            : hasMore
              ? "Scroll down to load more"
              : "No more products to load"}
      </div>
    </>
  );
}
