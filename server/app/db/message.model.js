/**
* @Author: woolson
* @Date:   2016-05-23 00-05-00
* @Email:  wuzeng.li@fugetech.com
* @Last modified by:   woolson
* @Last modified time: 2016-11-13 17:11:05
*/

import mongoose from "mongoose"

const Message = new mongoose.Schema({
    mid: Number,
    author: String,
    content: String,
    response: String,
    date: String,
})

mongoose.model("Message", Message, "messages")
