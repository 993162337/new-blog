import React from "react"
import ReactDOM from "react-dom"

let Search = React.createClass({
  render() {
    return (
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Search for..." />
        <span className="input-group-btn">
          <button className="btn btn-default" type="button">Go!</button>
        </span>
      </div>
    )
  }
})

export default Search