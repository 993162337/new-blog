import React from "react"
import ReactDOM from "react-dom"
import Header from "./_comp/_header.js"

import Home from "./home/home"
import Study from "./study/study"
import Life from "./life/life"
import Message from "./message/message"
import About from "./about/about"
import Page from "./page"

var Doc = React.createClass({
  getDefaultProps() {
    return {
      contentList: [
        Home,
        Study,
        Message,
        Life,
        About
      ],
      nameList: [
        "HOME",
        "STUDY",
        "MESSAGE",
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

  handleIndex(index) {
    document.title = "Coder - " + this.props.nameList[index]
    this.setState({
      currentIndex: index
    })
  },

  componentDidMount() {
    document.title = "Coder - " + this.props.nameList[this.state.currentIndex]
    let currentHeight = $(window).height() - 148

    let Content = ReactDOM.findDOMNode(this.refs.content)
    $(Content).css("minHeight", currentHeight + "px")
  },

  render() {
    let Content = this.props.contentList[this.state.currentIndex]
    let current = <Content />

    return (
      <div>
        <Header indexChange={ this.handleIndex } />
        <div className="content" ref="content">{ current }</div>
        <foot className="foot">® 2015-2015 Blues Inc.</foot>
      </div>
    ) 
  }
});

ReactDOM.render(
  <Doc />,
    document.getElementById('container')
)