"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fetchUrlwithParams = exports.fetchRandomStr = exports.jsonWrite = exports.extend = undefined;
var _arguments = arguments;

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _request = require("request");

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 合并对象
var extend = exports.extend = function extend() {
    var result = {},
        args = _arguments;

    var _loop = function _loop(i) {
        var keys = Object.keys(_arguments[i]);
        keys.forEach(function (item) {
            result[item] = args[i][item];
        });
    };

    for (var i = 0; i < args.length; i++) {
        _loop(i);
    }

    return result;
};

// 构造返回的json数据
var jsonWrite = exports.jsonWrite = function jsonWrite(res, ret) {
    if (typeof ret === "undefined") {
        res.json({ succ: false, msg: "操作失败" });
    } else {
        ret.succ = true;
        ret.msg = "成功";
        res.json(ret);
    }
};

// 获取随机字符串
var fetchRandomStr = exports.fetchRandomStr = function fetchRandomStr(len) {
    if (!len) len = 32;
    var str = "00123456789abcdefghigklmnopqrstuvwxyzz",
        result = "";
    for (var i = 0; i < len; i++) {
        var item = str[+(Math.random() * 38).toFixed(0)];
        result += item ? item : "x";
    }
    return result;
};

// 拼接url
var fetchUrlwithParams = exports.fetchUrlwithParams = function fetchUrlwithParams(obj) {
    if (!obj.url) return console.err("constructParams needs obj.url is a string");
    var _url = obj.url;
    delete obj.url;

    var _keys = Object.keys(obj);
    _keys.forEach(function (item, index) {
        var _symbol = index ? "&" : "?";
        _url += "" + _symbol + item + "=" + obj[item];
    });

    return _url;
};
//# sourceMappingURL=utils.js.map