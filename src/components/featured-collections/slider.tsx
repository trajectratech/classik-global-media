import { IProduct } from "@/interface/product";
import { Product } from "../products/product";

export default function ProductSliderSSR({
  featuredProducts,
  whatsapp
}: {
  featuredProducts: IProduct[];
  whatsapp: string;
}) {
  return (
    <div className="relative">
      <div
        className="flex gap-6 px-4 py-6 snap-x snap-mandatory overflow-x-auto scrollbar-hide"
        style={{ scrollPaddingLeft: "1rem", scrollPaddingRight: "1rem" }}
        id="featured-slide"
      >
        {featuredProducts?.map((product) => (
          <Product key={product.id} product={product} whatsapp={whatsapp} />
        ))}
      </div>
    </div>
  );
}
