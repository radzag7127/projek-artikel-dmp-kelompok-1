/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    appDir: true,
  },
  env: {
    GROQ_API_KEY: process.env.GROQ_API_KEY,
  },
};

module.exports = nextConfig;
