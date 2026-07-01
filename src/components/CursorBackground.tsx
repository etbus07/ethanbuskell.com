"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

// Cursor "loupe": the faint hairline grid brightens in a soft circle around the
// pointer, like inspecting a drawing. Sits behind page content (z-0), never
// intercepts pointer events, and disables itself for touch / reduced-motion.
export default function CursorBackground() {
  const reduce = useReducedMotion();
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce || typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const layer = layerRef.current;
    if (!layer) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let raf = 0;
    let shown = false;

    const apply = () => {
      raf = 0;
      layer.style.setProperty("--cx", `${x}px`);
      layer.style.setProperty("--cy", `${y}px`);
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!shown) {
        shown = true;
        layer.style.opacity = "1";
      }
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      shown = false;
      layer.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="grid-loupe pointer-events-none fixed inset-0 z-0 opacity-0 transition-opacity duration-300"
    />
  );
}
