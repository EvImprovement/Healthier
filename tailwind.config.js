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
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        // Custom brand colors
        brand: {
          light: '#BAC8D9',      // Bleu clair - backgrounds, cartes
          dark: '#193940',       // Bleu foncé - textes, headers
          lime: '#9BF272',       // Vert lime - boutons, accents
          green: '#7ABF5A',      // Vert moyen - hovers, secondaires
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Arial', 'Helvetica', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}
