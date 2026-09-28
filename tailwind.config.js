/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blush: '#ffd6e4', rose: '#f28bb0', deeprose: '#c2467a',
        lavender: '#d9c8f5', violet: '#8b6bc7', plum: '#4a2c5e', cream: '#fff8ef',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        hand: ['Caveat', 'cursive'],
        body: ['Nunito', 'system-ui', 'sans-serif'],
      },
      boxShadow: { glow: '0 0 30px rgba(242,139,176,.55), 0 0 60px rgba(217,200,245,.6)' },
    },
  },
  plugins: [],
}
