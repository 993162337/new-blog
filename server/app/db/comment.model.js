/*
* @Author: woolson
* @Date:   2016-12-18 00:16:47
* @Email:   woolson.lee@gmail.com
* @Last Modified by:   woolson
* @Last Modified time: 2016-12-21 11:30:22
*/

import mongoose from "mongoose"
import idIncrement from "mongoose-auto-increment"

const Comments = new mongoose.Schema({
  aid: Number,
  uid: Number,
  type: Number,
  reply_id: Number,
  comment_id: Number,
  message: String,
  create_date: {
    type: Date,
    default: Date.now
  }
})

Comments.plugin(idIncrement.plugin, "Comments")
mongoose.model("Comments", Comments, "comments")