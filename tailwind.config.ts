import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sea: {
          100: "#ecfdf5",
          200: "#d1fae5",
          300: "#99f6e4",
          400: "#5eead4",
          500: "#22d3ee",
          600: "#06b6d4",
          700: "#0284c7",
          800: "#0369a1",
          900: "#1e40af",
          1000: "#1e3a8a",
          1100: "#172554",
        },
        dark: "#010103",
        darkgray: "#17161b",
      },
      borderWidth: {
        slight: "0.5px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      flex: {
        "1.6": "1.618 1.618 0%",
      },
      transitionProperty: {
        height: "height",
        width: "width",
      },
    },
  },
  plugins: [],
};
export default config;
