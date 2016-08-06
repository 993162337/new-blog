import "./style"
import React from "react"
import md5 from "md5"
import moment from "moment"

export default React.createClass({
  getInitialState() {
    return {
      messageList: []
    }
  },

  componentDidMount() {
    this.fetchData()
  },

  fetchData() {
    $.getJSON(__HOST__ + "/fetchAllMessage")
      .then(d => this.setState({messageList: d}))
  },

  submite() {
    let params = {
      name: "test",
      content: this.refs.message.value,
      response: null
    }

    $.post(__HOST__ + "/insertMessage", params)
      .then(d => {
        if(d.succ) this.fetchData()
      })
  },

  respone(e) {
    let responeName = $(e.target).closest("li").text()
    this.refs.message.value = "@" + responeName + "："
    this.refs.message.focus()
  },

  renderList() {
    let result = []

    this.state.messageList.map((item, index) => {
      let nameColor = md5(item.author).substring(0, 7)
      let klass = index % 2 == 0 ? "node-left" : "node-right"

      result.unshift(
        <div className={ klass } key={ index }>
          <div className="node-item">
            <div className="arrow"></div>
            <ul>
              <li
                style={{color: "#" + nameColor}}
                onClick={ this.respone }
                title="click to respone him or her"
              >
                {item.author}
              </li>
              <li>{item.content}</li>
              <li>
                <i className="fa fa-calendar u-mr5" />
                { moment(item.createTime).format("YYYY-MM-DD") }
              </li>
            </ul>
          </div>
        </div>
      )
    })

    return result
  },

  render() {
    return <div className="message">
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
            onClick={ this.submite }
          >
            <i className="fa fa-paper-plane" />
          </a>
        </div>
      </div>

      <div className="message-list">
        { this.renderList() }
      </div>
    </div>
  }
});
