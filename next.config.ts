import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      // {
      //   protocol: 'http',
      //   hostname: 'localhost:8000',
      // },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        // port: '8000', // اگه روی پورت دیگه‌ای هستی اینو تغییر بده
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        // port: '8000', // اگه روی پورت دیگه‌ای هستی اینو تغییر بده
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
