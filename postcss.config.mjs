/** @type {import('postcss-load-config').Config} */
const config = {
	plugins: {
		"@tailwindcss/postcss": {
			tailwindConfig: "./tailwind.config.js",
		},
	},
};

export default config;
