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
    this.setState({index: index})
    this.props.onChange && this.props.onChange(index)
  },

  renderItems() {
    return this.props.tabList.map((item, index) => {
      const className = index == this.state.index ? "active" : ""
      return <li
        key={ index }
        className={ className }
        onClick={ this.onChange.bind(null, index) }
      >
        { item }
      </li>
    })
  },

  render() {
    return <ul className="_tab" ref="filter">
      { this.renderItems() }
    </ul>
  }
})

export default Tab
