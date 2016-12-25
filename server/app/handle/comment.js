/*
* @Author: woolson
* @Date:   2016-12-18 00:15:45
* @Email:   woolson.lee@gmail.com
* @Last Modified by:   woolson
* @Last Modified time: 2016-12-21 22:55:29
*/

import mongoose from "mongoose"
import { jsonWrite } from "../global/utils"
import { commentsDB, usersDB, agreesDB } from "../db/mongodb"

const Users = usersDB()
const Agree = agreesDB()
const Comment = commentsDB()

const construct = function(data) {
  let list = [...data]
  if(!data.length) return []

  let result = list.filter(o => o.type == 0)

  result.forEach(item => {
    item.replies = data.filter(o => o.comment_id == item._id)
  })

  return result
}

const addUserAgree = (comments, users, agrees) => {
  comments.forEach(item => {
    const user = users.filter(o => item.uid == o.id)[0] || {}

    item.author_name = user.name
    item.html_url = user.html_url
    item.avatar_url = user.avatar_url
    item.agrees = agrees.filter(o => o.comment_id == item._id)

    if(item.reply_id) {
      const reply = users.filter(o => item.reply_id == o.id)[0] || {}
      item.reply_name = reply.name
      item.reply_url = reply.html_url
    }
  })

  return comments
}

export default {
  // fetch all message list
  fetchComments(req, res) {
    const id = req.query.aid

    if(id) {
      Comment.find({aid: id})
        .lean()
        .exec((err, docs) => docs)
        .then(data => {
          let uids = new Set()
          let cids = new Set()

          data.forEach(o => {
            cids.add(o._id)
            uids.add(o.uid)
          })

          Promise.all([
              Agree.find({comment_id: {$in: [...cids]}})
                .lean()
                .exec((err, docs) => docs)
              ,
              Users.find({id: {$in: [...uids]}})
                .lean()
                .exec((err, docs) => docs)
            ]).then(([agrees, users]) => {
              const comments = addUserAgree(data, users, agrees)
              jsonWrite(res, {succ: true, comments: construct(comments)})
            }).catch(err => jsonWrite(res))
        })
    }else {
      jsonWrite(res)
    }
  },

  // insert message
  insertComment(req, res) {
    const comment = new Comment(req.body)

    comment.save((err, docs) => {
      jsonWrite(res, {succ: err ? false : true})
    })
  },

  // insert agree
  insertAgree(req, res) {
    const agree = new Agree(req.body)

    agree.save((err, docs) => {
      jsonWrite(res, {succ: err ? false : true})
    })
  }
}