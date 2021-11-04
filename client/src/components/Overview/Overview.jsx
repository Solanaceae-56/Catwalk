import React from 'react';
import Star_Rating from './product-info/Star_Rating.jsx';
import Style_Selector from './style-selector/Style_Selector.jsx';
import Image_Gallery from './image_gallery/Image_Gallery.jsx';
import axios from 'axios';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.handleStyleChange = this.handleStyleChange.bind(this);
    this.state = {
      current_Product: {},
      current_Style: {},
    }
  }

  handleStyleChange(data) {
    this.setState({
      current_Style: data,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.product_id !== prevProps.product_id) {
    axios.get("http://localhost:3000/products", {params: {productId: this.props.product_id, path: '/products/:product_id'}})
      .then((data) => {
        this.setState({
          current_Product: data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  render() {
    return (
      <div id='Overview'>
        <div id='product-info'>
          <div id='star-rating'><Star_Rating rating={this.props.rating} reviewTotal={this.props.num_Of_Ratings}/></div>
          <div id='product-category'>{this.state.current_Product.category}</div>
          <div id='product-title'>{this.state.current_Product.name}</div>
          <div id='price'>{this.state.current_Product.default_price}</div>
          <div id='social-media'></div>
        </div>
        <div id='product-overview'>{this.state.current_Product.description}</div>
        <div id='style-selector'><Style_Selector product_id={this.props.product_id} handleChange={this.handleStyleChange}/></div>
        <div id='image-gallery'><Image_Gallery current_Style={this.state.current_Style}/></div>
      </div>
    );
  }
}

export default Overview;