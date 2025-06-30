"use client";

import ProductActions from "./product-actions";
import ProductSpecifications from "./product-specifications";
import ProductHeader from "./product-header";
import ProductGallery from "./product-gallery";
import { IProduct } from "@/interface/product";

const ProductCatalog = ({
  product,
  whatsapp
}: {
  product: IProduct;
  whatsapp: string;
}) => {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div>
          <ProductGallery images={product.images} />
        </div>

        <div>
          <ProductHeader
            name={product.title}
            price={product.price?.toString()}
            category={product.category}
            inStock={product.inStock}
          />

          <ProductSpecifications
            description={product.description}
            specifications={product?.specifications || []}
          />

          <ProductActions
            whatsapp={whatsapp}
            inStock={product.inStock}
            product={product}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;
