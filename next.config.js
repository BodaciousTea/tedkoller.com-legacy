/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/legacy',
  assetPrefix: '/legacy',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
