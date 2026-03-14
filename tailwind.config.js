/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
        display: ['Space Grotesk', 'Arial Black', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100ch',
          },
        },
      },
    },
  },
};
