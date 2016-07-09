var webpack = require("webpack")
var path = require("path")
var config = require("./webpack.config")

module.exports = {
  entry: config.entry,
  output: config.output,
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      __DEV__: true,
      // __HOST__: JSON.stringify(""),
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  resolve: config.resolve,
  module: config.module,
}
