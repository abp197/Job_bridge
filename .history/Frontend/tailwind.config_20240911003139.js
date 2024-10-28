/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
         // Custom utilities for hiding the scrollbar
         noScrollbar: {
          '::-webkit-scrollbar': { display: 'none' }, // Chrome, Safari, and Opera
          '-ms-overflow-style': 'none', // IE and Edge
          'scrollbar-width': 'none', // Firefox
        },
      },
    },
  },
  plugins: [],
}

