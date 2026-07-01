# Design

Visual system for the Ethan B. engineering portfolio. The site ships a single design — **"Spec sheet"**, a light datasheet aesthetic — at `/`. (Two alternates, "Machined" (dark/copper) and "Blueprint" (drafting-blue), were explored and removed; their git history is the record if they're ever wanted back.)

## Theme

Light, deliberately — not "light to be safe." The scene: a tutor or employer on a laptop in daylight, skimming fast, wanting evidence. A precise light datasheet matches that reading context and reads as an instrument's spec page rather than a developer's dark IDE.

## Color

OKLCH-authored intent; hex shipped for Tailwind v4 arbitrary values. One accent (signal red), used ≤ ~10% of surface (Restrained strategy). AA-corrected after critique.

| Role | Hex | Notes |
|---|---|---|
| bg (near-neutral paper) | `#F2F2F1` | de-warmed from `#F4F3EF` to avoid the warm-near-white default |
| surface | `#FFFFFF` | |
| ink | `#14161C` | |
| text-secondary | `#5A5C64` | ≥4.5:1 on paper (was `#6B6E78` ≈4.3:1, failed AA) |
| accent (signal red) | `#CE3F26` | passes both white-on-red (~6:1) and red-on-paper (~5.5:1) |
| accent-hover | `#B5341E` | |

**Contrast rule:** body text ≥4.5:1, large ≥3:1, no colour-only meaning.

## Typography

Three roles, paired on contrast axes (not two similar sans):
- **Display** — Space Grotesk 500/700 (geometric, engineered). Headings + hero name only.
- **Body** — Inter 400/500 (humanist). Prose, descriptions.
- **Mono** — JetBrains Mono 400/500 (technical). Specs, labels, dimension annotations, nav in C.

Scale: hero 48px (mobile) → 72px (deskt, ≤96px ceiling); section h2 ~30px; card h3 ~18px; body 16px; captions 12–14px mono. Letter-spacing: display `tracking-tight` (-0.025em, inside the -0.04em floor) — never tighter. Headings get `text-wrap: balance`, prose `text-wrap: pretty`. Loaded via `next/font/google` (no CDN), `display: swap`.

## Layout

- Single `max-w-6xl` centred container, `px-6`.
- Sections separated by generous space (`py-24`), not rules — except C's datasheet identity, which uses intentional hairlines as structure.
- Grids: 2-col `md`, 3-col `lg` for projects/CAD. Flagship projects may span 2 columns to break the identical-card-grid monotony.
- Z-index is semantic (nav < switcher < future modals/toasts).

## Components

- **Navbar** — fixed, `backdrop-blur`, bottom hairline, smooth-scroll anchors, accent "Download CV".
- **ProjectCard** — surface + full border (no side-stripe), 3–8px radius (never 24px+), no border+wide-shadow pairing; hover = border → accent.
- **CadCard + ModelViewer** — `h-56` (mobile) / `h-72`; R3F viewer dynamically imported `ssr:false`; missing-GLB → wireframe-cube "3D model coming soon" fallback. **Signature element:** on hover, 1px SVG dimension callouts (top-left Ø, bottom-right tolerance/rev) fade in — technical-drawing convention, inked in graphite to match the datasheet.
- **Section heading** — a single red brand tick + title on a hairline, with an optional right-aligned real datum (counts). **No per-section uppercase eyebrow, no 01/02/03 markers** (both are AI-grammar tells).

## Motion

Exactly two purposes, no decorative motion:
1. **Hero entrance** — stagger (opacity 0→1, y 20→0, 80ms between elements), on mount.
2. **Scroll reveals** — per section (opacity 0→1, y 30→0, ~0.5s ease-out), once.

Ease-out only (no bounce/elastic). **Reduced motion is mandatory:** `prefers-reduced-motion: reduce` collapses both to an instant/crossfade with no transform, and content is visible by default (never gated invisible on a reveal that might not fire).
