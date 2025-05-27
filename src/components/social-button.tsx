import { ReactNode } from "react";
import { motion } from "framer-motion";

export const SocialButton = ({
  children,
  label,
  href,
  isTool = false
}: {
  children: ReactNode;
  label: string;
  href: string;
  isTool?: boolean;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.2, rotate: 360 }}
      whileTap={{ scale: 0.9, rotate: 360 }}
    >
      <a
        href={href}
        target="_blank"
        className={`${
          isTool ? "w-16 h-16" : "w-10 h-10"
        } flex items-center justify-center bg-almostblack rounded-full cursor-pointer text-white transition-all duration-1000 ease-in-out hover:bg-golden hover:text-almostblack text-xl`}
      >
        {/* Visually Hidden for accessibility */}
        <span className="sr-only">{label}</span>
        {children}
      </a>
    </motion.div>
  );
};
