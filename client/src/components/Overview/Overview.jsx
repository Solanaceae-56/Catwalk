import React from 'react';
import Star_Rating from './Star_Rating.jsx';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_Product: {
        "id": 40344,
        "campus": "hr-rfp",
        "name": "Camo Onesie",
        "slogan": "Blend in to your crowd",
        "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
        "category": "Jackets",
        "default_price": "140.00",
        "created_at": "2021-08-13T14:38:44.509Z",
        "updated_at": "2021-08-13T14:38:44.509Z"
      },
    };
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