import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Details from './Details'
import FilterableProductTable from './Main'
import Post from './Post'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route exact path="/" component={FilterableProductTable} />
          <Route path="/details" component={Details} />
          <Route path="/:product_id" component={Post} />
        </div>
      </BrowserRouter>
    );
  }
}
export default App;