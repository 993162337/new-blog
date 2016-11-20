/**
* @Author: woolson
* @Date:   2016-08-19 19:08:00
* @Email:  woolson.lee@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2016-11-20 15:11:56
*/

var webpack = require("webpack")
var path = require("path")
var fs = require("fs")
var stylus = require("stylus")
var assign = require("object-assign")
var execSync = require("child_process").execSync
var vendors = require("./shell/vendors-hash.json")
var Utils = require("./shell/node-utils")
var fileHash = assign({}, vendors)

var File = {
  replace: function(filePath) {
    var path = "_production/index.html"
    var content = fs.readFileSync(path, "utf8")
    var files = ["appJS", "initJS", "appCSS", "vendorsJS", "vendorsCSS", "mobileCSS"]

    // replace string
    files.forEach(function(item) {
      content = content.replace("<" + item + ">", fileHash[item])
    })

    fs.writeFileSync(path, content, "utf8")
  },
  createCss: function(path, name) {
    var file = name + ".css"
    execSync("touch " + file)

    // 全部组件样式
    stylus(fs.readFileSync(path, "utf8"))
      .set("paths", ["style"])
      .set("compress", true)
      .define("url", stylus.url())
      .render(function(err, css) {
        fs.writeFileSync(file, css, "utf8")

        // hash css file
        var cssHash = Utils.getHash(file)
        fileHash[name + "CSS"] = cssHash
        fs.writeFileSync("./shell/vendors-hash.json", JSON.stringify(fileHash), "utf8")
        execSync("mv " + file + " _production/" + name + "." + cssHash + ".min.css")
        execSync("rm " + name + ".styl")
      })
  }
}

module.exports = {
  entry: {
    app: path.join(__dirname, "./app/app.jsx"),
    init: "./global/init.js"
  },
  output: {
    path: path.join(__dirname, "./_production"),
    filename: "[name].[chunkhash].min.js",
    chunkFilename: "[name].[chunkhash].min.js"
  },
  externals: {
    "react": "window.React",
    "react-dom": "window.ReactDOM",
    "moment": "window.moment"
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      __DEV__: false,
      __HOST__: JSON.stringify("")
    }),
    function() {
      this.plugin("done", function(stats) {
        if (stats.toJson().errors.length === 0) {
          var assets = stats.toJson()
          var html = "_production/index.html"

          execSync("cp html/index.html _production/index.html")
          // save the app's & init's js hash
          assets.chunks.forEach(function(item) {
            if(item.entry) fileHash[item.names[0] + "JS"] = item.hash
          })

          var cssFile = ["app.styl", "style/mobile.styl"]
          var files = ["app", "mobile"]
          files.forEach(function(item, index) {
            File.createCss(cssFile[index], item)
          })
          File.replace()
        }
      })
    }
  ],
  resolve: {
    root: [
      path.resolve(__dirname),
      path.join(__dirname, "app"),
      path.join(__dirname, "app/_common")
    ],
    extensions: [
      "", ".jsx", ".js", ".styl", ".json"
    ],
    alias: {
      "utils": "global/utils"
    }
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: "babel",
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ["es2015", "stage-0", "react"]
        }
      },
      {
        test: /\.js$/,
        loader: "babel",
        query: {
          cacheDirectory: true,
          presets: ["react", "es2015", "stage-0"]
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.styl$/,
        loader: "collecter-loader",
        query: {
          file: "app",
        },
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: "url-loader?limit=10000&name=images/[path][name].[hash].[ext]"
      },
      {
        test: /\.(json)$/,
        loader: "json"
      }
    ]
  }
}
