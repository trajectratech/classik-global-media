"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { useEffect, useState, useTransition } from "react";
import { Menu, X, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { links } from "@/constants/generic";
import { useIsMobile } from "@/hooks/use-mobile";
import { NavbarProps } from "@/interface/navbar";
import { fixUrl } from "@/lib/utils";
import NavbarDesktopDropdown from "../dropdown/desktop";
import { Drawer } from "./drawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

export default function Navbar({
  logo,
  serviceGroupsWithSubsets,
  socialLinks
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(false);
  const [isPending, startTransition] = useTransition();

  // 🌟 Load query from URL on mount
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  useEffect(() => {
    if (!pathname.startsWith("/product/search")) {
      setSearchQuery("");
    }
  }, [pathname]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = searchQuery.trim();

    if (input) {
      setIsSearching(true);
      startTransition(() => {
        router.push(`/product/search?q=${encodeURIComponent(input)}`);
        setSearchModalOpen(false);
      });
    }
  };

  if (!isPending && isSearching) {
    setIsSearching(false);
  }

  return (
    <nav
      className="sticky top-0 z-50 bg-white shadow-md px-1 md:px-4"
      style={{
        background: "linear-gradient(135deg, #fef9ef 0%, #f7d488 100%)"
      }}
    >
      <div className="mb-2 flex justify-between h-10 items-center w-full m-1 mt-2 gap-2">
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
          className="flex items-center w-full max-w-md mt-2 px-4 md:px-0"
        >
          <div className="relative flex items-center w-full">
            <span className="absolute left-3 inset-y-0 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-almostblack" />
            </span>
            <input
              name="search"
              type="text"
              placeholder="Search artworks, canvas printing, photography..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-golden transition placeholder:text-almostblack"
              onFocus={(e) => {
                if (isMobile) {
                  e.preventDefault();
                  e.target.blur();
                  setSearchModalOpen(true);
                }
              }}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-almostblack"
              disabled={isSearching}
            >
              {isSearching ? (
                <svg
                  className="animate-spin h-4 w-4 text-almostblack"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.372 0 0 5.373 0 12h4z"
                  />
                </svg>
              ) : (
                "Go"
              )}
            </button>
          </div>
        </form>

        {/* Desktop Links */}
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

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-black p-2 md:hidden"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Drawer for mobile nav */}
      <Drawer
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        links={links}
        serviceGroupsWithSubsets={serviceGroupsWithSubsets}
        logo={logo}
        socialLinks={socialLinks}
      />

      {menuOpen && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-30 md:hidden"
          onClick={() => setMenuOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Desktop Dropdowns */}
      <div className="hidden md:flex w-[80%] mx-auto justify-center space-x-8 text-sm font-semibold text-almostblack relative p-0">
        <NavbarDesktopDropdown
          serviceGroupsWithSubsets={serviceGroupsWithSubsets}
        />
      </div>

      {/* 🔍 Mobile Search Modal */}
      <Dialog open={searchModalOpen} onOpenChange={setSearchModalOpen}>
        <DialogContent className="sm:max-w-md p-6">
          <DialogHeader>
            <DialogTitle>Search</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSearch} className="w-full space-y-4">
            <div className="relative">
              <span className="absolute left-3 inset-y-0 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </span>
              <input
                name="search"
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search artworks, canvas printing, photography..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-golden"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-golden text-white py-2 rounded-md text-sm font-medium"
              disabled={isSearching}
            >
              {isSearching ? "Searching..." : "Search"}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </nav>
  );
}
