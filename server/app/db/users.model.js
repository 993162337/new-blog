/*
* @Author: woolson
* @Date:   2016-12-16 11:34:41
* @Email:   woolson.lee@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2017-01-16 16:01:65
*/

import mongoose from "mongoose"

const Users = new mongoose.Schema({
    session_id: String,
    uid: String,
    id: Number,
    name: String,
    avatar_url: String,
    html_url: String,
    blog: String,
    location: String,
    email: String,
    created_at: String,
    updated_at: String,
    last_login_at: {
      type: Date,
      default: Date.now
    }
})

mongoose.model("Users", Users, "users")
