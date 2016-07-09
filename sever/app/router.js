import { jsonWrite } from "./global/utils"

exports.construct = app => {
  app.get("/", (req, res) => {
    jsonWrite(res, {succ: "Hello world"})
  })

  app.get("/*", (req, res) => {
    res.redirect("/")
  })
}
