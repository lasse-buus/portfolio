// next.config.js
module.exports = {
  turbopack: {
    root: __dirname,
  },
  async rewrites() {
    return [
      {
        source: '/japan-2026',
        destination: '/japan-2026.html',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};
