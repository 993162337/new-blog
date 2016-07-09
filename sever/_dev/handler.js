"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mysql = require("mysql");

var _mysql2 = _interopRequireDefault(_mysql);

var _mapping = require("./db/mapping");

var _mapping2 = _interopRequireDefault(_mapping);

var _config = require("./db/config");

var _config2 = _interopRequireDefault(_config);

var _utils = require("./global/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pool = _mysql2.default.createPool(_config2.default);

exports.default = {
  fetchAllArticle: function fetchAllArticle(req, res) {
    pool.getConnection(function (err, connection) {
      connection.query(_mapping2.default.getAllArticle, function (err, result) {
        (0, _utils.jsonWrite)(res, result);
        connection.release();
      });
    });
  }
};
//# sourceMappingURL=handler.js.map