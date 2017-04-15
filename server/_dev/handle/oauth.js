"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _mongodb = require("../db/mongodb");

var _utils = require("../global/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* @Author: woolson
* @Date:   2016-12-16 16:34:11
* @Email:   woolson.lee@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2017-01-06 22:01:45
*/

var User = (0, _mongodb.usersDB)();

exports.insertGithub = function (req, res, d) {
  var hashs = (0, _utils.getNameHash)(d.login);
  var data = {
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
  };

  User.find({ id: d.id }, function (err, docs) {
    var param = {
      domain: ".woolson.cn",
      maxAge: 5184000000,
      httpOnly: false,
      secure: false,
      path: "/"
    };

    if (docs && docs.length !== 0) {
      var user = new User(data);

      user.save(function (err, docs) {
        res.cookie("user", hashs.nameHash, param);
        res.redirect("/study");
      });
    } else {
      res.cookie("user", hashs.nameHash, param);
      res.redirect("/study");
    }
  });
};

exports.getLoginUser = function (req, res) {
  var userID = req.cookies["user"];

  User.find({ uid: userID }, function (err, docs) {
    (0, _utils.jsonWrite)(res, { succ: true, user: docs });
  });
};
//# sourceMappingURL=oauth.js.map