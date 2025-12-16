module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Enable dark mode using a class
  theme: {
    extend: {
      colors: {
        // Monochromatic dark color palette
        gray: {
          950: '#0a0a0a',
          900: '#111111',
          850: '#171717',
          800: '#1f1f1f',
          750: '#262626',
          700: '#2d2d2d',
          650: '#333333',
          600: '#3d3d3d',
          550: '#454545',
          500: '#555555',
          450: '#666666',
          400: '#757575',
          350: '#888888',
          300: '#949494',
          250: '#a3a3a3',
          200: '#b3b3b3',
          150: '#c7c7c7',
          100: '#d6d6d6',
          50: '#e5e5e5',
        },
        // Specific dark-themed grayscale shades for monochromatic theme
        'mono-dark': '#0f0f0f',
        'mono-darker': '#1a1a1a',
        'mono-darkest': '#000000',
        'mono-medium': '#404040',
        'mono-light': '#a0a0a0',
        'mono-lighter': '#d0d0d0',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};