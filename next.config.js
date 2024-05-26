const webpack = require("webpack");
/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
const nextConfig = {
  i18n,
  webpack: (config) => {
       config.resolve.alias.canvas = false;
    
      return config;
    },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
