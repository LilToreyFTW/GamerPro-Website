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
        'gamer-primary': '#1a1a2e',
        'gamer-secondary': '#16213e',
        'gamer-accent': '#0f3460',
        'gamer-highlight': '#e94560',
        'gamer-text': '#f5f5f5',
        'gamer-gray': '#94a3b8',
        'module-green': '#10b981',
        'module-red': '#ef4444',
        'module-yellow': '#f59e0b',
        'module-blue': '#3b82f6',
      },
      fontFamily: {
        'gaming': ['Orbitron', 'monospace'],
        'tech': ['Rajdhani', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #e94560' },
          '100%': { boxShadow: '0 0 20px #e94560, 0 0 30px #e94560' },
        },
      },
    },
  },
  plugins: [],
}
