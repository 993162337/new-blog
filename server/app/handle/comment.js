/*
* @Author: woolson
* @Date:   2016-12-18 00:15:45
* @Email:   woolson.lee@gmail.com
* @Last Modified by:   woolson
* @Last Modified time: 2016-12-21 18:41:28
*/

import mongoose from "mongoose"
import { jsonWrite } from "../global/utils"
import { commentsDB, usersDB } from "../db/mongodb"

const Users = usersDB()
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

const addUserInfo = (comments, users) => {
  comments.forEach(item => {
    const user = users.filter(o => item.uid == o.id)[0] || {}

    item.author_name = user.name
    item.html_url = user.html_url
    item.avatar_url = user.avatar_url

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
          data.forEach(o => uids.add(o.uid))

          Users.find({id: {$in: [...uids]}})
            .lean()
            .exec((err, docs) => {
              if(!err && docs) {
                const comments = addUserInfo(data, docs)
                jsonWrite(res, {succ: true, comments: construct(comments)})
              }else jsonWrite(res)
            })
        })
        // let comments = construct(docs)
        // jsonWrite(res, err ? {succ: false} : {comments: comments}))
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

  // TODO: agree
  // insertCommentAgree(req, res) {
  //   const cid = req.query.cid
  //   if(cid) {
  //     Comment.findByIdAndUpdate({_id: cid}, {$inc: {agree: 1}}, (err, counter) => {
  //       jsonWrite(res, {succ: err ? false : true})
  //     })
  //   }else {
  //     jsonWrite(res, {succ: false})
  //   }
  // }
}