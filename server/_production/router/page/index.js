"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _study = require("../../handle/study");

var _study2 = _interopRequireDefault(_study);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* @Author: woolson
* @Date:   2016-08-07 01:08:00
* @Email:  woolson.lee@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2016-11-19 17:11:03
*/

exports.default = function (app) {
  app.get('*', function (req, res) {
    res.sendFile(_path2.default.resolve(__dirname, "../../../static/", "index.html"));
  });
};
//# sourceMappingURL=index.js.map