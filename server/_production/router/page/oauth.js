"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /*
                                                                                                                                                                                                                                                  * @Author: woolson
                                                                                                                                                                                                                                                  * @Date:   2016-12-16 00:31:52
                                                                                                                                                                                                                                                  * @Email:   woolson.lee@gmail.com
                                                                                                                                                                                                                                                  * @Last Modified by:   woolson
                                                                                                                                                                                                                                                  * @Last Modified time: 2016-12-16 17:49:18
                                                                                                                                                                                                                                                  */


var _request = require("request");

var _request2 = _interopRequireDefault(_request);

var _utils = require("../../global/utils");

var _oauth = require("../../handle/oauth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
    app.get("/oauth/github", function (req, res) {
        var param = {
            url: "https://github.com/login/oauth/access_token",
            client_id: "72e5cae736efb0366ffc",
            client_secret: "3a1efa6bdab27ec200828acacbe4ee83a6937026",
            code: req.query.code,
            redirect_uri: "http://www.woolson.cn/oauth/github/accessed"
        };
        (0, _request2.default)((0, _utils.fetchUrlwithParams)(param), function (err, response, body) {
            body = (0, _utils.getParamFromStr)(body);
            var param = {
                url: "https://api.github.com/user?access_token=" + body.access_token,
                headers: {
                    "User-Agent": "woolson's website"
                }
            };
            (0, _request2.default)(param, function (err, response, body) {
                body = JSON.parse(body);
                console.log(body, typeof body === "undefined" ? "undefined" : _typeof(body));
                if (!body.message) (0, _oauth.insertGithub)(body);
                res.redirect("http://www.baidu.com/");
            });
        });
    });
};
//# sourceMappingURL=oauth.js.map