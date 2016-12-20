/*
* @Author: woolson
* @Date:   2016-12-18 00:15:45
* @Email:   woolson.lee@gmail.com
* @Last Modified by:   woolson
* @Last Modified time: 2016-12-20 11:34:24
*/

import mongoose from "mongoose"
import { jsonWrite } from "../global/utils"
import { commentsDB } from "../db/mongodb"

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

export default {
  // fetch all message list
  fetchComments(req, res) {
    const id = req.query.aid
    if(id) {
      Comment.find({aid: id}).lean().exec((err, docs) => {
        let comments = construct(docs)
        jsonWrite(res, err ? {succ: false} : {comments: comments})
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