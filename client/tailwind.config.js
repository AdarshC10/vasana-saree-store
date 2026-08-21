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
          bg: '#F7F3ED',          // Warm Luxury Linen Cream
          primary: '#241C18',     // Deep Espresso Black
          secondary: '#6B5546',   // Warm Terracotta Taupe
          gold: '#B4975A',        // Muted Antique Gold
          goldLight: '#C5AC73',
          lightSection: '#EFE7DC',// Soft Sandstone
          white: '#FFFFFF',
          text: '#29231F',        // Soft Charcoal Black
          rose: '#EFE7DC',
          dark: '#241C18',
          burgundy: '#241C18',
          burgundyDark: '#1A1411',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'Manrope', 'sans-serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        playfair: ['"Playfair Display"', 'serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(36, 28, 24, 0.06)',
        'luxury-hover': '0 25px 50px -12px rgba(36, 28, 24, 0.12)',
        'gold-glow': '0 0 20px rgba(180, 151, 90, 0.2)',
      },
      letterSpacing: {
        'widest-editorial': '0.25em',
        'super-wide': '0.35em',
      }
    },
  },
  plugins: [],
}
