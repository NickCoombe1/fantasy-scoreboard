/** @type {import('next').NextConfig} */
export default {
  env: {
    VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
  },
  webpack: (config) => {
    // Add a rule to process markdown files
    config.module.rules.push({
      test: /\.md$/, // Target .md files
      use: "raw-loader", // Use the raw-loader to import Markdown as a string
    });

    return config;
  },
  async redirects() {
    return [
      {
        source: "/", // The path to match
        destination: "/welcome", // The path to redirect to
        permanent: true, // Set to true for a 308 permanent redirect
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/scoring/:path*", // Match all scoring-related routes
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, must-revalidate", // Prevent caching and force revalidation
          },
        ],
      },
    ];
  },
};
