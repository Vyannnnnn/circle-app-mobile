/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#16181c",
        secondary: "#1d9bf0",
        background: "black",
        card: "#16181c",
        border: "#2f3336",
        success: "#00ba7c",
        danger: "#f4212e",
      },
    },
  },
  plugins: [],
};
