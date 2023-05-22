/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		SERVER_URL: process.env.SERVER_URL,
		APP_URL: process.env.APP_URL,
	},
	images: {
		domains: [
			'localhost:3000',
			'localhost',
			'cloudflare-ipfs.com',
			'195.24.67.180',
		],
	},
}

module.exports = nextConfig
