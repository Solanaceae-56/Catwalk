import React from 'react';
import Star_Rating from './Star_Rating.jsx';
import Style_Selector from './Style_Selector.jsx';
import axios from 'axios';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_Product: {},
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.product_id !== prevProps.product_id) {
    axios.get("http://localhost:3000/products", {params: {productId: this.props.product_id, path: '/products/:product_id'}})
      .then((data) => {
        this.setState({
          current_Product: data.data
        });
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }


  render () {
    return (
      <div id='Overview'>
        <div id='product-info'>
<<<<<<< HEAD
         { /*<div id='star-rating'><Star_Rating productId={this.state.current_Product.id}/></div>*/}
=======
          <div id='star-rating'><Star_Rating rating={this.props.rating} reviewTotal={this.props.num_Of_Ratings}/></div>
>>>>>>> 1a2b98830573f7a928bb50f4b7b03cbece4933f1
          <div id='product-category'>{this.state.current_Product.category}</div>
          <div id='product-title'>{this.state.current_Product.name}</div>
          <div id='price'>{this.state.current_Product.default_price}</div>
          <div id='social-media'></div>
        </div>
        <div id='product-overview'>{this.state.current_Product.description}</div>
        <div id='style-selector'><Style_Selector product_id={this.props.product_id}/></div>
        <div id='image-gallery'>
          <div id='expanded-view'></div>
        </div>
      </div>
    )
  }
}

export default Overview;