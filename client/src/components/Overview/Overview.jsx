import React, {createContext, useContext} from 'react';
import './Overview.css';
import Star_Rating from './product-info/Star_Rating.jsx';
import Style_Selector from './style-selector/Style_Selector.jsx';
import Image_Gallery from './image_gallery/Image_Gallery.jsx';
import Zoomed_In from './image_gallery/Zoomed_In.jsx';
import axios from 'axios';
import AppContext from '../../index.jsx';
import "../RatingsReviews/toggleSwitch.css";
export const InteractionContext = createContext();

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.handleStyleChange = this.handleStyleChange.bind(this);
    this.changeCurrImg = this.changeCurrImg.bind(this);
    this.handleDefaultChange = this.handleDefaultChange.bind(this);
    this.updateAllStyles = this.updateAllStyles.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleInteraction = this.handleInteraction.bind(this);
    this.state = {
      current_Product: {},
      current_Style: {},
      current_Img: {},
      allStyles: [],
      mode: true,
      switch: false,
      value: {
        widget: 'Overview',
        handleClick: this.handleInteraction,
      }
    }
  }

  handleInteraction(e) {
    console.log(e.target.id);
    var date = Date();
    axios.post("/interactions", {params: {element: e.target.id, time: date , widget: this.state.value['widget']}})
    .then((data) => {
      console.log('nice');
    })
    .catch((err) => {
      console.log(err);
    })
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
      axios.get("/products", {params: {productId: this.props.product_id, path: '/products/:product_id'}})
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
    let logoBack;
    let lineColor;
    if (this.props.darkmode) {
      logoBack = 'logoDark';
      lineColor = 'lineDark';
    } else {
      logoBack = 'logoLight';
      lineColor = 'lineLight';
    }

    let priceTag;
    if (this.state.current_Style && this.state.current_Style.sale_price === null) {
      priceTag = <div className={lineColor} id='price'>${this.state.current_Style.original_price}</div>;
    } else if (this.state.current_Style && this.state.current_Style.sale_price !== null) {
      priceTag =
        <div className={lineColor} id='price'>
          <div id='originalPrice'>${this.state.current_Style.original_price}</div>
          <div id='salePrice'>${this.state.current_Style.sale_price}</div>
        </div>;
    } else {
      priceTag = <div className={lineColor} id='price'>Not Available</div>
    }

    let condition;
    if (this.state.mode && this.state.current_Product.name !== undefined) {
      condition =
          <div id='overview' className={lineColor}>
            <div className="darkModeSwitch" id='lightDarkSwitch'>
              <label className="switch" >
                <input type="checkbox" onChange={this.props.onChange} />
                <span className="slider round"></span>
              </label>
            </div>
            <div className={logoBack} id='logo'>Solanacea/Spicy</div>
            <div id='infoBox_AddtoCart'>
              <div id='product-info'>
                <Star_Rating id='starRatingProduct' rating={this.props.rating} reviewTotal={this.props.num_Of_Ratings}/>
                <div className={lineColor} id='product-category'>{this.state.current_Product.category}</div>
                <div className={lineColor} id='product-title'>{this.state.current_Product.name}</div>
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
          </div>
    } else if (this.state.mode) {
      condition = <div>Rendering</div>
    } else {
      condition = <Zoomed_In current_Image={this.state.current_Img} current_Style={this.state.current_Style} changeCurrImg={this.changeCurrImg} changeView={this.handleDefaultChange} sliderChange={this.props.onChange}/>;
    }

    return (
      <InteractionContext.Provider value={this.state.value}>
        {condition}
      </InteractionContext.Provider>
    );
  }
}

export default Overview;