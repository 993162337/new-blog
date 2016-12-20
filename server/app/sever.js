import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import path from "path"

const app = express()

export default () => {
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(bodyParser.json())
  app.use(cookieParser())
  app.disable("x-powered-by")

  app.listen(8081, function() {
    console.log("Server start at port 8081 \n")
  })

  return app
}
