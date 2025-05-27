"use client";

import { BsInstagram } from "react-icons/bs";
import { FaFacebook, FaTiktok } from "react-icons/fa";

export const links = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Privacy Policy", href: "/privacy" }
];

export const blurDataUrl = "https://placehold.co/600x400/png";

export const sections = [
  {
    main: "Art/Craft",
    subsets: [
      {
        main: "Pictures Framing"
      },
      {
        main: "Canvas Prints"
      },
      {
        main: "Acrylic Frameless"
      },
      {
        main: "Self Cartoon & Vector Art"
      },
      {
        main: "Acrylic/ Abstract oil painting"
      },
      {
        main: "Mirror Framing"
      },
      {
        main: "Custom Frames Making"
      }
    ]
  },

  {
    main: "Graphic Designs",
    subsets: [
      {
        main: "Printing and Branding "
      }
    ]
  },

  {
    main: "Photography & Video",
    subsets: [
      {
        main: "Videos Directing"
      },
      {
        main: "Content Creator"
      }
    ]
  },
  {
    main: "Clothes Making/Designs"
  }
];

export const socialLinks = [
  {
    name: "facebook",
    url: "https://facebook.com/classikframes",
    Icon: FaFacebook
  },
  {
    name: "instagram",
    url: "https://instagram.com/classikframes",
    Icon: BsInstagram
  },
  {
    name: "tiktok",
    url: "https://tiktok.com/classik_frames",
    Icon: FaTiktok
  }
];
