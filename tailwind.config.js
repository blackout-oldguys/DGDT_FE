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
        'Mont-Regular': ['Mont-Regular', 'sans-serif'],
        'Mont-Light': ['Mont-Light', 'sans-serif'],
      },
    },
    keyframes: {
      wiggle: {
        '0%, 100%': { transform: 'rotate(-3deg)' },
        '50%': { transform: 'rotate(3deg)' }
      },
      bounce: {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-10px)' }
      },
      
    }
  },
  plugins: [],
}

