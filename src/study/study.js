import React from "react"
import ReactDOM from "react-dom"

import Tab from "./../_comp/_tab"

let Study = React.createClass({
  componentDidMount() {
    this.updateData()
    setTimeout('$(".study-content").ellipsis(350)', 5)
  },

  getDefaultProps() {
    return {
      url: "src/home/home-data.json",
    }
  },

  getInitialState() {
    return {
      new: null,
      list: [],
    }
  },

  updateData() {
    $.getJSON(this.props.url)
      .done(d => { 
        this.setState({
          list: d
        })
       })
      .fail(d => { console.log(d) })
  },

  tabChanged(text) {
    $.getJSON(this.props.url)
      .done(d => { 
        text = text == "All" ? "" : text
        let newList = []
        d.map(item => {
          if(item.mark.indexOf(text) !== -1) newList.push(item)
        })

        this.setState({
          list: newList
        })
       })
      .fail((d, error) => { console.log(error.message) })
  },

  render() {
    let articalList = []
    this.state.list.map((item, key) => {
      return articalList.push(
        <div className="study-item" key={key}>
          <a>{ item.title }</a><br />
          <span className="study-tag">{ item.mark }</span>
          <span className="study-time">{ item.time }</span>
          <p className="study-content">{ item.content }</p>
          <span className="study-more">more>></span>
        </div>
      )
    })
    return (
      <div className="study-list">
        <Tab onChangeCB={ this.tabChanged }/>
        { articalList }
      </div>
    )
  }
});

export default Study