"use client";

import { motion } from "framer-motion";
import { YouTubeIcon, InstagramIcon } from "@/components/SocialIcons";

const SOCIAL_LINKS = [
  { label: "YouTube", href: "https://www.youtube.com/@ultramobiles07", Icon: YouTubeIcon },
  { label: "Instagram", href: "https://www.instagram.com/ultramobiles07/", Icon: InstagramIcon },
];

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5 }}
      className="mt-auto bg-orange-500 py-4 text-sm text-white"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-3 px-4 text-center sm:flex-row sm:justify-between">
        <p>
          COPYRIGHT © {new Date().getFullYear()} Ultramobiles Training
          Institute. All Rights Reserved.
        </p>
        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map(({ label, href, Icon }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-white/90 transition-colors hover:text-white"
            >
              <Icon className="h-5 w-5" />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.footer>
  );
}
