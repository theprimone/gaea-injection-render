const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');

const moduleName = "index";

const webpackConfig = {
  mode: "production",
  entry: "./src/index.ts",
  output: {
    filename: `${moduleName}.js`,
    library: moduleName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
      },
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        test: /\.(js|jsx)$/,
        options: {
          presets: ['@babel/react'],
          plugins: [
            ["@babel/plugin-proposal-decorators", { legacy: true }],
            ['@babel/plugin-proposal-class-properties'],
          ]
        },
      },
      {
        test: /\.(css|less)$/,
        include: /node_modules/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
        }, {
          loader: 'less-loader', // compiles Less to CSS
          options: { javascriptEnabled: true, sourceMap: true },
        }],
      },
      {
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
          options: {
            modules: {
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            },
          }
        }, {
          loader: 'less-loader', // compiles Less to CSS
          options: { javascriptEnabled: true, sourceMap: true },
        }],
      },
    ]
  },
  externals: [nodeExternals()],
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
};

module.exports = webpackConfig;
