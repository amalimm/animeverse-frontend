/** @type {import('next').NextConfig} */
const nextConfig = (() => {
	const isProd = process.env.APP_ENV === 'production';

	return {
		output: isProd ? 'export' : undefined,
		trailingSlash: isProd ? true : undefined,
		basePath: isProd ? '/animeverse' : '',
	};
})();

export default nextConfig;
