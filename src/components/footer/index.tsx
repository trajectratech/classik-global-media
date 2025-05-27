"use client";

import Image from "next/image";
import { SocialButtons } from "../social-buttons";
import { FC } from "react";
import { IFooter } from "@/interface/footer";
import { fixUrl } from "@/lib/utils";
import PageLinks from "./page-links";

export const Footer: FC<IFooter> = ({
  socialLinks,
  businessName,
  logo,
  phoneNumber,
  emailAddress,
  businessAddress,
  businessDescription
}) => {
  return (
    <footer className="relative bg-gray-900 text-white py-10 px-4 overflow-hidden">
      {/* Artistic SVG Background */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 256L48 234.7C96 213.3 192 171.7 288 160C384 148.3 480 166.7 576 192C672 213.3 768 240.7 864 234.7C960 213.3 1056 171.7 1152 160C1248 148.3 1344 166.7 1392 176L1440 186.7V320H0V256Z"
            fill="#2C3E50"
          />
        </svg>
      </div>

      <div className="relative z-10 ">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 ">
          {/* Logo & Address */}
          <div className="flex flex-col items-start text-left">
            <Image
              height={40}
              width={40}
              src={fixUrl(logo) || "/logo.svg"}
              alt="Logo"
              className="mb-2 w-16 h-16 object-contain"
            />
            <h2 className="text-2xl font-bold">
              {businessName || "Classik Global Media DM"}
            </h2>
            <p className="text-sm text-gray-300 mt-2 max-w-xs">
              {businessDescription}
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 w-full max-w-4xl">
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <PageLinks />
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4 justify-start">
                <SocialButtons socialLinks={socialLinks} />
              </div>
            </div>

            {/* Contact */}
            <div className="w-full">
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  Email:{" "}
                  <a
                    href={`mailto:${
                      emailAddress || "classikglobalmedia@gmail.com"
                    }`}
                    className="hover:text-white"
                  >
                    {emailAddress || "classikglobalmedia@gmail.com"}
                  </a>
                </li>
                <li>
                  Phone:{" "}
                  <a
                    href={`tel:${phoneNumber || "+2349027786284"}`}
                    className="hover:text-white"
                  >
                    {phoneNumber || "+234 902-7786-284"}
                  </a>
                </li>
                <li>
                  <p className="text-sm text-gray-300 mt-2 max-w-xs">
                    Business Address:{" "}
                    {businessAddress ||
                      "34 Binuyo Street, Off Aroloya, Lagos Island, Lagos State."}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()}{" "}
          {businessName || "Classik Global Media"}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
