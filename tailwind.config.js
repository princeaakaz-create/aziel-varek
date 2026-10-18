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
        forest: { DEFAULT: '#0D1F1A', light: '#13291f' },
        moss: '#2E4A3A',
        sage: '#6B7F6B',
        teal: { DEFAULT: '#0D1F1A', light: '#13291f' },
        ivory: { DEFAULT: '#E8E1D3', dim: '#cfc8b8' },
        turquoise: { DEFAULT: '#9DB39D', muted: '#6B7F6B' },
        gold: { DEFAULT: '#B89A62', dim: '#8c7649', bright: '#D6BC86' },
        charcoal: '#0A100E'
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        deco: ['var(--font-heading)', 'Georgia', 'serif'],
        heading: ['var(--font-heading)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'Georgia', 'serif'],
        label: ['var(--font-label)', 'Helvetica', 'Arial', 'sans-serif']
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