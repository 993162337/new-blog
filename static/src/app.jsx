import "./app.styl"
import React from "react"
import { render } from "react-dom"
import { Router, Route, IndexRoute, Redirect, browserHistory, withRouter } from "react-router"
import Header from "./_comp/_header"

import Home from "./home"
import Study from "./study"
import Life from "./life"
import Words from "./words"
import About from "./about"
import Page from "./page"

const App = withRouter(
  React.createClass({
    handleIndex(name) {
      this.props.router.push(name)
    },

    render() {
      return <div className="content-body">
        <Header indexChange={ this.handleIndex } />

        { this.props.children }

        <foot className="foot">
          ® 2015 Woolson Inc. All right reserved.
        </foot>
      </div>
    }
  })
)

render(
  <Router history={ browserHistory } >
    <Route path="/" component={ App }>
      <IndexRoute component={ Home } />
      <Route path="home" component={ Home } />
      <Route path="study" component={ Study } />
      <Route path="life" component={ Life } />
      <Route path="words" component={ Words } />
      <Route path="about" component={ About } />
    </Route>
  </Router>, document.getElementById('container'))
