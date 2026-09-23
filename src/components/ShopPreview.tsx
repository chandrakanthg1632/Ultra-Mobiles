"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import DragRotate3D from "@/components/DragRotate3D";

const SHOP_IMAGES = [
  "/images/slide1.jpeg",
  "/images/slide2.jpeg",
  "/images/slide3.jpeg",
  "/images/slide4.jpeg",
  "/images/slide5.jpeg",
];

const APPS = [
  { id: "album", label: "Album", icon: "🖼️" },
  { id: "home", label: "Home", icon: "🏠", targetId: "home" },
  { id: "course", label: "Course", icon: "🎓", targetId: "courses" },
  { id: "about", label: "About", icon: "🏢", targetId: "about" },
  { id: "guides", label: "Guides", icon: "📚", targetId: "knowledge-base" },
  { id: "faq", label: "FAQ", icon: "❓", targetId: "faq" },
  { id: "contact", label: "Contact", icon: "📞", targetId: "contact" },
] as const;

type View = "home" | "album";

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C34.5 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.3-.1-2.7-.4-4.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3.1 0 5.8 1.1 8 3l6-6C34.5 5.1 29.6 3 24 3 16.3 3 9.7 7.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 45c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 36.5 26.7 37.5 24 37.5c-5.3 0-9.7-3.4-11.3-8.1l-6.5 5C9.6 40.7 16.3 45 24 45z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.7l6.2 5.2C39.9 36.6 43 30.9 43 24c0-1.3-.1-2.7-.4-4.5z"
      />
    </svg>
  );
}

function GoogleSearchBar() {
  return (
    <div
      aria-hidden
      className="relative z-10 flex w-full shrink-0 items-center gap-2 rounded-full bg-white px-3 py-2 shadow-md sm:gap-3 sm:px-5 sm:py-3"
    >
      <GoogleLogo className="h-4 w-4 shrink-0 sm:h-6 sm:w-6" />
      <span className="flex-1 text-left text-[11px] text-neutral-500 sm:text-base">
        Search Google
      </span>
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 shrink-0 text-neutral-400 sm:h-5 sm:w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      >
        <circle cx={11} cy={11} r={7} />
        <line x1={21} y1={21} x2={16.65} y2={16.65} />
      </svg>
    </div>
  );
}

function MountainWallpaper() {
  return (
    <svg
      viewBox="0 0 400 225"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="wallpaper-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e1b4b" />
          <stop offset="45%" stopColor="#7c3aed" />
          <stop offset="75%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#fde68a" />
        </linearGradient>
      </defs>
      <rect width={400} height={225} fill="url(#wallpaper-sky)" />
      <polygon
        points="0,225 0,150 55,95 110,150 170,85 230,145 290,100 350,150 400,120 400,225"
        fill="#4c1d95"
        opacity={0.55}
      />
      <polygon
        points="0,225 0,175 75,115 155,180 235,125 315,185 400,155 400,225"
        fill="#312e81"
        opacity={0.75}
      />
      <polygon
        points="0,225 0,195 70,145 150,205 220,155 300,210 400,180 400,225"
        fill="#1e1b4b"
      />
    </svg>
  );
}

export default function ShopPreview({ onClose }: { onClose: () => void }) {
  const [view, setView] = useState<View>("home");
  const [active, setActive] = useState(0);
  const justDragged = useRef(false);

  function handleBackdropClose() {
    if (justDragged.current) {
      justDragged.current = false;
      return;
    }
    onClose();
  }

  useEffect(() => {
    if (view !== "album") return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % SHOP_IMAGES.length);
    }, 1800);
    return () => clearInterval(id);
  }, [view]);

  function goHome() {
    if (view === "album") {
      setView("home");
    } else {
      onClose();
    }
  }

  function openApp(app: (typeof APPS)[number]) {
    if (app.id === "album") {
      setActive(0);
      setView("album");
      return;
    }
    onClose();
    setTimeout(() => {
      document.getElementById(app.targetId)?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (view === "album") {
        setView("home");
      } else {
        onClose();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [view, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={handleBackdropClose}
      onMouseLeave={(event) => {
        if (!event.relatedTarget) handleBackdropClose();
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-6"
    >
      <DragRotate3D
        className="w-full max-w-[280px] [--drag3d-depth:12.17cqw] sm:max-w-4xl sm:[--drag3d-depth:3.42cqw]"
        initialRotateY={0}
        initialRotateX={0}
        depth={20}
        onDragEnd={(didDrag) => {
          if (!didDrag) return;
          justDragged.current = true;
          setTimeout(() => {
            justDragged.current = false;
          }, 300);
        }}
        edgeTop={
          <div
            aria-hidden
            className="h-full w-full rounded-[10px] bg-gradient-to-b from-neutral-300 via-neutral-100 to-neutral-300 shadow-[inset_0_0_10px_rgba(15,23,42,0.22)] ring-1 ring-black/5"
          />
        }
        edgeBottom={
          <div
            aria-hidden
            className="flex h-full w-full items-center justify-center gap-2 rounded-[10px] bg-gradient-to-t from-neutral-300 via-neutral-100 to-neutral-300 shadow-[inset_0_0_10px_rgba(15,23,42,0.22)] ring-1 ring-black/5"
          >
            <span className="flex gap-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={`bot-l-${i}`} className="h-1 w-1 rounded-full bg-neutral-500" />
              ))}
            </span>
            <span className="h-2 w-6 rounded-full bg-neutral-900 shadow-inner" />
            <span className="flex gap-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={`bot-r-${i}`} className="h-1 w-1 rounded-full bg-neutral-500" />
              ))}
            </span>
          </div>
        }
        edgeLeft={
          <div
            aria-hidden
            className="relative h-full w-full rounded-[10px] bg-gradient-to-r from-neutral-300 via-neutral-100 to-neutral-300 shadow-[inset_0_0_10px_rgba(15,23,42,0.22)] ring-1 ring-black/5"
          >
            <span className="absolute top-[16%] left-1/2 h-[7%] w-[55%] -translate-x-1/2 rounded-full bg-gradient-to-b from-neutral-200 via-white to-neutral-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),inset_0_-1px_1px_rgba(148,163,184,0.6)] ring-1 ring-black/5" />
            <span className="absolute top-[25%] left-1/2 h-[7%] w-[55%] -translate-x-1/2 rounded-full bg-gradient-to-b from-neutral-200 via-white to-neutral-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),inset_0_-1px_1px_rgba(148,163,184,0.6)] ring-1 ring-black/5" />
          </div>
        }
        edgeRight={
          <div
            aria-hidden
            className="relative h-full w-full rounded-[10px] bg-gradient-to-l from-neutral-300 via-neutral-100 to-neutral-300 shadow-[inset_0_0_10px_rgba(15,23,42,0.22)] ring-1 ring-black/5"
          >
            <span className="absolute top-[18%] left-1/2 h-[10%] w-[55%] -translate-x-1/2 rounded-full bg-gradient-to-b from-neutral-200 via-white to-neutral-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),inset_0_-1px_1px_rgba(148,163,184,0.6)] ring-1 ring-black/5" />
          </div>
        }
        front={
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        onClick={(event) => event.stopPropagation()}
        className="relative w-full aspect-[719/1500] rounded-[10px] bg-gradient-to-br from-white via-neutral-100 to-neutral-200 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6),inset_0_0_14px_rgba(15,23,42,0.15)] ring-1 ring-neutral-200 sm:aspect-[2476/1785] sm:rounded-[10px]"
      >
        {/* front camera + earpiece speaker — on mobile viewports this renders as a phone (portrait) punch-hole with a speaker slit; from sm: up, a tablet held in landscape gets its own distinct round camera housing (no paired speaker slit) */}
        <div
          aria-hidden
          className="absolute top-1.5 left-1/2 flex -translate-x-1/2 items-center gap-2 sm:top-0.5 sm:gap-4"
        >
          <span className="h-1 w-6 rounded-full bg-neutral-300 sm:hidden" />
          <span className="relative flex h-3 w-3 items-center justify-center rounded-full bg-neutral-900 ring-1 ring-black/40 sm:h-3 sm:w-3 sm:bg-neutral-800 sm:shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] sm:ring-2 sm:ring-inset sm:ring-neutral-300">
            <span className="h-2 w-2 rounded-full bg-gradient-to-br from-neutral-700 via-black to-neutral-800 sm:h-2 sm:w-2" />
            <span className="absolute top-0.5 left-0.5 h-0.5 w-0.5 rounded-full bg-blue-200/60" />
          </span>
        </div>

        <div
          style={{ transform: "translateZ(0)" }}
          className="absolute top-3 right-3 bottom-9 left-3 overflow-hidden rounded-lg bg-neutral-900 sm:top-4 sm:right-4 sm:bottom-14 sm:left-4 sm:rounded-md"
        >
          {view === "home" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex flex-col px-4 pt-4 pb-2 sm:px-8 sm:pt-6"
            >
              <MountainWallpaper />

              <GoogleSearchBar />

              <div className="relative z-10 grid flex-1 grid-cols-3 content-center justify-items-center gap-x-3 gap-y-5 sm:grid-cols-4 sm:gap-x-8 sm:gap-y-8">
                {APPS.map((app) => (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => openApp(app)}
                    className="flex flex-col items-center gap-1.5 text-white transition-transform hover:scale-105 sm:gap-2"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-lg shadow-inner sm:h-16 sm:w-16 sm:rounded-[1.25rem] sm:text-3xl">
                      {app.icon}
                    </span>
                    <span className="text-[11px] font-medium text-white/80 sm:text-sm">
                      {app.label}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {view === "album" &&
            SHOP_IMAGES.map((src, index) => (
              <motion.div
                key={src}
                className="absolute inset-0"
                animate={{ opacity: index === active ? 1 : 0 }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src={src}
                  alt={`Inside our mobile repair workshop ${index + 1}`}
                  fill
                  className="object-contain"
                  sizes="(min-width: 1024px) 60vw, 90vw"
                  priority={index === 0}
                />
              </motion.div>
            ))}
        </div>

        {/* home button, centered on the bezel like a tablet held in landscape */}
        <button
          type="button"
          onClick={goHome}
          aria-label={view === "album" ? "Back to home screen" : "Close preview"}
          className="absolute bottom-2 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-white to-neutral-200 shadow-inner ring-1 ring-neutral-300 transition-colors hover:ring-orange-400 sm:bottom-3 sm:h-8 sm:w-8"
        >
          <span
            aria-hidden
            className="h-2.5 w-2.5 rounded-full border border-neutral-400 sm:h-3.5 sm:w-3.5"
          />
        </button>
      </motion.div>
        }
        back={
      <div
        aria-hidden
        className="relative w-full aspect-[719/1500] rounded-[10px] bg-gradient-to-br from-white via-neutral-100 to-neutral-200 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6),inset_0_0_14px_rgba(15,23,42,0.15)] ring-1 ring-neutral-200 sm:aspect-[2476/1785] sm:rounded-[10px]"
      >
        <div
          style={{ transform: "translateZ(0)" }}
          className="absolute top-3 right-3 bottom-9 left-3 overflow-hidden rounded-lg bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-300 sm:top-4 sm:right-4 sm:bottom-14 sm:left-4 sm:rounded-md"
        >
          {/* subtle sheen across the back panel */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent"
          />
        </div>

        {/* camera module island with two lenses + flash — sits on the body itself, raised above the back panel */}
        <div className="absolute top-7 left-7 flex h-16 w-11 flex-col items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-br from-neutral-700 to-black shadow-[0_6px_16px_rgba(0,0,0,0.5)] ring-1 ring-black/50 sm:top-10 sm:left-10 sm:h-20 sm:w-14 sm:gap-2 sm:rounded-3xl">
          <span className="relative flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-neutral-600 via-black to-neutral-900 ring-2 ring-neutral-800 sm:h-5 sm:w-5">
            <span className="absolute top-0.5 left-0.5 h-1.5 w-1.5 rounded-full bg-white/25" />
          </span>
          <span className="relative flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gradient-to-br from-neutral-600 via-black to-neutral-900 ring-2 ring-neutral-800 sm:h-4 sm:w-4">
            <span className="absolute top-0.5 left-0.5 h-1 w-1 rounded-full bg-white/25" />
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-amber-100/80 ring-1 ring-amber-300/60" />
        </div>
      </div>
        }
      />

      <button
        type="button"
        onClick={onClose}
        aria-label="Close workshop preview"
        className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-colors hover:bg-white/20"
      >
        ×
      </button>
    </motion.div>
  );
}
