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
};

module.exports = nextConfig;