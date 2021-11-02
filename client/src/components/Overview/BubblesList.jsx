import React from 'react';
import Bubble from './Bubble.jsx';

function BubblesList(props) {

  return (
    <div id='selectorList'>
      {props.list.map(entry =>
        <Bubble data={entry} selected={props.selected} handleChange={props.handleChange}/>
      )}
    </div>
  );
}

export default BubblesList;