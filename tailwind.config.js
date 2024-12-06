/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    animation: {
      slideIn: 'slideIn 2s ease-out',
      textFadeIn: 'textFadeIn 1s forwards',
    },
    keyframes: {
      slideIn: {
        '0%': { transform: 'translateY(1000px)' },
        '100%': { transform: 'translateY(0)' },
      },
      textFadeIn: {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 },
      },
    },
    spacing: {
      '150px': '150px',
    },
    delay: {
      '2s': '2s',
      '2.3s': '2.3s',
      '2.6s': '2.6s',
      '2.9s': '2.9s',
      '3.2s': '3.2s',
    }
  },
};
export const plugins = [];



