/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  // You can add image domains here if needed
  images: {
    domains: ['images.unsplash.com'],
  },
  // Internationalization settings
  i18n: {
    locales: ['el'],
    defaultLocale: 'el',
  },
  // Server settings
  experimental: {
    allowedDevOrigins: ['.replit.dev', '.repl.co', '.worf.replit.dev'],
  },
};

module.exports = nextConfig;