/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        naukri: {
          blue: '#275df5',
          darkBlue: '#1b3280',
          navy: '#121224',
          orange: '#f05537',
          coral: '#ff7555',
          lightBlue: '#f0f5ff',
          bg: '#f8f9fd',
          border: '#e7e7f1',
          textMuted: '#717478',
          textDark: '#121224',
          card: '#ffffff'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'naukri': '0 1px 4px 0 rgba(0,0,0,0.08)',
        'naukri-hover': '0 4px 16px 0 rgba(0,0,0,0.12)',
        'search': '0 6px 20px 0 rgba(39,93,245,0.15)',
      }
    },
  },
  plugins: [],
}
