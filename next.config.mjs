/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.devtool = "source-map"; // enables source maps for client-side code
    }

    return config;
  },
};

export default nextConfig;
