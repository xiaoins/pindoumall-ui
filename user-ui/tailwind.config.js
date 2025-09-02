/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E6F4EA',      // 浅绿背景
        secondary: '#4CAF50',    // 主绿
        tertiary: '#2E7D32',     // 深绿
        light: '#F9FCF9',        // 更浅的绿色背景
        dark: '#1B5E20',         // 最深绿
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}