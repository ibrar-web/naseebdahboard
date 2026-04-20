/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f8f4',
          100: '#e6efe1',
          200: '#cadfc3',
          300: '#a7c69e',
          400: '#7ca273',
          500: '#5e8557',
          600: '#486945',
          700: '#3a5438',
          800: '#314430',
          900: '#2a392b',
        },
        ink: '#152218',
        sand: '#f5f1e8',
        accent: '#d97706',
      },
      boxShadow: {
        panel: '0 14px 32px rgba(21, 34, 24, 0.08)',
      },
      fontFamily: {
        sans: ['"Manrope"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
