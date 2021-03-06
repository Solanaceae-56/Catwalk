import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import BubblesList from './BubblesList.jsx';
import Quantity_Selector from './Quantity_Selector.jsx';
import AppContext from '../../../index.jsx';

function Style_Selector(props) {
  var [selected_Style, set_selected_Style] = useState({});
  var [all_Styles, set_all_Styles] = useState([]);
  var dark = useContext(AppContext);

  var handleStyleChange = function(data) {
    set_selected_Style(data);
    props.handleChange(data);
    props.changeImg(data.photos[0].url);
  }

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (props.currImg.url !== undefined && props.switch) {
        set_selected_Style(props.currStyle);
        set_all_Styles(props.allStyles);
        props.handleSwitch();
      } else {
        axios.get("/products", {params: {productId: props.product_id, path: '/products/:product_id/styles'}})
          .then((data) => {
            set_all_Styles(data.data.results);
            set_selected_Style(data.data.results[0]);
            props.handleChange(data.data.results[0]);
            props.updateAllStyles(data.data.results);
          })
          .catch((err) => {
            console.log(err);
        });
      }
    }
    return function cleanup() {
      mounted = false;
    }
  }, [props.product_id]);

  var lineColor;
  if (dark) {
    lineColor = 'lineDark';
  } else {
    lineColor = 'lineLight';
  }

  return (
      <div id='style-selector'>
        <div className={lineColor} id='styleSelector_mod'>
          <div id='styleSelect_title'>STYLE > {selected_Style['name']}</div>
          <BubblesList list={all_Styles} selected={selected_Style.style_id} handleChange={handleStyleChange}/>
        </div>
        <div className={lineColor} id='add-tocartOuter'><Quantity_Selector current={selected_Style['skus']} style={selected_Style.style_id}/></div>
      </div>
  );
}

export default Style_Selector;