/*
* @Author: woolson
* @Date:   2016-12-21 21:50:24
* @Email:   woolson.lee@gmail.com
* @Last Modified by:   woolson
* @Last Modified time: 2016-12-21 21:53:13
*/

import mongoose from "mongoose"

const Agrees = new mongoose.Schema({
  comment_id: Number,
  agree: Number,
  uid: Number,
  create_date: {
    type: Date,
    default: Date.now,
  }
})

mongoose.model("Agrees", Agrees, "agrees")