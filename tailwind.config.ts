import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      animation: {
        scale: "scale 0.3s ease-in",
      },
      keyframes: {
        scale: {
          "0%": { opacity: "0", transform: "scale(0)" },
          "100%%": { opacity: "1", transform: "scale(1)" },
        },
      },
      screens: {
        xs: "420px",
      },
    },
  },
  plugins: [],
} satisfies Config;
