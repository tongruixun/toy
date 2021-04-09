const { merge } = require('webpack-merge');
const webpack = require('webpack');
const common = require('./config');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  // inline-source-map 有助于追踪错误和警告在源代码中的原始位置
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      APP_EVN: JSON.stringify('dev'),
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 9900
  },
});
