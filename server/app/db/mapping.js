/**
* @Author: woolson
* @Date:   2016-05-23 00-05-00
* @Email:  wuzeng.li@fugetech.com
* @Last modified by:   woolson
* @Last modified time: 2016-07-17 00:07:85
*/

export default {
    getAllArticle: "select * from article",
    getAllMessage: "select * from message",
    insertMessage: "insert into message(author, content, response) values(?, ?, ?)",
}
