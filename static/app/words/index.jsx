import "./style"
import React from "react"
import moment from "./../../node_modules/moment"

let dataBase

let Message = React.createClass({
  getInitialState() {
    return {
      messageList: []
    }
  },

  submiteAll() {
    let getMessage = this.refs.message.value
    let getTime = moment().format("YYYY年MM月DD日HH点mm分ss秒")

    if(getMessage == "") return

    this.refs.message.value = ""

    let node = {}
    node = {
      message: getMessage,
      time: getTime,
    }

    dataBase.transaction(tx => {
      tx.executeSql("INSERT INTO MessageList VALUES(?,?,?)", ["woolson", getMessage, getTime], (tx, ts) => {
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
  },

  respone(e) {
    let responeName = $(e.target).closest("li").text()
    this.refs.message.value = "@" + responeName + "："
    this.refs.message.focus()

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
              <li
                style={{color: "#" + nameColor}}
                onClick={ this.respone }
                title="click to respone him or her"
              >
                {item.name}
              </li>
              <li>{item.message}</li>
              <li>
                <i className="fa fa-calendar u-mr5" />
                {item.time}
              </li>
            </ul>
          </div>
        </div>
      )
    })

    return (
      <div className="message">
        <div className="send">
          <label htmlFor="message">Express your ideas !</label>
          <textarea
            type="text"
            id="message"
            ref="message"
            placeholder="Say something …"
            className="form-control"
          />
          <div className="button-group">
            <a
              role="button"
              href="javascript:;"
              className="btn btn-default"
              onClick={ this.submiteAll }
            >
              <i className="fa fa-paper-plane" />
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
