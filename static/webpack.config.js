var webpack = require("webpack")
var path = require("path")

module.exports = {
  entry: {
    app: path.join(__dirname, "./app/app.jsx"),
    init: "./global/init.js",
    vendors: ["react", "react-dom", "moment", "react-router"]
  },
  output: {
    path: path.join(__dirname, "./dev"),
    filename: "[name].js",
    chunkFilename: "[name].[chunkhash].js",
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
      __HOST__: JSON.stringify("http://localhost:8081"),
    }),
  ],
  resolve: {
    root: [
      __dirname,
      path.join(__dirname, "_common"),
      path.join(__dirname, "components"),
    ],
    extensions: ["", ".jsx", ".js", ".styl", ".json"],
    alias: {
      "utils": "global/utils"
    }
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
          presets: ["react", "es2015", "stage-0"],
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
      },
      {
        test: /\.styl$/,
        loader: "style-loader!css-loader!stylus-loader",
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: "url-loader?limit=10000&name=images/[path][name].[hash].[ext]",
      },
      {
        test: /\.(json)$/,
        loader: "json",
      },
    ],
  },
}
