# Portfolio Project Handoff Document

## Overview
This document serves as the architectural summary and current state of the Lucas Portfolio project. It is intended to get a new AI agent or developer immediately up to speed on the codebase.

*(Note: Please review `TECH_STACK.md` for a comprehensive breakdown of the core technologies used and the rationale behind choosing them.)*

**Tech Stack**: Astro (SSG/Routing) + React (Components) + React Three Fiber/Three.js (WebGL) + Tailwind CSS v4 (Styling) + Vanilla JS (Canvas Animations).
**Aesthetic/Theme**: Dual Theme ("Vintage NASA" / Apollo Era & "Deep Space" Galaxy Theme). 
*   **Day Palette (Vintage NASA)**: Alabaster (`#faf8f2`), Navy (`#043b5c`), Apollo Red (`#ed4153`), Teal (`#21859c`).
*   **Night Palette (Deep Space)**: Void Black (`#060913`), Starlight White (`#f0f2f5`), Neon Coral (`#ff5c6d`), Glowing Cyan (`#38bdf8`).
*   **Typography**: Custom 'Baunk' web font integration for massive, architectural headings alongside standard Sans-Serif and Mono fonts for technical data display.

## What Has Been Built (Current State)

### 1. Thematic Architecture & Typography
*   **File**: `src/styles/global.css`, `src/layouts/Layout.astro`, `src/pages/index.astro`, `src/components/Navigation.astro`
*   **Architecture**: The site uses a pure CSS Custom Properties (Variables) architecture to manage themes. The `<html>` element toggles a `.theme-space` class, which instantly flips the color palette across the entire DOM using Tailwind utility classes referencing `var(--bg-primary)`, etc. All hardcoded hex values have been successfully purged from individual pages.
*   **Typography**: The `@font-face` definition for `Baunk` is declared globally in `global.css`, applied site-wide to headings to create high-impact, centered architectural layouts (like the massive hero text in `index.astro`).
*   **Features**:
    *   **Multiple Transition Animations**: The user can toggle themes via three distinct buttons in the sidebar, triggering different cinematic transitions.
    *   **Canvas Hyperdrive**: An intricate, immersive HTML5 Canvas animation that generates a 3D starfield, accelerates it past the camera using `requestAnimationFrame`, and leaves dynamic glowing streaks (tinted with the dark theme colors) before swapping the theme.
    *   **Power Down & Singularity**: Alternative CSS-based transitions (a flickering light switch effect, and a `clip-path` expanding circle).

### 2. WebGL 3D Project Catalog (`/projects`)
*   **File**: `src/components/ProjectsCarousel.jsx`
*   **Architecture**: Built with `@react-three/fiber` and `@react-three/drei`.
*   **Features**:
    *   **Infinite Coverflow Math**: It abandons standard cylinder rotation for a continuous mathematical arc. The active project faces the user at `z=0`, while adjacent projects push back on the Z-axis and rotate sharply inward on the Y-axis. Because it uses `Math.atan2`, the scroll is infinitely looping.
    *   **Physics Engine**: Supports pointer click-and-drag and mouse wheel scrolling. It applies momentum (`rotationVelocity`) and friction (`*= 0.95`) for a high-end, weighty feel.
    *   **Aesthetics**: Features thin borders, floating drop-shadow planes, and a background `<fog>` that smoothly fades out tiles as they rotate behind the focal point. Hovering a tile triggers a smooth `lerp` Y-axis lift.

### 3. Pure CSS 3D Alternate Catalog (`/dpFlip`)
*   **File**: `src/pages/dpFlip.astro`
*   **Architecture**: Built completely without WebGL, using standard HTML `<div>` tags and CSS 3D transforms (`perspective`, `transform-style: preserve-3d`, `rotateY`).
*   **Features**: Built to allow the user to compare pure DOM rendering performance against the WebGL canvas. Uses Vanilla JS for dragging physics.

### 4. Dynamic Project Routing
*   **File**: `src/pages/projects/[id].astro`
*   **Architecture**: Astro dynamic routes generate individual pages for all 8 projects. Currently a "Mission Briefing" boilerplate layout.

### 5. Interactive Procedural Galaxy Map (`/galaxy`)
*   **File**: `src/pages/galaxy.astro`
*   **Architecture**: Built using raw Three.js `THREE.Points` and mathematical logarithmic spiral distributions.
*   **Features**:
    *   Replaced the static `.glb` biological brain map with a dynamic, rotating Milky Way simulation.
    *   Data hubs (Categories, Items) are placed precisely along the spiral arms.
    *   Maintains the complex screen-space 2D HTML projection logic so text labels effortlessly track the galaxy as it rotates on the Y-axis.
    *   The entire procedural galaxy (both the interactive data nodes and the millions of ambient background stars) now seamlessly rotates together, creating a fully immersive environment.

### 6. High-Fidelity 2.5D Apollo Switch
*   **File**: `src/components/ApolloSwitch.astro`
*   **Architecture**: Pure CSS 3D illusion without relying on heavy WebGL geometry.
*   **Features**: 
    *   Utilizes Y-translation coupled with dynamically inverted gradients and box-shadows to simulate a rigid, mechanical switch snapping between ON and OFF states without the optical distortion of a flat plane rotating into the screen.
    *   Automatically observes the `<html>` theme state to stay visually synced if the user changes the theme via localStorage or other tabs.

## Next Steps / Backlog for the Next Session
1.  **Populate Remaining Assets**: Projects 1 through 6 currently have images mapped. Projects 7 and 8 are still utilizing solid-color NASA gradient placeholders. These need actual project images placed in `/public/projects/`.
2.  **Flesh Out Project Detail Pages**: The `[id].astro` dynamic route is currently a template. It needs to be updated to pull unique descriptions, tech stacks, and full galleries for each specific project from a data file or CMS.
3.  **Mobile Polish**: While both carousels support touch dragging, the WebGL camera's Field of View (`fov: 45`) might need responsive adjustments for very narrow mobile screens to ensure the active tile doesn't get cut off.

## Important Context
*   The site uses Astro's `<ClientRouter />` for SPA-like transitions.
*   Because the WebGL Canvas doesn't survive standard Astro static HTML generation, it is mounted using the `client:only="react"` directive.
*   Theme persistence relies on `localStorage('theme')` read directly inside the `astro:page-load` event hook to prevent FOUC (Flash of Unstyled Content).
