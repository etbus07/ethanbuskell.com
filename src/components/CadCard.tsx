"use client";

import dynamic from "next/dynamic";
import type { CadModel } from "@/content/portfolio";

const ModelViewer = dynamic(() => import("@/components/ModelViewer"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full animate-pulse rounded-lg bg-black/20" />
  ),
});

export type CadTheme = {
  /** Colour of the dimension lines + labels (the technical "ink"). */
  ink: string;
  /** Accent used for the 3D wireframe/fallback. */
  accent: string;
  /** Solid colour applied to the loaded 3D model's surfaces. */
  modelColor?: string;
  fallbackBg: string;
  fallbackText: string;
  /** Tailwind classes for the model name + description below the viewer. */
  nameClass: string;
  descClass: string;
  /** Tailwind classes for the viewer frame. */
  frameClass: string;
  /** Viewer height utilities (mobile + up). */
  heightClass?: string;
};

export default function CadCard({
  model,
  theme,
}: {
  model: CadModel;
  theme: CadTheme;
}) {
  const heightClass = theme.heightClass ?? "h-56 md:h-72";
  // Alphanumeric-only id so SVG marker url(#…) refs never break on names with
  // spaces or parentheses (e.g. "Robot Lamp (Lelamp)").
  const slug = model.name.replace(/[^a-zA-Z0-9]/g, "");

  return (
    <div className="group">
      <div className={`relative ${heightClass} ${theme.frameClass}`}>
        <ModelViewer
          src={model.src}
          label={model.name}
          accent={theme.accent}
          modelColor={theme.modelColor}
          fallbackBg={theme.fallbackBg}
          fallbackText={theme.fallbackText}
        />

        {/* Top-left dimension callout — appears on hover only */}
        <div
          className="pointer-events-none absolute left-0 top-0 opacity-0 transition-opacity duration-200 group-focus-within:opacity-100 [@media(hover:hover)]:group-hover:opacity-100"
          style={{ color: theme.ink }}
        >
          <svg width="150" height="34" viewBox="0 0 150 34" fill="none">
            <defs>
              <marker
                id={`arrow-${slug}`}
                markerWidth="7"
                markerHeight="7"
                refX="3.5"
                refY="3.5"
                orient="auto"
              >
                <path d="M1 1 L6 3.5 L1 6" stroke="currentColor" strokeWidth="1" fill="none" />
              </marker>
            </defs>
            {/* witness ticks */}
            <line x1="14" y1="20" x2="14" y2="28" stroke="currentColor" strokeWidth="1" />
            <line x1="96" y1="20" x2="96" y2="28" stroke="currentColor" strokeWidth="1" />
            {/* dimension line with arrows */}
            <line
              x1="14"
              y1="24"
              x2="96"
              y2="24"
              stroke="currentColor"
              strokeWidth="1"
              markerStart={`url(#arrow-${slug})`}
              markerEnd={`url(#arrow-${slug})`}
            />
            <text x="14" y="13" className="font-mono" fontSize="11" fill="currentColor">
              {model.dims.top}
            </text>
          </svg>
        </div>

        {/* Bottom-right dimension callout — appears on hover only */}
        <div
          className="pointer-events-none absolute bottom-0 right-0 opacity-0 transition-opacity duration-200 group-focus-within:opacity-100 [@media(hover:hover)]:group-hover:opacity-100"
          style={{ color: theme.ink }}
        >
          <svg width="150" height="40" viewBox="0 0 150 40" fill="none">
            <defs>
              <marker
                id={`arrowv-${slug}`}
                markerWidth="7"
                markerHeight="7"
                refX="3.5"
                refY="3.5"
                orient="auto"
              >
                <path d="M1 1 L6 3.5 L1 6" stroke="currentColor" strokeWidth="1" fill="none" />
              </marker>
            </defs>
            {/* witness ticks */}
            <line x1="128" y1="6" x2="136" y2="6" stroke="currentColor" strokeWidth="1" />
            <line x1="128" y1="34" x2="136" y2="34" stroke="currentColor" strokeWidth="1" />
            {/* vertical dimension line with arrows */}
            <line
              x1="132"
              y1="6"
              x2="132"
              y2="34"
              stroke="currentColor"
              strokeWidth="1"
              markerStart={`url(#arrowv-${slug})`}
              markerEnd={`url(#arrowv-${slug})`}
            />
            <text
              x="122"
              y="23"
              textAnchor="end"
              className="font-mono"
              fontSize="11"
              fill="currentColor"
            >
              {model.dims.bottom}
            </text>
          </svg>
        </div>
      </div>

      {/* Static dimension row — only on touch/coarse pointers, where the
          hover/focus overlay callouts above aren't reachable. */}
      <div
        className="mt-2 hidden items-center gap-2 font-mono text-[11px] [@media(hover:none)]:flex"
        style={{ color: theme.ink }}
      >
        <span>{model.dims.top}</span>
        <span aria-hidden="true" className="opacity-30">·</span>
        <span>{model.dims.bottom}</span>
      </div>

      <h3 className={`mt-4 ${theme.nameClass}`}>{model.name}</h3>
      <p className={`mt-1 ${theme.descClass}`}>{model.description}</p>
    </div>
  );
}
