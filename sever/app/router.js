import handler from "./handler"

exports.construct = app => {
  app.get("/fetchAllArticle", (req, res) => {
    handler.fetchAllArticle(req, res)
  })

  app.get("/", (req, res) => {
    res.redirect("/index.html")
  })
}
