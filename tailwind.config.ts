import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      height: {
        '45': '15rem'
      },
      colors: {
        'deepblue': '#1b263b',
        'lightgray': '#7D8897'
      }
    },
  },
  plugins: [],
}
export default config