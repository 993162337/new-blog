"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Message = new _mongoose2.default.Schema({
    mid: Number,
    author: String,
    content: String,
    response: String,
    date: String
}); /**
    * @Author: woolson
    * @Date:   2016-05-23 00-05-00
    * @Email:  wuzeng.li@fugetech.com
    * @Last modified by:   woolson
    * @Last modified time: 2016-11-13 17:11:05
    */

_mongoose2.default.model("Message", Message, "messages");
//# sourceMappingURL=message.model.js.map