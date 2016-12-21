/**
* @Author: woolson
* @Date:   2016-09-19 11:09:00
* @Email:  woolson.lee@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2016-11-29 12:11:01
*/

import "./style"
import { Component } from "react"
import cx from "classnames"
import { _t } from "utils"

export default class Button extends Component {
  static defaultProps = {
    text: "确认",
    theme: "green",
    type: "primary",
  }

  onClick = evt => {
    this.props.onClick && this.props.onClick(evt)
  }

  render() {
    const P = this.props
    return <div
      className={ cx("_button", P.type, P.className, P.theme, {disabled: P.disabled}) }
      onClick={ this.onClick }
    >
      <span>{ _t(this.props.text) }</span>
    </div>
  }
}
