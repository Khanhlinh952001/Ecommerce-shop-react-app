module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      primary: 'Poppins',
    },
    container: {
      padding: {
        DEFAULT: '30px',
        lg: '0',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
    extend: {
      colors: {
        primary: '#222222',
        secondary: '#F5E6E0',
      },
      backgroundImage: {
        hero: "url('./img/bghero.jpg')",
      },
      keyframes: {
        'fly-to-cart': {
          '0%': { transform: 'translate(0, 0)', opacity: '1' },
          '100%': { transform: 'translate(calc(100vw - 3rem), calc(4rem - 100vh))', opacity: '0' },
        },
      },
      animation: {
        'fly-to-cart': 'fly-to-cart 1s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
