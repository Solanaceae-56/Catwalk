import React, {useState, useEffect} from 'react';

function Add_To_Cart(props){
  var [currentSize, setCurrentSize] = useState('Select Size');
  var filter = [];
  console.log(props.current);
  for (var id in props.current) {
    if (props.current[id].quantity > 0) {
      filter.push = {id: props.current[id]};
    }
  }

  var handleSizeChange = function(size) {
    setCurrentSize(size);
  }

  return (
    <div id='add-to-cart'>
      <div id='size-selector'>
        <span>{currentSize}</span>
        <div id='size_dropDown_content'>
          {filter.map(entry =>
            <p onClick={(e) => handleSizeChange(entry.size, e)}>{entry.size}</p>
          )}
        </div>
      </div>
      <div id='quantity-selector'></div>
      <div id='add-to-cart'></div>
    </div>
  );
}


export default Add_To_Cart;