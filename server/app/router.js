/*
* @Author: wuzeng
* @Date:   2016-07-17 01:05:19
* @Last Modified by:   wuzeng
* @Last Modified time: 2016-08-05 23:32:08
*/

import handler from "./handler"

exports.construct = app => {
    app.get("/fetchAllArticle", (req, res) => {
        handler.fetchAllArticle(req, res)
    })

    app.get("/fetchAllMessage", (req, res) => {
        handler.fetchAllMessage(req, res)
    })

    app.post("/insertMessage", (req, res) => {
        handler.insertMessage(req, res)
    })

    app.get("/", (req, res) => {
        res.redirect("/index.html")
    })

    app.get("/login", (req, res) => {
        handler.fetchUserInfo(req, res)
    })
}
