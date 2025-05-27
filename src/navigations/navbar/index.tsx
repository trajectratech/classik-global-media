"use client";

import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { links } from "@/constants/generic";
import NavbarDesktopDropdown from "../dropdown/desktop";
import { useIsMobile } from "@/hooks/use-mobile";
import { NavbarProps } from "@/interface/navbar";
import { Drawer } from "./drawer";
import { fixUrl } from "@/lib/utils";

export default function Navbar({
  logo,
  serviceGroupsWithSubsets,
  socialLinks
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = (
      e.currentTarget.elements.namedItem("search") as HTMLInputElement
    ).value;
    if (input.trim()) {
      router.push(`/product/search?q=${encodeURIComponent(input.trim())}`);
    }
  };

  // useEffect(() => {
  //   const targetId = sessionStorage.getItem("scrollTo");
  //   if (targetId) {
  //     setTimeout(() => {
  //       const el = document.getElementById(targetId);
  //       if (el) {
  //         el.scrollIntoView({ behavior: "smooth" });
  //         sessionStorage.removeItem("scrollTo");
  //       }
  //     }, 100);
  //   }
  // }, []);

  return (
    <nav
      className="sticky top-0 z-50 bg-white shadow-md px-1 md:px-4 "
      style={{
        background: "linear-gradient(135deg, #fef9ef 0%, #f7d488 100%)"
      }}
    >
      <div className="mb-2 flex justify-between h-10 items-center w-full  m-1 mt-2 gap-2 ">
        <Link href="/" passHref prefetch>
          <Image
            src={fixUrl(logo) || "/logo.svg"}
            height={isMobile ? 40 : 45}
            width={isMobile ? 40 : 45}
            alt="Classik Global Media logo"
          />
        </Link>

        {/* Search bar */}

        <form
          onSubmit={handleSearch}
          className="  md:flex flex-1 justify-center relative w-full max-w-md mt-2"
        >
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-almostblack" />
          </span>
          <input
            name="search"
            type="text"
            placeholder="Search artworks, canvas printing, photography..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-golden transition placeholder:text-almostblack"
          />
        </form>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-4 text-xl font-bold text-black -mt-2 p-0">
          {links.map(({ name, href }) => (
            <Link
              key={name}
              href={href}
              passHref
              className={clsx(
                "hidden md:block",
                pathname === href ? "font-semibold text-golden" : "text-black"
              )}
            >
              <span
                className={clsx(
                  "text-sm font-medium transition-colors duration-300 whitespace-nowrap hover:text-golden",
                  pathname === href
                    ? "font-semibold text-golden"
                    : "text-almostblack"
                )}
              >
                {name}
              </span>
            </Link>
          ))}
        </div>

        {/* Hamburger Menu Icon */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-black p-2 md:hidden"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Drawer component */}
      <Drawer
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        links={links}
        serviceGroupsWithSubsets={serviceGroupsWithSubsets}
        logo={logo}
        socialLinks={socialLinks}
      />

      {/* Overlay to darken the background */}
      {menuOpen && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-30 md:hidden"
          onClick={() => setMenuOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Desktop Dropdown Section */}
      <div className="hidden md:flex w-[80%] mx-auto justify-center space-x-8 text-sm font-semibold text-almostblack relative p-0">
        <NavbarDesktopDropdown
          serviceGroupsWithSubsets={serviceGroupsWithSubsets}
        />
      </div>
    </nav>
  );
}
