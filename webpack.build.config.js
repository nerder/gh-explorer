'use strict';

var path = require('path');
var webpack = require('webpack');
var extend = require('lodash/object/extend');
var base = require('./webpack.base');
var config = require('./config');
var paths = require('./paths');
var CompressionPlugin = require('compression-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackUtil = require('./webpack.util');

var plugins = [
  // cause failed production builds to fail faster
  new webpack.NoErrorsPlugin(),
  new HtmlWebpackPlugin(WebpackUtil.getHtmPluginConfig(config, true)),
  new ExtractTextPlugin('style', '/style.[hash].min.css')
];

if (config.gzip) {
  plugins.unshift(new CompressionPlugin({
    regExp: /\.js$|\.css$/
  }));
}

if (config.uglify) {
  plugins.unshift(
    // Minimize all JavaScript output of chunks. Loaders are switched into minimizing mode.
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true
      },
    })
  );
}

module.exports = extend({}, base, {

  entry: path.resolve(paths.SRC, 'app.js'),

  devtool: 'source-map',

  plugins: plugins.concat(base.plugins),

  module: extend({}, base.module, {
    loaders: base.module.loaders.concat([
      {
        test: /\.css$/,
        include: [paths.SRC, paths.NODE_MODULES],
        loader: ExtractTextPlugin.extract('style', 'css')
      },
      // SASS
      {
        test: /\.scss$/,
        include: [paths.SRC, paths.NODE_MODULES],
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!resolve-url?sourceMap!sass?sourceMap')
      }
    ])
  })
});
