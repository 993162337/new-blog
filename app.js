import React from "react"
import PubSub from "pubsub-js"
import ReactDOM from "react-dom"

var FormApp = React.createClass({
  getInitialState: function(){
    return{
      selected: ""
    }
  },

  getDefaultProps: function(){
    return {
      data: [{
        checked: false,
        name: "product1"
      },{
        checked: false,
        name: "product2"
      },{
        checked: false,
        name: "product3"
      }]
    }
  },

  componentDidMount: function(){
    this.pubsub_token = PubSub.subscribe("products", function(topic, product){
      console.log(product)
      let item = this.state.selected
      if(product.state){
        item += " " + product.name
      }else{
        item = item.replace(product.name, "")
      }
      this.setState({
        selected: item
      })
    }.bind(this));
  },

  componentWillUnMount: function(){
    PubSub.unsubscribe(this.pubsub_token);
  },

  render: function  () {
    let productList = this.props.data.map(function(val, key){
      return <Product name={val.name} selected={val.checked} key={key} />
    })
    return (
      <div>
        <Production selectedName={this.state.selected}/>
        {productList}
      </div>
    )
  }
});

var Production = React.createClass({
  render: function  () {
    return (
      <p>Have selected : {this.props.selectedName}</p>
    )
  }
});

var Product = React.createClass({
  onclick: function(e){
    let selectedItem = {}
    selectedItem.state = $(e.target).prop("checked")
    selectedItem.name = this.props.name
    PubSub.publish("products", selectedItem);
  },

  render: function(){
    return <label>
      <input onClick={this.onclick} type="checkbox" defaultChecked={this.props.selected}/>
      {this.props.name}
    </label>
  }
});

export default FormApp