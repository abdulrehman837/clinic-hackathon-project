/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '375px',      // iPhone SE, small phones
        'sm': '640px',      // Large phones / landscape
        'md': '768px',      // Tablets
        'lg': '1024px',     // Small laptops
        'xl': '1280px',     // Desktops
        '2xl': '1536px',    // Large desktops
        '3xl': '1920px',    // Full HD monitors
        '4xl': '2560px',    // Ultrawide / 4K
      },
    },
  },
  plugins: [],
}