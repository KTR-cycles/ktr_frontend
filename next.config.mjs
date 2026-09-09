/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/productDetails/:id',
        destination: '/product/:id',
        permanent: true,
      },
      {
        source: '/productDetails',
        destination: '/products',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
