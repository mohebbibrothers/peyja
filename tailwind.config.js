/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Vazirmatn', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Vazirmatn', 'serif'],
      },
      colors: {
        midnight: {
          950: '#06020e',
          900: '#0b0514',
          800: '#120a22',
          700: '#1a0f30',
          600: '#251643',
        },
        gold: {
          300: '#f6d58a',
          400: '#f2aa4c',
          500: '#e8913a',
          600: '#c96f22',
        },
        rose: {
          glow: '#ff5fa2',
          hot: '#f05a7e',
          deep: '#b8356a',
        },
        violet: {
          glow: '#c36bff',
          deep: '#8b2fff',
        },
        jade: '#2de0a8',
      },
      backgroundImage: {
        'radial-hero':
          'radial-gradient(80% 60% at 50% 0%, rgba(240,90,126,0.28) 0%, rgba(139,47,255,0.18) 35%, rgba(11,5,20,0) 70%)',
        'radial-soft':
          'radial-gradient(60% 40% at 80% 20%, rgba(242,170,76,0.18) 0%, rgba(0,0,0,0) 60%)',
        'grid-faint':
          'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
        'gold-rose': 'linear-gradient(135deg,#f2aa4c 0%,#f05a7e 50%,#8b2fff 100%)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.06), 0 30px 80px -20px rgba(240,90,126,0.35)',
        card: '0 1px 0 0 rgba(255,255,255,0.05) inset, 0 20px 50px -20px rgba(0,0,0,0.6)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        float: 'float 6s ease-in-out infinite',
        'gradient-x': 'gradientX 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        gradientX: {
          '0%,100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};
