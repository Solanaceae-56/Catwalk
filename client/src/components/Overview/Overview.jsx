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
          <div id='star-rating'></div>
          <div id='product-category'></div>
          <div id='product-title'></div>
          <div id='price'></div>
          <div id='product-overview'></div>
          <div id='social-media'></div>
        </div>
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