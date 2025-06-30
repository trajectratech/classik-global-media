/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProduct, ISpecificationsField } from "@/interface/product";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fixUrl = (url: string) => {
  if (url?.startsWith("//")) {
    return "https:" + url;
  }
  return url;
};

export function mapEntryToProduct(entry: any): IProduct {
  return {
    id: entry.sys.id,
    title: entry.fields.title ?? "",
    description: entry.fields.description ?? "",
    price: entry.fields.price ?? 0,
    quantity: entry.fields.quantity ?? 0,
    thumbnail: entry.fields.thumbnail,
    images: entry.fields.images,
    category: entry.fields.category,
    inStock: entry.fields.inStock,
    specifications: entry?.fields?.specifications?.map(
      (spec: ISpecificationsField) => spec?.fields
    ),
    serviceGroup: entry?.fields?.serviceGroup,
    serviceGroupSubSet: entry?.fields?.serviceGroupSet
  };
}
export const getWhatsAppLink = (product: IProduct, whatsapp: string) => {
  const productUrl = `${process.env.BASE_URL || "https://www.classikglobalmedia.com"}/product/${product.id}`;
  const message = `Hi, I'm interested in "${product.title}" (₦${product.price}). Here's the link: ${productUrl}`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${whatsapp}?text=${encodedMessage}`;
};
