"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Agrees = new _mongoose2.default.Schema({
  comment_id: Number,
  agree: Number,
  uid: Number,
  create_date: {
    type: Date,
    default: Date.now
  }
}); /*
    * @Author: woolson
    * @Date:   2016-12-21 21:50:24
    * @Email:   woolson.lee@gmail.com
    * @Last Modified by:   woolson
    * @Last Modified time: 2016-12-21 21:53:13
    */

_mongoose2.default.model("Agrees", Agrees, "agrees");
//# sourceMappingURL=agree.model.js.map