/**
* @Author: woolson
* @Date:   2016-08-19 19:08:00
* @Email:  woolson.lee@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2016-11-13 17:11:93
*/

var webpack = require("webpack")
var path = require("path")

module.exports = {
    entry: {
        app: path.join(__dirname, "./app/app.jsx"),
        init: "./global/init.js",
    },
    output: {
        path: path.join(__dirname, "./_dev"),
        filename: "[name].js",
        chunkFilename: "[name].[chunkhash].js",
    },
    devServer: {
        contentBase: path.join(__dirname, "./_dev"),
        port: 8088,
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false,
        },
    },
    externals: {
        "react": "window.React",
        "react-dom": "window.ReactDOM",
        "moment": "window.moment",
    },
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.DefinePlugin({
        __DEV__: true,
        __HOST__: JSON.stringify("http://127.0.0.1:8081"),
    }),
    ],
    resolve: {
        root: [
          path.resolve(__dirname),
          path.join(__dirname, "app"),
          path.join(__dirname, "app/_common"),
        ],
        extensions: ["", ".jsx", ".js", ".styl", ".json"],
        alias: {
            "utils": "global/utils",
        },
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
            loader: "style-loader!css-loader!stylus-loader?paths[]=style",
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
