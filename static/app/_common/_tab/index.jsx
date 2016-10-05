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

  onChange(index, e) {
    $(this.refs.filter).find("li").removeClass("active")
    $(e.target).closest("li").addClass("active")

    this.props.onChangeCB(index)
  },

  render() {
    let tabList = []
    let className

    this.props.tabList.map((item, key) => {
      className = key == this.state.index ? "active" : ""
      return tabList.push(
        <li
          key={ key }
          className={ className }
          onClick={ this.onChange.bind(null, key) }
        >
          { item }
        </li>
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
