/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#001a4d",
        secondary: "#9A7AF1",
        other: "#707070",
        lightblue: "#0210b1",
        pink: "#EE9AES" ,
        white: "#FFFFFF", 
      },

      fontFamily: {
        inter: ["Inter", "sans-serif"],
        playpen: ["Playpen Sans", "cursive"],
        roboto: ["Roboto", "sans-serif"],
      }
    },
  },
  plugins: [],
}