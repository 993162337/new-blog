"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ArticleSchema = new _mongoose2.default.Schema({
    aid: Number,
    title: String,
    content: String,
    author: String,
    tags: String,
    date: String,
    type: Number,
    html: Number
}); /**
    * @Author: woolson
    * @Date:   2016-05-23 00-05-00
    * @Email:  wuzeng.li@fugetech.com
    * @Last modified by:   woolson
    * @Last modified time: 2016-11-13 17:11:53
    */

_mongoose2.default.model("Articles", ArticleSchema, "articles");
//# sourceMappingURL=article.model.js.map