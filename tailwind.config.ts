import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5C8F2B',
          light: '#9ACD32',
          dark: '#4A7322',
        },
        secondary: {
          DEFAULT: '#9ACD32',
          light: '#B8E356',
          dark: '#7AB31C',
        },
        accent: {
          DEFAULT: '#5C8F2B',
          light: '#9ACD32',
          dark: '#4A7322',
        },
        gray: {
          DEFAULT: '#2F3437',
          light: '#4A5055',
          dark: '#1A1D1F',
        },
        background: {
          DEFAULT: '#F8F9FA',
          alt: '#E9ECEF',
        },
        surface: '#FFFFFF',
        text: {
          primary: '#2F3437',
          secondary: '#6C757D',
          disabled: '#ADB5BD',
          'on-primary': '#FFFFFF',
        },
        success: '#5C8F2B',
        warning: '#FFC107',
        error: '#DC3545',
        info: '#17A2B8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],
};

export default config;
