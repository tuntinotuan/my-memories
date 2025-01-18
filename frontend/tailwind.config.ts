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
        f2Color: "#f2f3f5",
        d7Color: "#D7D7EA",
        primaryText: "#4c5156",
        primaryHover: "#e7e6f3",
      },
      keyframes: {
        popupGrow: {
          "0%": { transform: "scale(0.2)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        popupGrow: "popupGrow 2s ease-in-out alternate",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
