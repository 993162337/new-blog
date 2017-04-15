"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _handler = require("../handler");

var _handler2 = _interopRequireDefault(_handler);

var _study = require("./component/study");

var _study2 = _interopRequireDefault(_study);

var _message = require("./component/message");

var _message2 = _interopRequireDefault(_message);

var _articles = require("./component/articles");

var _articles2 = _interopRequireDefault(_articles);

var _oauth = require("./component/oauth");

var _oauth2 = _interopRequireDefault(_oauth);

var _comments = require("./component/comments");

var _comments2 = _interopRequireDefault(_comments);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
    //study page routers and apis
    (0, _study2.default)(app);

    //articles router
    (0, _articles2.default)(app);

    //message page routers and apis
    (0, _message2.default)(app);

    //github auth route
    (0, _oauth2.default)(app);

    // comments routers
    (0, _comments2.default)(app);

    app.get('*', function (req, res) {
        console.log(req.originalUrl);

        res.sendFile(_path2.default.resolve(__dirname, "../../static/index.html"));
    });
}; /*
   * @Author: wuzeng
   * @Date:   2016-07-17 01:05:19
   * @Last modified by:   woolson
   * @Last modified time: 2017-01-10 12:01:70
   */
//# sourceMappingURL=router.js.map