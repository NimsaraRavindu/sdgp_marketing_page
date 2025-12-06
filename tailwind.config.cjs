module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#04445F',
          grotto: '#75E6DA',
          green: '#10B981',
          baby: '#F4F4F4',
          white: '#FFFFFF',
        }
      }
    }
  },
  plugins: [],
};
