/**
* @Author: woolson
* @Date:   2016-06-16 16:06:00
* @Email:  woolson.lee@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2016-11-13 21:11:46
*/

import "./style"
import React from "react"
import moment from "moment"
import Tab from "_tab"
import Empty from "_block-with-empty"
import { isEmpty } from "utils"

const TabList = [
  "All",
  "New",
  "React",
  "CSS",
  "Note",
  "Bug",
]
let ArticalData = null

export default React.createClass({
  getInitialState() {
    return {
        list: null,
        index: 0,
        tabIndex: 0,
      }
  },

  componentWillMount() {
    this.updateData()
  },

  updateData() {
    $.get(__HOST__ + "/fetchAllArticle")
      .then(d => this.setState({list: d.articles}))
  },

  filterList() {
    if(!this.state.list) return []
    let text = this.state.tabIndex
      ? TabList[this.state.tabIndex].toLowerCase()
      : ""
    let result = []

    this.state.list.forEach(item => {
        if (item.tags.has(text))
          result.push(item)
      })

    return result
  },

  redirect(page) {
    location.href = page
  },

  renderList() {
    return this.filterList().map(item => {
        return <div id={item.id}
          key={item.id}
          className="study-item"
          onClick={ this.redirect.bind(null, item.html || "./html/2016111001.html") }
        >
      <a>{item.title}</a>

      <div className="study-tag">
        <span>
          <i className="fa fa-bookmark-o u-mr10"/> {item.tags}
        </span>

        <span className="u-ml20">
          <i className="fa fa-calendar u-mr10"/> {moment(item.createTime).format("YYYY-MM-DD")}
        </span>
      </div>

      <p className="study-content">{item.content}</p>

      <span className="study-more">
        <i className="fa fa-angle-double-right u-mr5"/>
        more
      </span>
    </div>
      })
  },

  pullBack() {
    this.setState({index: 0})
  },

  render() {
    return <div className="study-list">
      <Tab
        ref="tabList"
        tabList={TabList}
        onChangeCB={ (index) => {
            this.setState({tabIndex: index})
          }}
      />

      <Empty
        loading={ this.state.list == null }
        empty={ isEmpty(this.filterList()) }
      >
        <div className="artical-list">
          { this.renderList() }
        </div>
      </Empty>
    </div>
  },
})
