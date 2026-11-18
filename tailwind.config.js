/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lifeline: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          primary: '#E53935', // Brand LifeLine Red
          600: '#e53935',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          dark: '#c62828',
        },
        surface: {
          light: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
          subtle: '#F1F5F9',
        },
        navy: {
          DEFAULT: '#0F172A',
          charcoal: '#1E293B',
          muted: '#64748B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      keyframes: {
        pulseEmergency: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(229, 57, 53, 0.7)' },
          '50%': { transform: 'scale(1.04)', boxShadow: '0 0 0 20px rgba(229, 57, 53, 0)' },
        },
        cprBeat: {
          '0%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.18)' },
          '50%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1)' },
        }
      },
      animation: {
        'emergency-pulse': 'pulseEmergency 2s infinite cubic-bezier(0.4, 0, 0.6, 1)',
        'cpr-beat': 'cprBeat 0.55s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
