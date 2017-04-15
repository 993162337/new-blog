"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _utils = require("../global/utils");

var _mongodb = require("../db/mongodb");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /*
                                                                                                                                                                                                    * @Author: woolson
                                                                                                                                                                                                    * @Date:   2016-12-18 00:15:45
                                                                                                                                                                                                    * @Email:   woolson.lee@gmail.com
                                                                                                                                                                                                    * @Last Modified by:   woolson
                                                                                                                                                                                                    * @Last Modified time: 2016-12-21 22:55:29
                                                                                                                                                                                                    */

var Users = (0, _mongodb.usersDB)();
var Agree = (0, _mongodb.agreesDB)();
var Comment = (0, _mongodb.commentsDB)();

var construct = function construct(data) {
  var list = [].concat(_toConsumableArray(data));
  if (!data.length) return [];

  var result = list.filter(function (o) {
    return o.type == 0;
  });

  result.forEach(function (item) {
    item.replies = data.filter(function (o) {
      return o.comment_id == item._id;
    });
  });

  return result;
};

var addUserAgree = function addUserAgree(comments, users, agrees) {
  comments.forEach(function (item) {
    var user = users.filter(function (o) {
      return item.uid == o.id;
    })[0] || {};

    item.author_name = user.name;
    item.html_url = user.html_url;
    item.avatar_url = user.avatar_url;
    item.agrees = agrees.filter(function (o) {
      return o.comment_id == item._id;
    });

    if (item.reply_id) {
      var reply = users.filter(function (o) {
        return item.reply_id == o.id;
      })[0] || {};
      item.reply_name = reply.name;
      item.reply_url = reply.html_url;
    }
  });

  return comments;
};

exports.default = {
  // fetch all message list

  fetchComments: function fetchComments(req, res) {
    var id = req.query.aid;

    if (id) {
      Comment.find({ aid: id }).lean().exec(function (err, docs) {
        return docs;
      }).then(function (data) {
        var uids = new Set();
        var cids = new Set();

        data.forEach(function (o) {
          cids.add(o._id);
          uids.add(o.uid);
        });

        Promise.all([Agree.find({ comment_id: { $in: [].concat(_toConsumableArray(cids)) } }).lean().exec(function (err, docs) {
          return docs;
        }), Users.find({ id: { $in: [].concat(_toConsumableArray(uids)) } }).lean().exec(function (err, docs) {
          return docs;
        })]).then(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2);

          var agrees = _ref2[0];
          var users = _ref2[1];

          var comments = addUserAgree(data, users, agrees);
          (0, _utils.jsonWrite)(res, { succ: true, comments: construct(comments) });
        }).catch(function (err) {
          return (0, _utils.jsonWrite)(res);
        });
      });
    } else {
      (0, _utils.jsonWrite)(res);
    }
  },


  // insert message
  insertComment: function insertComment(req, res) {
    var comment = new Comment(req.body);

    comment.save(function (err, docs) {
      (0, _utils.jsonWrite)(res, { succ: err ? false : true });
    });
  },


  // insert agree
  insertAgree: function insertAgree(req, res) {
    var agree = new Agree(req.body);

    agree.save(function (err, docs) {
      (0, _utils.jsonWrite)(res, { succ: err ? false : true });
    });
  }
};
//# sourceMappingURL=comment.js.map