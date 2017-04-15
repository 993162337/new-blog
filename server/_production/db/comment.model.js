"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseAutoIncrement = require("mongoose-auto-increment");

var _mongooseAutoIncrement2 = _interopRequireDefault(_mongooseAutoIncrement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* @Author: woolson
* @Date:   2016-12-18 00:16:47
* @Email:   woolson.lee@gmail.com
* @Last Modified by:   woolson
* @Last Modified time: 2016-12-21 11:30:22
*/

var Comments = new _mongoose2.default.Schema({
  aid: Number,
  uid: Number,
  type: Number,
  reply_id: Number,
  comment_id: Number,
  message: String,
  create_date: {
    type: Date,
    default: Date.now
  }
});

Comments.plugin(_mongooseAutoIncrement2.default.plugin, "Comments");
_mongoose2.default.model("Comments", Comments, "comments");
//# sourceMappingURL=comment.model.js.map