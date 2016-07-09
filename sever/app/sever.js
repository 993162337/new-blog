import express from "express"
import bodyParser from "body-parser"

const app = express()

export const createServer = () => {
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(bodyParser.json())

  app.listen(3000)

  return app
}
