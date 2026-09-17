import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        hood: {
          primary: '#273524',    // Primary dark green brand color & surfaces
          secondary: '#B1B293',  // Secondary UI, borders, muted elements
          light: '#FEF7EF',      // Light text on dark surfaces
          bg: '#F4EFE6',         // Main warm paper-like background
          accent: '#C47A3A',     // Small accent for CTAs, labels, highlights
          card: '#FAF6F0',       // Surface card background
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
        pixel: ['var(--font-pixel)', 'monospace'],
        logo: ['var(--font-logo)', 'cursive'],
      },
      boxShadow: {
        'hood-sm': '2px 2px 0px 0px #273524',
        'hood': '4px 4px 0px 0px #273524',
        'hood-lg': '6px 6px 0px 0px #273524',
        'hood-accent': '4px 4px 0px 0px #C47A3A',
      },
      borderRadius: {
        'hood': '4px',
        'hood-lg': '8px',
      }
    },
  },
  plugins: [],
};
export default config;
