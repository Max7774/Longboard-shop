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
			'longboardshop-russia.ru',
			'www.longboardshop-russia.ru',
		],
	},
}

module.exports = nextConfig
