import React from 'react';

class Overview extends React.Component {
  constructor(props) {
    super(props);
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
        <div id='add-t0-cart'>
          <div></div>
        </div>
      </div>
    )
  }
}

export default Overview;