"use strict";

var _handler = require("./handler");

var _handler2 = _interopRequireDefault(_handler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.construct = function (app) {
    app.get("/fetchAllArticle", function (req, res) {
        _handler2.default.fetchAllArticle(req, res);
    });

    app.get("/fetchAllMessage", function (req, res) {
        _handler2.default.fetchAllMessage(req, res);
    });

    app.post("/insertMessage", function (req, res) {
        _handler2.default.insertMessage(req, res);
    });

    app.get("/", function (req, res) {
        res.redirect("/index.html");
    });

    app.get("/login", function (req, res) {
        _handler2.default.fetchUserInfo(req, res);
    });
};
//# sourceMappingURL=router.js.map