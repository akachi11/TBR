/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx,jsx}"],
  theme: {
    extend: {
      screens: {
        sm: '640px',    // Small screen
        md: '768px',    // Medium screen
        lg: '1024px',   // Large screen
        xl: '1280px',   // Extra-large screen
        '2xl': '1536px' // 2x Extra-large screen
      },
      fontFamily: {
        jakarta: ["Plus Jakarta Sans", "sans-serif"], // Replace 'MyFont' with the name of your font
        baskervville: ["Baskervville SC", "sans-serif"], // For Google Fonts example
      },
      animation: {
        pulseImage: "pulseImage 1.5s infinite",
      },
      keyframes: {
        pulseImage: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.1)", opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};
