import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // domains: ['static2.finnhub.io', 'data.bloomberglp.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.cnbcfm.com',
      },
      {
        protocol: 'https',
        hostname: 'static2.finnhub.io',
      },
      {
        protocol: 'https',
        hostname: 'data.bloomberglp.com',
      },
    ],
  },
  output: 'standalone',
};

export default nextConfig;
