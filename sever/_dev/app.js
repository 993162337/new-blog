"use strict";

var _sever = require("./sever");

var _router = require("./router");

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _sever.createServer)();

_router2.default.construct(app);
//# sourceMappingURL=app.js.map