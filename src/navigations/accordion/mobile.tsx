"use client";

import { useState } from "react";
import Link from "next/link";
import { NavbarProps } from "@/interface/navbar";

export default function NavbarMobileAccordion({
  serviceGroupsWithSubsets
}: Omit<NavbarProps, "logo" | "socialLinks">) {
  const [openIndex, setOpenIndex] = useState<number | null>(null); // Track which section is open

  const toggleSection = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null); // If already open, close it
    } else {
      setOpenIndex(index); // Otherwise, open the clicked section
    }
  };

  return (
    <div className="w-full flex justify-center mt-6 relative">
      <div className="w-full relative flex flex-col max-h-screen">
        <div className="overflow-y-auto flex-1 space-y-4 pb-20">
          {/* Allow scrolling with padding at the bottom */}
          {serviceGroupsWithSubsets?.map((section, idx) => {
            const mainSlug = section.url;

            return (
              <div key={idx} className="group relative">
                <div
                  onClick={() => toggleSection(idx)}
                  className="cursor-pointer hover:text-golden px-4 py-2 font-medium text-lg text-black flex items-center justify-between"
                >
                  <span>{section.main}</span>
                  {/* Add icon for open/close */}
                  <span
                    className={`transition-transform duration-300 ${
                      openIndex === idx ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </div>

                {/* Accordion content */}
                {section.subsets && section.subsets.length > 0 && (
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
                          className="block px-4 py-2 text-sm text-black hover:bg-golden hover:text-white"
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
