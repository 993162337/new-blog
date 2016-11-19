"use strict";

var _sever = require("./sever");

var _sever2 = _interopRequireDefault(_sever);

var _router = require("./router/router");

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _sever2.default)();

(0, _router2.default)(app);
//# sourceMappingURL=app.js.map