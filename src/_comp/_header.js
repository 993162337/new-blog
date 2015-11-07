import React from "react"
import ReactDOM from "react-dom"

import Search from "./_search"

let HeaderTop = React.createClass({
  getInitialState() {
    return {
      navs: [
        "HOME",
        "STUDY",
        "MESSAGE",
        "LIFE",
        "ABOUT",
      ]
    }
  },

  handleChange(e) {
    let node = ReactDOM.findDOMNode(this.refs.root)

    $(node).find("li").removeClass("active")
    $(e.target).closest("li").addClass("active")

    this.props.indexChange($(e.target).closest("li").attr("data"))
  },

  renderNavs(){
    return this.state.navs.map((name, index) => {
      let className = index == window.Page.currentPage ? "active" : ""
      return (
        <li key={index} data={ index } className={ className } onClick={ this.handleChange }>
          <a href="javascript:;" >{ name }</a>
        </li>
      )
    })
  },

  render() {
    return (
      <div className="_header">
        <nav>
          <span className="logo">Blues LI</span>
          <ul ref="root">
            { this.renderNavs() }
          </ul>
          <span className="search">
            <Search />
          </span>
        </nav>
      </div>
    )
  }
})

export default HeaderTop