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
      tabList: [
        "All",
        "New",
        "ReactJS",
        "CSS",
        "Note",
        "Bug",
      ]
    }
  },

  getInitialState() {
    return {
      new: null,
      list: [],
      index: 0,
      artical: {
        title: "",
        content: "",
        time: "",
        mark: "",
      }
    }
  },

  updateData() {
    $.getJSON(this.props.url)
      .done(d => { 
        this.setState({
          list: d,
          index: 0,
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
        }, function() {
          setTimeout('$(".study-content").ellipsis(350)', 5)
        })
       })
      .fail((d, error) => { console.log(error.message) })
  },

  getContent(e) {
    let id = $(e.target).closest("div").attr("id")
    $.getJSON(this.props.url)
      .done(d => {
        d.map(item => {
          if(item.id == id) {
            this.setState({
              artical: item,
              index: 1,
            })
          }
        })
      })
  },

  pullBack() {
    let newList = []
    let node = ReactDOM.findDOMNode(this.refs.tabList)
    let text = $(node).find(".active").text() == "All" ? "" : $(node).find(".active").text()
    console.log(this.state.list)
    this.state.list.map(item => {
      if(item.mark.indexOf(text) !== -1) newList.push(item)
    })

    console.log(newList)
    this.setState({
      list: newList,
      index: 0
    })
    setTimeout('$(".study-content").ellipsis(350)', 5)
  },

  render() {
    let content = [
      <ArticalList list={ this.state.list } getContentCB={ this.getContent } />,
      <ArticalContent data={ this.state.artical } backCB={ this.pullBack } />
    ]

    return (
      <div className="study-list">
        <Tab tabList={ this.props.tabList } onChangeCB={ this.tabChanged } ref="tabList" />
        { content[this.state.index] }
      </div>
    )
  }
});

let ArticalList = React.createClass({
  render() {
    let articalList = []

    this.props.list.map((item, key) => {
      return articalList.push(
        <div className="study-item" id={ item.id } key={key} >
          <a onClick={ this.props.getContentCB }>{ item.title }</a><br />
          <span className="study-tag">{ item.mark }</span>
          <span className="study-time">{ item.time }</span>
          <p className="study-content">{ item.content }</p>
          <span className="study-more" onClick={ this.props.getContentCB }>more&gt;&gt;</span>
        </div>
      )
    })

    return (
      <div className="artical-list">
        { articalList }
      </div>
    )
  }
})

let ArticalContent = React.createClass({
  render() {
    return (
      <div className="artical">
        <p className="button"><a className="btn btn-default" type="button" onClick={ this.props.backCB } >&lt;-</a></p>
        <h2>{ this.props.data.title }</h2>
        <p className="artical-date">{ this.props.data.time }</p>
        <p className="artical-content">{ this.props.data.content }</p>
      </div>
    )
  }
})

export default Study