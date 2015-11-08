import React from "react"
import ReactDOM from "react-dom"

import Search from "./_search"

let HeaderTop = React.createClass({
  getInitialState() {
    return {
      navs: [
        "WORDS",
        "STUDY",
        "HOME",
        "LIFE",
        "ABOUT",
      ]
    }
  },

  handleChange(e) {
    let node = ReactDOM.findDOMNode(this.refs.root)
    let newNavs = this.state.navs

    let selected = $(e.target).closest("li").text()
    newNavs.map((item, index) => {
      if(item == selected) newNavs.splice(index, 1)
    })
    newNavs.splice(2, 0, selected)

    this.setState({
      navs: newNavs
    })

    this.props.indexChange(selected)
  },

  renderNavs(){
    return this.state.navs.map((name, index) => {
      let className = index == 2 ? "active" : ""
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