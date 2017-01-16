"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require("cookie-parser");

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* @Author: woolson
* @Date:   2016-12-20 16:17:25
* @Email:   woolson.lee@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2017-01-16 16:01:75
*/

var app = (0, _express2.default)();

exports.default = function () {
  app.use(_bodyParser2.default.urlencoded({ extended: false }));
  app.use(_bodyParser2.default.json());
  app.use((0, _cookieParser2.default)());
  app.disable("x-powered-by");

  app.listen(8081, function () {
    return console.log("Server start at port 8081 \n");
  });

  return app;
};
//# sourceMappingURL=sever.js.map