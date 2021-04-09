const { merge } = require('webpack-merge');
const webpack = require('webpack');
const common = require('./config');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      APP_EVN: JSON.stringify('pro'),
    }),
  ],
});
