# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` — Start Vite dev server (http://localhost:5173)
- `npm run build` — Production build output to `dist/`
- `npm run preview` — Preview production build locally

## Architecture

**Stack**: Vite + React 19 + React Router 7

**App Structure**:
- `src/App.jsx` — Main Routes definition; currently supports `/`, `/login`, `/signup`, `/hero-form`
- `src/screens/` — Full-page screen components (HomeScreen, ItemDetailScreen, MenuScreen, etc.)
- `src/components/` — Reusable UI components (BottomNav, CartDrawer, Header, Icons, PillButton, PhotoPlaceholder, Reveal for scroll animations)

**Data & Styling**:
- `src/data/menu.js` — Canonical menu structure. Items have: `id`, `cat` (category), `name`, `blurb`, pricing (`price` or `veg`/`nonVeg`), `kcal`, `time` (minutes), `tags` array, `tone` (color reference). Use `startPrice()` helper for flexible pricing. Categories: premium, basic, wraps, subs, dessert. Tags: high-protein, low-cal, gluten-free, veg.
- `src/brand.js` — 11 color tokens: `forest`, `forestDeep`, `cream`, `creamWarm`, `tomato`, `lavender`, `blush`, `ink`, `inkSoft`, `muted`, `line`. Referenced in menu items via the `tone` property.

**Typography**: DM Sans (body), Instrument Serif (display). Defined in `src/index.css`.

**Animations**: `src/index.css` contains a library of named keyframe animations (`tbs-rise`, `tbs-screen-in`, `tbs-step-in`, `tbs-step-out`, `tbs-write`, `tbs-float`, etc.) — use these for consistency.

## Component Patterns

- **PillButton**: Reusable button component with brand colors. Check usage for tone/size options.
- **Reveal**: Wrapper for scroll-triggered fade-in animations. Pairs with keyframe animations.
- **Icons**: Inline SVG icon set. Check component for available icon names.
- **PhotoPlaceholder**: Fallback image component for missing meal photos.

## Notes

- Menu items with `veg`/`nonVeg` pricing (premium meals) need separate UI handling vs. fixed `price` items (basic meals).
- `ingredientsFor()` in menu.js provides fallback ingredients for items without a detailed ingredient list.
- Global scrollbar is hidden via CSS (see `index.css`).
