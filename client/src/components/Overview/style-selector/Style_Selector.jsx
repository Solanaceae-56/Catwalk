import React, {useState, useEffect} from 'react';
import axios from 'axios';
import BubblesList from './BubblesList.jsx';
import Quantity_Selector from './Quantity_Selector.jsx';


function Style_Selector(props) {
  var [selected_Style, set_selected_Style] = useState({});
  var [all_Styles, set_all_Styles] = useState([]);

  var handleStyleChange = function(data) {
    set_selected_Style(data);
    props.handleChange(data);
  }

  useEffect(() => {
    let mounted = true;
    axios.get("http://localhost:3000/products", {params: {productId: props.product_id, path: '/products/:product_id/styles'}})
      .then((data) => {
        if (mounted) {
          set_all_Styles(data.data.results);
          set_selected_Style(data.data.results[0]);
          props.handleChange(data.data.results[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      });

      return function cleanup() {
        mounted = false;
      }
  }, [props.product_id]);

  return (
      <div id='style-selector-inner'>
        <div id='styleSelector_mod'>
          <div id='styleSelect_title'><b>STYLE ></b> {selected_Style['name']}</div>
          <BubblesList list={all_Styles} selected={selected_Style.style_id} handleChange={handleStyleChange}/>
        </div>
        <Quantity_Selector current={selected_Style['skus']} style={selected_Style.style_id}/>
      </div>
  );
}

export default Style_Selector;