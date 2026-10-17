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
        ivory: {
          50: "#FAF8F5",
          100: "#F5F0EB",
          200: "#EFE6DC",
          300: "#E3D5C5",
          400: "#D3BFAB",
          500: "#BFA48B",
        },
        blush: {
          50: "#FFF5F7",
          100: "#FCE7EC",
          200: "#F8CAD6",
          300: "#F2A3B8",
          400: "#E77395",
          500: "#D64D76",
          600: "#B9355D",
          700: "#962547",
        },
        champagne: {
          50: "#FAF7F0",
          100: "#F4ECD9",
          200: "#EADBB5",
          300: "#DFC58A",
          400: "#D3AF61",
          500: "#C4973B",
          600: "#A67A28",
          700: "#805B1E",
        },
        burgundy: {
          50: "#FDF2F4",
          100: "#F8D7DC",
          200: "#F0B3BD",
          300: "#E48596",
          400: "#D2546D",
          500: "#B92D4A",
          600: "#9A1F39",
          700: "#7A142A",
          800: "#5E0D1E",
          900: "#440814",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
