/**
* @Author: woolson
* @Date:   2016-08-19 19:08:00
* @Email:  woolson.lee@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2016-11-13 22:11:64
*/

var webpack = require("webpack")
var path = require("path")
var fs = require("fs")
var exec = require("child_process").exec
var vendors = require("./shell/vendors-hash.json")

var File = {
    copy: function(from, to) {
        var content = fs.readFileSync(from, "utf8")
        fs.writeFileSync(to, content, "utf8")
      },
    replace: function(hash) {
        var html = "_production/index.html"
        var content = fs.readFileSync(html, "utf8")

        content = content.replace(/\<hash\>/g, hash)
        content = content.replace(/\<hashJS\>/g, vendors.js)
        content = content.replace(/\<hashCSS\>/g, vendors.css)
        fs.writeFileSync(html, content, "utf8")
      },
    createCss: function(hash) {
        var cssFile = "_production/app." + hash + ".css"
        // create app css file
        fs.closeSync(fs.openSync(cssFile, "w"))

        // compile AllStyle.styl to app.css && delete AllStyle
        exec("stylus -I style -c AllStyle.styl -o " + cssFile, function(err, out) {
            if(err) throw "Compile AllStyle.css error!"
            else {
              fs.unlinkSync(path.resolve("AllStyle.styl"), function(err) {
                  if(err) throw "Remove AllStyle.css error!"
                })
            }
          })
      },
  }

module.exports = {
    entry: {
        app: path.join(__dirname, "./app/app.jsx"),
        init: "./global/init.js",
      },
    output: {
        path: path.join(__dirname, "./_production"),
        filename: "[name].[hash].js",
        chunkFilename: "[name].[chunkhash].js",
      },
    externals: {
        "react": "window.React",
        "react-dom": "window.ReactDOM",
        "moment": "window.moment",
      },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            __DEV__: false,
            __HOST__: JSON.stringify("http://www.woolson.cn"),
          }),
        function() {
            this.plugin("done", function(stats) {
                if(stats.toJson().errors.length === 0) {
                  var assets = stats.toJson()

                  File.createCss(assets.hash)
                  File.copy("html/index.html", "_production/index.html")
                  File.replace(assets.hash)
                }
              })
          },
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
            loader: "babel",
            exclude: /node_modules/,
            query: {
                cacheDirectory: true,
                presets: ["es2015", "stage-0", "react"],
              },
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
            loader: "collecter-loader",
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
