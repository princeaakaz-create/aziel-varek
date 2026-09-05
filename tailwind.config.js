/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#0d1712',
          light: '#122019'
        },
        teal: {
          DEFAULT: '#12262a',
          light: '#1a3339'
        },
        ivory: {
          DEFAULT: '#f2ede0',
          dim: '#d9d3c3'
        },
        turquoise: {
          DEFAULT: '#6fa79c',
          muted: '#4d7d75'
        },
        gold: {
          DEFAULT: '#b6975f',
          dim: '#8c7649'
        }
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'Helvetica', 'Arial', 'sans-serif']
      },
      letterSpacing: {
        widest2: '0.28em'
      },
      maxWidth: {
        prose2: '68ch'
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.6, 0.05, 0.15, 1)'
      }
    }
  },
  plugins: []
};
