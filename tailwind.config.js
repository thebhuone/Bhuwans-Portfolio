/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#202020',
        surface: '#2a2a2a',
        card: 'rgba(255,255,255,0.05)',
        border: 'rgba(102,102,102,0.3)',
        teal: {
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
        },
      },
      fontFamily: {
        sans: ['Roboto', 'system-ui', 'sans-serif'],
      },
      spacing: {
        18: '4.5rem',
        110: '27.5rem',
      },
    },
  },
  plugins: [],
};
