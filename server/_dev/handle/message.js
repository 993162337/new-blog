"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _utils = require("../global/utils");

var _mongodb = require("../db/mongodb");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Message = (0, _mongodb.messageDB)(); /**
                                         * @Author: woolson
                                         * @Date:   2016-11-13 12:11:00
                                         * @Email:  woolson.lee@gmail.com
                                         * @Last modified by:   woolson
                                         * @Last modified time: 2016-11-13 17:11:55
                                         */

exports.default = {
    // fetch all message list

    fetchAllMessage: function fetchAllMessage(req, res) {
        Message.find({}, function (err, docs) {
            (0, _utils.jsonWrite)(res, err ? { succ: false } : { messages: docs });
        });
    },

    // insert message
    insertMessage: function insertMessage(req, res) {
        var message = new Message(req.body);

        message.save(function (err, docs) {
            (0, _utils.jsonWrite)(res, { succ: err ? false : true });
        });
    }
};
//# sourceMappingURL=message.js.map