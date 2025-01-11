/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Mont-Bold': ['Mont-Bold', 'sans-serif'],
        'Mont-Light': ['Mont-Light', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

