import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:3001/items")
      .then(resp => resp.json())
      .then(data => {
        let items =data.map((post, index) => {
          return (
            <div key={index}>
              <h2>{post.brand}: {post.model}</h2>
                <p>Price {post.price}</p>
            </div>
          )
          })
        this.setState({
          isLoaded: true,
          items: items
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


  render() {
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          {this.state.items}
        </div>
      )};
  }
}
export default App; 