"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.createServer=void 0;var _express=require("express"),_express2=_interopRequireDefault(_express),_bodyParser=require("body-parser"),_bodyParser2=_interopRequireDefault(_bodyParser),app=(0,_express2["default"])(),createServer=exports.createServer=function(){return app.use(_bodyParser2["default"].urlencoded({extended:!1})),app.use(_bodyParser2["default"].json()),app.listen(8081),app};