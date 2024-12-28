import colors from 'tailwindcss/colors'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    },
    colors:{
      ...colors,
      primary: "#C61F1F",
      secondary: "#1E1E1E",
      darkPrimary: "#9F1A1A", // Dark rejim uchun qo'shimcha ranglar
      darkSecondary: "#121212",
    },
    fontFamily:{
  
    },
    container:{
      center: true,
      screens: {
        sm: '600px',
        md: '728px',
        lg: '984px',
        xl: '1040px',
        '2xl': '1308px',
      },
      padding: "1rem"
    },
    container_2:{
      center: true,
      screens: {
        sm: '600px',
        md: '728px',
        lg: '984px',
        xl: '1040px',
        '2xl': '1308px',
      },
      padding: "1rem"
    }
  },
  darkMode: "class",
  plugins: [],
}
