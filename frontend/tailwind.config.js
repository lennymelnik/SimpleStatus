/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Montserrat': ['Montserrat']
      },
      colors: {
        
        'blue': {
          500 : '#2E3389',
          600 : '#2A2A67',
          800 : '#1F294C',
          900 : '#0F172A'
          
        },
        'lilac': {
          200: '#7F87C2',
          500: '#5459A7',
          600: '#464F94',
          
        },
        // ...
      },
    },
  },
  plugins: [],
}
