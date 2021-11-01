import React from 'react';
import Star_Rating from './Star_Rating.jsx';
import axios from 'axios';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: props.product_id,
      current_Product: {},
    };
  }

  componentDidUpdate() {
    axios.get("http://localhost:3000/products",  {params: {productId: this.state.product_id, path: "/products/:product_id"}})
      .then((data) => {
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render () {
    return (
      <div id='Overview'>
        <div id='product-info'>
          <div id='star-rating'><Star_Rating productId={this.state.current_Product.id}/></div>
          <div id='product-category'>{this.state.current_Product.category}</div>
          <div id='product-title'>{this.state.current_Product.name}</div>
          <div id='price'>{this.state.current_Product.default_price}</div>
          <div id='social-media'></div>
        </div>
        <div id='product-overview'>{this.state.current_Product.description}</div>
        <div id='style-selector'></div>
        <div id='add-to-cart'>
          <div id='size-selector'></div>
          <div id='quantity-selector'></div>
          <div id='add-to-cart'></div>
        </div>
        <div id='image-gallery'>
          <div id='expanded-view'></div>
        </div>
      </div>
    )
  }
}

export default Overview;