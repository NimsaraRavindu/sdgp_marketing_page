module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './App.tsx',
    './index.tsx',
    './*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1152d4',
        'primary-hover': '#0d41a8',
        'background-light': '#f8faff',
        'background-dark': '#101622',
        brand: {
          navy: '#04445F',
          grotto: '#75E6DA',
          green: '#13db23ff',
          baby: '#F4F4F4',
          white: '#FFFFFF',
        }
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
      },
    }
  },
  plugins: [],
};
