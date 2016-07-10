import "./style"
import React from "react"
import cx from "classnames"
import { urlWithParams } from "utils"

const Navs = [
  {text: "HOME", value: 0},
  {text: "STUDY", value: 1},
  {text: "WORDS", value: 2},
  {text: "LIFE", value: 3},
  {text: "ABOUT", value: 4}
]

export default React.createClass({
  getInitialState() {
    return {
      currentPage: this.getActivePosition(),
      // signed: {
      //   name: "woolson",
      //   url: require("../../assets/images/logo.png")
      // }
    }
  },

  componentDidMount() {
    let index = this.getActivePosition()
    $(this.refs.highLight).css({left: 100 * index})
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

  login() {
    let url = "https://api.weibo.com/oauth2/authorize"
    let params = {
      client_id: "529782172",
      response_type: "code",
      redirect_uri: "http://www.fingertip.tech/index.html"
    }

    window.location.href = urlWithParams(url, params)
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
          : <div className="_header-user">
              <span onClick={ this.login }>
                <i className="fa fa-sign-in u-mr5" />登录
              </span>
            </div>
      }
    </div>
  }
})
