import React from "react"
import ReactDOM from "react-dom"

let Home = React.createClass({
  componentDidMount() {
    let url = "src/data.json"
    $.getJSON(url)
      .done(d => {
        console.log(d)
        this.setState({
          data: {
            tableData: d.tableData,
            tableTitle: d.tableTitle,
          },
          index: 1,
        }, console.log(this.state))
      })
      .fail(d => {
        console.log("data error!")
      })
  },

  getInitialState() {
    return {
      data: {
        tableData: [],
        tableTitle: [],
      },
      index: 0,
    } 
  },

  render() {
    let node = [
      "table",
      <DataTable data={ this.state.data }/>,
    ]
    return (
      <div>
        { node[this.state.index] }
      </div>
    )
  }
});

let DataTable = React.createClass({
  renderTable() {
    console.log(this.props.data)
    let root = ReactDOM.findDOMNode(this.refs.root)
    $(root).find(table).dataTable({
      data: this.props.data.tableData,
      columns: this.props.data.tableTitle,
    }).bind(this);
  },

  componentDidMount() {
    this.renderTable()
  },

  render() {
    return (
      <div className="data-tables" ref="root">
        <table id="table" ></table>
      </div>
    )
  }
})

export default Home