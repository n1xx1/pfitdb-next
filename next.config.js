const { withContentlayer } = require("next-contentlayer");

module.exports = withContentlayer({
  experimental: { appDir: true },
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
});
