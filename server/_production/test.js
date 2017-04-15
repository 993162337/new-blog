"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongodb = require("./db/mongodb");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* @Author: woolson
* @Date:   2016-11-13 12:11:00
* @Email:  woolson.lee@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2016-11-13 12:11:60
*/

var db = (0, _mongodb.articleDB)();

var Articles = _mongoose2.default.model("Articles");

Articles.find({}, function (err, docs) {
    if (err) {
        console.log("find option err:", err);
        return;
    }

    console.log("find some docs like:", docs);
});
//# sourceMappingURL=test.js.map