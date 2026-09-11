/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: { unoptimized: true },
  allowedDevOrigins: ['192.168.18.57'],
};

module.exports = nextConfig;
