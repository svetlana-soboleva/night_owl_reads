/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "story-magic": "url('./public/boywithbook2.webp')",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["night", "dracula"],
  },
};
