/**
* @Author: woolson
* @Date:   2016-11-13 12:11:00
* @Email:  woolson.lee@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2016-11-13 16:11:97
*/

import mongoose from "mongoose"
import db from "./db"
import idIncrement from "mongoose-auto-increment"

// add _id auto increment
idIncrement.initialize(db)

const usersDB = function() {
    require("./users.model.js")

    return db.model("Users")
}

const articleDB = function() {
    require("./article.model")

    return db.model("Articles",)
}

const messageDB = function() {
    require("./message.model")

    return db.model("Message")
}

const commentsDB = function() {
  require("./comment.model")

  return db.model("Comments")
}

exports.usersDB = usersDB
exports.articleDB = articleDB
exports.messageDB = messageDB
exports.commentsDB = commentsDB
