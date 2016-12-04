/*
* @Author: woolson
* @Date:   2016-12-04 16:44:29
* @Email:   woolson.lee@gmail.com
* @Last Modified by:   woolson
* @Last Modified time: 2016-12-04 18:23:39
*/

import "./style"
import React, { Component } from "react"

export default class Travel extends Component {
  state = {
    list: [
      {
        name: "泰国之游",
        subTitle: "清凉的旅行者",
        date: "2016-09-09",
      },
    ]
  }

  renderItems() {
    return this.state.list.map((item, index) => {
      return <li
        key={ index }
        className="life-travels__item"
      >
        <div className="life-travels__item_head">
          <p>{ item.name }</p>
          <span className="date u-mr10">{ item.date }</span>
          <span className="subTitle">{ item.subTitle }</span>
        </div>

        <div
          className="life-travels__item_img"
          style={{
            backgroundImage: `url(${require("../../../assets/images/logo.png")})`,
          }}
        />
      </li>
    })
  }

  render() {
    return <ul className="life-travels">
      { this.renderItems() }
    </ul>
  }
}