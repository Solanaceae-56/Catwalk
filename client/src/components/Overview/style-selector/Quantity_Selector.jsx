import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Quantity_Selector(props) {
  var [currentSize, setCurrentSize] = useState('Select Size');
  var [filtered, setfiltered] = useState([]);
  var [chosenQ, set_chosenQ] = useState(0);
  var [qArr, set_qArr] = useState([]);

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
    addToCartOneItemAtATime.push(axios.post("http://localhost:3000/cart", {sku_id: props.style}));
    Promise.all(addToCartOneItemAtATime)
      .then((data) => {
        console.log('success');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  var validAddToBag = function() {
    if (chosenQ > 0 && currentSize !== 'Select Size') {
      return <button onClick={addToCart} id='validEntry'>Add To Bag</button>;
    } else {
      return <button id='invalidEntry'>Add To Bag</button>;
    }
  };

  return (
    <div id='add-to-cart'>
      <div><select id='size-selector' onChange={handleChangeSize}>
        <option selected disabled hidden>Select Size</option>
        {filtered.map(entry =>
          <option value={[entry.quantity, entry.size]}>{entry.size}</option>
        )}
      </select></div>
      <div><select id='quantity-selector' onChange={handleChangeQ}>
        <option selected disabled hidden>-</option>
        {qArr.map(entry =>
          <option value={entry}>{entry}</option>
        )}
      </select></div>
      <div id ='addToBag'>{validAddToBag()}</div>
    </div>
  );
}


export default Quantity_Selector;