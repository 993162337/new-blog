"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
* @Author: woolson
* @Date:   2016-11-26 17:11:00
* @Email:  woolson.lee@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2016-11-30 00:11:24
*/

var express = require("express");
var router = express.Router();
var fs = require("fs");
var path = require("path");
var markdown = require("markdown-js");

function formatHTML(title, content) {
  return "\n      <div id=\"content\">\n        <a id=\"common-back\">\n          <i class=\"fa fa-arrow-circle-left\"></i>\n        </a>\n        " + content + "\n        <div id=\"disqus_thread\"></div>\n      </div>\n      <script>\n        (function() { // DON'T EDIT BELOW THIS LINE\n          var d = document, s = d.createElement('script');\n          s.src = '//woolsonlee.disqus.com/embed.js';\n          s.setAttribute('data-timestamp', +new Date());\n          (d.head || d.body).appendChild(s);\n        })();\n      </script>\n      <noscript>Please enable JavaScript to view the <a href=\"https://disqus.com/?ref_noscript\">comments powered by Disqus.</a></noscript>\n  ";
}

exports.default = function (app) {
  app.param("article_name", function (req, res, next, name) {
    console.log(name);
    var filePath = void 0,
        content = void 0,
        html = void 0;
    filePath = path.join(__dirname, "../../../", "/static/articles/" + name + ".md");
    try {
      content = fs.readFileSync(filePath, "utf8");
    } catch (e) {
      content = "Author had removed this article, Sorry!";
    }
    html = markdown.makeHtml(content);

    res.send(formatHTML(name, html));
    next();
  });

  app.get("/study/fetchArticle/:article_name", function (req, res) {
    res.end();
  });
};
//# sourceMappingURL=articles.js.map