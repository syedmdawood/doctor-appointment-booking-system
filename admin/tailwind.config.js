/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {}, colors: {
      "primary": "#5f6FFF",
      "white": "#FFFF",
      "gray-500": "#6B7280",
      "gray-600": "#4B5563",
      "gray-100": "#F3F4F6",
      "indigo-200": "#C3DAFE",
      "indigo-50": "#EEF2FF",
      "neutral-800": "#1F2937",
      "zinc-600": "#4B5563",


    },
  },
  plugins: [],
}