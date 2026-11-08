export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: 'var(--bg)',
        slate: 'var(--surface)',
        aqua: 'var(--accent)',
        ice: 'var(--text)',
        violet: 'var(--violet)',
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'],
        display: ['Space Grotesk', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      borderRadius: { surface: 'var(--radius)' },
      boxShadow: { glow: 'var(--shadow-glow)', portrait: 'var(--shadow-portrait)', dialog: 'var(--shadow-dialog)' },
      spacing: { section: 'var(--section-space)', gutter: 'var(--space-6)' },
      zIndex: { nav: 'var(--z-nav)', cursor: 'var(--z-cursor)', dialog: 'var(--z-dialog)' },
      transitionDuration: { micro: 'var(--duration-micro)', card: 'var(--duration-card)', reveal: 'var(--duration-reveal)' },
      transitionTimingFunction: { premium: 'cubic-bezier(.2,.7,.2,1)' },
      screens: { phone: '620px', tablet: '850px', desktop: '1100px' },
    },
  },
  plugins: [],
};
