/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        card: 'var(--card)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        accent: 'var(--accent)',
        accent2: 'var(--accent2)',
        good: 'var(--good)',
        warn: 'var(--warn)',
      },
      boxShadow: {
        custom: '0 10px 28px rgba(29, 52, 84, 0.09)',
        hero: '0 14px 32px rgba(30, 80, 190, 0.22)',
      }
    },
  },
  plugins: [],
}
