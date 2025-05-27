"use client";

import { motion } from "framer-motion";
import { SocialButton } from "./social-button";
import type { SocialLink } from "@/type/social-links";
import React, { FC } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import type { IconType } from "react-icons";

const ICONS_MAP: Record<string, IconType> = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  twitter: FaTwitter,
  linkedin: FaLinkedin
};

export const SocialButtons: FC<{ socialLinks: SocialLink[] }> = ({
  socialLinks
}) => {
  return (
    <div className="flex gap-4 my-2">
      {socialLinks
        ?.slice()
        ?.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        ?.map(({ url, name, icon }, index) => {
          const IconComponent = ICONS_MAP[icon.toLowerCase()] as React.FC;

          return (
            <motion.div
              key={url}
              initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: 360 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9, y: 5 }}
            >
              <SocialButton href={url} label={name}>
                {IconComponent ? <IconComponent /> : null}
              </SocialButton>
            </motion.div>
          );
        })}
    </div>
  );
};
