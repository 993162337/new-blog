import React from "react"
import ReactDOM from "react-dom"

let Login = React.createClass({
  login() {
    console.log("submit")
    let nameNode = ReactDOM.findDOMNode(this.refs.name)
    let passNode = ReactDOM.findDOMNode(this.refs.password)
    let name = $(nameNode).val()
    let pass = $(passNode).val()

    let url = "src/account.json"
    $.getJSON(url)
      .done(s => {
        let lwz = 0
        s.map(item => {
          if(item.account == name) {
            lwz = 1
            if(item.password == pass) {
              window.Page.permission = item.permission
              this.props.loginCB(item.account)
              $("#login").modal("hide")
              $(nameNode).val("")
              $(passNode).val("")
              return
            }else{
              $(".content>span").text("Password error!").slideDown()
              let pass = $(passNode).val("")
              return
            }
          }
        })
        if(!lwz) {
          $(".content>span").text("Account does not exist!").slideDown()
          return
        }
      })
  },

  render() {
    return (
      <div id="login" className="modal fade login" style={{display: "none"}}>
        <div>
          <div className="title">
            <a className="close" data-dismiss="modal">×</a>
            <h2 id="modalTitle" onClick={ this.handleCancel }>Login</h2>
          </div>
          <div className="content">
            <span className="warning" style={{ display: "none"}}>Password error</span>
            <p className="control">
              <label htmlFor="name">Account</label>
              <input id="name" type="text" ref="name" className="form-control" />
              <span style={{display: "none"}}>required</span>
            </p>
            <p className="control">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" ref="password" className="form-control" />
              <span style={{display: "none"}}>required</span>
            </p>
          </div>
          <div className="forgot">
            <a onClick={ this.handleCancel }>forgot password</a>&nbsp;?&nbsp;
            <a href="#modal2">sign up</a>
          </div>
        </div>
        <div className="modal-footer">
          <a href="#" className="confirm" onClick={ this.login }>login</a>
          <a href="#" className="cancel" data-dismiss="modal" onClick={ this.handleCancel }>Close</a>
        </div>
      </div>
    )
  }
})

export default Login
