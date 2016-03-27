var webpack = require("webpack")
var path = require("path")

module.exports = {
  entry: {
    app: path.join(__dirname, "./src/app.jsx"),
  },
  output: {
    path: path.join(__dirname, "./dev"),
    filename: "bundle.min.js",
    chunkFilename: "[id].[chunkhash].chunk.js",
  },
  devServer: {
    contentBase: path.join(__dirname, "./dev"),
    port: 4000,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      __DEV__: true,
      // __HOST__: JSON.stringify(""),
    }),
  ],
  resolve: {
    root: [
      __dirname,
      path.join(__dirname, "_common"),
      path.join(__dirname, "components"),
    ],
    extensions: ["", ".jsx", ".js", ".styl", ".json"],
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: "babel?cacheDirectory=true&presets[]=es2015&presets[]=stage-0&presets[]=react",
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loader: "babel",
        query: {
          cacheDirectory: true,
          presets: ["es2015", "stage-0"],
        },
        loader: "babel",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: "style!css",
      },
      {
        test: /\.styl$/,
        loader: "style!css!stylus",
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: "url?limit=10000&name=images/[path][name].[hash].[ext]",
      },
      {
        test: /\.(json)$/,
        loader: "json",
      },
    ],
  },
}
