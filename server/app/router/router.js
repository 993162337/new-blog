/*
* @Author: wuzeng
* @Date:   2016-07-17 01:05:19
* @Last modified by:   woolson
* @Last modified time: 2016-11-26 17:11:44
*/

import handler from "../handler"
import studyPage from "./component/study"
import messagePage from "./component/message"
import articles from "./component/articles"
import githubAuth from "./component/oauth"
import comments from "./component/comments"
import path from "path"

export default app => {
    //study page routers and apis
    studyPage(app)

    //articles router
    articles(app)

    //message page routers and apis
    messagePage(app)

    //github auth route
    githubAuth(app)

    // comments routers
    comments(app)

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, "../../static/index.html"))
    })
}
