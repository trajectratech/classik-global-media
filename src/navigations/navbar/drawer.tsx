"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { SocialButtons } from "@/components/social-buttons";
import NavbarMobileAccordion from "../accordion/mobile";
import { DrawerProps, NavbarProps } from "@/interface/navbar";
import { fixUrl } from "@/lib/utils";

export const Drawer = ({
  menuOpen,
  setMenuOpen,
  links,
  socialLinks,
  serviceGroupsWithSubsets,
  logo
}: DrawerProps & NavbarProps) => {
  // Lock body scroll when the menu is openb
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    // Cleanup function to reset body styles
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [menuOpen]);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: menuOpen ? 0 : "100%" }}
      transition={{
        type: "tween", // smoother transition
        ease: "easeInOut", // smoother easing
        duration: 0.5 // adjust the duration for a smoother effect
      }}
      className="fixed top-0 right-0 w-full h-full bg-white shadow-lg z-40 md:hidden overflow-hidden"
    >
      <div className="flex flex-col h-full">
        {/* Header (Logo and Close Button) */}
        <div className="flex justify-between items-center p-4 shadow-md fixed top-0 left-0 right-0 z-50 bg-white">
          <div className="flex items-center">
            <Link href="/" passHref prefetch>
              <Image
                src={fixUrl(logo) || "/logo.svg"}
                height={40}
                width={40}
                alt="Classik logo"
              />
            </Link>
          </div>

          <button onClick={() => setMenuOpen(false)} className="p-2">
            <X className="h-6 w-6 text-black" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pt-20 pb-20">
          <NavbarMobileAccordion
            serviceGroupsWithSubsets={serviceGroupsWithSubsets}
          />

          {/* Links List */}
          <div className="flex flex-col items-start space-y-6 mt-4 px-4">
            {links.map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                passHref
                className="text-black text-lg font-semibold"
              >
                {name}
              </Link>
            ))}
          </div>
        </div>

        {/* Social Media Section (Fixed at the bottom) */}
        <div className="fixed bottom-0 left-0 right-0 flex justify-center space-x-6 bg-white py-2 px-4 shadow-md z-50 border-t border-gray-300">
          <SocialButtons socialLinks={socialLinks} />
        </div>
      </div>
    </motion.div>
  );
};
