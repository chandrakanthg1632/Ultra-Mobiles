"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";

export default function DragRotate3D({
  front,
  back,
  edge,
  edgeLeft,
  edgeRight,
  edgeTop,
  edgeBottom,
  depth = 16,
  className,
  onTap,
  onDragEnd,
  initialRotateX = 0,
  initialRotateY = 0,
  sensitivity = 0.5,
}: {
  front: ReactNode;
  back?: ReactNode;
  /**
   * Fallback fill for any side face left unspecified below. The rotating box this fills must be cropped
   * tight to the device silhouette — any decorative margin around front/back throws off where these faces
   * sit, since they're anchored to the box's own edges (0%/100%), not to the device shape drawn inside it.
   */
  edge?: ReactNode;
  /** Left edge (volume-button side, when holding the front face right-side up). */
  edgeLeft?: ReactNode;
  /** Right edge (power-button side). */
  edgeRight?: ReactNode;
  /** Top edge. */
  edgeTop?: ReactNode;
  /** Bottom edge (charging port / speaker side). */
  edgeBottom?: ReactNode;
  /**
   * Fallback separation in px between the front and back faces, used until overridden. Sets the CSS custom
   * property `--drag3d-depth`, which every internal measurement derives from via calc() — a caller can
   * override it on `className` for real-world accuracy: this element establishes a `container-type:
   * inline-size` context sized to its own rendered width, so `[--drag3d-depth:12.17cqw]` tracks a device's
   * true thickness-to-width ratio fluidly at any size, and `sm:[--drag3d-depth:3.42cqw]` lets one instance
   * switch ratios at a breakpoint (e.g. a phone-shaped layout flipping to a tablet-shaped one, where a
   * single fixed number could never be accurate for both).
   */
  depth?: number;
  className?: string;
  onTap?: () => void;
  onDragEnd?: (didDrag: boolean) => void;
  initialRotateX?: number;
  initialRotateY?: number;
  sensitivity?: number;
}) {
  const rotateX = useMotionValue(initialRotateX);
  const rotateY = useMotionValue(initialRotateY);
  const springRotateX = useSpring(rotateX, { stiffness: 120, damping: 20, mass: 0.6 });
  const springRotateY = useSpring(rotateY, { stiffness: 120, damping: 20, mass: 0.6 });

  const dragging = useRef(false);
  const distance = useRef(0);
  const last = useRef({ x: 0, y: 0 });

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement;
    if (target.closest("button, a")) return;
    dragging.current = true;
    distance.current = 0;
    last.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    const dx = event.clientX - last.current.x;
    const dy = event.clientY - last.current.y;
    last.current = { x: event.clientX, y: event.clientY };
    distance.current += Math.abs(dx) + Math.abs(dy);
    rotateY.set(rotateY.get() + dx * sensitivity);
    rotateX.set(rotateX.get() - dy * sensitivity);
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    dragging.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    const didDrag = distance.current >= 6;
    onDragEnd?.(didDrag);
    if (!didDrag) {
      onTap?.();
    }
  }

  const right = edgeRight ?? edge;
  const left = edgeLeft ?? edge;
  const top = edgeTop ?? edge;
  const bottom = edgeBottom ?? edge;

  // Every derived measurement is a calc() against this one custom property rather than a JS-computed px
  // number, so a responsive override of --drag3d-depth on className propagates through all of them
  // automatically. The `depth` number prop is only the var()'s CSS fallback (used when nothing sets the
  // property) rather than an inline style — an inline style would always beat a className override
  // regardless of source order, since inline style has higher specificity than any class-based rule.
  const dd = `var(--drag3d-depth, ${depth}px)`;
  const half = `calc(${dd} / 2)`;

  // Two adjacent panels (say, front and the top edge) meeting at an exactly coincident Z boundary is a
  // classic "T-junction" case: the renderer has no unambiguous winner right at that seam, and can blend
  // or ghost content across it (we saw the front's UI bleed through the top edge there). Extending each
  // edge panel a bit past the exact boundary — so it's a real overlap, not a tie — resolves that. It scales
  // with depth (25%, floored at 1.5px) so it stays proportionate whether the device is thick or thin.
  const overlap = `max(1.5px, calc(${dd} * 0.25))`;
  const edgeLen = `calc(${dd} + 2 * ${overlap})`;
  // Two edge panels that share a corner (e.g. left and bottom) don't overlap each other at all by default —
  // each stops exactly at the device's own width/height, leaving a pinhole gap right at the corner vertex
  // where three panels should meet. The same overlap in that other dimension closes it.
  const cornerOverlap = overlap;

  return (
    // Perspective is also a cqw multiple of the box's own rendered width, not a fixed px value — a fixed
    // distance is effectively a wide-angle lens on a large render (this component renders anywhere from a
    // ~100px icon to a ~900px modal) and violently foreshortens whichever edge panel is nearest the camera
    // once rotated, ballooning it into a flat slab that reads as a separate card rather than a thin edge.
    // Scaling it keeps the same "focal length" (and thus the same, believable amount of rotation distortion)
    // at every size.
    <div
      className={className}
      style={{ perspective: "1800cqw", containerType: "inline-size" }}
    >
      <motion.div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
          touchAction: "none",
        }}
        className="relative cursor-grab active:cursor-grabbing"
      >
        <div
          style={{
            transform: `translateZ(${half})`,
            backfaceVisibility: "hidden",
          }}
        >
          {front}
        </div>

        {back && (
          <div
            className="absolute inset-0"
            style={{
              transform: `rotateY(180deg) translateZ(${half})`,
              backfaceVisibility: "hidden",
            }}
          >
            {back}
          </div>
        )}

        {right && (
          <div
            className="absolute"
            style={{
              top: `calc(${cornerOverlap} * -1)`,
              height: `calc(100% + ${cornerOverlap} * 2)`,
              left: `calc(100% - ${overlap})`,
              width: edgeLen,
              transformOrigin: `${overlap} center`,
              transform: `translateZ(${half}) rotateY(90deg)`,
              backfaceVisibility: "hidden",
            }}
          >
            {right}
          </div>
        )}
        {left && (
          <div
            className="absolute"
            style={{
              top: `calc(${cornerOverlap} * -1)`,
              height: `calc(100% + ${cornerOverlap} * 2)`,
              right: `calc(100% - ${overlap})`,
              width: edgeLen,
              transformOrigin: `calc(${dd} + ${overlap}) center`,
              transform: `translateZ(${half}) rotateY(-90deg)`,
              backfaceVisibility: "hidden",
            }}
          >
            {left}
          </div>
        )}
        {top && (
          <div
            className="absolute"
            style={{
              left: `calc(${cornerOverlap} * -1)`,
              width: `calc(100% + ${cornerOverlap} * 2)`,
              bottom: `calc(100% - ${overlap})`,
              height: edgeLen,
              transformOrigin: `center calc(${dd} + ${overlap})`,
              transform: `translateZ(${half}) rotateX(90deg)`,
              backfaceVisibility: "hidden",
            }}
          >
            {top}
          </div>
        )}
        {bottom && (
          <div
            className="absolute"
            style={{
              left: `calc(${cornerOverlap} * -1)`,
              width: `calc(100% + ${cornerOverlap} * 2)`,
              top: `calc(100% - ${overlap})`,
              height: edgeLen,
              transformOrigin: `center ${overlap}`,
              transform: `translateZ(${half}) rotateX(-90deg)`,
              backfaceVisibility: "hidden",
            }}
          >
            {bottom}
          </div>
        )}
      </motion.div>
    </div>
  );
}
