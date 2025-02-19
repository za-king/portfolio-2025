/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "firebasestorage.googleapis.com"],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        destination: "https://zakingportfolio.my.id/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
