/**
* @Author: woolson
* @Date:   2016-11-12 00:11:00
* @Email:  woolson.lee@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2016-11-12 23:11:15
*/

var crypto = require("crypto")
var fs = require("fs")

var types = [
  "js",
  "css",
]

var hashs = {}

types.forEach(function(type) {
    var path = "vendors.min." + type
    var hash = getHash("_dev/" + path).substring(0, 20)
    var hashPath = "vendors." + hash + "." + type

    // fs.renameSync("_dev/" + path, "_dev/" + hashPath)
    fs.renameSync("_production/" + path, "_production/" + hashPath)
    hashs[type] = hash
})

var hashs = JSON.stringify(hashs)
var json = fs.readFileSync("shell/vendors-hash.json", "utf8")
fs.writeFileSync("shell/vendors-hash.json", hashs, "utf8")

function getHash(p) {
    // p is path, t is file type
    var md5 = crypto.createHash("md5")
    var file = fs.readFileSync(p, "utf8")
    md5.update(file, "utf8")
    return md5.digest("hex")
}
