import mysql from "mysql"
import Map from "../db/mapping"
import Conf from "../db/config"
import { jsonWrite } from "../global/utils"

const pool = mysql.createPool(Conf)

const getAll = (res, type) => {
    pool.getConnection((err, con) => {
        con.query(Map[type], (err, result) => {
            jsonWrite(res, result)
            con.release()
        })
    })
}

export default {
    // fetch all article list
    fetchAllArticle(req, res) {
        getAll(res, "getAllArticle")
    },
    // fetch all message
    fetchAllMessage(req, res) {
        getAll(res, "getAllMessage")
    },
    // insert message
    insertMessage(req, res) {
        let data = req.body
        let params = [data.name, data.content, data.response]

        pool.getConnection((err, con) => {
            con.query(Map.insertMessage, params, (err, result) => {
                jsonWrite(res, result)
                con.release()
            })
        })
    }
}
