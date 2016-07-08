import "./app.styl"
import React from "react"
import ReactDOM from "react-dom"
import Header from "./_comp/_header"

import Home from "./home"
import Study from "./study"
import Life from "./life"
import Words from "./words"
import About from "./about"
import Page from "./page"

var Doc = React.createClass({
  getDefaultProps() {
    return {
      contentList: [
        Home,
        Study,
        Words,
        Life,
        About
      ],
      nameList: [
        "HOME",
        "STUDY",
        "WORDS",
        "LIFE",
        "ABOUT"
      ]
    }
  },

  getInitialState() {
    return {
      currentIndex: window.Page.currentPage
    }
  },

  ellipsis() {
    let node = ReactDOM.findDOMNode(this.refs.content)
    $(".study-content").ellipsis(20)
  },

  handleIndex(name) {
    document.title = "Coder - " + name
    let nextIndex
    this.props.nameList.map((item, index) => {
      if(item == name) nextIndex = index
    })
    this.setState({
      currentIndex: nextIndex
    })
  },

  componentDidMount() {
    document.title = "Coder - HOME"
  },

  render() {
    let Content = this.props.contentList[this.state.currentIndex]
    let current = <Content />

    return (
      <div className="content-body">
        <Header indexChange={ this.handleIndex } />
        <div className="content" ref="content">
          { current }
        </div>
        <foot className="foot">
          ® 2015 Woolson Inc. All right reserved.
        </foot>
      </div>
    )
  },

  render() {
    return <div>
      Hello world
    </div>
  }
});

ReactDOM.render(
  <Doc />,
    document.getElementById('container')
)
