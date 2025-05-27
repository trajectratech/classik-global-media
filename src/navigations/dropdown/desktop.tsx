"use client";

import Link from "next/link";
import { NavbarProps } from "@/interface/navbar";

export default function NavbarDesktopDropdown({
  serviceGroupsWithSubsets
}: Omit<NavbarProps, "logo" | "socialLinks">) {
  return (
    <div className="w-full flex justify-center ">
      <div className="w-[80%] relative">
        <div className="flex space-x-8 justify-center">
          {serviceGroupsWithSubsets.map((section, idx) => {
            const mainSlug = section.url;

            return (
              <div key={idx} className="group relative">
                <Link
                  href={`/${mainSlug}`}
                  className="cursor-pointer hover:text-golden whitespace-nowrap inline-block px-2 py-1"
                >
                  {section.main}
                </Link>

                {section.subsets && section.subsets.length > 0 && (
                  <div className="absolute left-0 top-full pt-1 hidden group-hover:flex flex-col bg-white shadow-lg rounded-md py-2 w-64 z-50">
                    {section.subsets.map((subset, subIdx) => {
                      const subsetSlug = subset.slug;

                      return (
                        <Link
                          key={subIdx}
                          href={`/${mainSlug}/${subsetSlug}`}
                          className="px-4 py-2 hover:bg-golden hover:text-white text-sm whitespace-nowrap"
                        >
                          {subset.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
