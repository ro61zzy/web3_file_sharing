import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"], // Ensures Tailwind scans your components
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
