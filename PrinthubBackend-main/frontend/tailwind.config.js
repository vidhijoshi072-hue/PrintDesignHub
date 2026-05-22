/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          500: "#2563EB",
          700: "#1E40AF"
        },
        accent: "#F59E0B",
        page: "#F8FAFC",
        ink: "#0F172A"
      },
      boxShadow: {
        soft: "0 24px 60px rgba(15, 23, 42, 0.10)",
        card: "0 18px 40px rgba(37, 99, 235, 0.10)"
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top right, rgba(37, 99, 235, 0.16), transparent 28%), radial-gradient(circle at left center, rgba(245, 158, 11, 0.18), transparent 22%)"
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        pulseSoft: "pulseSoft 2.2s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.65" },
          "50%": { opacity: "1" }
        }
      }
    }
  },
  plugins: []
};
