"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
* @Author: woolson
* @Date:   2016-11-26 17:11:00
* @Email:  woolson.lee@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2016-12-25 21:12:81
*/

var express = require("express");
var router = express.Router();
var fs = require("fs");
var path = require("path");
var showdown = require("showdown");
var converter = new showdown.Converter({
  tables: true,
  parseImgDimensions: true
});

function formatHTML(title, content) {
  return "\n      <div id=\"content\">\n        <a id=\"common-back\">\n          <i class=\"fa fa-arrow-circle-left\"></i>\n        </a>\n        " + content + "\n      </div>\n  ";
}

exports.default = function (app) {
  app.param("article_name", function (req, res, next, name) {
    var filePath = void 0,
        content = void 0,
        html = void 0;
    filePath = path.join(__dirname, "../../../", "/static/articles/" + name + ".md");
    try {
      content = fs.readFileSync(filePath, "utf8");
    } catch (e) {
      content = "Author had removed this article, Sorry!";
    }
    html = converter.makeHtml(content);

    res.send(formatHTML(name, html));
    next();
  });

  app.get("/study/fetchArticle/:article_name", function (req, res) {
    res.end();
  });

  app.get("");
};
//# sourceMappingURL=articles.js.map