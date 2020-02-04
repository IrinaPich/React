import React, { Component } from 'react';
//import ReactDOM from "react-dom";
//import ProductTable from './Main'
//import ProductRow from './Main'
//import ProductCategoryRow from './Main'

class Details extends Component {
  state = {
    product: null
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => {
        this.setState({
          product: res.data,
        })
        console.log(res);
      })
  }

  render() {
    // console.log(this.props);
    console.log(this.state);

    return (
      <div>
        <h2>Detailes of </h2>

        <h4> </h4>
        <button onClick={(e) => this.onclick(e)}>Back to main list</button>
      </div>
    );
  }
}

export default Details;