import "./style"
import React from "react"
import ReactDOM from "react-dom"
import Search from "../_search"

let Tab = React.createClass({
  getInitialState() {
    return {
      index: 0
    }
  },

  onChange(e) {

    let root  = ReactDOM.findDOMNode(this.refs.filter)
    $(root).find("li").removeClass("active")
    $(e.target).closest("li").addClass("active")

    this.props.onChangeCB($(e.target).closest("li").index())
  },

  componentDidMount() {
    let currentHeight = $(window).height() - 148

    let Content = ReactDOM.findDOMNode(this.refs._tab)
    $(Content).css("minHeight", currentHeight + "px")
  },

  render() {
    let tabList = []
    let className

    this.props.tabList.map((item, key) => {
      className = key == this.state.index ? "active" : ""
      return tabList.push(
        <li key={key} className={ className } onClick={ this.onChange }>{ item }</li>
      )
    })

    return (
      <div className="_tab" ref="_tab">
        <ul ref="filter">{ tabList }</ul>
      </div>
    )
  }
})

export default Tab
