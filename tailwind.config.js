/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      hero: ['"SF Pro Rounded"', '"SN Pro"', '-apple-system', 'BlinkMacSystemFont'],
    },
    extend: {
      colors: {
        primary: '#151531',
        secondary: '#F9E2FB',
        third: '#560059',
        purple: {
          50: '#F0F0FE',
          100: '#E1E1FD',
          200: '#C3C3FC',
          300: '#A4A4FA',
          400: '#8686F9',
          500: '#6868F7',
          600: '#5353C6',
          700: '#3E3E94',
          800: '#2A2A63',
          900: '#151531',
        },
        gray: {
          50: '#F8F9FA',
          100: '#F1F3F5',
          200: '#E9ECEF',
          300: '#DEE2E6',
          400: '#CED4DA',
          500: '#ADB5BD',
          600: '#868E96',
          700: '#495057',
          800: '#343A40',
          900: '#0D131B',
        },
        cyan: {
          500: '#8AE7FD',
        },
        blue: {
          300: '#C9F0FF',
          500: '#003D5A',
        },
        green: {
          300: '#DAF9D4',
          500: '#005900',
        },
        brown: {
          300: '#FFE9C8',
          500: '#5F2700',
        },
      },
    },
  },
  plugins: [],
}