"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _db = require("./db");

var _db2 = _interopRequireDefault(_db);

var _mongooseAutoIncrement = require("mongoose-auto-increment");

var _mongooseAutoIncrement2 = _interopRequireDefault(_mongooseAutoIncrement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// add _id auto increment
_mongooseAutoIncrement2.default.initialize(_db2.default); /**
                                                          * @Author: woolson
                                                          * @Date:   2016-11-13 12:11:00
                                                          * @Email:  woolson.lee@gmail.com
                                                          * @Last modified by:   woolson
                                                          * @Last modified time: 2016-11-13 16:11:97
                                                          */

var usersDB = function usersDB() {
    require("./users.model.js");

    return _db2.default.model("Users");
};

var articleDB = function articleDB() {
    require("./article.model");

    return _db2.default.model("Articles");
};

var messageDB = function messageDB() {
    require("./message.model");

    return _db2.default.model("Message");
};

var commentsDB = function commentsDB() {
    require("./comment.model");

    return _db2.default.model("Comments");
};

var agreesDB = function agreesDB() {
    require("./agree.model");

    return _db2.default.model("Agrees");
};

exports.usersDB = usersDB;
exports.agreesDB = agreesDB;
exports.articleDB = articleDB;
exports.messageDB = messageDB;
exports.commentsDB = commentsDB;
//# sourceMappingURL=mongodb.js.map