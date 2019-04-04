// _dirname是node.js中的一个全局变量，它指向当前执行脚本所在目录
// path是node.js中提供的处理文件路径的小工具
"use strict"
const path = require('path');
const os = require('os');
const webpack = require('webpack');
const HappyPack = require('happypack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const BabelPolyfill = require('babel-polyfill');
const glob = require('glob');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

var happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
});

module.exports = {
  entry: {
    main: path.join(__dirname, 'src/index.js'),
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: '/',
    filename: 'js/[name]-[hash]' + '.js',
    chunkFilename: 'js/[name]-[hash]' + '.js',
  },
  devServer: {
    contentBase: false,
    clientLogLevel: 'warning',
    publicPath: '/',
    hot: true,
    progress: true,
    overlay: { warnings: false, errors: true },
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join('/', 'index.html') },
      ],
    },
    compress: true,
    inline: true,
    port: 8083,
    host: '127.0.0.1',
    watchOptions: {
      poll: false
    }
  },
  plugins: [
    new CleanWebpackPlugin('dist/*', {
      root: __dirname,
      verbose: true,
      dry: false
    }),

  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [{
          loader: 'babel-loader',
        }, {
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter'),
            emitWarning: false
          }
        }]
      },
      {
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        include: /src/,
        use: [
          {loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              minimize: process.env_NODE_ENV === 'production',
              importLoaders: 2,
              localIdentName: '[name]-[local]-[hash-base64:5]',
              modules: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                require('autoprefixer')(),
              ]
            }
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        include: /src/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: process.env.NODE_ENV === 'production',
                importLoaders: 2,
                localIdentName: '[name]-[local]-[hash:base64:5]',
                modules: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: (loader) => [
                  require('autoprefixer')(),
                ]
              }
            },
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true,
              }
            }
          ]
        })
      }
    ]
  }
};
