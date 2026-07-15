/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows images from any global external domain safely
      },
    ],
  },
  typescript:{
    ignoreBuildErrors: true
  }
};

module.exports = nextConfig;