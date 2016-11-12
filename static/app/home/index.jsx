import "./style"
import React from "react"
import ReactDOM from "react-dom"

let Home = React.createClass({
  componentDidMount() {

  },

  getDefaultProps() {
    return {
    }
  },

  getInitialState() {
    return {
    }
  },

  render() {
    return (
      <div className="home-page">
        <img src={ require("../assets/images/bg2.jpg") } alt=""/>
      </div>
    )
  }
});

export default Home
