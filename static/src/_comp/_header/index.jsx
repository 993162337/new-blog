import "./style"
import React from "react"
import ReactDOM from "react-dom"
// import Modal from "remodal"

import Login from "../_login"
import Signup from "../_signup"

let HeaderTop = React.createClass({
  getInitialState() {
    return {
      navs: [
        "WORDS",
        "STUDY",
        "HOME",
        "LIFE",
        "ABOUT",
      ],
      accountIndex: 0,
      accountName: "",
    }
  },

  handleChange(name, e) {
    let node = ReactDOM.findDOMNode(this.refs.root)
    let newNavs = this.state.navs

    let selected = $(e.target).closest("li").text()
    newNavs.map((item, index) => {
      if(item == selected) newNavs.splice(index, 1)
    })
    newNavs.splice(2, 0, selected)

    this.setState({
      navs: newNavs
    })

    this.props.indexChange(name)
  },

  renderNavs(){
    return this.state.navs.map((name, index) => {
      let className = index == 2 ? "active" : ""
      return (
        <li key={index} data={ index } className={ className } >
          <a href="javascript:;"  onClick={ this.handleChange.bind(null, name.toLowerCase()) }>{ name }</a>
        </li>
      )
    })
  },

  logout() {
    this.setState({
      accountIndex: 0,
      accountName: ""
    })
  },

  loginSuccess(name) {
    this.setState({
      accountName: name,
      accountIndex: 1,
    })
  },

  render() {
    let account = [
      <LoginSign />,
      <AccountName name={ this.state.accountName } logout={ this.logout }/>,
    ]

    return (
      <div className="_header">
        <nav>
          <ul ref="root" className="navs">
            { this.renderNavs() }
          </ul>
        </nav>
      </div>
    )
  }
})

let LoginSign = React.createClass({
  render() {
    return (
      <span className="account-group">
       <a data-toggle="modal" href="#login" >Log in</a>
       <a data-toggle="modal" href="#signup" >Sign up</a>
      </span>
    )
  }
})

let AccountName = React.createClass({
  componentDidMount() {
    $("[data-toggle='popover']").popover({
      trigger: "click",
      html: true,
    })
    $("#logout").on("click", function() {
      console.log("hahha")
      this.setState({
        accountIndex: 0,
        accountName: ""
      })
    })
  },

  render() {
    return (
      <span className="account-name">
        <div className="btn-group">
          <button
            className="btn dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
            { this.props.name }
            <span className="caret"></span>
          </button>
          <ul className="dropdown-menu">
            <li onClick={ this.props.logout }>Log out</li>
          </ul>
        </div>
        <img src="../../assets/images/logo.png" />
      </span>
    )
  }
})

export default HeaderTop
