/*
* @Author: woolson
* @Date:   2016-12-03 20:53:13
* @Email:   woolson.lee@gmail.com
* @Last Modified by:   woolson
* @Last Modified time: 2016-12-20 17:43:54
*/

import "./style"
import React, { Component } from "react"
import { browserHistory } from "react-router"
import Comment from "_comment"
import { Msg, isEmpty } from "utils"

export default class Article extends Component {
  state = {
    comments: [],
  }

  componentWillMount() {
    $("head").append(`<script src="http://www.woolson.cn/assets/js/highlight.pack.js"></script>`)
    $("head").append(`
      <link class="article-file" rel="stylesheet" href="http://www.woolson.cn/assets/styles/md-themes/monokai.css">
      <link class="article-file" rel="stylesheet" href="https://dn-maxiang.qbox.me/res-min/themes/marxico.css">
      <link class="article-file" rel="stylesheet" href="http://www.woolson.cn/assets/styles/common-css.css">`
    )
  }

  componentDidMount() {
    this.fetchArticle()
    this.fetchComment()
  }

  componentWillUnmount() {
    $(".article-file").remove()
  }

  fetchArticle() {
    const state = this.props.location.state

    if(isEmpty(state)) browserHistory.push("/study")

    $.get(__HOST__ + `/study/fetchArticle/${state.article}`)
      .then(d => {
        this.refs.article.innerHTML = d
        setTimeout(() => {
          $(this.refs.root).fadeIn(300)
        }, 300)
        setTimeout(() => {
          $("head").append(`<script src="http://www.woolson.cn/assets/js/common-js.js"></script>`)
          $("head").append("<script>hljs.initHighlighting();</script>")
        }, 300)
      })
  }

  fetchComment() {
    const state = this.props.location.state

    $.get(__HOST__ + "/fetchComments", {aid: state.aid})
      .then(d => this.setState({comments: d.comments.reverse()}))
  }

  onSubmit(data) {
    const param = {
      aid: 1,
      type: data.replyID ? 1 : 0,
      reply_id: data.replyID,
      reply_name: data.replyName,
      author: "woolson",
      comment_id: data.commentID,
      message: data.message,
    }

    $.post(__HOST__ + "/insertComment", param)
      .then(d => {
        if(d.succ) {
          Msg("提交成功！")
          this.fetchComment()
        }
        else Msg("提交失败, 请重试！", "error")
      })
  }

  render() {
    return <div
      ref="root"
      className="study-article"
    >
      <div
        ref="article"
        className="study-article__content"
      />

      <Comment
        data={ this.state.comments }
        onSubmit={ this.onSubmit.bind(this) }
      />
    </div>
  }
}