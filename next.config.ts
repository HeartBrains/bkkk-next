import type { NextConfig } from 'next'

const isPages = process.env.PAGES_DEPLOY === '1'

const nextConfig: NextConfig = {
  // Static export for GitHub Pages; standalone for Docker VPS
  output: isPages ? 'export' : 'standalone',

  // GitHub Pages serves from /bkkk-next subpath
  basePath: isPages ? '/bkkk-next' : '',
  assetPrefix: isPages ? '/bkkk-next/' : '',

  images: {
    // Static export cannot use the /api/image proxy — serve WP images directly
    unoptimized: isPages,
    remotePatterns: isPages ? [{ protocol: 'https', hostname: '**' }] : [],
    localPatterns: isPages ? [] : [{ pathname: '/api/image', search: '**' }],
  },

  async headers() {
    if (isPages) return []
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
}

export default nextConfig
