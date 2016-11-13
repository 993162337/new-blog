/**
* @Author: woolson
* @Date:   2016-08-07 01:08:00
* @Email:  woolson.lee@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2016-11-13 13:11:69
*/

import handler from "../../handle/message"

export default app => {
    app.get("/fetchAllMessage", (req, res) => {
        handler.fetchAllMessage(req, res)
    })

    app.post("/insertMessage", (req, res) => {
        handler.insertMessage(req, res)
    })
}
