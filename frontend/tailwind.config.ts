import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primaryColor: "#7731d8",
        secondaryColor: "#01C4CD",
        efColor: "#EFF4FC",
        d7Color: "#D7D7EA",
        f2Color: "#F2F3F5",
        primaryText: "#4c5156",
        primaryHover: "#e7e6f3",
        primaryBlack: "#0d1216",
        typingBg: "var(--bg-primary)",
        typingColorActive: "var(--color-active)",
        typingTextNormal: "var(--text-normal)",
        typingTextCorrect: "var(--text-correct)",
        typingTextWrong: "var(--text-wrong)",
        typingBgControlMenu: "var(--bg-control)",
        typingTextHover: "var(--text-hover)",
      },
      keyframes: {
        popupGrow: {
          "0%": { transform: "scale(0.2)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },
        hideShow: {
          "0%": { opacity: "0" },
          "50%": { opacity: "0.5" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        popupGrow: "popupGrow 2s ease-in-out alternate",
        wiggle: "wiggle 0.5s ease-in-out infinite",
        fadeInUp: "fadeInUp 1s ease-out infinite",
        hideShow: "hideShow 1s ease-in infinite",
      },
      boxShadow: {
        "popup-rect": "0 0px 15px rgba(0, 0, 0, 0.1)",
        "soft-blue": "0 0 10px rgba(59, 130, 246, 0.5)", // Tailwind blue glow
        "deep-xl": "0 10px 25px -5px rgba(0, 0, 0, 0.5)", // deep large shadow
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
