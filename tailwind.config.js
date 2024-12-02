/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        description: "500px",
      },
      height: {
        "500px": "700px",
      },
      colors: {
        "card-background": "#202020",
        background: "#0f1011",
      },
      width: {
        description: "500px",
      },
    },
  },
  plugins: [],
};
