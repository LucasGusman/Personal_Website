# Lucas Portfolio: Exploring the Digital Cosmos

A highly immersive, interactive personal portfolio website designed to showcase projects through a unique "Vintage NASA / Apollo Era" aesthetic that transitions into a "Deep Space" galaxy theme.

Built with performance and high-end design in mind, this project blends static site generation with advanced WebGL and HTML5 Canvas animations.

## ✨ Key Features

*   **Dual-Theme Architecture**: A custom CSS Variable system that seamlessly transitions the entire application from a high-contrast "Vintage NASA" light theme (Alabaster, Navy, Apollo Red) to a "Deep Space" dark theme (Void Black, Neon Coral, Glowing Cyan).
*   **Immersive Transitions**: Three distinct, cinematic animations for swapping themes:
    *   **Hyperdrive**: A custom HTML5 Canvas `requestAnimationFrame` particle system that projects 3D stars accelerating into light streaks, mimicking a sci-fi warp speed effect.
    *   **Power Down**: A pure CSS keyframe flicker that simulates a fluorescent light shorting out before bringing the neon dark theme online.
    *   **Expanding Singularity**: A buttery-smooth `clip-path` expansion that creates a black hole originating exactly from the user's mouse click.
*   **WebGL 3D Project Catalog**: An infinite-scrolling, momentum-based 3D coverflow built with React Three Fiber. Projects are rendered as interactive tiles in 3D space.
*   **Pure CSS 3D Fallback**: An alternative hardware-accelerated CSS 3D catalog for comparing DOM rendering performance against the WebGL canvas.
*   **Custom Typography & Layouts**: Integration of the 'Baunk' web font for massive, high-impact architectural headlines, combined with precisely centered layouts and layered 3D orbit graphics.
*   **Astro SPA Routing**: Utilizes Astro's `<ClientRouter />` for instant, app-like page transitions while maintaining excellent SEO and initial load speeds.

## 🛠️ Tech Stack

*   **Framework**: [Astro](https://astro.build/) (Static Site Generation & Routing)
*   **Components**: [React 19](https://react.dev/)
*   **3D / WebGL**: [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/) + [@react-three/drei](https://github.com/pmndrs/drei)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Custom CSS Variables
*   **Animations**: Vanilla JS (HTML5 Canvas) + CSS Keyframes

## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd "Personal Website"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:4321/` (or whichever port Vite allocates).

## 📂 Project Structure

```text
/
├── public/                 # Static assets (images, fonts, 3D models)
├── src/
│   ├── components/         # Reusable UI components (React & Astro)
│   │   ├── Navigation.astro    # Sidebar navigation & theme toggle logic
│   │   ├── ProjectsCarousel.jsx # WebGL 3D React Three Fiber carousel
│   │   └── Mascot.jsx          # Interactive AI Mascot component
│   ├── layouts/            # Astro layout shells
│   │   └── Layout.astro        # Main site wrapper
│   ├── pages/              # Astro routing
│   │   ├── index.astro         # The Home Page
│   │   ├── dpFlip.astro        # The Pure CSS 3D Catalog
│   │   └── projects/           # Dynamic project detail pages
│   └── styles/
│       └── global.css          # Tailwind config and CSS Variables
├── HANDOFF.md              # Developer documentation and current state
├── package.json
└── astro.config.mjs
```

## 📝 License

This project is open-source and available for educational and personal use.
