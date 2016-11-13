/**
* @Author: woolson
* @Date:   2016-11-13 17:11:00
* @Email:  woolson.lee@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2016-11-13 17:11:06
*/

/**
 * @author CJ Ting (fatelovely1128@gmail.com)
 * @date 2016-01-06 18:59:54
 * @remarks
 **   null
 */

import "./style"
import React from "react"
import cx from "classnames"

const loadingImg = require("./loading.gif")
const spinningImg = require("./spinning.svg")
const blockImg = require("./spinning_gray.svg")
const defaultText = "加载中..."

export const PlainLoading = ({ text = defaultText }) =>
  <div className="_loading-plain">
    { text }
  </div>


export default ({ text = defaultText }) =>
  <div className="_loading">
    <div className="_loading__content">
      <img src={ loadingImg } />
      <p className="_loading__text">
        { text }
      </p>
    </div>
  </div>


export const BlurLoading = ({ text = defaultText }) =>
  <div className="_loading-blur">
    <div className="_loading-blur__content">
      <img src={ spinningImg } />
      <p className="_loading-blur__text">
        { text }
      </p>
    </div>
  </div>

export const BubbleLoading = () =>
  <div className="_loading-bubble">
    <div className="_loading-bubble__content">
      <img src={ spinningImg } />
    </div>
  </div>

export const BlockLoading = ({ text = defaultText }) =>
  <div className="_loading-block">
    <div className="_loading-block__content">
      <img src={ blockImg } />
      <p className="_loading-block__text">
        { text }
      </p>
    </div>
  </div>
