/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // This will generate static files instead of a standalone server
  images: {
    unoptimized: true, // Required when using output: 'export'
  },
  // Keep your other existing config options
}

module.exports = nextConfig 