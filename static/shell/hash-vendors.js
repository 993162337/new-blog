/**
* @Author: woolson
* @Date:   2016-11-12 00:11:00
* @Email:  woolson.lee@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2016-11-20 01:11:46
*/

var fs = require("fs")
var getHash = require("./node-utils").getHash

var types = [
  "js",
  "css",
]

var hashs = {}

types.forEach(function(type) {
    var path = "vendors.min." + type
    var hash = getHash("_dev/" + path).substring(0, 20)
    var hashPath = "vendors." + hash + ".min." + type

    // fs.renameSync("_dev/" + path, "_dev/" + hashPath)
    fs.renameSync("_mobile/" + path, "_mobile/" + hashPath)
    fs.renameSync("_production/" + path, "_production/" + hashPath)
    hashs["vendors" + type.toUpperCase()] = hash
})

var hashs = JSON.stringify(hashs)
var json = fs.readFileSync("shell/vendors-hash.json", "utf8")
fs.writeFileSync("shell/vendors-hash.json", hashs, "utf8")
