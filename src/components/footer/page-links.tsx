"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

const pageLinks = [
  { name: "Featured", url: "#featured" },
  { name: "About Us", url: "/about-us" },
  { name: "Services", url: "#services" },
  { name: "Privacy Policy", url: "/privacy" }
];

export default function PageLinks() {
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === "/";

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
      if (!url.startsWith("#")) return;

      e.preventDefault();
      const targetId = url.slice(1);

      if (isHome) {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        sessionStorage.setItem("scrollTo", targetId);
        router.push("/");
      }
    },
    [isHome, router]
  );

  return (
    <ul className="space-y-2">
      {pageLinks.map((link) => (
        <li key={link.name}>
          <Link
            prefetch
            href={isHome || !link.url.startsWith("#") ? link.url : "/"}
            className="text-gray-400 hover:text-white transition"
            onClick={(e) => handleClick(e, link.url)}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
