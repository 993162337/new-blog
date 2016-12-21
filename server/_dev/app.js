"use strict";

var _sever = require("./sever");

var _sever2 = _interopRequireDefault(_sever);

var _router = require("./router/router");

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* @Author: woolson
* @Date:   2016-12-21 12:11:14
* @Email:   woolson.lee@gmail.com
* @Last Modified by:   woolson
* @Last Modified time: 2016-12-21 12:11:22
*/

var app = (0, _sever2.default)();

(0, _router2.default)(app);
//# sourceMappingURL=app.js.map