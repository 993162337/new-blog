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

  getIndex() {
    const path = this.props.location.pathname
    let navIndex = Navs.findIndex(o => path.has(o.toLowerCase()))
    if(path == "/") navIndex = 0
    if(path.has("article")) navIndex = 1

      console.log(path, navIndex)
    return navIndex
  },

  handleChange(index) {
    let name = Navs[index].toLowerCase()

    this.setState({index: index})
    if(name == "home") name = ""
    browserHistory.push(name)
  },

  renderNavs() {
    return Navs.map((item, index) => {
      return <li
        key={ index }
        className={ cx({active: index == this.getIndex()}) }
        onClick={ this.handleChange.bind(null, index) }
      >
        { item }
      </li>})
  },

  render() {
    return <div className="app">
      <div className="app-navs">
        <div
          className="content-navs_mobile"
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

        <div className="content-navs_pc">
          <div className="content-navs_pc_info">
            <img 
              className="u-mb20"
              src={ require("./assets/images/logo.png") }
            />

            <a
              className={ cx("content-body__header_contact", {mobile: Global.equiv == "mobile"}) }
              href="https://github.com/993162337" target="_blank"
            >
              <i className="fa fa-github" />
            </a>
          </div>

          <ul ref="root" className="content-navs_pc_nav">
            <li
              className="highLight"
              ref="highLight"
              style={{
                transform: `translate(0, ${65 * this.getIndex()}px)`,
                transition: "all .4s",
              }} />
            { this.renderNavs() }
          </ul>

          <foot className="content-navs_pc_copyright">
            ® 2015 woolson Inc. All rights reserved.
          </foot>
        </div>
      </div>

      <div
        className="app-content"
        style={{
          backgroundImage: `url(${require("./assets/images/hi.svg")})`
        }}
      >
        <div className="app-content__container">
          { this.props.children }
        </div>

        <div className="app-content__info">

        </div>
      </div>
    </div>
  },
})

const RootRounter = <Router history={ browserHistory }>
    <Route path="/" component={ App }>
        <IndexRoute getComponent={ (location, callback) => {
            require.ensure([], require => {
                callback(null, require("./home").default)
              })
          } }/>

        <Route path="study" getComponent={ (location, callback) => {
            require.ensure([], require => {
                callback(null, require("./study").default)
              })
          } }/>

        <Route path="article" getComponent={ (location, callback) => {
            require.ensure([], require => {
              callback(null, require("./study/component/article").default)
            })
          } }/>

        <Route path="life" getComponent={ (location, callback) => {
            require.ensure([], require => {
                callback(null, require("./life").default)
              })
          } }/>

        <Route path="words" getComponent={ (location, callback) => {
            require.ensure([], require => {
                callback(null, require("./words").default)
              })
          } }/>

        <Route path="about" getComponent={ (location, callback) => {
            require.ensure([], require => {
                callback(null, require("./about").default)
              })
          } }/>
    </Route>
</Router>

render(RootRounter, document.getElementById("container"))
