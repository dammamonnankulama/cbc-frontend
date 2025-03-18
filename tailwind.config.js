/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 20s linear infinite', // Adding custom marquee animation
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' }, // Start offscreen
          '100%': { transform: 'translateX(-100%)' }, // End offscreen on the left
        },
      },
    },
  },
  plugins: [],
}
