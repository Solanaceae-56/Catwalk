import React from 'react';
import Star_Rating from './product-info/Star_Rating.jsx';
import Style_Selector from './style-selector/Style_Selector.jsx';
import Image_Gallery from './image_gallery/Image_Gallery.jsx';
import Zoomed_In from './image_gallery/Zoomed_In.jsx';
import axios from 'axios';

const darkTheme = {
  "background-color": "darkgray"
}
const lightTheme = {
  "background-color": "white"
}

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.handleStyleChange = this.handleStyleChange.bind(this);
    this.changeCurrImg = this.changeCurrImg.bind(this);
    this.handleDefaultChange = this.handleDefaultChange.bind(this);
    this.updateAllStyles = this.updateAllStyles.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleDarkMode = this.handleDarkMode.bind(this);
    this.state = {
      current_Product: {},
      current_Style: {},
      current_Img: {},
      allStyles: [],
      mode: true,
      switch: false,
      darkMode: true,
    }
  }

  handleDarkMode() {
    if (this.state.darkMode) {
      this.setState({
        darkMode: false
      });
    } else {
      this.setState({
        darkMode: true
      });
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
        switch: true
      })
    }
  }

  handleSwitch(data) {
    this.setState({
      switch: false
    });
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
          this.setState({
            current_Product: data.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (this.state.darkMode){
      document.body.style.backgroundColor="rgb(60, 60, 60)";
      document.body.style.color="white";
    } else {
      document.body.style.backgroundColor="white";
      document.body.style.color="black";
    }
  }

  render() {
    let priceTag;
    if (this.state.current_Style && this.state.current_Style.sale_price === null) {
      priceTag = <div id='price'>${this.state.current_Style.original_price}</div>;
    } else if (this.state.current_Style && this.state.current_Style.sale_price !== null) {
      priceTag =
        <div id='price'>
          <div id='originalPrice'>${this.state.current_Style.original_price}</div>
          <div id='salePrice'>${this.state.current_Style.sale_price}</div>
        </div>;
    } else {
      priceTag = <div id='price'>Not Available</div>
    }

    let lightDark;
    if (this.state.darkMode) {
      lightDark =<button id='lightDarkMode' onClick={(e) => this.handleDarkMode(e)}> Light</button>;
    } else {
      lightDark =<button id='lightDarkMode' onClick={(e) => this.handleDarkMode(e)}> Dark </button>;
    }

    let condition;
    if (this.state.mode && this.state.current_Product.name !== undefined) {
      condition =
        <div id='overview'>
        <div id='logo'>Solanacea/Spicy</div>
        {lightDark}
          <div id='infoBox_AddtoCart'>
            <div id='product-info'>
              <Star_Rating id='starRatingProduct' rating={this.props.rating} reviewTotal={this.props.num_Of_Ratings}/>
              <div id='product-category'>{this.state.current_Product.category}</div>
              <div id='product-title'>{this.state.current_Product.name}</div>
              {priceTag}
              {/* <div id='social-media'>
                <button id='facebook'>Facebook</button>
                <button id='twitter'>Twitter</button>
                <button id='pinterest'>Pinterest</button>
              </div> */}
            </div>
            <Style_Selector product_id={this.props.product_id} handleChange={this.handleStyleChange} updateAllStyles={this.updateAllStyles} currImg={this.state.current_Img} allStyles={this.state.allStyles} currStyle={this.state.current_Style} changeImg={this.changeCurrImg} handleSwitch={this.handleSwitch} switch={this.state.switch}/>
          </div>
          <div id='product-overview'>{this.state.current_Product.description}</div>
          <Image_Gallery current_Style={this.state.current_Style} changeCurrImg={this.changeCurrImg} currImg={this.state.current_Img} changeView={this.handleDefaultChange} handleSwitch={this.handleSwitch} switch={this.state.switch}/>
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