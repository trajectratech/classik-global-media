import React from "react";

import { IProduct } from "@/interface/product";

import ProductSlider from "./slider";

export const FeaturedCollections = ({ products }: { products: IProduct[] }) => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          Featured Collections
        </h2>

        <ProductSlider featuredProducts={products} />
      </div>
    </section>
  );
};
