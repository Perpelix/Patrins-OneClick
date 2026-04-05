/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark theme
        dark: {
          bg: '#080808',
          'bg-nav': 'rgba(8,8,8,0.90)',
          surface: '#111111',
          surface2: '#161616',
          surface3: '#1d1d1d',
          border: '#252525',
          border2: '#1e1e1e',
          text: '#efefef',
          'text-muted': '#757575',
          'text-faint': '#2d2d2d',
          'text-xfaint': '#1a1a1a',
        },
        // Light theme
        light: {
          bg: '#f5f4f1',
          'bg-nav': 'rgba(245,244,241,0.90)',
          surface: '#ffffff',
          surface2: '#eeecea',
          surface3: '#e6e4e0',
          border: '#dbd9d4',
          border2: '#e4e2dd',
          text: '#111111',
          'text-muted': '#717171',
          'text-faint': '#c5c2bc',
          'text-xfaint': '#dedad4',
        },
        primary: '#6366f1',
        success: '#4caf7d',
      },
      fontFamily: {
        sans: ['Syne', 'system-ui', 'sans-serif'],
        serif: ['DM Serif Display', 'serif'],
        mono: ['DM Mono', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out',
        'blink': 'blink 2.4s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          'from': { opacity: 0, transform: 'translateY(22px)' },
          'to': { opacity: 1, transform: 'translateY(0)' }
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.22 }
        }
      }
    },
  },
  plugins: [],
}
