import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      boxShadow: {
        "premium": "0 32px 90px rgba(45, 34, 26, 0.18)",
        "result": "0 18px 45px rgba(48, 64, 82, 0.12)",
      },
      fontFamily: {
        display: ["Charter", "Cambria", "Georgia", "serif"],
        body: ["Aptos", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
