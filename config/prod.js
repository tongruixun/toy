const { merge } = require('webpack-merge');
const common = require('./config');

module.exports = merge(common, {
    mode: 'production',
});