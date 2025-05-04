/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        'primary-light': 'var(--primary-light)',
        light: 'var(--light)',
        dark: 'var(--dark)',
        darker: 'var(--darker)'
      },
      fontFamily: {
        space: ['Space Grotesk', 'sans-serif']
      }
    },
  },
  plugins: [],
}