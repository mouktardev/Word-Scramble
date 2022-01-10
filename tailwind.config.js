module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}'],
	theme: {
		screens: {
			sm: { max: "639px" },
			// => @media (max-width: 640px) { ... }

			md: "768px",
			// => @media (min-width: 768px) { ... }

			lg: "1024px",
			// => @media (min-width: 1024px) { ... }

			xl: "1280px",
			// => @media (min-width: 1280px) { ... }

			"2xl": "1536px",
			// => @media (min-width: 1536px) { ... }
		},
		extend: {
			fontFamily: {
				poppins: ["Poppins", " sans-serif"],
			},
			cursor: {
				grab: 'grab',
			},
			animation: {
				glow: 'glow 3s linear infinite',
			},
			keyframes: {
				glow: {
					'0%': { filter: 'hue-rotate(0deg)', },
					'100%': { filter: 'hue-rotate(360deg)' },
				}
			}
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require("@tailwindcss/line-clamp"),
		require("tailwindcss-animation-delay")
	],
};
