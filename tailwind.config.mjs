/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#E9C3FC",
          200: "#CF80FF",
          300: "#9D0CF5",
          400: "#62049C",
          500: "#11001C",
        },
        support: {
          100: "#F6F5F7",
          200: "#E8E4EB",
          300: "#C2BEC4",
          400: "#A4A1A6",
          500: "#868387",
          600: "#666468",
          700: "#48454A",
          800: "#050505",
        },
      },
      spacing: {
        "grid-horizontal": "14.063vw",
      },
      screens: {
        xs: { max: "410px" },
        sm: { max: "640px" },
        md: { max: "768px" },
        lg: { max: "1024px" },
        "1xl": { max: "1280px" },
        "2xl": { max: "1536px" },
      },
    },
  },
  plugins: [],
};
