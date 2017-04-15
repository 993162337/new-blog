"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _comment = require("../../handle/comment");

var _comment2 = _interopRequireDefault(_comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  // fetech comments by article id
  app.get("/fetchComments", function (req, res) {
    _comment2.default.fetchComments(req, res);
  });

  // update comment agree number
  app.get("/updateCommentAgree", function (req, res) {
    _comment2.default.updateCommentAgree(req, res);
  });

  // insert a comments
  app.post("/insertComment", function (req, res) {
    _comment2.default.insertComment(req, res);
  });

  // agree operation
  app.post("/addCommentAgree", function (req, res) {
    _comment2.default.insertAgree(req, res);
  });
}; /*
   * @Author: woolson
   * @Date:   2016-12-18 00:13:48
   * @Email:   woolson.lee@gmail.com
   * @Last Modified by:   woolson
   * @Last Modified time: 2016-12-21 22:05:32
   */
//# sourceMappingURL=comments.js.map