/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundColor:{
        'background--primery-1': '#47d0e8',
        'background--primery-2': '#eaebf6',
        'background--secondery-1': '#090cd0',
        'background--secondery-2': '#483ea6'
      },
      colors:{
        'color--primery': '#000',
        'color--secondery': '#fff'
      }
    },
  },
  plugins: [],
}

