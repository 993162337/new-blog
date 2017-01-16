/*
* @Author: woolson
* @Date:   2016-12-20 16:17:25
* @Email:   woolson.lee@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2017-01-16 16:01:75
*/

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

  app.listen(8081, () => console.log("Server start at port 8081 \n"))

  return app
}
