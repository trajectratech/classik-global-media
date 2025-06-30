import { IProduct } from "@/interface/product";
import { Product } from "./product";

export const Products = ({
  heading,
  products,
  whatsapp
}: {
  heading: string;
  products: IProduct[];
  whatsapp: string;
}) => {
  return (
    <div className="py-3 bg-white text-black">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 font-bold text-2xl">{heading}</h2>

        <section>
          <div
            className="flex gap-6 px-2 py-6 snap-x snap-mandatory overflow-x-auto scrollbar-hide"
            style={{ scrollPaddingLeft: "1rem", scrollPaddingRight: "1rem" }}
          >
            {products &&
              Array.isArray(products) &&
              products?.length > 0 &&
              products?.map((product) => (
                <Product
                  key={product.id}
                  product={product}
                  whatsapp={whatsapp}
                />
              ))}
          </div>
        </section>
      </div>
    </div>
  );
};
