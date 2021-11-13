import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import AppContext from '../../../index.jsx';
import {InteractionContext} from '../Overview.jsx';

function Quantity_Selector(props) {
  var [currentSize, setCurrentSize] = useState('Select Size');
  var [filtered, setfiltered] = useState([]);
  var [chosenQ, set_chosenQ] = useState(0);
  var [qArr, set_qArr] = useState([]);
  var dark = useContext(AppContext);
  var interaction = useContext(InteractionContext);

  var handleChangeSize = function(e) {
    var split = e.target.value.split(',');
    setCurrentSize(split[1]);
    var max = parseInt(split[0]);
    var results = [];
    for (var i = 1; i <= (max && 15); ++i) {
      results.push(i);
    }
    set_qArr(results);
  };

  var handleChangeQ = function(e) {
    set_chosenQ(parseInt(e.target.value));
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      let results = [];
      for (var key in props.current) {
        if (props.current[key]['quantity'] > 0) {
          results.push(props.current[key]);
        }
      }
      if (results.length === 0) {
        setCurrentSize('Out of Stock');
      } else {
        setfiltered(results);
      }
    }
    return function cleanup() {
      mounted = false;
    }
  }, [props.style]);

  var addToCart = function() {
    var addToCartOneItemAtATime = [];
    addToCartOneItemAtATime.push(axios.post("/cart", {sku_id: props.style}));
    Promise.all(addToCartOneItemAtATime)
      .then((data) => {
        console.log('success');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  var darkLightClass;
  var darkLightBagTextValid;
  var darkLightBagTextInvalid;
  if (dark) {
    darkLightClass = 'dark-size-selector';
    darkLightBagTextValid = 'dark-bag';
    darkLightBagTextInvalid = 'dark-bag-invalid';
  } else {
    darkLightClass = 'light-size-selector';
    darkLightBagTextValid = 'light-bag';
    darkLightBagTextInvalid = 'light-bag-invalid';
  }

  var validAddToBag = function() {
    if (chosenQ > 0 && currentSize !== 'Select Size') {
      return <button onClick={(e) => {addToCart(e), interaction.handleClick(e)}} className={darkLightBagTextValid} id='validEntry'>Add To Bag</button>;
    } else {
      return <button id='invalidEntry' className={darkLightBagTextInvalid}>Add To Bag</button>;
    }
  };

  return (
    <div id='add-to-cart'>
      <select className={darkLightClass} id='size-selector' onChange={(e) => {handleChangeSize(e), interaction.handleClick(e)}}>
        <option selected disabled hidden>Select Size</option>
        {filtered.map((entry, i) =>
          <option value={[entry.quantity, entry.size]} key={i}>{entry.size}</option>
        )}
      </select>
      <select className={darkLightClass} id='quantity-selector' onChange={(e) => {handleChangeQ(e); interaction.handleClick(e)}}>
        <option selected disabled hidden>-</option>
        {qArr.map((entry, i) =>
          <option value={entry} key={i}>{entry}</option>
        )}
      </select>
      {validAddToBag()}
    </div>
  );
}


export default Quantity_Selector;