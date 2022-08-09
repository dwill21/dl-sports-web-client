/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // TODO use real domain when running in production mode
    domains: ['localhost', 'img.youtube.com'],
  },
}

module.exports = nextConfig
