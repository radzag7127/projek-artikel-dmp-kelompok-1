/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  env: {
    GROQ_API_KEY: process.env.GROQ_API_KEY || "",
  },
};

module.exports = nextConfig;
