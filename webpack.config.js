const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
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
              test: /\.(png|svg|jpg|gif|eot|woff|ttf)$/,
              use: 'file-loader'
          }
      ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html"
        })
    ],
    resolve: {
        extensions: ["*", ".js", ".jsx"],
        alias: {
          '@': path.resolve(__dirname, 'src')
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
