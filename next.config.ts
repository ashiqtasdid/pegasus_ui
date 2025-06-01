import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/create/:path*',
        destination: process.env.API_URL + '/create/:path*',
      },
      {
        source: '/api/health/:path*',
        destination: process.env.API_URL + '/health/:path*',
      },
      {
        source: '/api/optimization-stats/:path*',
        destination: process.env.API_URL + '/optimization-stats/:path*',
      },
      {
        source: '/api/clear-cache/:path*',
        destination: process.env.API_URL + '/clear-cache/:path*',
      },
    ];
  },
  // Add this to help with development and handle long requests
  async headers() {
    return [
      {
        source: '/api/create/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
          {
            key: 'Connection',
            value: 'keep-alive',
          },
          {
            key: 'Keep-Alive',
            value: 'timeout=600, max=1000',
          },
        ],
      },
      {
        source: '/api/health/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
