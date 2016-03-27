import "./style"
import React from "react"
import ReactDOM from "react-dom"

let Signup = React.createClass({
  signup() {
    console.log("haha")
    let nameNode = ReactDOM.findDOMNode(this.refs.name)
    let passNode = ReactDOM.findDOMNode(this.refs.password)
    let name = $(nameNode).val()
    let pass = $(passNode).val()

    let url = "../account.json"
    $.getJSON(url)
      .done(s => {
        s.map(item => {
          if(item.account == name) {
            if(item.pass == pass) {
              window.Page.permission = item.permission
              alert("Login success!")
              return
            }else{
              alert("Password error!")
              return
            }
          }
          alert("The account does not exist! Please try again!")
        })
      })
  },

  render() {
    return (
      <div id="signup" className="modal fade signup" style={{display: "none"}}>
        <div>
          <div className="title">
            <a className="close" data-dismiss="modal">×</a>
            <h2 id="modalTitle">Sign Up</h2>
          </div>
          <div className="content">
            <p className="control">
              <label htmlFor="sign-name">Account</label>
              <input id="sign-name" type="text" ref="name" className="form-control" />
              <span style={{display: "none"}}>required</span>
            </p>
            <p className="control">
              <label htmlFor="sign-password">Password</label>
              <input id="sign-password" type="text" ref="password" className="form-control" />
              <span style={{display: "none"}}>required</span>
            </p>
            <p className="control">
              <label htmlFor="sign-pass">Verify-pass</label>
              <input id="sign-pass" type="text" ref="password" className="form-control" />
              <span style={{display: "none"}}>required</span>
            </p>
          </div>
          <div className="forgot">
            <span>If you had got a id, please </span>
            <a href="#login" data-dismiss="modal">login</a>
          </div>
        </div>
        <div className="modal-footer">
          <a href="#" className="confirm" onClick={ this.signup }>Signup</a>
          <a href="#" className="cancel" data-dismiss="modal">Close</a>
        </div>
      </div>
    )
  },
})

export default Signup
