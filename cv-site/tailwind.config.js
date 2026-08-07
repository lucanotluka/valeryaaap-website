/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#EFFBF8",
        mint: "#C9F0E9",
        pink: "#F2BBD8",
        lavender: "#C7B8F2",
        ink: "#1C1B19",
        inkfaint: "#6E7A77",
        chrome: "#F2BBD8",
        chromeline: "#D9A9C3",
        accent: "#7C63C9",
        accentdim: "#C7B8F2",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
        body: ["'IBM Plex Sans'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        win: "0 2px 0 rgba(28,27,25,0.08), 0 20px 40px -12px rgba(28,27,25,0.18)",
        winActive: "0 2px 0 rgba(28,27,25,0.1), 0 28px 56px -12px rgba(28,27,25,0.28)",
      },
    },
  },
  plugins: [],
}