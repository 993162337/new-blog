"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _message = require("../../handle/message");

var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
    app.get("/fetchAllMessage", function (req, res) {
        _message2.default.fetchAllMessage(req, res);
    });

    app.post("/insertMessage", function (req, res) {
        _message2.default.insertMessage(req, res);
    });
}; /**
   * @Author: woolson
   * @Date:   2016-08-07 01:08:00
   * @Email:  woolson.lee@gmail.com
   * @Last modified by:   woolson
   * @Last modified time: 2016-11-13 13:11:69
   */
//# sourceMappingURL=message.js.map