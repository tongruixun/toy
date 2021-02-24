const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'js/main.js',
        path: path.resolve(__dirname, 'public')
    },
    module: {
      rules: [
          {
              test: /\.css$/i,
              use: ['style-loader', 'css-loader']
          },{
              test: /\.less$/i,
              exclude: /node_modules/,
              use: [
                  'style-loader',
                  {
                      loader: "css-loader",
                      options: {
                          modules: {
                              compileType: "module",
                              localIdentName: "[path][name]__[local]"
                          }
                      }
                  },{
                      loader: "less-loader",
                  }
              ]
          },{
              test: /(\.js?|\.jsx?)$/i,
              use: 'babel-loader',
              exclude: /node_modules/,
              // options: { presets: ["@babel/env"] }
          },{
              test: /\.(png|svg|jpg|gif)$/,
              loader:  'file-loader',
              options: {
                  name: 'img/[name].[ext]?[hash]'
              }
          },{
              test: /\.(eot|woff|ttf)$/,
              loader: 'file-loader',
              options: {
                  name: 'font/[name].[ext]?[hash]'
              }
          }
      ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "src/index.html"
        })
    ],
    resolve: {
        extensions: ["*", ".js", ".jsx"],
        alias: {
          '@': path.resolve(__dirname, 'src'),
          'styles' : path.join(__dirname, 'src/styles')
        },
        fallback: {
            fs: false
        }
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 9000
    },
    mode: "development"
}
