# Color Themes Reference

This document stores previous design systems for the portfolio website so they can be easily restored if needed.

## Theme 1: The Digital Cosmos (Original Dark Mode)

This was the original dark mode theme featuring deep purples, dark blues, and vibrant neon accents. 

### Global Layout Structure
To restore this theme globally, replace the `<body>` and Background Elements in `src/layouts/Layout.astro` with the following:

```astro
<body class="min-h-screen flex flex-col relative overflow-x-hidden text-white font-sans antialiased selection:bg-accent-blue/30 selection:text-white">
    <!-- Background Elements -->
    <div class="fixed inset-0 z-[-2] bg-space-900 bg-stars opacity-50 pointer-events-none"></div>
    <div class="fixed inset-0 z-[-1] bg-gradient-to-br from-space-900 via-[#0a0a1a] to-[#0f0f2d] opacity-80 pointer-events-none"></div>
    
    <!-- Ambient Orbs -->
    <div class="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent-blue/10 blur-[120px] pointer-events-none z-[-1]"></div>
    <div class="fixed bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-accent-purple/10 blur-[100px] pointer-events-none z-[-1]"></div>
    ...
```

### CSS Variables (global.css)
Ensure these variables exist in your `@theme` directive in `global.css`:

```css
@theme {
  --color-space-900: #050510;
  --color-space-800: #0a0a1a;
  --color-space-700: #12122b;
  --color-accent-blue: #38bdf8;
  --color-accent-purple: #c084fc;
}
```

### Component Styling
When using the Digital Cosmos theme, UI components typically follow this pattern:
* **Cards/Containers**: `bg-space-800/50 backdrop-blur-md border border-space-700`
* **Text**: Headings use `text-white`, secondary text uses `text-gray-400`.
* **Accents**: Hover states and borders use `hover:border-accent-blue/50` or `text-accent-purple`.
