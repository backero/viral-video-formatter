/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas:  '#0d0d0d',
        surface: '#161616',
        raised:  '#1e1e1e',
        lifted:  '#252525',
        wire:    '#2e2e2e',
        'wire-hi': '#444444',
        accent: {
          DEFAULT: '#7c3aed',
          dark:    '#6d28d9',
          glow:    'rgba(124,58,237,0.12)',
        },
        body:    '#e8e8e8',
        dim:     '#888888',
        ghost:   '#555555',
        ok:      '#22c55e',
        bad:     '#ef4444',
        caution: '#f59e0b',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
}
