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
        '45': '15rem',
        '90vh': '90vh', 
        '70vh': '70vh'
      },
      width: {
        'passage': '300.45px'
      },
      colors: {
        'deepblue': '#1b263b',
        'lightgray': '#7D8897',
        'darkgray': '#5B6E8781',
        'mellow-yellow': '#FFCB05',
        'grayblue': '#778DA9',
        'medblue': '#253656',
      },
      maxWidth: {
        '100vw': '100vw',
        '90vw': '90vw',
        'passage': '300.45px'
      },
      maxHeight: { 
        '80vh': '80vh'
      }, 
      spacing: {
        '33': '5px' 
      }
    },
  },
  plugins: [],
}
export default config