/** @type {import('tailwindcss').Config} */
// Build estático do Tailwind (substitui o cdn.tailwindcss.com em runtime, que
// pesava no mobile). Gera css/tailwind.css purgado — só as classes usadas.
// Rebuild: npx tailwindcss@3 -i tailwind-input.css -o css/tailwind.css --minify
module.exports = {
  content: ['./index.html', './obrigado.html', './js/**/*.js', './content/**/*.js'],
  theme: {
    extend: {
      colors: {
        'v4-ink': '#070C16',
        'v4-ink-2': '#0C1220',
        'v4-ink-3': '#121A2C',
        'v4-plum': '#0A121F',
        'v4-glow-blue': '#2E3F63',
        'v4-text': '#EDEFF4',
        'v4-muted': '#9CA8BA',
        'v4-gold': '#C9A667',
        'v4-gold-soft': '#E4D2A8',
        'v4-mint': '#8CE9C4',
        'v4-paper': '#F6F7F9',
        'v4-paper-muted': '#5B6675',
        'v4-navy': '#0F172A',
        'v4-navy-2': '#1E293B',
        'v4-green': '#25D366',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
};
