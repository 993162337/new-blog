/*
* @Author: woolson
* @Date:   2016-12-16 00:31:52
* @Email:   woolson.lee@gmail.com
* @Last Modified by:   woolson
* @Last Modified time: 2016-12-25 21:38:14
*/
import request from "request"
import { fetchUrlwithParams, getParamFromStr, jsonWrite, isEmpty } from "../../global/utils"
import { insertGithub, getLoginUser } from "../../handle/oauth"

export default app => {
  app.get("/oauth/github", (req, res) => {
    const param = {
      url: "https://github.com/login/oauth/access_token",
      client_id: "72e5cae736efb0366ffc",
      client_secret: "3a1efa6bdab27ec200828acacbe4ee83a6937026",
      code: req.query.code,
      // redirect_uri: "http://woolson.cn/oauth/github/accessed"
    }

    request(fetchUrlwithParams(param), (err, response, body) => {
      body = JSON.parse(body)
      if(body.access_token) {
        const param = {
          url: "https://api.github.com/user?access_token=" + body.access_token,
          headers: {
            "User-Agent": "woolson's website",
          }
        }
        request(param, (err, response, body) => {
          body = JSON.parse(body)
          if(!body.message) insertGithub(req, res, body)
          else res.redirect("/study")
        })
      }else res.redirect("/")
    })
  })
 
  app.get("/oauth/login", (req, res) => {
    const userID = req.cookies.user
    if(userID) getLoginUser(req, res)
    else jsonWrite(res)
  })
}