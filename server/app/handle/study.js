/**
* @Author: woolson
* @Date:   2016-08-07 01:08:00
* @Email:  woolson.lee@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2016-11-13 16:11:93
*/

import mongoose from "mongoose"
import { jsonWrite } from "../global/utils"
import { articleDB } from "../db/mongodb"

const Article = articleDB()

export default {
    // fetch all article list
    fetchAllArticle(req, res) {
        Article.find({}, (err, docs) => {
            jsonWrite(res, err ? {succ: false} : {articles: docs})
        })
    },
}
