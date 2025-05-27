"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavbarProps } from "@/interface/navbar";
import clsx from "clsx";

export default function NavbarDesktopDropdown({
  serviceGroupsWithSubsets
}: Omit<NavbarProps, "logo" | "socialLinks">) {
  const pathname = usePathname();

  return (
    <div className="w-full flex justify-center ">
      <div className="w-[80%] relative">
        <div className="flex space-x-8 justify-center">
          {serviceGroupsWithSubsets.map((section, idx) => {
            const mainSlug = section.url;
            const isMainActive =
              pathname === `/${mainSlug}` ||
              pathname.startsWith(`/${mainSlug}/`);

            return (
              <div key={idx} className="group relative">
                <Link
                  href={`/${mainSlug}`}
                  className={clsx(
                    "cursor-pointer whitespace-nowrap inline-block px-2 py-1",
                    isMainActive
                      ? "text-golden font-semibold"
                      : "hover:text-golden"
                  )}
                >
                  {section.main}
                </Link>

                {section.subsets && section.subsets.length > 0 && (
                  <div className="absolute left-0 top-full pt-1 hidden group-hover:flex flex-col bg-white shadow-lg rounded-md py-2 w-64 z-50">
                    {section.subsets.map((subset, subIdx) => {
                      const subsetSlug = subset.slug;
                      const fullSubsetPath = `/${mainSlug}/${subsetSlug}`;
                      const isSubsetActive = pathname === fullSubsetPath;

                      return (
                        <Link
                          key={subIdx}
                          href={fullSubsetPath}
                          className={clsx(
                            "px-4 py-2 text-sm whitespace-nowrap",
                            isSubsetActive
                              ? "bg-golden text-white"
                              : "hover:bg-golden hover:text-white"
                          )}
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
