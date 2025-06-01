import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Note: standalone mode disabled on Windows due to symlink permission issues
  // It will be enabled during Docker build on Linux
  output: process.env.DOCKER_BUILD === 'true' ? 'standalone' : undefined,
  async rewrites() {
    const apiUrl = process.env.API_URL || 'http://localhost:3000';
    return [
      {
        source: '/api/create/:path*',
        destination: `${apiUrl}/create/:path*`,
      },
      {
        source: '/api/health/:path*',
        destination: `${apiUrl}/health/:path*`,
      },
      {
        source: '/api/optimization-stats/:path*',
        destination: `${apiUrl}/optimization-stats/:path*`,
      },
      {
        source: '/api/clear-cache/:path*',
        destination: `${apiUrl}/clear-cache/:path*`,
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
