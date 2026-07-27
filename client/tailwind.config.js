/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        "ink-card": "#1e293b",
        "ink-light": "#334155",
        cream: "#f8fafc",
        bluebrand: "#0284c7",
        "bluebrand-light": "#38bdf8",
        "bluebrand-bright": "#7dd3fc",
        skyice: "#38bdf8",
        meadow: "#10b981",
        ambermilk: "#f59e0b",
        alert: "#ef4444"
      },
      fontFamily: {
        display: ["'Outfit'", "'DM Serif Display'", "sans-serif"],
        sans: ["'Plus Jakarta Sans'", "'Manrope'", "sans-serif"]
      },
      boxShadow: {
        glass: "0 20px 60px -10px rgba(15, 23, 42, 0.4)",
        "glass-sm": "0 10px 25px -5px rgba(15, 23, 42, 0.25)",
        "blue-glow": "0 0 35px -5px rgba(56, 189, 248, 0.4)",
        "sky-glow": "0 0 35px -5px rgba(14, 165, 233, 0.35)",
        "amber-glow": "0 0 35px -5px rgba(245, 158, 11, 0.3)"
      },
      backgroundImage: {
        hero:
          "linear-gradient(135deg, rgba(15,23,42,0.92), rgba(30,41,59,0.85)), url('https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1600&q=80')"
      }
    }
  },
  plugins: []
};
