import "./style"
import React from "react"
import moment from "moment"
import Tab from "_tab"
import Empty from "_empty"
import { isEmpty } from "utils"

const TabList = ["All", "New", "React", "CSS", "Note", "Bug"]
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
      .then(d => ArticalData = d)
      .then(this.constructData)
  },

  constructData() {
    let text = this.state.tabIndex ? TabList[this.state.tabIndex].toLowerCase() : ""
    let result = []

    ArticalData.forEach(item => {
      if(item.tags.has(text)) result.push(item)
    })

    this.setState({list: result})
  },

  redirect(page) {
    location.href = page
  },

  renderList() {
    if(isEmpty(this.state.list)) {
      return <Empty />
    }

    return this.state.list.map(item => {
      return <div
        id={ item.id }
        key={ item.id }
        className="study-item"
        onClick={ this.redirect.bind(null, "./html/2016111001.html") }
      >
        <a>{ item.title }</a>

        <div className="study-tag">
          <span>
            <i className="fa fa-bookmark-o u-mr10" />
            { item.tags }
          </span>

          <span className="u-ml20">
            <i className="fa fa-calendar u-mr10" />
            { moment(item.createTime).format("YYYY-MM-DD") }
          </span>
        </div>

        <p className="study-content">{ item.content }</p>

        <span className="study-more">
          <i className="fa fa-angle-double-right u-mr5" />
          more
        </span>
      </div>
    })
  },

  pullBack() {
      this.setState({ index: 0 })
  },

  render() {
    if(this.state.index) {
      return <ArticalContent backCB={ this.pullBack } />
    }else {
      return <div className="study-list">
        <Tab
          ref="tabList"
          tabList={ TabList }
          onChangeCB={ (index) => {
            this.setState({tabIndex: index}, this.constructData)
          } }
        />

        <div className="artical-list">
          { this.renderList() }
        </div>
      </div>
    }
  },
})

const ArticalContent = React.createClass({
  render() {
    return <div className="artical">
      <h2>{ this.props.data.title }</h2>
      <p className="artical-date">{ this.props.data.time }</p>
      <p className="artical-content">{ this.props.data.content }</p>
      <p className="button"><a className="btn btn-default" type="button" onClick={ this.props.backCB } >&lt;-</a></p>
    </div>
  },
})
