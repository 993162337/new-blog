/**
* @Author: woolson
* @Date:   2016-09-20 18:09:00
* @Email:  woolson.lee@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2016-11-28 17:11:22
*/

import "./style"
import React, { Component, PropTypes } from "react"
import { unmountComponentAtNode } from "react-dom"
import cx from "classnames"
import Button from "_button"

export default class Modal extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    immediatelyShow: PropTypes.bool,
    removeOnCancel: PropTypes.bool,
    type: PropTypes.string,
  }

  static defaultProps = {
    title: "TITLE",
    type: "query",
    immediatelyShow: true,
  }

  componentDidMount() {
    let previousZIndex = $(".global-overlay").last().css("zIndex")
    if(!previousZIndex || isNaN(previousZIndex)) previousZIndex = 2000

    this.$root = $(this.refs.root)
    this.$root.css("zIndex", parseInt(previousZIndex) + 1)
    if(this.props.immediatelyShow) this.$root.visible()
  }

  renderButtons() {
    switch (this.props.type) {
      case "custom":
        return this.props.buttons
      case "alert":
        return <Button
          text="确认"
          type="primary"
          theme="yellow"
          onClick={ this.ok.bind(this) }
        />
      case "query":
      default:
        return [
          <Button
            key="1"
            text="确认"
            type="primary"
            theme="yellow"
            onClick={ this.ok.bind(this) }
          />,
          <Button
            key="2"
            text="取消"
            type="hollow"
            theme="yellow"
            className="u-ml30"
            onClick={ this.cancel.bind(this) }
          />,
        ]
    }
  }

  ok() {
    this.props.okBtnCB && this.props.okBtnCB(this)
  }

  show() {
    this.$root.visible()
  }

  hide() {
    this.$root.invisible()
  }

  remove() {
    const types = ["alert", "query"]
    if(types.has(this.props.type)) {
      const $root = this.$root.parent()
      $root.remove()
    }else this.$root.remove()
  }

  cancel() {
    if(this.props.removeOnCancel) this.remove()
    else this.hide()
  }

  render() {
    return <div
      ref="root"
      className="global-overlay"
    >
      <div className={ cx("_modal", this.props.className) }>
        <div className="_modal__title">
          <h1>{ this.props.title }</h1>

          <i
            className="fa fa-close"
            onClick={ this.cancel.bind(this) }
          />
        </div>

        <div className="_modal__content">
          {
            this.props.text
            ? this.props.text
            : this.props.children
          }
        </div>

        <div className="_modal__buttons">
          { this.renderButtons() }
        </div>
      </div>
    </div>
  }
}
