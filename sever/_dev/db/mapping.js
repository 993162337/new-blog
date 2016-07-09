'use strict';

/**
* @Author: woolson
* @Date:   2016-05-23 00-05-00
* @Email:  wuzeng.li@fugetech.com
* @Last modified by:   woolson
* @Last modified time: 2016-07-09 13:07:14
*/

exports.wx = {
    insertUser: 'update award_user set name=?, address=?, mobile=? where openid=?',
    insertOpen: 'insert into award_user(openid, award) values(?,?)',
    updateAward: 'update award set number=number-1 where id=?',
    queryByOpenId: 'select * from award_user where openid=?',
    queryAll: 'select * from award_user'
};
//# sourceMappingURL=mapping.js.map