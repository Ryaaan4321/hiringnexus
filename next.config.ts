import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      { source: "/user/login", destination: "/login", permanent: true },
      { source: "/user/signup", destination: "/signup", permanent: true },
      { source: "/auth/admin/signin", destination: "/login", permanent: true },
      { source: "/auth/admin/signup", destination: "/signup", permanent: true },
      { source: "/auth", destination: "/signup", permanent: true },
    ];
  },
};

export default nextConfig;
