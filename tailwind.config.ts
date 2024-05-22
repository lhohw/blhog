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
        background: "var(--background)",
        "background-alpha": "var(--background-alpha)",
        text: "var(--text)",
        primary: "var(--primary)",
        "primary-alpha": "var(--primary-alpha)",
      },
      borderWidth: {
        slight: "0.5px",
      },
      flex: {
        "1.6": "1.618 1.618 0%",
      },
      transitionProperty: {
        height: "height",
        width: "width",
      },
      boxShadow: {
        "corona-primary": "0 0 12px hsl(149, 45%, 61%)",
      },
    },
  },
  plugins: [],
};
export default config;
