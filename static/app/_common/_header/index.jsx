/**
* @Author: woolson
* @Date:   2016-06-16 16:06:00
* @Email:  woolson.lee@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2016-11-20 02:11:66
*/

import "./style"
import React from "react"
import cx from "classnames"
import { urlWithParams, getStorage, deParams, isEmpty } from "utils"

const Navs = [
  {text: "HOME", value: 0},
  {text: "STUDY", value: 1},
  {text: "WORDS", value: 2},
  {text: "LIFE", value: 3},
  {text: "ABOUT", value: 4},
]

export default React.createClass({
  getInitialState() {
    return {
      currentPage: this.getActivePosition(),
    }
  },

  componentDidMount() {
    let index = this.getActivePosition()
    $(this.refs.highLight).css({left: 100 * index})
  },

  getActivePosition() {
    let index = 0
    Navs.forEach((o, i) => {
      if(location.hash.has(o.text.toLowerCase())) index = i
    })

    return index
  },

  handleChange(index) {
    $(this.refs.highLight).animate({left: 100 * index}, 200)
    localStorage.setItem("left", index)

    this.setState({currentPage: index})
    this.props.indexChange(Navs[index].text.toLowerCase())
  },

  renderNavs() {
    return Navs.map((item, index) => <li
        key={ index }
        className={ cx({active: item.value == this.state.currentPage}) }
        onClick={ this.handleChange.bind(null, index) }
      >
        { item.text }
      </li>)
  },

  render() {
    return <div className="_header">
      {
        Global.equiv == "mobile"
          ? <div
              className="_header__navs_mobile"
              onClick={ () => {
                const $nav = $(this.refs.nav)
                const option = $nav.is(":hidden") ? "slideDown" : "slideUp"
                $nav[option](300)
              } }
            >
              <i className="fa fa-bars" />
              <ul ref="nav" className="">
                { this.renderNavs() }
              </ul>
            </div>
          : <ul ref="root" className="_header__navs_pc">
              { this.renderNavs() }

              <li ref="highLight" />
            </ul>
      }

      <a
        className={ cx("_header-contact", {mobile: Global.equiv == "mobile"}) }
        href="https://github.com/993162337" target="_blank"
      >
        <i className="fa fa-github u-mr10" />
      </a>
    </div>
  },
})
