/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': '360px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: "#DC2626",
        "primary-dark": "#B91C1C",
        "primary-light": "#FEE2E2",
      },
      keyframes: {
        cardEntrance: {
          "0%": { opacity: "0", transform: "translateY(50px) scale(0.94)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideOut: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-28px)" },
        },
        floatA: {
          "0%,100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-22px) rotate(5deg)" },
        },
        floatB: {
          "0%,100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(-4deg)" },
        },
        pulse2: {
          "0%,100%": { opacity: "0.06" },
          "50%": { opacity: "0.14" },
        },
        otpPop: {
          "0%": { opacity: "0", transform: "scale(0.7)" },
          "70%": { transform: "scale(1.08)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(22px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        sparkleAnim: {
          "0%,100%": { transform: "rotate(0deg) scale(1)" },
          "50%":     { transform: "rotate(20deg) scale(1.2)" },
        },
        floatGently: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-7px)" },
        },
        backdropIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        backdropOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        sheetIn: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        sheetOut: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        cardEntrance: "cardEntrance 0.65s cubic-bezier(0.34,1.46,0.64,1) forwards",
        slideDown: "slideDown 0.22s ease-out forwards",
        slideIn: "slideIn 0.4s ease-out forwards",
        slideOut: "slideOut 0.35s ease-in forwards",
        floatA: "floatA 7s ease-in-out infinite",
        floatB: "floatB 5s ease-in-out infinite",
        pulse2: "pulse2 3s ease-in-out infinite",
        otpPop: "otpPop 0.35s cubic-bezier(0.34,1.56,0.64,1) both",
        backdropIn: "backdropIn 0.25s ease forwards",
        backdropOut: "backdropOut 0.25s ease forwards",
        sheetIn: "sheetIn 0.35s cubic-bezier(0.32,0.72,0,1) forwards",
        sheetOut: "sheetOut 0.3s cubic-bezier(0.32,0.72,0,1) forwards",
        "fade-up-1": "fadeUp 0.55s ease both 0.10s",
        "fade-up-2": "fadeUp 0.55s ease both 0.26s",
        "fade-up-3": "fadeUp 0.55s ease both 0.42s",
        "fade-up-4": "fadeUp 0.55s ease both 0.60s",
        "fade-up-5": "fadeUp 0.55s ease both 0.78s",
        "sparkle":       "sparkleAnim 2.6s ease-in-out infinite",
        "float-gentle":  "floatGently 3.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}

