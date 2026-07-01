"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

// Section-level scroll reveal: opacity 0->1, y 30->0 as it enters the viewport.
// Respects prefers-reduced-motion: reduced-motion users get the content rendered
// visible immediately (no transform, no gated opacity), which is also the safe
// fallback if the reveal never fires.
export default function Reveal({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
