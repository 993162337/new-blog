import "./app.styl"
import React from "react"
import { render } from "react-dom"
import { Router, Route, IndexRoute, Redirect, hashHistory, withRouter } from "react-router"
import Header from "./_common/_header"

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

const RootRounter = <Router history={ hashHistory }>
    <Redirect from="/" to="/home" />
    <Route path="/" component={ App }>
        <Route path="home" getComponent={ (location, callback) => {
            require.ensure([], (require) => {
              callback(null, require("./home").default)
            })
        } }/>
        <Route path="study" getComponent={ (location, callback) => {
              require.ensure([], (require) => {
                callback(null, require("./study").default)
              })
          } }/>
        <Route path="life" getComponent={ (location, callback) => {
              require.ensure([], (require) => {
                callback(null, require("./life").default)
              })
          } }/>
        <Route path="words" getComponent={ (location, callback) => {
              require.ensure([], (require) => {
                callback(null, require("./words").default)
              })
          } }/>
        <Route path="about" getComponent={ (location, callback) => {
              require.ensure([], (require) => {
                callback(null, require("./about").default)
              })
          } }/>
    </Route>
</Router>

render(RootRounter, document.getElementById('container'))
