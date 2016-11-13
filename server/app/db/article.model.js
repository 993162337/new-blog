/**
* @Author: woolson
* @Date:   2016-05-23 00-05-00
* @Email:  wuzeng.li@fugetech.com
* @Last modified by:   woolson
* @Last modified time: 2016-11-13 17:11:53
*/

import mongoose from "mongoose"

const ArticleSchema = new mongoose.Schema({
    aid: Number,
    title: String,
    content: String,
    author: String,
    tags: String,
    date: String,
    type: Number,
    html: Number,
})

mongoose.model("Articles", ArticleSchema, "articles")
