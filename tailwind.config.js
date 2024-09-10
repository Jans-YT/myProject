/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.js', // Masukkan file utama proyek
    './components/**/*.{js,jsx,ts,tsx}', // Jika ada folder komponen
    './screens/**/*.{js,jsx,ts,tsx}', // Jika ada folder komponen
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
