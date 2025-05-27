"use client";

import { useState } from "react";
import { cn, fixUrl } from "@/lib/utils";
import { IContentfulImageField } from "@/interface/site-settings";
import Image from "next/image";
import { blurDataUrl } from "@/constants/generic";

const ProductGallery = ({ images }: { images?: IContentfulImageField[] }) => {
  const [activeImage, setActiveImage] = useState(0);

  const hasImages = Array.isArray(images) && images.length > 0;
  const activeUrl = hasImages
    ? fixUrl(images[activeImage]?.fields?.file?.url)
    : "/placeholder.png"; // fallback image

  if (!hasImages) {
    return (
      <div className="w-full text-center py-16 text-muted-foreground">
        <p>No product images available.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Main Image */}
      <div className="relative aspect-square rounded-lg overflow-hidden mb-4 bg-secondary">
        <Image
          fill
          src={activeUrl}
          alt={images?.[activeImage]?.fields?.description || "Product Image"}
          className="w-full h-full object-cover transition-opacity duration-500"
          blurDataURL={blurDataUrl}
          placeholder="blur"
          loading="eager"
          priority
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2">
        {images?.map((image, index) => {
          const url = fixUrl(image?.fields?.file?.url);
          if (!url) return null;

          return (
            <div
              key={index}
              className={cn(
                "aspect-square rounded-md overflow-hidden cursor-pointer border-2",
                activeImage === index ? "border-primary" : "border-transparent"
              )}
              onClick={() => {
                if (activeImage !== index) {
                  setActiveImage(index);
                }
              }}
            >
              <Image
                height={100}
                width={100}
                src={url}
                alt={`${image?.fields?.description || "Product Image"} `}
                className="w-full h-full object-cover"
                blurDataURL={blurDataUrl}
                placeholder="blur"
                loading="eager"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductGallery;
