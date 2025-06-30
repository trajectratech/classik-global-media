import { IProduct } from "@/interface/product";
import { fixUrl, getWhatsAppLink } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function ProductCard({
  product,
  whatsapp
}: {
  product: IProduct;
  whatsapp: string;
}) {
  return (
    <div
      className="flex flex-col bg-white rounded-2xl shadow-md overflow-hidden
                 transform transition-transform duration-300 cursor-pointer hover:scale-[1.05]"
    >
      {/* Image */}
      <div className="relative h-56 w-full">
        <Image
          src={fixUrl(product.thumbnail.fields.file.url)}
          alt={product.title}
          fill
          className="object-cover rounded-t-2xl"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {product.title}
        </h3>
        <p className="mt-2 text-sm text-gray-600 line-clamp-3 flex-grow">
          {product.description}
        </p>

        <ul className="mt-4 space-y-1 text-xs text-gray-500">
          <li>
            <strong>Price:</strong> ${product.price.toFixed(2)}
          </li>
          <li>
            <strong>Quantity:</strong> {product.quantity} left
          </li>
          <li>{/* <strong>Specs:</strong> {product.specification} */}</li>
        </ul>

        {/* Gallery */}
        <div className="flex gap-2 overflow-x-auto mt-4 scrollbar-hide">
          {product?.images?.map((img, i) => (
            <div
              key={i}
              className="relative flex-none w-12 h-12 rounded-md border border-gray-300 overflow-hidden"
            >
              <Image
                src={fixUrl(img.fields.file.url)}
                alt={`${product.title} image ${i + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-5 flex gap-3">
          <Link
            href={getWhatsAppLink(product, whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            prefetch
          >
            <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl font-medium transition">
              Buy Now
            </button>
          </Link>

          <Link href={`/product/${product.id}`} passHref prefetch>
            <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-xl font-medium transition">
              More Info
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
