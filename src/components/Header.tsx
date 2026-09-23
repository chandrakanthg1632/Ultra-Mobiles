"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { id: "home", href: "/", label: "Home" },
  { id: "courses", href: "/#courses", label: "Course" },
  { id: "about", href: "/#about", label: "About" },
  { id: "knowledge-base", href: "/#knowledge-base", label: "Guides" },
  { id: "faq", href: "/#faq", label: "FAQ" },
  { id: "contact", href: "/#contact", label: "Contact" },
];

const SECTION_IDS = NAV_LINKS.map((link) => link.id);

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-neutral-100 text-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-neutral-800">
          <a
            href="mailto:ultramobiles07@gmail.com"
            className="flex items-center gap-2 font-semibold hover:text-orange-500"
          >
            <span aria-hidden>✉️</span>
            ultramobiles07@gmail.com
          </a>
          <a
            href="tel:+919994141075"
            className="flex items-center gap-2 font-semibold hover:text-orange-500"
          >
            <span aria-hidden>📞</span>
            9994141075
          </a>
        </div>
      </div>

      <div className="border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="group flex items-center gap-3">
            <motion.div whileHover={{ rotate: -6, scale: 1.05 }}>
              <Image
                src="/images/logo.png"
                alt="Ultra Mobiles Training Institute logo"
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover"
                priority
              />
            </motion.div>
            <span className="text-lg font-bold text-neutral-900 transition-colors group-hover:text-orange-500 sm:text-xl">
              Ultra Mobiles Training Institute
            </span>
          </Link>

          <nav className="hidden items-center gap-6 text-[15px] font-medium text-neutral-700 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = activeId === link.id;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`relative pb-1 ${
                    active
                      ? "text-orange-500"
                      : "transition-colors hover:text-orange-500"
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-orange-500"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-md text-neutral-700 lg:hidden"
          >
            <span className="relative block h-4 w-6" aria-hidden>
              <motion.span
                className="absolute left-0 block h-0.5 w-6 rounded-full bg-current"
                animate={
                  menuOpen ? { top: "50%", rotate: 45 } : { top: 0, rotate: 0 }
                }
                style={{ y: "-50%" }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="absolute top-1/2 left-0 block h-0.5 w-6 -translate-y-1/2 rounded-full bg-current"
                animate={{ opacity: menuOpen ? 0 : 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                className="absolute left-0 block h-0.5 w-6 rounded-full bg-current"
                animate={
                  menuOpen
                    ? { bottom: "50%", rotate: -45 }
                    : { bottom: 0, rotate: 0 }
                }
                style={{ y: "50%" }}
                transition={{ duration: 0.2 }}
              />
            </span>
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden border-t border-neutral-200 lg:hidden"
            >
              <div className="flex flex-col px-4 py-2 text-[15px] font-medium text-neutral-700">
                {NAV_LINKS.map((link) => {
                  const active = activeId === link.id;
                  return (
                    <Link
                      key={link.id}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`border-b border-neutral-100 py-3 last:border-0 ${
                        active ? "text-orange-500" : "hover:text-orange-500"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
