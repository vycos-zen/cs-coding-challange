/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/api/foods",
        destination: "http://127.0.0.1:5000/food",
        permanent: true,
      },
      {
        source: "/api/login",
        destination: "http://127.0.0.1:5000/login",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
