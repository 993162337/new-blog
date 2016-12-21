/*
* @Author: woolson
* @Date:   2016-12-18 00:13:48
* @Email:   woolson.lee@gmail.com
* @Last Modified by:   woolson
* @Last Modified time: 2016-12-21 21:42:53
*/

import handler from "../../handle/comment"

export default app => {
  // fetech comments by article id
  app.get("/fetchComments", (req, res) => {
    handler.fetchComments(req, res)
  })

  // update comment agree number
  app.get("/updateCommentAgree", (req, res) => {
    handler.updateCommentAgree(req, res)
  })

  // insert a comments
  app.post("/insertComment", (req, res) => {
    handler.insertComment(req, res)
  })

  // agree operation
  app.get("/addCommentAgree", (req, res) => {
    handler.insertAgree(req, res)
  })
}
