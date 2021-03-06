/*
* @Author: woolson
* @Date:   2016-12-16 16:34:11
* @Email:   woolson.lee@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2017-01-16 16:01:76
*/

import mongoose from "mongoose"
import path from "path"
import { usersDB } from "../db/mongodb"
import { getNameHash, jsonWrite } from "../global/utils"

const User = usersDB()

exports.insertGithub = (req, res, d) => {
  const hashs = getNameHash(d.login)
  const data = {
    session_id: hashs.sessionHash,
    uid: hashs.nameHash,
    id: d.id,
    name: d.login || "",
    avatar_url: d.avatar_url || "",
    html_url: d.html_url || "",
    blog: d.blog || "",
    location: d.location || "",
    email: d.email || "",
    created_at: d.created_at || "",
    updated_at: d.updated_at || ""
  }

  User.find({id: d.id}, (err, docs) => {
    const param = {
      domain: ".woolson.cn",
      maxAge: 5184000000,
      httpOnly: false,
      secure: false,
      path: "/",
    }

    if(docs && docs.length == 0) {
      const user = new User(data)

      user.save((err, docs) => {
        res.cookie("user", hashs.nameHash, param)
        res.redirect("/study")
      })
    }else {
      res.cookie("user", hashs.nameHash, param)
      res.redirect("/study")
    }
  })
}

exports.getLoginUser = (req, res) => {
  const userID = req.cookies["user"]

  User.find({uid: userID}, (err, docs) => {
    jsonWrite(res, {succ: true, user: docs})
  })
}
