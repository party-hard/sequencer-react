/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
'use strict';
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var packageJSON = require('./package.json');

module.exports = {

  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  cache: true,
  debug: true,
  devtool: 'cheap-module-sourcemap',
  devServer: {
    contentBase: 'dist/',
    port: 8000
  },

  entry: {
    main: [
        //'webpack/hot/only-dev-server',
//<<<<<<< HEAD
        './main.js'
//=======
//        './components/main.js'
//>>>>>>> 43b5d5472249b83b46b4f57c494e454cf66f4304
    ],
    vendor: Object.keys(
        packageJSON.dependencies
    ).filter(function (dep) { return dep !== 'lodash'; })
  },

  stats: {
    colors: true,
    reasons: true
  },

  context: path.resolve(__dirname, 'src'),
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'actions': __dirname + '/src/actions',
      'components': __dirname + '/src/components',
      'containers': __dirname + '/src/containers',
      'mixins': __dirname + '/src/mixins',
      'reducers': __dirname + '/src/reducers',
      'sounds': __dirname + '/src/sounds',
      'styles': __dirname + '/src/styles'
    }
  },

  module: {
    preLoaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    }],
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'react-hot!babel-loader',
      exclude: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'src', 'worker')
      ]
    }, {
      loader: 'file-loader?name=[path][name].[ext]',
      include: [
        path.resolve(__dirname, 'src', 'worker'),
        path.resolve(__dirname, 'src', 'fonts'),
        path.resolve(__dirname, 'src', 'sounds')
      ]
    }, {
      test: /\.styl/,
      loader: 'style-loader!css-loader!stylus-loader'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(png|jpg|svg)$/,
      loader: 'url-loader?limit=8192',
      exclude: path.resolve(__dirname, 'src', 'fonts')
    }]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html')
    })
  ]

};
