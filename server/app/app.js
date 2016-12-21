/*
* @Author: woolson
* @Date:   2016-12-21 12:11:14
* @Email:   woolson.lee@gmail.com
* @Last Modified by:   woolson
* @Last Modified time: 2016-12-21 12:11:22
*/

import createServer from "./sever"
import router from "./router/router"

const app = createServer()

router(app)
