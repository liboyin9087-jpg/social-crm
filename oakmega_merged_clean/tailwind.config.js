/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'oakmega-purple-700': '#5D38BF',
        'oakmega-orange-400': '#FFC044',
        'paper-canvas': '#F9F9F7',
      },
      fontFamily: {
        sans: ['"Noto Sans CJK TC"', 'system-ui', 'sans-serif'],
        body: ['"Noto Sans CJK TC"', 'system-ui', 'sans-serif'],
        brand: ['Ubuntu', 'Inter', 'system-ui', 'sans-serif'],
        numbers: ['Ubuntu', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        growth: '0 4px 12px rgba(93, 56, 191, 0.25)',
      },
    },
  },
  plugins: [],
};
