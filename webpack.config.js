const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { EsbuildPlugin } = require('esbuild-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader')


const isDev = process.env.mode === 'dev';

function resolve(...paths) {
  return path.resolve(__dirname, 'src', ...paths);
}

/**
 * @typedef { import('webpack-cli').WebpackConfiguration } Configuration
 * @type { Configuration }
 */
const config = {
  entry: resolve(isDev ? 'run-dev.ts' : 'index.ts'),
  output: {
    filename: isDev ? '[name].bundle.js' : 'main.js',
    path: resolve('..', 'dist'),
    clean: true,
  },
  mode: isDev ? 'development' : 'production',
  performance: {
    maxEntrypointSize: 5120000,
    maxAssetSize: 5120000,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      new EsbuildPlugin({
        target: 'es2015',
        css: true,
        format: 'iife',
      })
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.mjs', '.json', '.tsx'],
    alias: {
      '@': resolve(),
    },
  },
  devtool: isDev ? 'eval-source-map' : false,
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.vue$/,
        // exclude: /node_modules/,
        loader: 'vue-loader',
        options: {
          extractCSS: true,
          defineModel: true,
        }
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.mjs$/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'es2015',
          // jsxInject: `import { h, Fragment } from 'preact'`,
        }
      }
    ],
  },
  devServer: {
    host: '0.0.0.0',
    port: 8800,
    historyApiFallback: true,
    open: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('index.html'),
      title: 'Salary',
    }),
    isDev ? void 0 : new MiniCssExtractPlugin(),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
      __IS_DEV__: JSON.stringify(isDev),
    }),
  ].filter(Boolean),
}

module.exports = config;
