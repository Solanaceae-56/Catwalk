import React from 'react';
import Star_Rating from './product-info/Star_Rating.jsx';
import Style_Selector from './style-selector/Style_Selector.jsx';
import Image_Gallery from './image_gallery/Image_Gallery.jsx';
import Zoomed_In from './image_gallery/Zoomed_In.jsx';
import axios from 'axios';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.handleStyleChange = this.handleStyleChange.bind(this);
    this.changeCurrImg = this.changeCurrImg.bind(this);
    this.handleDefaultChange = this.handleDefaultChange.bind(this);
    this.updateAllStyles = this.updateAllStyles.bind(this);
    this.state = {
      current_Product: {},
      current_Style: {},
      current_Img: {},
      allStyles: [],
      mode: true,
    }
  }

  handleStyleChange(data) {
    this.setState({
      current_Style: data,
    });
  }

  handleDefaultChange(data) {
    if (data) {
      this.setState({
        mode: false,
      });
    } else {
      this.setState({
        mode: true,
      })
    }
  }

  updateAllStyles(data) {
    this.setState({
      allStyles: data
    });
  }

  changeCurrImg(data) {
    this.setState({
      current_Img: data,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.product_id !== prevProps.product_id) {
    axios.get("http://localhost:3000/products", {params: {productId: this.props.product_id, path: '/products/:product_id'}})
      .then((data) => {
        console.log(data);
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
    let priceTag;
    if (this.state.current_Style && this.state.current_Style.sale_price === null) {
      priceTag = <div id='price'>{this.state.current_Style.original_price}</div>;
    } else if (this.state.current_Style && this.state.current_Style.sale_price !== null) {
      priceTag =
        <div id='price'>
          <div id='OGprice'>{this.state.current_Style.original_price}</div>
          <div id='salePrice'>{this.state.current_Style.sale_price}</div>
        </div>;
    } else {
      priceTag = <div id='price'>Not Available</div>
    }

    let condition;
    if (this.state.mode && this.state.current_Product.name !== undefined) {
      condition =
        <div id='Overview'>
          <div id='product-info'>
            <div id='star-rating'><Star_Rating rating={this.props.rating} reviewTotal={this.props.num_Of_Ratings}/></div>
            <div id='product-category'>{this.state.current_Product.category}</div>
            <div id='product-title'>{this.state.current_Product.name}</div>
            {priceTag}
            <div id='social-media'>
              <button id='FB'>Facebook</button>
              <button id='Twitter'>Twitter</button>
              <button id='Pinterest'>Pinterest</button>
            </div>
          </div>
          <div id='product-overview'>{this.state.current_Product.description}</div>
          <div id='style-selector'><Style_Selector product_id={this.props.product_id} handleChange={this.handleStyleChange} updateAllStyles={this.updateAllStyles} currImg={this.state.current_Img} allStyles={this.state.allStyles} currStyle={this.state.current_Style}/></div>
          <div id='image-gallery'><Image_Gallery current_Style={this.state.current_Style} changeCurrImg={this.changeCurrImg} currImg={this.state.current_Img} changeView={this.handleDefaultChange}/></div>
        </div>;
    } else if (this.state.mode) {
      condition = <div>Rendering</div>
    } else {
      condition = <Zoomed_In current_Image={this.state.current_Img} current_Style={this.state.current_Style} changeCurrImg={this.changeCurrImg} changeView={this.handleDefaultChange}/>;
    }

    return (
      <div>
        {condition}
      </div>
    );
  }
}

export default Overview;