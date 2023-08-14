// craco.config.js
const CracoEsbuildPlugin = require("craco-esbuild");

module.exports = {
  plugins: [
    {
      plugin: CracoEsbuildPlugin,
      options: {
        // includePaths: ['/external/dir/with/components'], // Optional. If you want to include components which are not in src folder
        esbuildLoaderOptions: {
          // Optional. Defaults to auto-detect loader.
          loader: "tsx", // Set the value to 'tsx' if you use typescript
          target: "es2015",
        },
        esbuildMinimizerOptions: {
          // Optional. Defaults to:
          target: "es2015",
          css: true, // if true, OptimizeCssAssetsWebpackPlugin will also be replaced by esbuild.
        },
        skipEsbuildJest: false, // Optional. Set to true if you want to use babel for jest tests,
        esbuildJestOptions: {
          loaders: {
            ".ts": "ts",
            ".tsx": "tsx",
          },
        },
      },
    },
  ],
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  webpack: {
    configure: (webpackConfig) => {
      if (process.env.NODE_ENV === "production") {
        // remove console in production
        const TerserPlugin = webpackConfig.optimization.minimizer.find(
          (i) => i.constructor.name === "TerserPlugin",
        );
        if (TerserPlugin?.options?.terserOptions?.compress) {
          TerserPlugin.options.terserOptions.compress.drop_console = true;
        }
        if (TerserPlugin?.options?.terserOptions?.drop_console) {
          TerserPlugin.options.terserOptions.drop_console = true;
        }
      }

      return webpackConfig;
    },
  },
};
