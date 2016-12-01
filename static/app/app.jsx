/**
* @Author: woolson
* @Date:   2016-06-16 16:06:00
* @Email:  woolson.lee@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2016-11-20 03:11:79
*/

import "./app.styl"
import React from "react"
import { render } from "react-dom"
import { Router, Route, IndexRoute, browserHistory, withRouter } from "react-router"
import cx from "classnames"

const Navs = [
  "HOME",
  "STUDY",
  "WORDS",
  "LIFE",
  "ABOUT",
]

const App = React.createClass({
  getInitialState() {
    let path = this.props.location.pathname
    let index = Navs.findIndex(item => path.has(item.toLowerCase()))
    if(index < 0) index = 0
    return {
      index: index,
    }
  },

  handleChange(index) {
    let name = Navs[index].toLowerCase()

    this.setState({index: index})
    if(name == "home") name = ""
    browserHistory.push(name)
  },

  renderNavs() {
    return Navs.map((item, index) => <li
        key={ index }
        className={ cx({active: this.props.location.pathname.has(item.toLowerCase())}) }
        onClick={ this.handleChange.bind(null, index) }
      >
        { item }
      </li>)
  },

  render() {
    return <div className="content-body">
      <div className="content-body__header">
        {
          Global.equiv == "mobile"
            ? <div
                className="content-body__header__navs_mobile"
                onClick={ () => {
                  const $nav = $(this.refs.nav)
                  const option = $nav.is(":hidden") ? "slideDown" : "slideUp"
                  $nav[option](300)
                } }
              >
                <i className="fa fa-bars" />

                <ul ref="nav" className="">
                  { this.renderNavs() }
                </ul>
              </div>
            : <ul ref="root" className="content-body__header__navs_pc">
                { this.renderNavs() }

                <li ref="highLight" style={{
                  transform: `translate(${100 * this.state.index}%)`,
                  transition: "all .4s",
                }} />
              </ul>
        }

        <a
          className={ cx("content-body__header_contact", {mobile: Global.equiv == "mobile"}) }
          href="https://github.com/993162337" target="_blank"
        >
          <i className="fa fa-github u-mr10" />
        </a>
      </div>

      { this.props.children }

      {
        Global.equiv == "pc" && <foot className="foot">
            ® 2015 Woolson Inc. All rights reserved.
          </foot>
      }
    </div>
  },
})

const RootRounter = <Router history={ browserHistory }>
    <Route path="/" component={ App }>
        <IndexRoute getComponent={ (location, callback) => {
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

render(RootRounter, document.getElementById("container"))
