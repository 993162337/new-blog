import React from "react"
import ReactDOM from "react-dom"
import moment from "./../../node_modules/moment"

let dataBase

let Message = React.createClass({
  getInitialState() {
    return {
      messageList: []
    }
  },

  submiteAll() {
    let getName = ReactDOM.findDOMNode(this.refs.name).value
    let getMessage = ReactDOM.findDOMNode(this.refs.message).value
    let getTime = moment().format("YYYY年MM月DD日HH点mm分ss秒")
    
    if(getName == "" || getMessage == "") return

    ReactDOM.findDOMNode(this.refs.name).value = ""
    ReactDOM.findDOMNode(this.refs.message).value = ""

    let node = {}
    // let x = []
    node = {
      name: getName,
      message: getMessage,
      time: getTime,
    }

    dataBase.transaction(tx => {
      tx.executeSql("INSERT INTO MessageList VALUES(?,?,?)", [getName, getMessage, getTime], (tx, ts) => {
        this.renderData()
      }, (tx, error) => {
        alert(error.source + "::" + error.message)
      })
    })
  },

  renderData() {
    let list = []
    dataBase = openDatabase("message", "1.0", "messageBoard", 1024 * 1024)

    dataBase.transaction(tx => {
      tx.executeSql("CREATE TABLE IF NOT EXISTS MessageList(name TEXT, message TEXT, time TEXT)", [])
      tx.executeSql("SELECT * FROM MessageList", [], (tx, rs) => {
        for(var i = 0; i < rs.rows.length; i++){
          list.push(rs.rows.item(i))
        }
        this.setState({
          messageList: list
        })
      })
    })
  },


  componentDidMount() {
    this.renderData()
    // console.log(this)
  },

  render() {
    let messageNode = []
    let className1

    this.state.messageList.map((item, key) => {
      if(key % 2 == 0){
        className1 = "node-left"
      }else{
        className1 = "node-right"
      }

      let nameColor = (Math.random()*5 + "").substring(2, 8)

      return messageNode.unshift(
        <div className={className1} key={key}>
          <div className="node-item">
            <div className="arrow"></div>
            <ul>
              <li style={{color: "#" + nameColor}}>{item.name}</li>
              <li>{item.message}</li>
              <li>{item.time}</li>
            </ul>
          </div>
        </div>
      )
    })

    return (
      <div className="message">
        <div className="send">
          <label htmlFor="name">HideID</label>
          <input className="form-control" 
            id="name" 
            ref="name" 
            type="text" 
            placeholder="name" />
          <label htmlFor="message">Message</label>
          <textarea 
            className="form-control" 
            id="message" 
            ref="message" 
            type="text" 
            placeholder="message" />
          <div className="button-group">
            <a href="javascript:;" 
              className="btn btn-default" 
              role="button" 
              onClick={ this.submiteAll }>
              T
            </a>
          </div>
        </div>
        <div className="message-list">
          { messageNode }
        </div>
      </div>
    )
  }
});

export default Message