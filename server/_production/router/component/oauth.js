"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
      code: req.query.code
    };

    var data = {
      url: (0, _utils.fetchUrlwithParams)(param),
      headers: {
        Accept: "application/json"
      }
    };

    (0, _request2.default)(data, function (err, response, body) {
      body = JSON.parse(body);
      if (body.access_token) {
        var _param = {
          url: "https://api.github.com/user?access_token=" + body.access_token,
          headers: {
            Accept: "application/json",
            "User-Agent": "woolson's website"
          }
        };

        (0, _request2.default)(_param, function (err, response, body) {
          body = JSON.parse(body);

          if (!body.message) (0, _oauth.insertGithub)(req, res, body);else res.redirect("/study");
        });
      } else res.redirect("/");
    });
  });

  app.get("/oauth/login", function (req, res) {
    var userID = req.cookies.user;
    if (userID) (0, _oauth.getLoginUser)(req, res);else (0, _utils.jsonWrite)(res);
  });
}; /*
   * @Author: woolson
   * @Date:   2016-12-16 00:31:52
   * @Email:   woolson.lee@gmail.com
   * @Last modified by:   woolson
   * @Last modified time: 2017-01-16 16:01:52
   */
//# sourceMappingURL=oauth.js.map