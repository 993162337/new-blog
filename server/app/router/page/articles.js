/**
* @Author: woolson
* @Date:   2016-11-26 17:11:00
* @Email:  woolson.lee@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2016-11-27 21:11:34
*/

var express = require("express")
var router = express.Router()
var fs = require("fs")
var path = require("path")
var markdown = require("markdown-js")

function formatHTML(title, content) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${title}</title>
      <link rel="stylesheet" href="http://www.woolson.cn/assets/styles/md-themes/monokai.css">
      <link rel="stylesheet" href="https://dn-maxiang.qbox.me/res-min/themes/marxico.css">
      <link rel="stylesheet" href="http://www.woolson.cn/assets/styles/common-css.css">
      <script src="http://www.woolson.cn/assets/js/common-js.js"></script>
      <script src="http://www.woolson.cn/assets/js/highlight.pack.js"></script>
      <script>hljs.initHighlightingOnLoad();</script>
    </head>
    <body>
      <div id="content">
        <a id="common-back">back</a>
        ${content}
      </div>
    </body>
    </html>
  `
}

export default app => {
  app.param("article_name", (req, res, next, name) => {
    let filePath, content, html
    filePath = path.join(__dirname, "../../../", `/static/articles/${name}.md`)
    try {
      content = fs.readFileSync(filePath, "utf8")
    } catch (e) {
      content = "Author had removed this article, Sorry!"
    }
    html = markdown.makeHtml(content)

    res.send(formatHTML(name, html))
    next()
  })

  app.get("/articles/:article_name", (req, res) => {
    res.end()
  })
}
