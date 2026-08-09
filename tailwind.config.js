export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ocean: {
          900: '#0b1f3a',
          800: '#11305b',
          700: '#1a4d7d',
          500: '#2f7daf',
          300: '#6cb3e4',
        },
        calm: '#eef6fc',
        seafoam: '#80c8c6',
        amber: '#f2b844',
        ripple: '#dbeaf7',
      },
      boxShadow: {
        soft: '0 20px 60px rgba(16, 40, 81, 0.12)',
      },
      backgroundImage: {
        'water-wave': 'radial-gradient(circle at top, rgba(255,255,255,0.28), transparent 36%)',
      },
    },
  },
  plugins: [],
};
