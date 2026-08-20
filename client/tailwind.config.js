/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vasana: {
          bg: '#FBF7F2',
          burgundy: '#6B1E32',
          burgundyDark: '#4A1322',
          gold: '#C89B5C',
          goldLight: '#E5C594',
          dark: '#24201D',
          rose: '#E8D4C0',
          roseLight: '#F5EBE1',
          cream: '#FFFDF9',
          accent: '#A42A46'
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'Manrope', 'sans-serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        playfair: ['"Playfair Display"', 'serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(36, 32, 29, 0.08)',
        'luxury-hover': '0 25px 50px -12px rgba(107, 30, 50, 0.15)',
        'gold-glow': '0 0 20px rgba(200, 155, 92, 0.25)',
      },
      letterSpacing: {
        'widest-editorial': '0.25em',
        'super-wide': '0.35em',
      }
    },
  },
  plugins: [],
}
