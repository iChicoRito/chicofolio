/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    // Largest size is 2560, not the default 3840: the tallest case-study board (7200x31265)
    // resized to 3840 wide passes WebP's 16383px height limit, so the optimizer gave up
    // and sent the 26 MB original. 2560 covers the 1088px content column at 2x.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560],
    qualities: [75, 90],
    // Optimized copies are kept 31 days instead of 4 hours. Rename a file when replacing it.
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "opengraph.githubassets.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/template/dashboard",
        destination: "/template/dashboard/default",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
