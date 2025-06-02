/* eslint-disable */

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		fontFamily: {
  			plus: 'Plus Jakarta Sans, serif'
  		},
  		boxShadow: {
  			custom: '0px 4px 16.2px 2px rgba(0, 0, 0, 0.20)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			primary: '#EBEBEB',
  			secondary: '#5A5C5F',
  			dark: '#1D1D1D'
  		},
  		backgroundImage: {
  			banner: 'linear-gradient(0deg, #08090A 0%, rgba(8, 9, 10, 0.00) 100%)',
  			linearbg: 'linear-gradient(0deg, rgba(255, 255, 255, 0.20) -9.26%, rgba(8, 9, 10, 0.00) 62.04%)'
  		},
  		screens: {
  			xs: '390px',
  			xxs: '480px',
  			sm: '650px',
  			md: '768px',
  			xmd: '992px',
  			lg: '1024px',
  			xlg: '1200px',
  			xl: '1560px',
  			xxl: '1920px'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
