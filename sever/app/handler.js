import mysql from "mysql"
import mapping from "./db/mapping"
import config from "./db/config"
import { jsonWrite } from "./global/utils"

const pool = mysql.createPool(config)

export default {
  fetchAllArticle(req, res) {
    pool.getConnection((err, connection) => {
      connection.query(mapping.getAllArticle, (err, result) => {
        jsonWrite(res, result)
        connection.release()
      })
    })
  }
}
