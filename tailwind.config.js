/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'blue':'#684EEB',
        'lightGreen': '#E0FDE8',
        'primary_text' : '#263238',
        'gray':'#6A707E',
        'lightDark':'#324054',

      }
    },
  },
  plugins: [],
}

