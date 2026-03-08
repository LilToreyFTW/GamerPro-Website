/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['steamcdn-a.akamaihd.net', 'api.ipify.org']
  },
  assetPrefix: undefined,
  basePath: '',
  experimental: {
    missingSuspense: false
  },
  typescript: {
    ignoreBuildErrors: false
  },
  eslint: {
    ignoreDuringBuilds: false
  }
}

module.exports = nextConfig
