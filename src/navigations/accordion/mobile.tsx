"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { NavbarProps } from "@/interface/navbar";

export default function NavbarMobileAccordion({
  serviceGroupsWithSubsets,
  setMenuOpen
}: Omit<NavbarProps, "logo" | "socialLinks"> & {
  setMenuOpen: (open: boolean) => void;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full flex justify-center mt-6 relative">
      <div className="w-full relative flex flex-col max-h-screen">
        <div className="overflow-y-auto flex-1 space-y-4 pb-20">
          {serviceGroupsWithSubsets?.map((section, idx) => {
            const mainSlug = section.url;
            const hasSubsets = section.subsets && section.subsets.length > 0;

            return (
              <div key={idx} className="group relative">
                <div className="px-4 py-2 flex items-center justify-between text-lg font-medium text-black">
                  <Link
                    href={`/${mainSlug}`}
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-golden transition-colors duration-200"
                  >
                    {section.main}
                  </Link>

                  {hasSubsets && (
                    <button
                      onClick={() => toggleSection(idx)}
                      className="ml-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200"
                      aria-label="Toggle submenu"
                    >
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-300 ${
                          openIndex === idx ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>

                {hasSubsets && (
                  <div
                    className={`${
                      openIndex === idx
                        ? "max-h-[1000px] opacity-100"
                        : "max-h-0 opacity-0"
                    } pl-4 space-y-2 mt-2 transition-all duration-500 ease-in-out rounded-md overflow-hidden`}
                  >
                    {section.subsets.map((subset, subIdx) => {
                      const subsetSlug = subset.slug;
                      return (
                        <Link
                          key={subIdx}
                          href={`/${mainSlug}/${subsetSlug}`}
                          onClick={() => setMenuOpen(false)}
                          className="block px-4 py-2 text-sm text-black hover:bg-golden hover:text-white transition-all rounded-md"
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
