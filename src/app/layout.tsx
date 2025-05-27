/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import {
  Montserrat,
  Playfair_Display,
  Poppins,
  Quicksand
} from "next/font/google";

import Navbar from "@/navigations/navbar";

import "./globals.css";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-playfair"
});
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand"
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat"
});

export const metadata: Metadata = {
  title: "Classic Media Global",
  description: "Classic Media Global",
  icons: [
    {
      rel: "icon",
      url: "/logo.png"
    },
    {
      rel: "apple-touch-icon",
      url: "/apple-touch-icon.png",
      sizes: "180x180"
    }
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable}  antialiased flex flex-col min-h-screen `}
      >
        {children}
      </body>
    </html>
  );
}
