const { withContentlayer } = require("next-contentlayer2");

module.exports = withContentlayer({
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            dimensions: false,
          },
        },
      ],
    });
    return config;
  },
});
