/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // Notion-like typography with subtle character
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
        serif: [
          'Georgia',
          'Cambria',
          'Times New Roman',
          'serif',
        ],
        mono: [
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      // Notion-inspired color palette with warmth
      colors: {
        // Soft off-white background
        paper: '#ffffff',
        'paper-subtle': '#f7f6f3',
        // Warm dark text
        ink: '#37352f',
        'ink-light': '#6b6b6b',
        'ink-lighter': '#9b9a97',
        // Accent
        accent: '#2eaadc',
        'accent-hover': '#0b76b7',
      },
      // Generous spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      // Readable line lengths
      maxWidth: {
        'prose': '65ch',
        'prose-wide': '80ch',
      },
      // Subtle shadows
      boxShadow: {
        'soft': '0 1px 2px rgba(0, 0, 0, 0.04)',
        'lifted': '0 4px 12px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
