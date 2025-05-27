import Link from "next/link";
import Image from "next/image";

import { MainButton } from "../ui/main-button";
import { blurDataUrl } from "@/constants/generic";
import { IService } from "@/interface/services";
import { fixUrl } from "@/lib/utils";

export const Service = ({ item }: { item: IService }) => {
  const thumbnail = fixUrl(item?.thumbnail?.file?.url);
  return (
    <div className="group bg-almostblack/90 border border-almostblack/40 rounded-3xl shadow-md hover:shadow-2xl transition-shadow duration-500 ease-in-out overflow-hidden">
      <div className="p-6 flex flex-col h-full">
        {/* Image */}
        <div className="w-full h-52 rounded-2xl overflow-hidden shadow-md mb-6">
          <Image
            src={thumbnail}
            alt={item.title}
            width={400}
            height={400}
            className="w-full h-full object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
            placeholder="blur"
            blurDataURL={blurDataUrl}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between flex-grow">
          <div>
            <h3 className="text-2xl font-serif font-semibold text-white mb-2">
              {item.title}
            </h3>
            <p className="text-white text-base mb-3 font-light leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* CTA */}
          <div className="mt-4 text-left">
            <Link
              passHref
              prefetch
              href={item.ctaSlug}
              className="inline-block"
            >
              <MainButton
                title={item?.ctaText}
                className="w-full px-5 py-2 rounded-lg shadow-md  text-sm font-medium  transition duration-300"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
