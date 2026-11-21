import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  // Brief, Section 6: 301 redirects for retired routes. (/institutions#briefing is forwarded client-side,
  // because URL fragments never reach the server.)
  async redirects() {
    return [
      { source: "/individuals", destination: "/private-investors", statusCode: 301 },
      { source: "/sign-up", destination: "/contact#waitlist", statusCode: 301 },
    ];
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
