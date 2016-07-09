"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createServer = undefined;

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var createServer = exports.createServer = function createServer() {
  app.use(_bodyParser2.default.urlencoded({ extended: false }));
  app.use(_bodyParser2.default.json());

  app.listen(8081);

  return app;
};
//# sourceMappingURL=sever.js.map