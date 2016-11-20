/**
* @Author: woolson
* @Date:   2016-11-16 11:11:00
* @Email:  woolson.lee@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2016-11-20 14:11:03
*/

var crypto = require("crypto")
var fs = require("fs")
var fileHash = require("./vendors-hash.json")

module.exports = {
  getHash: function(filePath) {
    // p is path
    var md5 = crypto.createHash("md5")
    var file = fs.readFileSync(filePath, "utf8")
    md5.update(file, "utf8")
    return md5.digest("hex").substring(0, 20)
  },
  replace: function(filePath) {
    var content = fs.readFileSync(filePath, "utf8")
    var files = ["appJS", "initJS", "appCSS", "vendorsJS", "vendorsCSS", "mobileCSS"]

    // replace string
    files.forEach(function(item) {
      console.log(item, fileHash[item]);
      content = content.replace("<" + item + ">", fileHash[item])
    })

    fs.writeFileSync(filePath, content, "utf8")
  }
}
