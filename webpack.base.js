'use strict';

var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var config = require('./config');
var paths = require('./paths');

var NODE_ENV = process.env.NODE_ENV || config.NODE_ENV || 'development';

var preLoaders = config.eslint ? [
  // linting with eslint
  {
    test: /\.jsx?$/, // test for both js and jsx
    loader: 'eslint',
    include: paths.SRC
  }
] : [];

module.exports = {

  resolve: {
    root: [paths.NODE_MODULES, paths.APP, paths.COMPONENTS, paths.ROUTES]
  },

  stats: {
    children: false
  },

  output: {
    path: paths.BUILD,
    filename: 'bundle.js'
  },

  plugins: [
    // Define free variables. Useful for having development builds with debug logging or adding global constants.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    })
  ],

  module: {
    preLoaders: preLoaders,
    loaders: [
      // babel transpiler
      {
        test: /\.jsx?$/, // test for both js and jsx
        loaders: ['babel?stage=0&loose'],
        include: [paths.SRC, /buildo-react-components/, /react-intl-hoc/]
      },
      // require .json
      {
        test: /\.json$/,
        loader: 'json'
      },
      // copy png images
      {
        test: /\.png$/,
        loader: 'file?name=[path][name].[ext]'
      }
    ]
  }
};
