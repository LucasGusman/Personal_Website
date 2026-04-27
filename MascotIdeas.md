# Mascot Ideas and Brainstorming

This document serves as a future reference for all the ways we can integrate our vintage NASA robot mascot into the website architecture dynamically.

## 1. The "Floating Co-Pilot" (React + Intersection Observers)
* **Status**: Implemented
* **Concept**: A persistent React component `<Mascot client:load />` sits in the bottom right corner of the screen.
* **Interaction**: As the user scrolls down the page, we use `IntersectionObserver` (or scroll tracking) to detect what section they are looking at. When they reach specific `data-mascot` tagged sections, a speech bubble smoothly pops out from the robot providing contextual information.

## 2. The 3D Cursor-Tracking Avatar (Three.js)
* **Concept**: Take the WebGL engine from the Brain rendering and build a dedicated 3D canvas for the Mascot!
* **Interaction**: Using `Three.js`, we can bind the rotation of the robot's head to the mouse cursor's X/Y coordinates using raycasting mathematically tracking the screen. No matter where the user moves their mouse, the robot physically turns his head to watch them.

## 3. Contextual "Scanner" Tooltips (Tailwind CSS)
* **Concept**: Instead of just giving him a persistent speech bubble, make his interactions feel deeply native to the "laboratory/NASA" vibe.
* **Interaction**: When a user hovers over a complex piece of code, a project image, or a specific skill on the resume, the robot's face physically teleports next to the cursor like a scanner, projecting a "holographic" tooltip with a satisfying retro scanning sound effect.

## 4. Astro View Transitions (The "Warp" Guide)
* **Concept**: Astro natively supports the View Transitions API for buttery smooth routing.
* **Interaction**: When the user clicks the "Projects" tab, the robot could animate his jetpack firing up, flying straight UP off the screen, and then landing smoothly into his spot on the new page as it fades in without flashing white.
