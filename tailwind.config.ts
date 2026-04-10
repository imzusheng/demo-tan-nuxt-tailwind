import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular']
      },
      colors: {
        brand: '#4e40f3',
        panel: '#151515',
        line: 'rgba(255,255,255,0.1)',
        muted: '#9aa4b3',
        rose: '#f0568d',
        gold: '#f2b161'
      },
      boxShadow: {
        promo: '0 16px 40px rgba(78, 64, 243, 0.28)',
        shell: '0 28px 80px rgba(0, 0, 0, 0.35)'
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' }
        },
        floatUp: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' }
        },
        waveform: {
          '0%, 100%': { transform: 'scaleY(0.35)' },
          '50%': { transform: 'scaleY(1)' }
        }
      },
      animation: {
        pulseGlow: 'pulseGlow 6s ease-in-out infinite',
        floatUp: 'floatUp 4s ease-in-out infinite',
        waveform: 'waveform 1.4s ease-in-out infinite'
      }
    }
  }
}
