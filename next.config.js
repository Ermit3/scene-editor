/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PGDATABASE_URL: process.env.PGDATABASE_URL,
  },
  experimental: {
    enableUndici: true,
  },
};

module.exports = nextConfig;
