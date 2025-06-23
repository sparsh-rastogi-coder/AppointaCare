/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        'auto':'repeat(auto-fill, minmax(200px, 1fr))'
      },
      colors:{
        'primary':'#5F6FFF',
        'secondary': '#FFB86F',
        'accent': '#43E6B0',
        'danger': '#FF5F56',
        'info': '#5FD0FF',
        'success': '#43E67E',
        'neutral': '#F5F7FA',
        'dark': '#232946',
        'gray-text': '#6B7280',
      }
    },
  },
  plugins: [],
}