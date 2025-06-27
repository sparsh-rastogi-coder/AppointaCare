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
        primary: '#4F8CFF', // Blue
        secondary: '#6366F1', // Indigo
        accent: '#2DD4BF', // Teal
        background: '#F8FAFC', // Light Gray
        surface: '#FFFFFF', // White
        'text-primary': '#1E293B', // Blue-Gray
        'text-secondary': '#64748B', // Blue-Gray
        error: '#EF4444', // Red
      }
    },
  },
  plugins: [],
}