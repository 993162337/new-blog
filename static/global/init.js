/**
* @Author: woolson
* @Date:   2016-07-09 23:07:00
* @Email:  woolson.lee@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2016-11-20 02:11:55
*/

import "./array"
import "./string"

window.Global = {}

if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    Global.equiv = "mobile"
}else {
    Global.equiv = "pc"
}
