/*
* @Author: woolson
* @Date:   2016-12-16 23:16:17
* @Email:   woolson.lee@gmail.com
* @Last Modified by:   woolson
* @Last Modified time: 2016-12-20 17:48:04
*/

import "./style"
import React, { Component } from "react"
import { isEmpty } from "utils"

export default class Comment extends Component {
  static defaultProps = {
    data: [
      {
        name: "woolson",
        message: "这个是一则测试信息……",
        date: "2016-12-01"
      }
    ]
  }

  submitComment(replyID, replyName, commentID, evt) {
    const data = {
      message: $(evt.target).prev("textarea").val(),
      replyID: replyID,
      commentID: commentID,
      replyName: replyName,
    }

    this.props.onSubmit && this.props.onSubmit(data)
    if(replyID) {
      $(evt.target).closest("._comment-content__item_input").slideUp()
    }
  }

  renderInput(replyID, replyName, commentID) {
    const avatar = isEmpty(Global.user) ? require("../../assets/images/hi.svg") : Global.user.avatar_url
    return <div className="_comment-input">
      <img src={ avatar } />

      <textarea
        className="_comment-input__textarea"
      />

      <button onClick={ this.submitComment.bind(this, replyID, replyName, commentID) }>
        <i className="fa fa-check"/>
      </button>
    </div>
  }

  renderComments(data, level = 0, commentID) {
    const Data = isEmpty(data) ? this.props.data : data
    if(isEmpty(Data)) return "To Be the first..."

    return Data.map((item, index) => {
      return <div className="_comment-content__item">
        <img src={ require("../../assets/images/hi.svg") } />

        <div className="_comment-content__item_content">
          <div className="info">
            <span className="u-mr5 name">
              { item.author }
            </span>

            {
              item.reply_name
                && ["@",
                    <span className="name u-ml5 u-mr10">
                      {item.reply_name}
                    </span>
                   ]
            }

            <span>
              { moment(item.create_date).format("YYYY-MM-DD HH:mm:ss") }
            </span>
          </div>

          <div className="message">{ item.message }</div>

          <div className="evaluation">
            <span>
              <i className="fa fa-angle-up" /> { item.agree || 0 }
            </span>

            <span className="u-ml5 u-mr5">|</span>

            <span>
              <i className="fa fa-angle-down" /> { item.disagree || 0 }
            </span>

            <i
              title="Reply"
              className="fa fa-reply u-ml10"
              onClick={ evt => {
                const $input = $(evt.target).next("div")
                const isShow = $input.is(":visible")
                $input[isShow ? "slideUp" : "slideDown"]()
              } }
            />

            <div
              className="_comment-content__item_input"
              style={{display: "none"}}
            >

              { this.renderInput(item._id, item.author, level ? commentID : item._id) }
            </div>

            {
              !isEmpty(item.replies)
                && <div className="_comment-content__item_reply">
                    { this.renderComments(item.replies, 1, item._id) }
                  </div>
            }
          </div>
        </div>
      </div>
    })
  }

  render() {
    return <div className="_comment">
      <div className="_comment-header">
        <span>{  this.props.data.length || 0 } Comments</span>

        {
          isEmpty(Global.user)
            ? <span
                className="u-mlauto"
                onClick={ () => location.href = "https://github.com/login/oauth/authorize?client_id=72e5cae736efb0366ffc&redirect_uri=http://woolson.cn/oauth/github&state=23ede2ewedqwe" }
              >
                <i className="fa fa-github u-mr5" />
                Login with Github
              </span>
            : <span className="u-mlauto">
                Login with:&nbsp;
                { Global.user.name }
              </span>
        }
      </div>

      { this.renderInput(0) }

      <div className="_comment-content">
        { this.renderComments() }
      </div>
    </div>
  }
}