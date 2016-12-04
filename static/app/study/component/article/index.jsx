/*
* @Author: woolson
* @Date:   2016-12-03 20:53:13
* @Email:   woolson.lee@gmail.com
* @Last Modified by:   woolson
* @Last Modified time: 2016-12-04 12:47:40
*/

import "./style"
import React, { Component } from "react"

export default class Article extends Component {
  state = {
    __html: "",
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
  }

  componentWillUnmount() {
    $(".article-file").remove()
  }

  fetchArticle() {
    const name = this.props.location.query.is

    $.get(__HOST__ + `/study/fetchArticle/${name}`)
      .then(d => {
        this.refs.article.innerHTML = d
        setTimeout(() => {
          $(this.refs.article).fadeIn(300)
        }, 300)
        setTimeout(() => {
          $("head").append(`<script src="http://www.woolson.cn/assets/js/common-js.js"></script>`)
          $("head").append("<script>hljs.initHighlighting();</script>")
        }, 300)
      })
  }

  render() {
    return <div
      ref="article"
      className="study-article"
    />
  }
}