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

var getAll = function getAll(res, type) {
    pool.getConnection(function (err, con) {
        con.query(_mapping2.default[type], function (err, result) {
            (0, _utils.jsonWrite)(res, result);
            con.release();
        });
    });
};

exports.default = {
    // fetch all article list

    fetchAllArticle: function fetchAllArticle(req, res) {
        getAll(res, "getAllArticle");
    },

    // fetch all message
    fetchAllMessage: function fetchAllMessage(req, res) {
        getAll(res, "getAllMessage");
    },

    // insert message
    insertMessage: function insertMessage(req, res) {
        var data = req.body;
        var params = [data.name, data.content, data.response];

        pool.getConnection(function (err, con) {
            con.query(_mapping2.default.insertMessage, params, function (err, result) {
                (0, _utils.jsonWrite)(res, result);
                con.release();
            });
        });
    }
};
//# sourceMappingURL=handler.js.map