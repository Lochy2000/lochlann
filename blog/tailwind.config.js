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
        primary: 'var(--primary)',
        'primary-dark': 'var(--primary-dark)',
        secondary: 'var(--secondary)',
        'primary-light': 'var(--primary-light)',
        light: 'var(--light)',
        dark: 'var(--dark)',
        darker: 'var(--darker)',
        // Lo-fi inspired color palette
        coffee: {
          light: '#d4a276', // Light coffee
          DEFAULT: '#9c6644', // Coffee brown
          dark: '#7c5236', // Dark coffee
        },
        code: {
          bg: '#1e293b', // Slate 800
          text: '#94a3b8', // Slate 400
          highlight: '#334155', // Slate 700
        },
        lofi: {
          gray: '#94a3b8',
          blue: '#60a5fa',
          pink: '#f472b6',
          purple: '#c084fc',
          paper: '#f8fafc',
          dark: '#0f172a',
          terminal: '#1e293b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
        space: ['Space Grotesk', 'sans-serif']
      },
      typography: {
        DEFAULT: {
          css: {
            code: {
              backgroundColor: 'var(--code-bg)',
              color: 'var(--code-text)',
              borderRadius: '0.25rem',
              padding: '0.1rem 0.3rem',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: 'var(--code-bg)',
              color: 'var(--code-text)',
            },
            a: {
              color: 'var(--primary)',
              '&:hover': {
                color: 'var(--primary-light)',
              },
            },
            h1: {
              color: 'var(--text-heading)',
            },
            h2: {
              color: 'var(--text-heading)',
            },
            h3: {
              color: 'var(--text-heading)',
            },
            h4: {
              color: 'var(--text-heading)',
            },
            blockquote: {
              borderLeftColor: 'var(--primary)',
            },
          },
        },
      },
      boxShadow: {
        'lofi': '4px 4px 0px 0px rgba(0, 0, 0, 0.2)',
        'lofi-lg': '8px 8px 0px 0px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}