import React from 'react';

function Bubble(props) {
  var highlight;
  if (props.data.style_id === props.selected) {
    highlight = <img className='selector_thumbnails_highlighted' src={props.data.photos[0].thumbnail_url} onClick={props.handleChange.bind(this, props.data)}/>;
  } else {
    highlight = <img className='selector_thumbnails' src={props.data.photos[0].thumbnail_url} onClick={props.handleChange.bind(this, props.data)}/>;
  }

  return (
    highlight
  );
}

export default Bubble;