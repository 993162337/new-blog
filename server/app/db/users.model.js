/*
* @Author: woolson
* @Date:   2016-12-16 11:34:41
* @Email:   woolson.lee@gmail.com
* @Last Modified by:   woolson
* @Last Modified time: 2016-12-19 18:17:24
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
    updated_at: String
})

mongoose.model("Users", Users, "users")
