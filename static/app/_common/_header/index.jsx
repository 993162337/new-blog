/**
* @Author: woolson
* @Date:   2016-06-16 16:06:00
* @Email:  woolson.lee@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2016-11-11 23:11:16
*/

import "./style"
import React from "react"
import cx from "classnames"
import { urlWithParams, getStorage, deParams, isEmpty } from "utils"

const Navs = [
  {text: "HOME", value: 0},
  {text: "STUDY", value: 1},
  {text: "WORDS", value: 2},
  {text: "LIFE", value: 3},
  {text: "ABOUT", value: 4},
]

export default React.createClass({
    getInitialState() {
      let user = getStorage("user")
      return {
        currentPage: this.getActivePosition(),
        signed: user.get(),
      }
    },

    componentWillMount() {
      this.getCodeToken()
      this.getOpenId()
    },

    componentDidMount() {
      let index = this.getActivePosition()
      $(this.refs.highLight).css({left: 100 * index})
    },

    getCodeToken() {
      const params = deParams(location.href)

      if(isEmpty(params)) return

      const url = "https://graph.qq.com/oauth2.0/token"
      const param = {
        grant_type: "authorization_code",
        client_id: "1105474407",
        client_secret: "YXivByI9oor9uGFw",
        code: params.code,
        redirect_uri: "http://www.woolson.cn/index.html",
      }

      window.location.href = urlWithParams(url, param)
    },

    getOpenId() {
      const params = deParams(location.href)

      if(isEmpty(params)) return

      const url = "https://graph.qq.com/oauth2.0/me"
      const param = {
        access_token: params.access_token,
      }

      $.getJSON(url, param)
        .then(d => console.log(d))
    },

    login() {
      let url = "https://graph.qq.com/oauth2.0/authorize"
      let params = {
        client_id: "101336260",
        response_type: "code",
        redirect_uri: "http://www.woolson.cn/index.html",
      }

      window.location.href = urlWithParams(url, params)
    },

    getActivePosition() {
      let index = 0
      Navs.forEach((o, i) => {
        if(location.hash.has(o.text.toLowerCase())) index = i
      })

      return index
    },

  handleChange(index) {
    $(this.refs.highLight).animate({left: 100 * index}, 200)
    localStorage.setItem("left", index)

    this.setState({currentPage: index})
    this.props.indexChange(Navs[index].text.toLowerCase())
  },

  renderNavs() {
    return Navs.map((item, index) => <li
        key={ index }
        className={ cx({active: item.value == this.state.currentPage}) }
        onClick={ this.handleChange.bind(null, index) }
      >
        { item.text }
      </li>)
  },

  render() {
    return <div className="_header">
      <ul ref="root" className="navs">
        { this.renderNavs() }

        <li ref="highLight" />
      </ul>

      {
        this.state.signed
          ? <div className="_header-user">
              <span>{ this.state.signed.name }</span>
              <img src={ this.state.signed.url } />
            </div>
          : <div className="_header-login">
              <span onClick={ this.login }>
                <img src="http://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_1.png" alt=""/>
                QQ登录
              </span>
            </div>
      }
    </div>
  }
})
