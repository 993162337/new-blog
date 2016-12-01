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
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <link rel="shortcut icon" href="http://www.woolson.cn/favicon.ico" type="image/x-icon">
      <meta charset="text/html; charset=UTF-8" http-equiv="content-type">
      <meta content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
      <meta content="telephone=no" name="format-detection">
      <meta content="address=no" name="format-detection">
      <title>${title}</title>
      <link rel="stylesheet" href="http://www.woolson.cn/assets/styles/md-themes/monokai.css">
      <link rel="stylesheet" href="https://dn-maxiang.qbox.me/res-min/themes/marxico.css">
      <link rel="stylesheet" href="http://www.woolson.cn/assets/styles/common-css.css">
      <script src="http://www.woolson.cn/assets/js/highlight.pack.js"></script>
      <script>hljs.initHighlightingOnLoad();</script>
    </head>
    <body>
      <div id="content">
        <a id="common-back">back</a>
        ${content}
        <div id="disqus_thread"></div>
      </div>
      <script src="http://www.woolson.cn/assets/js/common-js.js"></script>
      <script>
        (function() { // DON'T EDIT BELOW THIS LINE
          var d = document, s = d.createElement('script');
          s.src = '//woolsonlee.disqus.com/embed.js';
          s.setAttribute('data-timestamp', +new Date());
          (d.head || d.body).appendChild(s);
        })();
      </script>
      <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
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

  app.get("/study/:article_name", (req, res) => {
    res.end()
  })
}
