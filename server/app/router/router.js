/*
* @Author: wuzeng
* @Date:   2016-07-17 01:05:19
* @Last modified by:   woolson
* @Last modified time: 2016-11-26 17:11:44
*/

import handler from "../handler"
import studyPage from "./page/study"
import messagePage from "./page/message"
import articles from "./page/articles"
import path from "path"

export default app => {
    //study page routers and apis
    studyPage(app)

    //articles router
    articles(app)

    //message page routers and apis
    messagePage(app)

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, "../../static/", "index.html"))
    })
}
