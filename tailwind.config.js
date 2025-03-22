import { fontFamily } from "tailwindcss/defaultTheme";
import themes from './src/lib/themes.json'

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ["class"],
	content: ["./src/**/*.{html,js,svelte,ts}"],
	safelist: ["dark"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px"
			}
		},
		extend: {
			colors: {
				border: "oklch(var(--border))",
				input: "oklch(var(--input))",
				ring: "oklch(var(--ring))",
				background: "oklch(var(--background))",
				foreground: "oklch(var(--foreground))",
				primary: {
					DEFAULT: "oklch(var(--primary))",
					foreground: "oklch(var(--primary-foreground))"
				},
				secondary: {
					DEFAULT: "oklch(var(--secondary))",
					foreground: "oklch(var(--secondary-foreground))"
				},
				destructive: {
					DEFAULT: "oklch(var(--destructive))",
					foreground: "oklch(var(--destructive-foreground))"
				},
				muted: {
					DEFAULT: "oklch(var(--muted))",
					foreground: "oklch(var(--muted-foreground))"
				},
				accent: {
					DEFAULT: "oklch(var(--accent))",
					foreground: "oklch(var(--accent-foreground))"
				},
				popover: {
					DEFAULT: "oklch(var(--popover))",
					foreground: "oklch(var(--popover-foreground))"
				},
				card: {
					DEFAULT: "oklch(var(--card))",
					foreground: "oklch(var(--card-foreground))"
				},
				// gruvbox: {
				// 	bg: '#fbf1c7',
				// 	fg: '#3c3836',
				// 	red: '#cc241d',
				// 	green: '#98971a',
				// 	yellow: '#d79921',
				// 	blue: '#458588',
				// 	purple: '#b16286',
				// 	aqua: '#689d6a',
				// 	gray: '#7c6f64',
				// 	'bg-soft': '#f2e5bc',
				// 	'gray-light': '#928374',
				// 	'red-light': '#fb4934',
				// 	'green-light': '#b8bb26',
				// 	'yellow-light': '#fabd2f',
				// 	'blue-light': '#83a598',
				// 	'purple-light': '#d3869b',
				// 	'aqua-light': '#8ec07c'
				// },
				// chad: {
				// 	bg: 'oklch(97.8% 0.019 78.2)',
				// 	fg: 'oklch(8.1% 0.017 78.2)',
				// 	cardBg: 'oklch(91.5% 0.019 78.2)',
				// 	cardFg: 'oklch(24.5% 0.051 78.2)',
				// 	mutedBg: 'oklch(81.5% 0.05 78.2)',
				// 	mutedFg: 'oklch(57.2% 0.108 78.2)',
				// 	primaryFg: 'oklch(21.2% 0.044 78.2)',
				// 	primaryBg: 'oklch(76% 0.046 78.2)',
				// 	secondaryBg: 'oklch(28.8% 0.06 78.2)',
				// 	secondaryFg: 'oklch(71.2% 0.1 78.2)',
				// 	accentBg: 'oklch(76.1% 0.029 78.2)',
				// 	accentFg: 'oklch(7.2% 0.015 78.2)',
				// 	popoverBg: 'oklch(98.3% 0.003 78.2)',
				// 	popoverFg: 'oklch(8.7% 0.018 78.2)',
				// 	destructiveBg: 'oklch(89.4% 0.055 27.1)',
				// 	destructiveFg: 'oklch(46.4% 0.189 27.1)',
				// 	orange: 'oklch(83.5% 0.153 78.2)',
				// 	light: themes.light,
				// 	dark: themes.dark
				// }
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)"
			},
			fontFamily: {
				sans: [...fontFamily.sans],
				se: ["Special Elite", "serif"],
				georama: ["Georama Variable", ...fontFamily.sans]
			}
		}
	},
};

export default config;
