"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _study = require("../../handle/study");

var _study2 = _interopRequireDefault(_study);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
    app.get("/", function (req, res) {
        res.redirect("/index.html");
    });

    app.get("/login", function (req, res) {
        _study2.default.fetchUserInfo(req, res);
    });
}; /**
   * @Author: woolson
   * @Date:   2016-08-07 01:08:00
   * @Email:  woolson.lee@gmail.com
   * @Last modified by:   woolson
   * @Last modified time: 2016-11-19 17:11:03
   */
//# sourceMappingURL=index.js.map