/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [process.env.IMAGES_DOMAIN, 'img.youtube.com'],
  },
}

module.exports = nextConfig
