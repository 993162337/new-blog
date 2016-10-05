/*
* @Author: wuzeng
* @Date:   2016-07-17 01:05:19
* @Last modified by:   woolson
* @Last modified time: 2016-08-07 10:08:62
*/

import handler from "../handler"
import indexPage from "./page/index"
import studyPage from "./page/study"
import messagePage from "./page/message"

export default app => {
    // index page apis and basic routers
    indexPage(app)

    //study page routers and apis
    studyPage(app)

    //message page routers and apis
    messagePage(app)
}
