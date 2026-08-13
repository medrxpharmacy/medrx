/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#21468C',
          deep: '#16305F',
          light: '#2A55AA',
        },
        copper: {
          DEFAULT: '#B5662A',
          light: '#D98A4F',
          dark: '#964F1C',
        },
        paper: '#F7F8FA',
        ink: '#1A2233',
      },
      fontFamily: {
        serif: ['Fraunces', 'serif'],
        sans: ['Public Sans', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      boxShadow: {
        'label': '0 2px 8px -2px rgba(22, 48, 95, 0.08), 0 4px 16px -4px rgba(33, 70, 140, 0.06)',
        'label-hover': '0 8px 24px -4px rgba(33, 70, 140, 0.12), 0 4px 12px -2px rgba(181, 102, 42, 0.15)',
      }
    },
  },
  plugins: [],
}
