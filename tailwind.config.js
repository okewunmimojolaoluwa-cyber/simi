/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0a0a0f',
        'midnight': '#1a1a2e',
        'purple-glow': '#9d4edd',
        'pink-glow': '#ff006e',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
        'script': ['Great Vibes', 'cursive'],
        'elegant': ['Cormorant Garamond', 'serif'],
      },
    },
  },
  plugins: [],
}
