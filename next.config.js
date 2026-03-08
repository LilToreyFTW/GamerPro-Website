/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['steamcdn-a.akamaihd.net']
  },
  assetPrefix: undefined,
  basePath: '',
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'production' 
      ? 'https://gamerpro-website.vercel.app/api' 
      : 'http://localhost:3000/api'
  }
}

module.exports = nextConfig
