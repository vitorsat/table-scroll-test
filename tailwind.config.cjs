/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      animation: {
        slideDownAnimation: "slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)",
      },
      keyframes: {
        slideDown: {
          from: {
            height: 0,
          },
          to: {
            height: "var(radix-accordion-content-height)"
          }
        }
      }
    },
  },
  plugins: [],
};
