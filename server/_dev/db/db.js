"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* @Author: woolson
* @Date:   2016-11-13 16:11:00
* @Email:  woolson.lee@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2016-11-13 16:11:50
*/

var db = _mongoose2.default.createConnection(_config2.default.uri);

db.on("error", function (err) {
  if (err) throw err;
});

db.once("open", function (err) {
  console.info("Mongo db connected successfully");
});

module.exports = db;
//# sourceMappingURL=db.js.map