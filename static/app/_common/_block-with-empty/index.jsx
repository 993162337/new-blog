/**
* @Author: woolson
* @Date:   2016-10-12 14:10:00
* @Email:  woolson.lee@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2016-11-13 17:11:63
*/

import "./style"
import React, { Component } from "react"
import cx from "classnames"
import { BlockLoading } from "_loading"

export default class Empty extends Component {
  render() {
    if(this.props.loading == true) return <BlockLoading />
    return <div className={ cx("_block-empty", this.props.className) }>
      {
        !this.props.empty
          ? this.props.children
          : <div className="_empty-tip">
            {
              this.props.text || <span>
                <i className="fa fa-exclamation-triangle u-mr10" />
                没东西
              </span>
            }
          </div>
      }
    </div>
  }
}
