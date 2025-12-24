/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'oakmega-purple-700': '#5D38BF',
        'oakmega-orange-400': '#FFC044',
        oak: {
          forest: '#2F3A25',
          moss: '#6A6C51',
          gold: '#D8B589',
          paper: '#F9F9F7',
          bark: '#4A4A4A',
          soul: '#5D38BF',      // Purple 700
          warmth: '#FFC044',    // Orange 400
          canvas: '#F9F9F7',    // Paper Canvas
          text: '#2C2C2C',      // Primary text color
          subtext: '#6B7280',   // Secondary text color
        },
      },
      fontFamily: {
        sans: ['"Noto Sans TC"', 'Inter', 'system-ui', 'sans-serif'],
        brand: ['Ubuntu', 'Inter', 'system-ui', 'sans-serif'],
        numbers: ['Ubuntu', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      borderRadius: {
        soft: '12px',
        card: '16px',
      },
      boxShadow: {
        growth: '0 4px 12px rgba(93, 56, 191, 0.25)',
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        soul: '0 4px 16px rgba(93, 56, 191, 0.2)',
        warmth: '0 4px 16px rgba(255, 192, 68, 0.3)',
      },
      animation: {
        grow: 'grow 0.3s ease-in-out forwards',
        growth: 'growth 0.3s ease-in-out',
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        grow: {
          '0%': { transform: 'scale(0.95)', opacity: '0.5' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        growth: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
