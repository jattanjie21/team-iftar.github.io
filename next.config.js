/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/index.html',
        destination: '/'
      },
      {
        source: '/about-us.html',
        destination: '/about-us'
      },
      {
        source: '/form-submitted.html',
        destination: '/form-submitted'
      }
    ];
  }
};

module.exports = nextConfig;
