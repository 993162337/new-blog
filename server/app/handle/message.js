/**
* @Author: woolson
* @Date:   2016-11-13 12:11:00
* @Email:  woolson.lee@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2016-11-13 17:11:55
*/

import mongoose from "mongoose"
import { jsonWrite } from "../global/utils"
import { messageDB } from "../db/mongodb"

const Message = messageDB()

export default {
    // fetch all message list
    fetchAllMessage(req, res) {
        Message.find({}, (err, docs) => {
            jsonWrite(res, err ? {succ: false} : {messages: docs})
        })
    },
    // insert message
    insertMessage(req, res) {
        const message = new Message(req.body)

        message.save((err, docs) => {
            jsonWrite(res, {succ: err ? false : true})
        })
    },
}
