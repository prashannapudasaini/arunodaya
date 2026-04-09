/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Critical for manual toggling
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-gold': '#d4af37',
        'dark-bg': '#0a0a0a',
        'glass-bg': 'rgba(20, 20, 20, 0.8)',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}