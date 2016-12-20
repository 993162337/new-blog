/**
* @Author: woolson
* @Date:   2016-08-07 01:08:00
* @Email:  woolson.lee@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2016-08-07 01:08:66
*/

import handler from "../../handle/study"

export default app => {
  app.get("/fetchAllArticle", (req, res) => {
      handler.fetchAllArticle(req, res)
  })
}
