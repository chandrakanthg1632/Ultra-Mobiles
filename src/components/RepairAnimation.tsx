"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { createPortal } from "react-dom";
import ShopPreview from "@/components/ShopPreview";
import DragRotate3D from "@/components/DragRotate3D";

function Gear({
  cx,
  cy,
  r,
  color,
  teeth = 8,
  duration,
  reverse = false,
}: {
  cx: number;
  cy: number;
  r: number;
  color: string;
  teeth?: number;
  duration: number;
  reverse?: boolean;
}) {
  const angleStep = 360 / teeth;
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <g
        className={reverse ? "ra-spin-reverse" : "ra-spin"}
        style={{ animationDuration: `${duration}s` }}
      >
        <circle r={r * 0.55} fill="none" stroke={color} strokeWidth={r * 0.26} />
        <circle r={r * 0.2} fill={color} />
        {Array.from({ length: teeth }).map((_, i) => (
          <rect
            key={i}
            x={-r * 0.11}
            y={-r * 1.05}
            width={r * 0.22}
            height={r * 0.3}
            rx={2}
            fill={color}
            transform={`rotate(${i * angleStep})`}
          />
        ))}
      </g>
    </g>
  );
}

// Real iPhone 17/18 Pro proportions: 71.9mm x 150.0mm -> width/height 0.4793.
// The rotating box below is cropped tight to just the phone (no decorative margin) at that
// ratio, and sits inside a larger static canvas that carries the non-rotating background
// decoration (gears, screwdriver, badge) so those don't spin with the device.
const PHONE_VB_W = 116;
const PHONE_VB_H = 236;

export default function RepairAnimation() {
  const [open, setOpen] = useState(false);
  const [discovered, setDiscovered] = useState(false);

  function openPreview() {
    setOpen(true);
    setDiscovered(true);
  }

  const front = (
    <div
      role="button"
      tabIndex={0}
      aria-label="Click or tap to see photos from our workshop"
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openPreview();
        }
      }}
      className="h-full w-full outline-none"
    >
      <svg
        viewBox={`0 0 ${PHONE_VB_W} ${PHONE_VB_H}`}
        role="img"
        aria-label="Illustration of a mobile phone being repaired"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="phoneBodyGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="12%" stopColor="#f8fafc" />
            <stop offset="55%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
          <linearGradient id="phoneBezelGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e5e9ef" />
          </linearGradient>
          <linearGradient id="phoneScreenGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1c2536" />
            <stop offset="100%" stopColor="#05070d" />
          </linearGradient>
          <linearGradient id="phoneGlareGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="30%" stopColor="#ffffff" stopOpacity={0} />
            <stop offset="48%" stopColor="#ffffff" stopOpacity={0.12} />
            <stop offset="58%" stopColor="#ffffff" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="phoneHomeBtnGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e5e9ef" />
          </linearGradient>
          <clipPath id="phoneScreenClip">
            <rect x={17} y={20} width={84} height={170} rx={5} />
          </clipPath>
        </defs>

        <g>
          {/* phone body */}
          <rect x={3} y={3} width={110} height={230} rx={10} fill="url(#phoneBodyGrad)" />
          <rect x={9} y={9} width={98} height={218} rx={7} fill="url(#phoneBezelGrad)" />

          {/* front camera punch-hole */}
          <circle cx={58} cy={16} r={3.1} fill="#05070d" />
          <circle cx={58} cy={16} r={2.2} fill="#0b1220" />
          <circle cx={57.4} cy={15.4} r={0.6} fill="#60a5fa" opacity={0.55} />

          <g clipPath="url(#phoneScreenClip)">
            <rect x={17} y={20} width={84} height={170} fill="url(#phoneScreenGrad)" />

            {/* repair progress ring + gear on screen */}
            <g transform="translate(59 105)">
              <circle r={26} fill="none" stroke="#374151" strokeWidth={4.5} />
              <circle
                className="ra-progress"
                r={26}
                fill="none"
                stroke="#f97316"
                strokeWidth={4.5}
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 26}
                transform="rotate(-90)"
              />
              <g className="ra-spin" style={{ animationDuration: "4s" }}>
                <circle r={9.5} fill="none" stroke="#9ca3af" strokeWidth={3.5} />
                <circle r={3.5} fill="#9ca3af" />
                {Array.from({ length: 6 }).map((_, i) => (
                  <rect
                    key={i}
                    x={-1.7}
                    y={-16.5}
                    width={3.4}
                    height={5}
                    rx={1}
                    fill="#9ca3af"
                    transform={`rotate(${i * 60})`}
                  />
                ))}
              </g>
            </g>

            {/* glass reflection streak */}
            <rect x={17} y={20} width={84} height={170} fill="url(#phoneGlareGrad)" />
          </g>

          {/* home button */}
          <circle cx={58} cy={213} r={7} fill="url(#phoneHomeBtnGrad)" stroke="#cbd5e1" strokeWidth={0.75} />
          <circle cx={58} cy={213} r={3} fill="none" stroke="#9ca3af" strokeWidth={0.75} />
        </g>
      </svg>
    </div>
  );

  const back = (
    <div
      aria-hidden
      className="h-full w-full outline-none"
    >
      <svg
        viewBox={`0 0 ${PHONE_VB_W} ${PHONE_VB_H}`}
        role="img"
        aria-hidden
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="phoneBodyGradBack" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="18%" stopColor="#f8fafc" />
            <stop offset="60%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
          <linearGradient id="phonePanelGradBack" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
          <linearGradient id="phoneCameraGradBack" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#374151" />
            <stop offset="100%" stopColor="#05070d" />
          </linearGradient>
          <linearGradient id="phoneLensGradBack" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4b5563" />
            <stop offset="45%" stopColor="#0b1220" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
          <linearGradient id="phoneGlareGradBack" x1="0" y1="0" x2="1" y2="1">
            <stop offset="30%" stopColor="#ffffff" stopOpacity={0} />
            <stop offset="48%" stopColor="#ffffff" stopOpacity={0.08} />
            <stop offset="58%" stopColor="#ffffff" stopOpacity={0} />
          </linearGradient>
        </defs>

        <g>
          {/* back panel */}
          <rect x={3} y={3} width={110} height={230} rx={10} fill="url(#phoneBodyGradBack)" />
          <rect x={9} y={9} width={98} height={218} rx={7} fill="url(#phonePanelGradBack)" />

          {/* camera module island with two lenses + flash — raised above the body with a soft shadow */}
          <rect x={21} y={22} width={48} height={66} rx={14} fill="#000" opacity={0.18} />
          <rect x={20} y={20} width={48} height={66} rx={14} fill="url(#phoneCameraGradBack)" />
          <rect x={20} y={20} width={48} height={66} rx={14} fill="none" stroke="#1f2937" strokeWidth={0.75} />
          <circle cx={38} cy={38} r={10} fill="url(#phoneLensGradBack)" />
          <circle cx={38} cy={38} r={10} fill="none" stroke="#4b5563" strokeWidth={1} />
          <circle cx={35} cy={35} r={3} fill="#93a3b8" opacity={0.45} />
          <circle cx={54} cy={58} r={8.5} fill="url(#phoneLensGradBack)" />
          <circle cx={54} cy={58} r={8.5} fill="none" stroke="#4b5563" strokeWidth={1} />
          <circle cx={51.3} cy={55.3} r={2.5} fill="#93a3b8" opacity={0.45} />
          <circle cx={40} cy={75} r={3} fill="#fde68a" opacity={0.85} />
          <circle cx={40} cy={75} r={3} fill="none" stroke="#f59e0b" strokeWidth={0.6} />

          {/* subtle diagonal sheen across the back panel */}
          <rect x={9} y={9} width={98} height={218} rx={7} fill="url(#phoneGlareGradBack)" />
        </g>
      </svg>
    </div>
  );

  const edgeTop = (
    <div className="h-full w-full rounded-full bg-gradient-to-b from-[#cbd5e1] via-[#f1f5f9] to-[#cbd5e1] ring-1 ring-black/5" />
  );

  const edgeBottom = (
    <div className="flex h-full w-full items-center justify-center gap-1.5 rounded-full bg-gradient-to-t from-[#cbd5e1] via-[#f1f5f9] to-[#cbd5e1] ring-1 ring-black/5">
      <span className="flex gap-0.5">
        {Array.from({ length: 3 }).map((_, i) => (
          <span key={`ra-bot-l-${i}`} className="h-0.5 w-0.5 rounded-full bg-neutral-400" />
        ))}
      </span>
      <span className="h-[35%] w-2.5 rounded-full bg-neutral-900 shadow-inner" />
      <span className="flex gap-0.5">
        {Array.from({ length: 3 }).map((_, i) => (
          <span key={`ra-bot-r-${i}`} className="h-0.5 w-0.5 rounded-full bg-neutral-400" />
        ))}
      </span>
    </div>
  );

  const edgeLeft = (
    <div className="relative h-full w-full rounded-full bg-gradient-to-r from-[#cbd5e1] via-[#f1f5f9] to-[#cbd5e1] ring-1 ring-black/5">
      <span className="absolute top-[20%] left-1/2 h-[7%] w-[55%] -translate-x-1/2 rounded-full bg-gradient-to-b from-neutral-200 via-white to-neutral-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),inset_0_-1px_1px_rgba(148,163,184,0.6)] ring-1 ring-black/5" />
      <span className="absolute top-[30%] left-1/2 h-[7%] w-[55%] -translate-x-1/2 rounded-full bg-gradient-to-b from-neutral-200 via-white to-neutral-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),inset_0_-1px_1px_rgba(148,163,184,0.6)] ring-1 ring-black/5" />
    </div>
  );

  const edgeRight = (
    <div className="relative h-full w-full rounded-full bg-gradient-to-l from-[#cbd5e1] via-[#f1f5f9] to-[#cbd5e1] ring-1 ring-black/5">
      <span className="absolute top-[27%] left-1/2 h-[9%] w-[55%] -translate-x-1/2 rounded-full bg-gradient-to-b from-neutral-200 via-white to-neutral-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),inset_0_-1px_1px_rgba(148,163,184,0.6)] ring-1 ring-black/5" />
    </div>
  );

  return (
    <>
      <div className="relative mx-auto w-full max-w-sm" style={{ aspectRatio: "400 / 360" }}>
        {/* static background decoration — doesn't rotate with the device */}
        <svg viewBox="0 0 400 360" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
          <ellipse cx={200} cy={330} rx={75} ry={12} fill="#000" opacity={0.07} />
          <Gear cx={62} cy={80} r={34} color="#fdba74" duration={16} />
          <Gear cx={344} cy={286} r={26} color="#fed7aa" duration={11} reverse />
        </svg>

        {/* pulsing glow behind the phone, drawing the eye there until it's been discovered */}
        {!discovered && (
          <div
            aria-hidden
            className="ra-hint-pulse pointer-events-none absolute rounded-[2rem]"
            style={{ left: "36.25%", top: "23.06%", width: "27.5%", height: "63.89%" }}
          />
        )}

        <div
          className="absolute"
          style={{ left: "36.25%", top: "23.06%", width: "27.5%", height: "63.89%" }}
        >
          <DragRotate3D
            className="h-full w-full [--drag3d-depth:12.17cqw]"
            onTap={openPreview}
            onDragEnd={(didDrag) => {
              if (didDrag) setDiscovered(true);
            }}
            initialRotateY={0}
            initialRotateX={0}
            depth={9}
            edgeTop={edgeTop}
            edgeBottom={edgeBottom}
            edgeLeft={edgeLeft}
            edgeRight={edgeRight}
            front={front}
            back={back}
          />
        </div>

        <AnimatePresence>
          {!discovered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="pointer-events-none absolute z-10"
              style={{ right: "2%", top: "8%" }}
            >
              <span className="ra-hint-bounce inline-flex items-center gap-1.5 rounded-full bg-orange-500 px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-white shadow-lg">
                <span aria-hidden>👆</span> Tap to explore
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* static foreground decoration — success badge */}
        <svg viewBox="0 0 400 360" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
          <g transform="translate(137 296)">
            <g className="ra-badge">
              <circle r={16} fill="#22c55e" />
              <path
                d="M-7 0 L-2 6 L8 -7"
                stroke="#fff"
                strokeWidth={3}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </g>
        </svg>
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && <ShopPreview onClose={() => setOpen(false)} />}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
