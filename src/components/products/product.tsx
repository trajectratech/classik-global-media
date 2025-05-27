import Image from "next/image";
import Link from "next/link";

import { IProduct } from "@/interface/product";
import { fixUrl } from "@/lib/utils";

import { MainButton } from "../ui/main-button";

export const Product = ({ product }: { product: IProduct }) => {
  return (
    <div
      key={product.id}
      tabIndex={0}
      className="
      relative flex-none w-full md:w-72 bg-almostblack/90 text-white rounded-2xl shadow-md overflow-hidden snap-start cursor-pointer
			transform transition-transform duration-300 hover:scale-[1.03]
			group-hover:opacity-40
			hover:!opacity-100
			pointer-events-auto
			"
    >
      {/* Thumbnail */}
      <div className="relative h-44 w-full">
        <Image
          src={fixUrl(product?.thumbnail?.fields?.file?.url)}
          alt={product?.title}
          fill
          className="object-cover rounded-t-2xl"
          priority
          sizes="300"
        />
      </div>

      {/* Content */}
      <div className="p-4 text-white">
        <h3 className="text-lg font-semibold truncate">{product?.title}</h3>
        <p className="text-white-600 text-sm line-clamp-2 mt-1">
          {product?.description}
        </p>

        <ul className="text-xs text-white-500 mt-2 space-y-1">
          <li>
            <strong>Price:</strong> ${product.price?.toFixed(2)}
          </li>
          <li>
            <strong>Quantity:</strong> {product.quantity} left
          </li>
          <li>{/* <strong>Specs:</strong> {product.specification} */}</li>
        </ul>

        {/* Gallery */}
        <div className="flex gap-2 overflow-x-auto mt-3 scrollbar-hide">
          {product?.images?.map((img, i) => (
            <div
              key={i}
              className="relative flex-none w-10 h-10 rounded-md border border-gray-300 overflow-hidden"
            >
              <Image
                src={fixUrl(img?.fields?.file?.url)}
                alt={`${product.title} image ${i + 1}`}
                fill
                className="object-cover"
                sizes="300"
              />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-4 flex gap-2">
          <Link href={`/product/${product.id}`} passHref prefetch>
            <MainButton title="Buy Now" />
          </Link>

          <Link href={`/product/${product.id}`} passHref prefetch>
            <MainButton
              title="More Info"
              className="flex-1 p-4 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-xl font-medium transition"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
