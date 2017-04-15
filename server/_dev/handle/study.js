"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _utils = require("../global/utils");

var _mongodb = require("../db/mongodb");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Article = (0, _mongodb.articleDB)(); /**
                                         * @Author: woolson
                                         * @Date:   2016-08-07 01:08:00
                                         * @Email:  woolson.lee@gmail.com
                                         * @Last modified by:   woolson
                                         * @Last modified time: 2016-11-28 23:11:79
                                         */

exports.default = {
  // fetch all article list

  fetchAllArticle: function fetchAllArticle(req, res) {
    Article.find({}, function (err, docs) {
      (0, _utils.jsonWrite)(res, err ? { succ: false } : { articles: docs });
    });
  }
};
//# sourceMappingURL=study.js.map