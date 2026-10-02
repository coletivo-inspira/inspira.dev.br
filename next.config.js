// @ts-check

/** Project site on GitHub Pages (`/inspira.dev.br`). Empty for local `next dev`. */
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
