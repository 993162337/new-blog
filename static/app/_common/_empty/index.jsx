/**
* @Author: woolson
* @Date:   2016-07-17 03:07:00
* @Email:  woolson.wz@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2016-07-17 03:07:99
*/

import "./style"
import React from "react"

export default ({text = "无数据"}) => <div className="_empty">
  <i className="fa fa-file" />
  <span>{ text }</span>
</div>
