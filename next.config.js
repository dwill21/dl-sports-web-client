/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [process.env.APP_HOST, 'img.youtube.com'],
  },
}

module.exports = nextConfig
