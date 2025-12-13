/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // Brutalism-lite typography
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      // High contrast colors for brutalism-lite
      colors: {
        // Near-black and white for high contrast
        ink: '#0a0a0a',
        paper: '#fafafa',
        // Accent for links and highlights
        accent: '#0066cc',
      },
    },
  },
  plugins: [],
};
