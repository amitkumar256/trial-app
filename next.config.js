module.exports = {
  webpack: (config, { isServer }) => {
    // Exclude canvas package from being processed by webpack
    if (!isServer) {
      config.module.rules.push({
        test: /node_modules\/canvas\//,
        loader: 'null-loader',
      });
    }

    return config;
  },
  env: {
    LD_LIBRARY_PATH: `${process.env.PWD}/node_modules/canvas/build/Release:${
      process.env.LD_LIBRARY_PATH || ''
    }`,
  },
  reactStrictMode: true,
};
