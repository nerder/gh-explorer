'use strict';

var path = require('path');
var webpack = require('webpack');
var extend = require('lodash/object/extend');
var base = require('./webpack.base');
var config = require('./config');
var paths = require('./paths');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackUtil = require('./webpack.util');

module.exports = extend({}, base, {

  entry: [
    'webpack/hot/dev-server',
    path.resolve(paths.SRC, 'app.js')
  ],

  devtool: config.devTool || 'source-map',

  devServer: {
    contentBase: paths.BUILD,
    hot: true,
    inline: true,
    port: config.port
  },

  plugins: base.plugins.concat([
    new HtmlWebpackPlugin(WebpackUtil.getHtmPluginConfig(config, false))
  ]),

  module: extend({}, base.module, {
    loaders: base.module.loaders.concat([
      // style!css loaders
      {
        test: /\.css?$/,
        include: [paths.SRC, paths.NODE_MODULES],
        loaders: ['style', 'css']
      },
      // SASS loaders
      {
        test: /\.scss?$/,
        include: [paths.SRC, paths.NODE_MODULES],
        loaders: ['style', 'css', 'resolve-url', 'sass?sourceMap']
      }
    ])
  })

});
