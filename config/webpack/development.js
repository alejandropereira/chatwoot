process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const isDevelopment = process.env.NODE_ENV !== 'production';
const path = require('path');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const environment = require('./environment');

environment.loaders.append('babel', {
  test: /\.(js|jsx)$/,
  loader: require.resolve('babel-loader'),
  include: path.resolve(__dirname, '../../app/javascript'),
  options: {
    cacheDirectory: true,
    plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(
      Boolean
    ),
  },
});

if (isDevelopment) {
  environment.plugins.append(
    'ReactRefreshWebpackPlugin',
    new ReactRefreshWebpackPlugin({
      overlay: false,
    })
  );
}

module.exports = environment.toWebpackConfig();
