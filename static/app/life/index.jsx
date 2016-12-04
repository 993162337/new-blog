/**
* @Author: woolson
* @Date:   2016-06-16 16:06:00
* @Email:  woolson.lee@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2016-11-13 21:11:92
*/

import "./style"
import React, { Component } from "react"
import Tab from "_tab"

import Travel from "./component/travel"

export default class Life extends Component {
  state = {
    index: 0,
  }

  render() {
    return <div className="life-page">
      <Tab
        tabList={ ["Travel", "Share"] }
        onChange={ index => this.setState({index: index}) }
      />

      { !this.state.index && <Travel /> }
    </div>
  }
}
