module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Scan inside the `app/` directory if you're using Next.js
    './pages/**/*.{js,ts,jsx,tsx}', // Scan inside `pages/`
    './components/**/*.{js,ts,jsx,tsx}', // Scan inside `components/`
    './src/**/*.{js,ts,jsx,tsx}', // Scan inside `src/` if you have a `src` folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
