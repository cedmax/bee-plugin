/* eslint-disable */
var webpack = require('webpack')

module.exports = {
  entry: './src/bee.js',
  output: {
    path: './dist',
    filename: 'index.js',
    library: 'Bee',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader?presets[]=env'
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
  ]
}
