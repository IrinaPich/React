import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import { withRouter, Link } from 'react-router-dom';
//import Details from './Details'

class ProductCategoryRow extends Component {
  render() {
    const brand = this.props.brand;
    return (
      <tr>
        <th colSpan="2">
          {brand}
        </th>
      </tr>
    );
  }
}

class ProductRow extends Component {

  onclick() {
    //console.log(this.props.product);
    //this.setState({ product: this.state.product})
    window.location.assign('http://localhost:3000/details/');
  }
  render() {
    console.log(this.props);
    const product = this.props.product;
    const model = (product.stocked === 'true' ? product.model :
      <span style={{ color: 'red' }}>
        {product.model}
      </span>)

    return (
      <tr>

        <td>
          <div key={product.id}>

            <Link to={'/' + product.id}>{model}</Link>
          </div>
        </td>

        <td>{product.price}</td>
        <td>
          <div className="buttons">
            <button onClick={(e) => this.onclick(e)}>Details</button>
          </div>
        </td>
      </tr>
    );
  }
}



class ProductTable extends Component {
  render() {
    //console.log(this.props);
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;

    const rows = [];
    let lastCategory = null;

    this.props.products.forEach((product) => {
      if (product.model.indexOf(filterText) === -1) {
        return;
      }
      if (inStockOnly && !(product.stocked === 'true')) {
        return;
      }
      if (product.brand !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            brand={product.brand}
            key={product.brand} />
        );
      }
      rows.push(
        <ProductRow 
          product={product}
          key={product.id}
        />
      );
      lastCategory = product.brand;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Model</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  handleInStockChange(e) {
    this.props.onInStockChange(e.target.checked);
  }

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
        <p>
          <label>
            <input
              type="checkbox"
              className="filled-in"
              checked={this.props.inStockOnly}
              onChange={this.handleInStockChange}
            />
            {' '}
            <span>Only show products in stock</span>
          </label>
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false,
      error: null,
      isLoaded: false,
      products: [],
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:5000/items")
      .then(resp => resp.json())
      .then(
        (data) => {
          this.setState({
            isLoaded: true,
            products: data,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }


  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  handleInStockChange(inStockOnly) {
    this.setState({
      inStockOnly: inStockOnly
    })
  }

  render() {
    console.log(this.state.products);
    //console.log(this.state);
   // var id = this.state.products.id;

    if (this.state.error) {
      return <div>Error: {this.state.error.message}</div>;
    } else if (!this.state.isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="contaner" key={this.state.products.id}>
          <SearchBar
            filterText={this.state.filterText}
            inStockOnly={this.state.inStockOnly}
            onFilterTextChange={this.handleFilterTextChange}
            onInStockChange={this.handleInStockChange}
          />
          <ProductTable key={this.state.products.id}
            products={this.state.products}
            filterText={this.state.filterText}
            inStockOnly={this.state.inStockOnly}
          />
        </div>
      );
    }
  }
}


export default withRouter(FilterableProductTable);
