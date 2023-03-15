/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL || "http://localhost",
    PORT: process.env.PORT || 3000,
  },
};

module.exports = nextConfig;
