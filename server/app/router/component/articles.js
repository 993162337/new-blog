/**
* @Author: woolson
* @Date:   2016-11-26 17:11:00
* @Email:  woolson.lee@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2016-11-30 00:11:24
*/

var express = require("express")
var router = express.Router()
var fs = require("fs")
var path = require("path")
var markdown = require("markdown-js")

function formatHTML(title, content) {
  return `
      <div id="content">
        <a id="common-back">
          <i class="fa fa-arrow-circle-left"></i>
        </a>
        ${content}
        <div id="disqus_thread"></div>
      </div>
      <script>
        (function() { // DON'T EDIT BELOW THIS LINE
          var d = document, s = d.createElement('script');
          s.src = '//woolsonlee.disqus.com/embed.js';
          s.setAttribute('data-timestamp', +new Date());
          (d.head || d.body).appendChild(s);
        })();
      </script>
      <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
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

  app.get("/study/fetchArticle/:article_name", (req, res) => {
    res.end()
  })

  app.get("")
}
