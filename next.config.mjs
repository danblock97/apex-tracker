/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			"images-eds-ssl.xboxlive.com",
			"trackercdn.com",
			"avatars.trackercdn.com",
			"secure.download.dm.origin.com",
		],
	},
	experimental: {
		missingSuspenseWithCSRBailout: false,
	},
};

export default nextConfig;
