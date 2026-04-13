/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#07111f",
        cream: "#f4efe6",
        meadow: "#7aa27c",
        ambermilk: "#f0c777",
        alert: "#f88379"
      },
      fontFamily: {
        display: ["'DM Serif Display'", "serif"],
        sans: ["'Manrope'", "sans-serif"]
      },
      boxShadow: {
        glass: "0 20px 80px rgba(7, 17, 31, 0.35)"
      },
      backgroundImage: {
        hero:
          "linear-gradient(135deg, rgba(7,17,31,0.88), rgba(7,17,31,0.6)), url('https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1600&q=80')"
      }
    }
  },
  plugins: []
};
