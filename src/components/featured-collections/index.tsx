import React from "react";

import { IProduct } from "@/interface/product";

import ProductSlider from "./slider";

export const FeaturedCollections = ({
  products,
  whatsapp
}: {
  products: IProduct[];
  whatsapp: string;
}) => {
  return (
    <section className="bg-gray-100 py-12" id="featured">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-10">
          Featured Collections
        </h1>

        <div className="featured-products w-full h-full">
          <ProductSlider featuredProducts={products} whatsapp={whatsapp} />
        </div>
      </div>
    </section>
  );
};
