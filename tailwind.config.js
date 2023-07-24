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
        'lightBrown': '#979797',
        'darkGray': '#555B6A',
        'bgCover': 'rgba(38, 50, 56, 0.50)',

      },
      backgroundImage: {
        'signinBg': "url('./images/dashboard/signin-image.png')",
        'cargoBg': "url('./images/home/cargobg.png')",
        'cargoBgMob': "url('./images/home/cargoBgMobile.png')",
        
      }
    },
  },
  plugins: [],
}

