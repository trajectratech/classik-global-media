import { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import NextImage from "next/image";

export const blurDataUrl = "https://placehold.co/600x400/png";

function distributeToColumns<T>(array: T[], columnCount: number): T[][] {
  const columns: T[][] = Array.from({ length: columnCount }, () => []);
  array.forEach((item, idx) => {
    columns[idx % columnCount].push(item);
  });
  return columns;
}

export interface Image {
  src: string;
  alt?: string;
}

export const PhotoGrid = ({ images }: { images: Image[] }) => {
  const imageColumns = distributeToColumns(images, 4);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const slides = images.map((img) => ({
    src: img.src,
    alt: img.alt || "gallery-photo"
  }));

  // Preload images
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new window.Image();
      img.src = slide.src;
    });
  }, [slides]);

  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {imageColumns.map((col, colIdx) => (
          <div className="grid gap-4" key={colIdx}>
            {col.map((image, idx) => {
              const globalIndex = colIdx + idx * 4;

              return (
                <div
                  key={globalIndex}
                  className="group cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:brightness-110"
                  onClick={() => {
                    setPhotoIndex(globalIndex);
                    setIsOpen(true);
                  }}
                >
                  {/* <img
                    className="h-full w-full max-w-full rounded-lg object-cover object-center"
                    src={image.src}
                    alt={image.alt || "gallery-photo"}
                  /> */}
                  <NextImage
                    src={image.src}
                    alt={image.alt || "gallery-photo"}
                    width={500}
                    height={400}
                    placeholder={blurDataUrl ? "blur" : "empty"}
                    blurDataURL={blurDataUrl}
                    className="w-full h-full rounded-lg object-cover object-center"
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {isOpen && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={slides}
          index={photoIndex}
          on={{
            view: ({ index }) => setPhotoIndex(index)
          }}
        />
      )}
    </div>
  );
};
