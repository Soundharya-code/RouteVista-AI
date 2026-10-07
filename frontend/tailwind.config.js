/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f8fafc', // Very light cool gray
        primary: '#06b6d4',    // Electric cyan
        secondary: '#9333ea',  // Deep AI purple
        success: '#10b981',    // Emerald green
        warning: '#f59e0b',    // Amber
        danger: '#ef4444',     // Crimson red
        text: '#0f172a',       // Slate 900
        textMuted: '#475569',  // Slate 600
        border: 'rgba(226, 232, 240, 0.8)', // Slate 200/80
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 20px rgba(6, 182, 212, 0.3)',
      }
    },
  },
  plugins: [],
}
