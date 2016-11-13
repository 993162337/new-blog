/**
* @Author: woolson
* @Date:   2016-11-13 16:11:00
* @Email:  woolson.lee@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2016-11-13 16:11:50
*/

import mongoose from "mongoose"
import config from "./config"

const db = mongoose.createConnection(config.uri)

db.on("error", err => {
    if(err) throw err
})

db.once("open", err => {
    console.info("Mongo db connected successfully")
})

module.exports = db
