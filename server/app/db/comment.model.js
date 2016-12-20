/*
* @Author: woolson
* @Date:   2016-12-18 00:16:47
* @Email:   woolson.lee@gmail.com
* @Last Modified by:   woolson
* @Last Modified time: 2016-12-20 10:10:47
*/

import mongoose from "mongoose"
import idIncrement from "mongoose-auto-increment"

const Comments = new mongoose.Schema({
  aid: Number,
  type: Number,
  reply_id: Number,
  reply_name: String,
  comment_id: Number,
  author: String,
  message: String,
  create_date: {
    type: Date,
    default: Date.now
  }
})

Comments.plugin(idIncrement.plugin, "Comments")
mongoose.model("Comments", Comments, "comments")