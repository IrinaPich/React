import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      hideList: true,
      items: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.style = this.state.hideList ? { display: 'none' } : { display: 'block' };
  }

  componentDidMount() {
    fetch("http://localhost:5000/items")
      .then(resp => resp.json())
      .then(
        (data) => {
          this.setState({
            isLoaded: true,
            items: data
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  handleChange() {
    this.setState(state => ({
      hideList: !state.hideList
  }));
  }

  render() {
    const { error, isLoaded, items } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>{items.map((post, index) => (
          <li key={index} onClick={this.handleChange}>{index + 1} - {post.brand}: {post.model}
            <ul style={this.state.hideList ? { display: 'none' } : { display: 'block' }}>
              <li>Price: {post.price}</li>
              <li>Screen size: {post.screenSize}</li>
              <li>Price: {post.price}</li>
              <li>Screen width: {post.screenWidth}</li>
              <li>Unit: {post.unit}</li>
              <li>Weight: {post.weight}</li>
            </ul>
          </li>
        ))}
        </ul>
      );
    }
  }
}
export default App; 