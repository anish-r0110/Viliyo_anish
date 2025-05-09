/** @type {import('tailwindcss').Config} */
import gridAutoFit from "./src/tw-plugin";

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/widgets/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      mobile: { max: "767px" },
      // => @media (min-width: 640px and max-width: 767px) { ... }

      tablet: { min: "768px", max: "1023px" },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      laptop: { min: "1024px", max: "1279px" },
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      desktop: { min: "1280px", max: "1535px" },
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      largescreen: { min: "1536px" },
      // => @media (min-width: 1536px) { ... }

      xxl: { min: "2559px" },
    },
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out', // Define the 'fade-in' animation
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          // '50%' : {opacity : '50%'},
          '100%': { opacity: '1' },
          
        },
      },
      colors: {
        app: {
          yellow: "#E9BE50",
          blue: "#5F488A",
          purple: "#EC6AE5",
          gray: "#C5C5C5",
          violet: " #EDE4FE",
          fuchsia: "#F0ABFC",
          lightYellow: "#FEEEC6",
          unread: "#FEEEC6",
          read: "#E9E0FA",
          red: "#E04725",
          green: "#43A047",
          "purple-100": "#F1F3FF",
          "gray-light": "#D4D6DB",
          "gray-medium": "#545455",
          "gray-100": "#F0F0F0",
        },
      },
    },
  },
  plugins: [gridAutoFit, require("@tailwindcss/typography") ,
  function ({ addUtilities }) {
    const newUtilities = {
      '.scrollbar-thin': { scrollbarWidth: 'thin' },
      '.scrollbar-narrow': { scrollbarWidth: 'auto' }, // narrow
      '.scrollbar-wide': { scrollbarWidth: 'thin' }, // wide
      '.scrollbar-wider': { scrollbarWidth: 'auto' }, // wider
    };

    addUtilities(newUtilities, ['responsive', 'hover']);
  },
],
};
