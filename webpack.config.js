// _dirname是node.js中的一个全局变量，它指向当前执行脚本所在目录
// path是node.js中提供的处理文件路径的小工具
const path = require('path');
const os = require('os');
const webpack = require('webpack');
const HappyPack = require('happypack');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    main: path.join(__dirname, 'src/index.js'),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },
  devServer: {
    contentBase: './dist'
  },
  modules: {
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
