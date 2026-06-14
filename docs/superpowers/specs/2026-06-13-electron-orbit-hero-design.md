# Design: Electron Orbit SVG Hero Animation

**Date:** 2026-06-13  
**Status:** Approved

## Summary

Replace the two video elements in the `Hero` section of `app/page.tsx` with a pure-SVG animated Electron Orbit component. The animation evokes data transfer, electron activity, and technology through an atomic model: electrons orbiting a glowing nucleus along elliptical paths, with animated data-stream dashes and floating monospace labels.

## What Changes

### `app/page.tsx` — `Hero()` function

1. **Remove** the background ambient video (lines 91–99):
   ```tsx
   <video src="/high-end-tech.mp4" autoPlay muted loop playsInline ... />
   ```
   The dark gradient overlay (`bg-gradient-to-b from-[#0D0F14]/60 ...`) stays unchanged — it already provides the right dark atmosphere without the video.

2. **Replace** the "Video showcase" panel (lines 149–171): swap the inner `<video>` tag for `<ElectronOrbit />`. The outer glass wrapper, glow border (`bg-gradient-to-r from-[#7C3AED]`), rounded container, and floating "Live preview" badge all stay intact.

3. **Add** import: `import ElectronOrbit from "./components/ElectronOrbit"`.

### New file: `app/components/ElectronOrbit.tsx`

A `'use client'` component that renders a self-contained SVG animation. Uses `requestAnimationFrame` for the nucleus pulse and label flicker (same pattern as `HeroGraph.tsx`). SVG-native `<animateMotion>` / `<animateTransform>` handles electron movement and orbit dash phase.

## Component Spec

### viewBox and sizing
- `viewBox="0 0 510 368"` — matches `HeroGraph` so it drops into the same slot
- `className="w-full h-auto block"` — responsive

### Visual layers (back to front)

| Layer | Description |
|---|---|
| Ambient bloom | `radialGradient` ellipse behind everything, `#00D4FF` at 5% opacity |
| Orbit rings | 3 thin ellipses (`stroke-opacity: 0.12`), rotated at −20°, 40°, 0° |
| Data-stream dashes | Same 3 ellipses with `stroke-dasharray` + `<animateTransform type="rotate">` making the dashes flow |
| Nucleus glow halo | Large blurred circle pulsing via rAF (`r` 38→54→38, `opacity` 0.12→0.04) |
| Nucleus core | Smaller circle with `radialGradient` (`#00D4FF` → `#7C3AED`), slight size pulse |
| Nucleus pip | Tiny bright circle, opacity animated |
| Electron coronas | Blurred circle layer per electron (Gaussian blur filter, `stdDeviation=5`) |
| Electron bodies | Solid colored circle per electron |
| Floating labels | 4 monospace text elements fading in/out on independent timers |
| Legend strip | Dark rect + text: `electron activity · quantum data flow` |

### Electrons

| Electron | Color | Orbit | Period | Phase offset |
|---|---|---|---|---|
| A | `#00D4FF` | rx=140 ry=55, rotate −20° | 7 s | 0 |
| B | `#c084fc` | rx=100 ry=90, rotate 40° | 9 s | 0.5 |
| C | `#4ade80` | rx=80 ry=40, rotate 0° | 5.5 s | 0.25 |

Each electron has: a blurred corona circle (r=8, opacity=0.35) and a solid body circle (r=4, opacity=0.9), both driven by `<animateMotion>` with `<mpath>` referencing their orbit `<path>` in `<defs>`.

### Orbit data-stream dashes

Each orbit ellipse is duplicated with `stroke-dasharray="10 50"` and an `<animateTransform type="rotate">` that continuously rotates the dash pattern around the center, creating a flowing "data packets on a wire" effect.

### Floating labels

Four `<text>` elements with `font-family="monospace"`:
- `10110` — cyan — top right — 3.2 s cycle
- `0xFF` — purple — bottom left — 4.5 s cycle, 1 s delay
- `<sig>` — green — right — 3.8 s cycle, 2 s delay
- `Δ=42` — indigo — top left — 5 s cycle, 0.5 s delay

Opacity animated: 0 → 0.55 → 0 via rAF or `<animate>` element.

### Animation approach

- **SVG-native only** — all animation uses `<animateMotion>`, `<animateTransform>`, and `<animate>` elements
- No `requestAnimationFrame` / JS animation loop (unlike `HeroGraph.tsx`)
- Nucleus glow pulse: `<animate>` on `r` and `opacity` of the halo circle
- Label flicker: `<animate>` on `opacity` of each `<text>` element
- Electron movement: `<animateMotion>` with `<mpath>` referencing orbit paths in `<defs>`
- Orbit data-stream flow: `<animateTransform type="rotate">` on each dashed ellipse

This means `ElectronOrbit.tsx` does **not** need `'use client'` — it can be a pure server component returning static JSX with embedded SVG animation declarations.

### Colors

All from the existing site palette:
- Cyan: `#00D4FF`
- Purple: `#a78bfa` / `#c084fc`
- Green: `#4ade80`
- Indigo: `#818cf8`
- Background: `#0D0F14`

## Files Touched

| File | Change |
|---|---|
| `app/page.tsx` | Remove 2 `<video>` elements, add `<ElectronOrbit />`, add import |
| `app/components/ElectronOrbit.tsx` | New file — the SVG animation component |
| `public/high-end-tech.mp4` | Can be deleted (no longer referenced) |

## Out of Scope

- No changes to `HeroGraph.tsx`, `globals.css`, or any other component
- No new npm dependencies
- No changes to the glass wrapper, glow border, or "Live preview" badge
