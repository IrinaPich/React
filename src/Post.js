import React, { Component } from 'react'
//import axios from 'axios'


class Post extends Component {
    state = {
        product: null
    }
  
    componentDidMount() {
      let id = this.props.match.params.product_id;
      fetch("http://localhost:5000/items/" + id)
        .then(res => {
          this.setState({
            product: res.data
          })
          console.log(res);
      })
    }

    render() {
       //console.log(this.props);
      // console.log(this.state);
        const product = this.state.product;

        return (
            <div className="container">
                {product}
            </div>
        )
    }
}

export default Post
