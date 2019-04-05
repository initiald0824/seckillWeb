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
const BabelPolyfill = require('@babel/polyfill');
const glob = require('glob');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebPackPlugin = require('html-webpack-plugin');

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
    new CleanWebpackPlugin({
      root: __dirname,
      verbose: true,
      dry: false
    }),
    new ExtractTextWebpackPlugin({
      filename: 'css/[name]-[hash].css',
      allChunks: true
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: { safe: true, map: { inline: false } }
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      filename: 'index.html'
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './src/static'),
        to: 'static',
        ignore: ['.*']
      },
    ]),
    new HappyPack({
      id: 'happybabel',
      loaders: ['babel-loader'],
      threadPool: happyThreadPool,
      verbose: true
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [{
          loader: 'happypack/loader?id=happybabel',
        }, {
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
        // antd样式处理
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        include: /src/,
        use: [
          {loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              minimize: process.env_NODE_ENV === 'production'
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
          'less-loader'
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
      },
      {
        test: /\.css$/,
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
            }
          ]
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }]
      }
    ]
  },
  optimization: {
    runtimeChunk: {
      name: "mainfest"
    },
    splitChunks: {
      cacheGroups:  {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.join(__dirname, '/src'),
      '@components': path.join(__dirname, '/src/components')
    }
  }
};
