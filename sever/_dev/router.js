"use strict";

var _utils = require("./global/utils");

exports.construct = function (app) {
  app.get("/", function (req, res) {
    (0, _utils.jsonWrite)(res, { succ: "Hello world" });
  });

  app.get("/*", function (req, res) {
    res.redirect("/");
  });
};
//# sourceMappingURL=router.js.map