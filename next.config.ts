import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'avatars.githubusercontent.com'],
    minimumCacheTTL: 86400, 
  },
  experimental: {
    scrollRestoration: true,
    // optimizeCss: true,
  },
  compress: true,
  productionBrowserSourceMaps: false,
}

export default nextConfig