"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _study = require("../../handle/study");

var _study2 = _interopRequireDefault(_study);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  app.get("/fetchAllArticle", function (req, res) {
    _study2.default.fetchAllArticle(req, res);
  });
}; /**
   * @Author: woolson
   * @Date:   2016-08-07 01:08:00
   * @Email:  woolson.lee@gmail.com
   * @Last modified by:   woolson
   * @Last modified time: 2016-08-07 01:08:66
   */
//# sourceMappingURL=study.js.map