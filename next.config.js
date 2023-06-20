/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['uploadthing.com', 'lh3.googleusercontent.com'],
  },
  i18n: {
    locales: ["th", "en-US"],
    defaultLocale: "th"
  },
  experimental: {
    appDir: true
  }
}

module.exports = nextConfig
