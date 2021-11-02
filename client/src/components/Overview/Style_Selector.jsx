import React from 'react';
import axios from 'axios';
import BubblesList from './BubblesList.jsx';
import Add_To_Cart from './Add_To_Cart.jsx';

class Style_Selector extends React.Component {
  constructor(props) {
    super(props);
    this.handleStyleChange = this.handleStyleChange.bind(this);
    this.state = {
      selected_Style: {},
      all_Styles: [],
    };
  }

  handleStyleChange(data) {
    this.setState({
      selected_Style: data,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.product_id !== prevProps.product_id) {
      axios.get("http://localhost:3000/products", {params: {productId: this.props.product_id, path: '/products/:product_id/styles'}})
        .then((data) => {
          this.setState({
            all_Styles: data.data.results,
            selected_Style: data.data.results[0]
          });
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  render() {
    return (
      <div>
        <div id='styleSelector_mod'>
          <div id='styleSelect_title'><b>STYLE ></b> {this.state.selected_Style.name}</div>
          <BubblesList list={this.state.all_Styles} selected={this.state.selected_Style.style_id} handleChange={this.handleStyleChange}/>
        </div>
        <Add_To_Cart current={this.state.selected_Style['skus']}/>
      </div>
    )
  }
}

export default Style_Selector;