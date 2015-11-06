import React from "react"
import ReactDOM from "react-dom"
import jquery from "./../../node_modules/jquery"

let HeaderTop = React.createClass({
  handleChange: function(e) {
    let node = ReactDOM.findDOMNode(this.refs.root)

    $(node).find("li").removeClass("active")
    $(e.target).closest("li").addClass("active")

    this.props.indexChange($(e.target).closest("li").attr("data"))
  },

  renderNavs: function(){
    let navs = [
      "HOME",
      "STUDY",
      "MESSAGE",
      "LIFE",
      "ABOUT"
    ]
    
    return navs.map((name, index) => {
      let className = index == 2 ? "active" : ""
      return (
        <li data={ index } className={ className } onClick={ this.handleChange }>
          <a href="javascript:;" >{ name }</a>
        </li>
      )
    })
  },

  render: function() {
    return (
      <div className="_header">
        <nav>
          <span>Blues LI</span>
          <ul ref="root">
            { this.renderNavs() }
          </ul>
        </nav>
      </div>
    )
  }
})

export default HeaderTop