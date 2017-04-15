"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Users = new _mongoose2.default.Schema({
    session_id: String,
    uid: String,
    id: Number,
    name: String,
    avatar_url: String,
    html_url: String,
    blog: String,
    location: String,
    email: String,
    created_at: String,
    updated_at: String
}); /*
    * @Author: woolson
    * @Date:   2016-12-16 11:34:41
    * @Email:   woolson.lee@gmail.com
    * @Last Modified by:   woolson
    * @Last Modified time: 2016-12-19 18:17:24
    */

_mongoose2.default.model("Users", Users, "users");
//# sourceMappingURL=users.model.js.map