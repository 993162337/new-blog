/**
* @Author: woolson
* @Date:   2016-11-26 17:11:00
* @Email:  woolson.lee@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2016-12-25 21:12:81
*/

var express = require("express")
var router = express.Router()
var fs = require("fs")
var path = require("path")
var showdown = require("showdown")
var converter = new showdown.Converter({
  tables: true,
  parseImgDimensions: true,
})

function formatHTML(title, content) {
  return `
      <div id="content">
        <a id="common-back">
          <i class="fa fa-arrow-circle-left"></i>
        </a>
        ${content}
      </div>
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
    html = converter.makeHtml(content)

    res.send(formatHTML(name, html))
    next()
  })

  app.get("/study/fetchArticle/:article_name", (req, res) => {
    res.end()
  })

  app.get("")
}
