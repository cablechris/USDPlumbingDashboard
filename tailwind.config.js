/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        status: {
          green: '#0F7B0F',
          amber: '#B8860B',
          red:   '#C41E3A',
          stale: '#6B7280',
        },
      },
      fontFamily: {
        mono: ['Menlo', 'Consolas', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}; 